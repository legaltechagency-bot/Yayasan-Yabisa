function cmsEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = yabisaText(text);
  return el;
}

function cmsImage(src, alt) {
  const img = cmsEl("img", "image-card");
  img.src = yabisaSafeUrl(src, "images/logo-yabisa.jpeg");
  img.alt = yabisaText(alt);
  img.loading = "lazy";
  return img;
}

function cmsButtonLink(text, href, className) {
  const a = cmsEl("a", className || "btn btn-light", text);
  a.href = href;
  return a;
}

function renderCampaignCard(campaign) {
  const card = cmsEl("article", "card campaign-card reveal");
  card.dataset.campaignCard = "";
  card.dataset.category = campaign.category;
  card.append(cmsImage(campaign.image, campaign.title));
  const body = cmsEl("div", "card-body");
  body.append(cmsEl("span", "badge", yabisaCategoryLabel(campaign.category)));
  body.append(cmsEl("h3", "", campaign.title));
  body.append(cmsEl("p", "muted", campaign.desc));
  const target = cmsEl("p");
  target.innerHTML = `<strong>Target:</strong> ${yabisaEscapeHtml(campaign.target)}`;
  body.append(target);
  const progress = cmsEl("div", "progress");
  progress.style.setProperty("--value", `${campaign.percent}%`);
  progress.append(cmsEl("span"));
  body.append(progress);
  const meta = cmsEl("div", "campaign-meta");
  meta.append(cmsEl("span", "", `Terkumpul ${campaign.collected}`));
  meta.append(cmsEl("strong", "", `${campaign.percent}%`));
  body.append(meta);
  const donate = cmsEl("button", "btn btn-primary", "Donasi Sekarang");
  donate.type = "button";
  donate.dataset.openDonate = "";
  body.append(donate, document.createTextNode(" "), cmsButtonLink("Lihat Detail", `detail-campaign.html?id=${encodeURIComponent(campaign.id)}`, "btn btn-light"));
  card.append(body);
  return card;
}

function renderProgramCard(program) {
  const card = cmsEl("article", "card program-card reveal");
  card.dataset.programCard = "";
  card.dataset.category = program.category;
  card.append(cmsImage(program.image, program.title));
  const body = cmsEl("div", "card-body");
  body.append(cmsEl("div", "icon", program.status));
  body.append(cmsEl("h3", "", program.title));
  body.append(cmsEl("p", "muted", program.desc));
  const target = cmsEl("p");
  target.innerHTML = `<strong>Sasaran:</strong> ${yabisaEscapeHtml(program.target)}`;
  body.append(target);
  body.append(cmsButtonLink("Pelajari Program", `detail-program.html?id=${encodeURIComponent(program.id)}`, "btn btn-light"), document.createTextNode(" "));
  const support = cmsButtonLink("Dukung Program", "#", "btn btn-primary");
  support.href = `campaign.html?category=${encodeURIComponent(program.campaignCategory || program.id)}`;
  body.append(support);
  card.id = program.id;
  card.append(body);
  return card;
}

function renderGalleryCard(item) {
  const card = cmsEl("article", "card reveal");
  card.append(cmsImage(item.image, item.title));
  const body = cmsEl("div", "card-body");
  body.append(cmsEl("span", "badge", item.tag));
  body.append(cmsEl("h3", "", item.title));
  body.append(cmsEl("p", "muted", item.desc));
  body.append(cmsEl("p", "muted", `${item.images?.length || 1} foto kegiatan`));
  body.append(cmsButtonLink("Lihat Foto", `detail-galery.html?id=${encodeURIComponent(item.id)}`, "btn btn-light"));
  card.append(body);
  return card;
}

function renderArticleCard(article) {
  const card = cmsEl("article", "card news-card reveal");
  card.append(cmsImage(article.image, article.title));
  const body = cmsEl("div", "card-body");
  body.append(cmsEl("span", "badge", article.category));
  body.append(cmsEl("small", "muted", article.date));
  body.append(cmsEl("h3", "", article.title));
  body.append(cmsEl("p", "muted", article.excerpt));
  body.append(cmsButtonLink("Baca Selengkapnya", `detail-artikel.html?id=${encodeURIComponent(article.id)}`, "btn btn-light"));
  card.append(body);
  return card;
}

function renderVideoCard(video) {
  const card = cmsEl("article", "card video-card reveal");
  const link = cmsButtonLink("", video.url, "video-thumb");
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  link.append(cmsImage(video.thumbnail, video.title));
  link.append(cmsEl("span", "play-button", "Play"));
  const body = cmsEl("div", "card-body video-meta");
  body.append(cmsEl("strong", "", video.category || "YouTube"));
  body.append(cmsButtonLink("Tonton di YouTube", video.url, "video-link"));
  body.querySelector("a").setAttribute("target", "_blank");
  body.querySelector("a").setAttribute("rel", "noopener noreferrer");
  if (video.title) body.append(cmsEl("p", "muted", video.title));
  card.append(link, body);
  return card;
}

function replaceGrid(selector, items, renderer) {
  const grid = document.querySelector(selector);
  if (!grid || !items?.length) return;
  grid.replaceChildren(...items.map(renderer));
}

function renderDetailCampaign(data) {
  const root = document.querySelector("[data-campaign-detail]");
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || params.get("slug");
  const campaign = data.campaigns.find(item => item.id === id || yabisaSlug(item.title) === id) || data.campaigns[0];
  document.title = `${campaign.title} - YABISA`;
  document.querySelectorAll("[data-campaign-title]").forEach(el => el.textContent = campaign.title);
  document.querySelectorAll("[data-campaign-category]").forEach(el => el.textContent = yabisaCategoryLabel(campaign.category));
  document.querySelectorAll("[data-campaign-desc]").forEach(el => el.textContent = campaign.desc);
  document.querySelectorAll("[data-campaign-target]").forEach(el => el.textContent = campaign.target);
  document.querySelectorAll("[data-campaign-collected]").forEach(el => el.textContent = campaign.collected);
  document.querySelectorAll("[data-campaign-percent]").forEach(el => el.textContent = `${campaign.percent}%`);
  document.querySelectorAll("[data-campaign-remaining]").forEach(el => el.textContent = "Lihat laporan resmi yayasan");
  document.querySelectorAll("[data-campaign-image]").forEach(el => { el.src = campaign.image; el.alt = campaign.title; });
  document.querySelectorAll(".progress[data-campaign-progress]").forEach(el => el.style.setProperty("--value", `${campaign.percent}%`));
}

function renderDetailArticle(data) {
  const root = document.querySelector("[data-article-detail]");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const article = data.articles.find(item => item.id === id || yabisaSlug(item.title) === id) || data.articles[0];
  document.title = `${article.title} - YABISA`;
  document.querySelectorAll("[data-article-title]").forEach(el => el.textContent = article.title);
  document.querySelectorAll("[data-article-date]").forEach(el => el.textContent = article.date);
  document.querySelectorAll("[data-article-category]").forEach(el => el.textContent = article.category);
  document.querySelectorAll("[data-article-excerpt]").forEach(el => el.textContent = article.excerpt);
  document.querySelectorAll("[data-article-image]").forEach(el => { el.src = article.image; el.alt = article.title; });
  document.querySelectorAll("[data-article-content]").forEach(el => {
    el.innerHTML = yabisaSanitizeHtml(article.content || article.excerpt || "Informasi artikel sedang dimuat.");
  });
}

function renderDetailGallery(data) {
  const root = document.querySelector("[data-gallery-detail]");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const item = data.gallery.find(g => g.id === id || yabisaSlug(g.title) === id) || data.gallery[0];
  document.title = `${item.title} - YABISA`;
  document.querySelectorAll("[data-gallery-title]").forEach(el => el.textContent = item.title);
  document.querySelectorAll("[data-gallery-tag]").forEach(el => el.textContent = item.tag);
  document.querySelectorAll("[data-gallery-desc]").forEach(el => el.textContent = item.desc);
  const grid = document.querySelector("#galleryDetailGrid");
  if (grid) grid.replaceChildren(...(item.images || [item.image]).map((src, index) => {
    const card = cmsEl("article", "card reveal");
    card.append(cmsImage(src, `${item.title} ${index + 1}`));
    return card;
  }));
}

function renderDetailProgram(data) {
  const root = document.querySelector("[data-program-detail]");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const program = data.programs.find(item => item.id === id || yabisaSlug(item.title) === id) || data.programs[0];
  document.title = `${program.title} - YABISA`;
  document.querySelectorAll("[data-program-title]").forEach(el => el.textContent = program.title);
  document.querySelectorAll("[data-program-category]").forEach(el => el.textContent = program.category);
  document.querySelectorAll("[data-program-target]").forEach(el => el.textContent = program.target);
  document.querySelectorAll("[data-program-status]").forEach(el => el.textContent = program.status);
  document.querySelectorAll("[data-program-desc]").forEach(el => el.textContent = program.desc);
  document.querySelectorAll("[data-program-content]").forEach(el => el.textContent = program.content || program.desc);
  document.querySelectorAll("[data-program-image]").forEach(el => { el.src = program.image; el.alt = program.title; });
  document.querySelectorAll("[data-program-campaign]").forEach(el => {
    el.href = `campaign.html?category=${encodeURIComponent(program.campaignCategory || program.id)}`;
  });
}

function applyCampaignFilterFromUrl() {
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  if (!category) return;
  const group = document.querySelector('[data-filter-group="[data-campaign-card]"]');
  if (!group) return;
  const button = [...group.querySelectorAll("[data-filter]")].find(item => item.dataset.filter === category);
  if (button) button.click();
}

document.addEventListener("DOMContentLoaded", async () => {
  const cms = typeof yabisaLoadCmsAsync === "function" ? await yabisaLoadCmsAsync() : yabisaLoadCms();
  replaceGrid("#campaignGrid", cms.campaigns, renderCampaignCard);
  replaceGrid("#programGrid", cms.programs, renderProgramCard);
  replaceGrid("#galleryGrid", cms.gallery, renderGalleryCard);
  replaceGrid("#artikelGrid", cms.articles, renderArticleCard);
  replaceGrid("#videoGrid", cms.videos, renderVideoCard);
  document.querySelectorAll("[data-video-section]").forEach(section => {
    section.style.display = cms.videos?.length ? "" : "none";
  });
  renderDetailCampaign(cms);
  renderDetailArticle(cms);
  renderDetailGallery(cms);
  renderDetailProgram(cms);
  applyCampaignFilterFromUrl();
  updateWhatsAppLinks?.();
  refreshReveal?.();
});


