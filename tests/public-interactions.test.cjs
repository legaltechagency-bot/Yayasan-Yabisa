const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

test('homepage links accept original HTML paths and Netlify pretty URLs', () => {
  const context = vm.createContext({URL, location: {href: 'https://example.netlify.app/'}, document: {addEventListener() {}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../cms.js'), 'utf8'), context);
  for (const href of ['detail-program.html?id=one', '/detail-program?id=one', 'https://example.netlify.app/detail-program/?id=one']) {
    context.root = {querySelectorAll: () => [{href}]};
    assert.equal(vm.runInContext('cmsPageLink(root, "detail-program").href', context), href);
  }
});

test('campaign filter separates Quran from Braille while programs support multiple categories', () => {
  function run(selector, categories, target) {
    let click;
    const items = categories.map(category => ({dataset: {category}, style: {}}));
    const button = {dataset: {filter: target}, classList: {add() {}, remove() {}}};
    const group = {dataset: {filterGroup: selector}, addEventListener: (_, fn) => {click = fn;}, querySelectorAll: () => [button]};
    const context = vm.createContext({document: {
      addEventListener() {},
      querySelectorAll: key => key === '[data-filter-group]' ? [group] : key === selector ? items : []
    }});
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8'), context);
    vm.runInContext('refreshReveal = () => {}; setupFilters();', context);
    click({target: {closest: () => button}});
    return items.map(item => item.style.display);
  }
  assert.deepEqual(run('[data-campaign-card]', ['wakaf-quran', 'wakaf-quran-braille'], 'wakaf-quran'), ['', 'none']);
  assert.deepEqual(run('[data-program-card]', ['sosial keagamaan', 'pendidikan'], 'sosial'), ['', 'none']);
});

test('back navigation restores visibility and modified clicks keep native navigation', () => {
  const events = {};
  const classes = new Set();
  let intercepted = false;
  const context = vm.createContext({
    document: {body: {classList: {add: x => classes.add(x), remove: x => classes.delete(x)}}, addEventListener: (name, fn) => {events[name] = fn;}},
    window: {addEventListener: (name, fn) => {events[name] = fn;}, matchMedia: () => ({matches: false})}
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8'), context);
  vm.runInContext('setupPageTransitions()', context);
  classes.add('page-leaving');
  events.pageshow();
  assert.equal(classes.has('page-leaving'), false);
  events.click({target: {closest: () => ({})}, button: 0, ctrlKey: true, preventDefault: () => {intercepted = true;}});
  assert.equal(intercepted, false);
});
