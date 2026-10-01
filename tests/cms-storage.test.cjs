const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function environment(fetch, blocked = false) {
  const entries = new Map();
  const context = vm.createContext({
    window: { YABISA_SUPABASE_CONFIG: { url: 'https://example.supabase.co', publishableKey: 'public' }, yabisaSupabaseGetAccessToken: async () => 'session' },
    localStorage: { getItem: key => entries.get(key) || null, setItem: (key, value) => { if (blocked) throw new Error('Quota exceeded'); entries.set(key, value); } },
    fetch, AbortController, setTimeout, clearTimeout, console
  });
  vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../yabisa-data.js'), 'utf8'), context);
  return { context, entries };
}

test('remote content remains available when browser cache is full', async () => {
  const { context } = environment(async () => ({ ok: true, json: async () => [{ data: { articles: [{ title: 'Online article' }] } }] }), true);
  const data = await vm.runInContext('yabisaLoadCmsAsync()', context);
  assert.equal(data.articles[0].title, 'Online article');
});

test('failed remote save leaves previous browser data unchanged', async () => {
  const { context, entries } = environment(async () => ({ ok: false, status: 403 }));
  entries.set('yabisaCmsData', 'previous');
  await assert.rejects(vm.runInContext('yabisaSaveCmsRemote({articles: []})', context), /403/);
  assert.equal(entries.get('yabisaCmsData'), 'previous');
});

test('successful remote save is independent of browser quota', async () => {
  const { context } = environment(async () => ({ ok: true }), true);
  const data = await vm.runInContext('yabisaSaveCmsRemote({articles: []})', context);
  assert.equal(data.articles.length, 0);
});

test('six gallery photos and default isolation survive normalization', () => {
  const { context } = environment();
  const result = vm.runInContext(`(() => {
    const first = yabisaNormalizeData({gallery: [{title: 'Album', images: Array.from({length: 6}, (_, i) => 'images/' + i + '.jpg')}]});
    first.programs[0].title = 'Changed';
    return {count: first.gallery[0].images.length, title: yabisaNormalizeData({}).programs[0].title};
  })()`, context);
  assert.equal(result.count, 6);
  assert.equal(result.title, 'Asrama Yatim');
});
