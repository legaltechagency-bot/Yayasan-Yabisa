const KEY = YABISA_CMS_KEY;
const defaults = YABISA_DEFAULTS;
let data = yabisaLoadCms();
let editState = { type: null, index: -1 };
const pendingGalleryImages = [];

function toast(msg, ok = true) {
  const el = document.querySelector(".toast");
  if (!el) return;
  el.textContent = msg;
  el.style.background = ok ? "#172113" : "#8a2d21";
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2600);
}

function save() {
  const next = yabisaNormalizeData(data);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
    data = next;
    toast("Data berhasil disimpan.");
    renderAll();
    return true;
  } catch (error) {
    toast("Gagal menyimpan. Kapasitas penyimpanan browser tidak mencukupi. Gunakan gambar lebih kecil atau hapus data yang tidak diperlukan.", false);
    return false;
  }
}

function setPanel(id) {
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === id));
  document.querySelectorAll("[data-panel]").forEach(b => b.classList.toggle("active", b.dataset.panel === id));
}

function getForm(type) {
  return document.querySelector(`[data-form="${type}"]`);
}

function clearForm(type) {
  getForm(type)?.reset();
  if (type === "gallery") pendingGalleryImages.length = 0;
  editState = { type: null, index: -1 };
}

function readFields(form) {
  return Object.fromEntries([...form.elements].filter(e => e.name).map(e => [e.name, e.value]));
}

function setupImageUploads() {
  document.querySelectorAll("[data-image-upload]").forEach(input => {
    input.addEventListener("change", () => {
      const files = [...(input.files || [])];
      if (!files.length) return;
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      const form = input.closest("form");
      const clearUpload = message => {
        input.value = "";
        if (form?.elements.image?.value?.startsWith("data:image/")) form.elements.image.value = "";
        if (input.dataset.imageUpload === "gallery") pendingGalleryImages.length = 0;
        toast(message, false);
      };
      if (input.dataset.imageUpload === "gallery" && files.length > 5) return clearUpload("Upload ditolak. Galery maksimal 5 foto dalam sekali upload.");
      if (files.some(file => !allowed.includes(file.type))) return clearUpload("Upload ditolak. Format gambar harus JPG, PNG, WEBP, atau GIF.");
      if (files.some(file => file.size > 900000)) return clearUpload("Upload ditolak. Setiap gambar maksimal sekitar 900 KB agar data dapat tersimpan dan tampil di website.");
      const readFile = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Gambar gagal dibaca."));
        reader.onload = () => {
          const result = String(reader.result || "");
          if (!result.startsWith("data:image/")) reject(new Error("File tidak terbaca sebagai gambar yang valid."));
          else resolve(result);
        };
        reader.readAsDataURL(file);
      });
      Promise.all(files.map(readFile))
        .then(results => {
          if (input.dataset.imageUpload === "gallery") {
            pendingGalleryImages.length = 0;
            pendingGalleryImages.push(...results);
            if (form?.elements.image) form.elements.image.value = `${results.length} foto siap disimpan`;
            toast(`${results.length} foto galery berhasil dimuat. Klik simpan untuk mempublikasikan.`);
          } else {
            if (form?.elements.image) form.elements.image.value = results[0];
            toast("Gambar berhasil dimuat. Klik simpan untuk menyimpan data.");
          }
        })
        .catch(error => clearUpload(`Upload ditolak. ${error.message}`));
    });
  });
}

function td(text) {
  const cell = document.createElement("td");
  const value = yabisaText(text);
  cell.title = value.length > 80 ? value : "";
  cell.textContent = value.length > 120 ? `${value.slice(0, 117)}...` : value;
  return cell;
}

function table(type, columns) {
  const tableEl = document.createElement("table");
  tableEl.className = "table";
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    headRow.append(th);
  });
  const actionTh = document.createElement("th");
  actionTh.textContent = "Aksi";
  headRow.append(actionTh);
  thead.append(headRow);
  const tbody = document.createElement("tbody");
  const rows = Array.isArray(data[type]) ? data[type] : [];
  if (!rows.length) {
    const row = document.createElement("tr");
    const empty = td("Belum ada data.");
    empty.colSpan = columns.length + 1;
    row.append(empty);
    tbody.append(row);
  } else {
    rows.forEach((item, index) => {
      const row = document.createElement("tr");
      columns.forEach(col => row.append(td(item[col])));
      const actions = td("");
      actions.className = "actions";
      const edit = document.createElement("button");
      edit.className = "btn btn-light";
      edit.type = "button";
      edit.textContent = "Edit";
      edit.addEventListener("click", () => editItem(type, index));
      const del = document.createElement("button");
      del.className = "btn btn-light";
      del.type = "button";
      del.textContent = "Hapus";
      del.addEventListener("click", () => deleteItem(type, index));
      actions.append(edit, del);
      row.append(actions);
      tbody.append(row);
    });
  }
  tableEl.append(thead, tbody);
  return tableEl;
}

function renderTable(selector, type, columns) {
  const wrap = document.querySelector(selector);
  if (wrap) wrap.replaceChildren(table(type, columns));
}

function renderDashboardSummary() {
  const wrap = document.querySelector("#dashboardSummary");
  if (!wrap) return;
  const cards = [
    ["Campaign", data.campaigns.length, "campaign aktif"],
    ["Program", data.programs.length, "program publik"],
    ["Artikel", data.articles.length, "artikel terbit"],
    ["Galery", data.gallery.length, "album foto"],
    ["Video", data.videos.length, "video YouTube"]
  ];
  wrap.replaceChildren(...cards.map(([label, count, note]) => {
    const card = document.createElement("div");
    card.className = "card summary-card";
    const span = document.createElement("span");
    span.textContent = label;
    const strong = document.createElement("strong");
    strong.textContent = count;
    const small = document.createElement("small");
    small.className = "muted";
    small.textContent = note;
    card.append(span, strong, small);
    return card;
  }));
}

function renderAll() {
  data = yabisaNormalizeData(data);
  renderDashboardSummary();
  renderTable("#campaignTable", "campaigns", ["title", "category", "target", "collected", "percent"]);
  renderTable("#campaignManageTable", "campaigns", ["title", "category", "target", "collected", "percent"]);
  renderTable("#programTable", "programs", ["title", "category", "target", "status"]);
  renderTable("#programManageTable", "programs", ["title", "category", "target", "status"]);
  renderTable("#articleTable", "articles", ["title", "date", "category"]);
  renderTable("#articleManageTable", "articles", ["title", "date", "category"]);
  renderTable("#galleryTable", "gallery", ["title", "tag", "image"]);
  renderTable("#galleryManageTable", "gallery", ["title", "tag", "image"]);
  renderTable("#videoManageTable", "videos", ["title", "category", "url"]);
  const wa = document.querySelector("[name='whatsapp']");
  const email = document.querySelector("[name='email']");
  if (wa) wa.value = data.settings.whatsapp;
  if (email) email.value = data.settings.email;
}

function editItem(type, index) {
  editState = { type, index };
  const singular = type === "campaigns" ? "campaign" : type === "programs" ? "program" : type === "articles" ? "article" : type === "videos" ? "video" : "gallery";
  const form = getForm(singular);
  if (!form) return;
  Object.entries(data[type][index]).forEach(([k, v]) => { if (form.elements[k]) form.elements[k].value = v; });
  setPanel(singular);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => {
    const first = form.querySelector("input:not([type='file']), select, textarea");
    first?.focus();
    toast("Data sudah dimuat ke form. Silakan edit lalu klik simpan.");
  }, 350);
}

function deleteItem(type, index) {
  if (!confirm("Hapus data ini?")) return;
  data[type].splice(index, 1);
  save();
}

function itemWithId(item) {
  return { ...item, id: item.id || yabisaSlug(item.title) };
}

function validateImport(raw) {
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object") throw new Error("Struktur JSON harus berupa object.");
  ["campaigns", "programs", "articles", "gallery", "videos"].forEach(key => {
    if (key in parsed && !Array.isArray(parsed[key])) throw new Error(`${key} harus berupa array.`);
  });
  if ("settings" in parsed && (!parsed.settings || typeof parsed.settings !== "object" || Array.isArray(parsed.settings))) {
    throw new Error("settings harus berupa object.");
  }
  return yabisaNormalizeData(parsed);
}

document.querySelectorAll("[data-panel]").forEach(btn => btn.addEventListener("click", () => setPanel(btn.dataset.panel)));

document.querySelectorAll("form[data-form]").forEach(form => form.addEventListener("submit", e => {
  e.preventDefault();
  const type = form.dataset.form;
  if (type === "settings") {
    const previous = yabisaClone(data);
    data.settings = readFields(form);
    if (!save()) data = previous;
    return;
  }
  const map = { campaign: "campaigns", program: "programs", article: "articles", gallery: "gallery", video: "videos" };
  const list = map[type];
  const item = itemWithId(readFields(form));
  if (type === "video") {
    const url = yabisaYouTubeUrl(item.url);
    if (!url) return toast("Link YouTube tidak valid. Gunakan link youtube.com atau youtu.be.", false);
    item.url = url;
    item.thumbnail = yabisaYouTubeThumbnail(url);
  }
  if (item.percent) item.percent = Math.max(0, Math.min(100, Number(item.percent)));
  const previous = yabisaClone(data);
  if (type === "gallery" && pendingGalleryImages.length) {
    item.image = pendingGalleryImages[0];
    item.images = [...pendingGalleryImages];
  }
  if (editState.type === list && editState.index > -1) data[list][editState.index] = item; else data[list].push(item);
  if (save()) clearForm(type); else data = previous;
  if (type === "gallery") pendingGalleryImages.length = 0;
}));

document.querySelector("#exportData")?.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(yabisaNormalizeData(data), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data-yabisa.json";
  a.click();
  URL.revokeObjectURL(a.href);
});

document.querySelector("#importData")?.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const oldData = yabisaClone(data);
  const reader = new FileReader();
  reader.onerror = () => { data = oldData; toast("File impor gagal dibaca.", false); };
  reader.onload = () => {
    try {
      data = validateImport(reader.result);
      if (!save()) data = oldData;
    } catch (error) {
      data = oldData;
      toast(`Impor gagal: ${error.message}`, false);
    } finally {
      e.target.value = "";
    }
  };
  reader.readAsText(file);
});

document.querySelector("#resetData")?.addEventListener("click", () => {
  if (!confirm("Kembalikan ke data contoh?")) return;
  data = yabisaClone(defaults);
  save();
});

setupImageUploads();
renderAll();
try {
  localStorage.setItem(KEY, JSON.stringify(yabisaNormalizeData(data)));
} catch {}
