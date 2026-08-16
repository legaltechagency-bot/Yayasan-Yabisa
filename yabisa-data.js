const YABISA_CMS_KEY = "yabisaCmsData";

const YABISA_DEFAULTS = {
  campaigns: [
    { id: "rumah-harapan-anak-yatim", title: "Wujudkan Rumah Harapan Anak Yatim", category: "asrama-yatim", target: "Rp500.000.000", collected: "Rp120.000.000", percent: 24, image: "images/hero-asrama-yabisa.jpg", desc: "Mari hadirkan tempat tinggal yang layak sebagai rumah tumbuh, belajar, dan menggapai masa depan bagi anak-anak yatim." },
    { id: "sedekah-beras", title: "Sedekah Beras, Hadirkan Senyum di Setiap Piring", category: "sedekah-beras", target: "Rp15.000.000 per bulan", collected: "Rp6.900.000", percent: 46, image: "images/tentang-asrama-yabisa.jpeg", desc: "Satu karung beras yang Anda berikan dapat menjadi sumber kebahagiaan bagi keluarga yang membutuhkan." },
    { id: "wakaf-quran", title: "Wakaf Al-Qur'an, Hadiah Pahala yang Terus Mengalir", category: "wakaf-quran", target: "Rp20.000.000", collected: "Rp7.000.000", percent: 35, image: "images/profile-kegiatan-yabisa.jpeg", desc: "Setiap huruf yang dibaca menjadi amal jariyah yang terus mengalir untuk Anda." },
    { id: "jumat-berkah", title: "Jumat Berkah, Tebar Kebahagiaan", category: "jumat-berkah", target: "Rp10.000.000 per bulan", collected: "Rp3.000.000", percent: 30, image: "images/tentang-asrama-yabisa.jpeg", desc: "Mari hadirkan kebahagiaan untuk anak-anak yatim melalui santunan dan makan siang bergizi setiap hari Jumat." },
    { id: "wakaf-quran-braille", title: "Wakaf Al-Qur'an Braille untuk Sahabat Tunanetra", category: "wakaf-quran-braille", target: "Rp100.000.000", collected: "Rp12.000.000", percent: 12, image: "images/profile-kegiatan-yabisa.jpeg", desc: "Mari hadirkan cahaya Al-Qur'an bagi sahabat tunanetra melalui Wakaf Al-Qur'an Braille." },
    { id: "mari-berqurban", title: "Mari Berqurban, Tebar Manfaat Hingga Pelosok", category: "mari-berqurban", target: "Rp250.000.000", collected: "Rp25.000.000", percent: 10, image: "images/profile-kegiatan-yabisa.jpeg", desc: "Salurkan qurban terbaik untuk menghadirkan manfaat bagi anak binaan dan masyarakat yang membutuhkan." }
  ],
  programs: [
    { id: "asrama-yatim", title: "Asrama Yatim", category: "pendidikan sosial", campaignCategory: "asrama-yatim", target: "Anak yatim dan dhuafa", status: "Berjalan", image: "images/hero-asrama-yabisa.jpg", desc: "Rumah pembinaan dan pendampingan bagi anak yatim agar tumbuh mandiri dan berakhlak mulia.", content: "Asrama Yatim YABISA menjadi ruang tumbuh bagi anak-anak yatim dan dhuafa. Program ini mendukung kebutuhan tempat tinggal, pendidikan, pembinaan akhlak, mengaji, bimbingan belajar, kesehatan, pangan, dan kebutuhan harian anak-anak asrama." },
    { id: "jumat-berkah", title: "Jumat Berkah", category: "sosial keagamaan", campaignCategory: "jumat-berkah", target: "Anak yatim dan masyarakat sekitar", status: "Rutin", image: "images/tentang-asrama-yabisa.jpeg", desc: "Kegiatan berbagi rutin untuk menghadirkan kebahagiaan dan kepedulian setiap Jumat.", content: "Jumat Berkah menjadi program rutin untuk menumbuhkan budaya berbagi. Kegiatan ini dapat berupa santunan, makan bersama, pembagian nasi box, dan dukungan kebutuhan sederhana bagi anak binaan serta masyarakat sekitar." },
    { id: "sedekah-beras", title: "Sedekah Beras", category: "sosial kemanusiaan", campaignCategory: "sedekah-beras", target: "Anak binaan dan masyarakat membutuhkan", status: "Rutin", image: "images/tentang-asrama-yabisa.jpeg", desc: "Dukungan pangan untuk anak binaan dan masyarakat yang membutuhkan.", content: "Sedekah Beras membantu memenuhi kebutuhan pangan anak binaan, keluarga dhuafa, dan masyarakat yang membutuhkan. Dukungan donatur menjadi bagian penting agar kebutuhan pokok dapat terus terpenuhi." },
    { id: "wakaf-quran", title: "Wakaf Al-Qur'an", category: "keagamaan", campaignCategory: "wakaf-quran", target: "Santri, anak binaan, dan masyarakat", status: "Berjalan", image: "images/profile-kegiatan-yabisa.jpeg", desc: "Distribusi mushaf untuk mendukung pembelajaran, ibadah, dan amal jariyah.", content: "Wakaf Al-Qur'an membantu menghadirkan mushaf bagi penerima manfaat agar kegiatan membaca, menghafal, dan mempelajari Al-Qur'an dapat berjalan lebih baik." },
    { id: "wakaf-quran-braille", title: "Wakaf Al-Qur'an Braille", category: "keagamaan kemanusiaan", campaignCategory: "wakaf-quran-braille", target: "Sahabat tunanetra", status: "Berjalan", image: "images/profile-kegiatan-yabisa.jpeg", desc: "Membantu sahabat tunanetra membaca dan mempelajari Al-Qur'an.", content: "Wakaf Al-Qur'an Braille ditujukan untuk sahabat tunanetra agar mereka memiliki akses yang lebih baik untuk membaca dan mempelajari firman Allah." },
    { id: "mari-berqurban", title: "Mari Berqurban", category: "keagamaan sosial", campaignCategory: "mari-berqurban", target: "Penerima manfaat dan masyarakat luas", status: "Musiman", image: "images/profile-kegiatan-yabisa.jpeg", desc: "Menyalurkan manfaat qurban kepada penerima manfaat dan masyarakat luas.", content: "Mari Berqurban menjadi program musiman untuk menyalurkan hewan qurban kepada penerima manfaat. Program ini menguatkan kepedulian sosial dan menghadirkan kebahagiaan di hari raya." }
  ],
  gallery: [
    { id: "kegiatan-sosial-relawan", title: "Kegiatan Sosial Relawan", tag: "Dokumentasi", image: "images/profile-pengurus-yabisa.jpeg", images: ["images/profile-pengurus-yabisa.jpeg"], desc: "Kebersamaan relawan dalam mendampingi penerima manfaat." }
  ],
  videos: [],
  articles: [
    { id: "pembinaan-anak-yatim-berkelanjutan", title: "Mengapa Pembinaan Anak Yatim Perlu Berkelanjutan?", date: "2026-07-21", category: "Edukasi", image: "images/tentang-asrama-yabisa.jpeg", excerpt: "Bantuan terbaik tidak hanya hadir sesaat, tetapi ikut membangun karakter, pendidikan, dan kemandirian anak.", content: "<p>Pembinaan anak yatim membutuhkan perhatian yang berkelanjutan. Anak-anak tidak hanya memerlukan bantuan kebutuhan harian, tetapi juga pendampingan pendidikan, akhlak, kesehatan, dan lingkungan yang aman untuk bertumbuh.</p><p>Melalui Asrama Yatim YABISA, Yayasan Bukit Cahaya Indonesia berupaya menghadirkan rumah kedua yang mendampingi anak-anak dalam proses belajar, mengaji, membangun karakter, dan menumbuhkan rasa percaya diri.</p><p>Dukungan masyarakat menjadi bagian penting agar proses pembinaan ini dapat berjalan konsisten dan memberi dampak nyata bagi masa depan anak-anak binaan.</p>" },
    { id: "sedekah-beras-keluarga-dhuafa", title: "Sedekah Beras dan Dampaknya bagi Keluarga Dhuafa", date: "2026-07-21", category: "Sosial", image: "images/tentang-asrama-yabisa.jpeg", excerpt: "Kebutuhan pangan yang terpenuhi dapat membantu keluarga menjaga kesehatan dan ketenangan hidup sehari-hari.", content: "<p>Sedekah beras merupakan bentuk kepedulian sederhana yang sangat dekat dengan kebutuhan masyarakat. Bagi keluarga dhuafa, ketersediaan bahan pangan pokok dapat membantu mengurangi beban harian dan menjaga ketenangan keluarga.</p><p>YABISA menyalurkan dukungan pangan kepada anak binaan dan masyarakat yang membutuhkan melalui program yang dijalankan secara tertib dan penuh kehati-hatian.</p><p>Setiap bantuan yang diberikan menjadi bagian dari ikhtiar bersama untuk menghadirkan keberkahan dan rasa aman bagi penerima manfaat.</p>" },
    { id: "jumat-berkah-kepedulian-konsisten", title: "Jumat Berkah: Membiasakan Kepedulian yang Konsisten", date: "2026-07-21", category: "Kegiatan", image: "images/profile-kegiatan-yabisa.jpeg", excerpt: "Program rutin membantu membangun kebiasaan berbagi yang tertib, dekat, dan menyentuh kebutuhan nyata.", content: "<p>Jumat Berkah menjadi ruang kebaikan yang mengajak masyarakat untuk berbagi secara rutin. Kegiatan ini dapat berupa santunan, makan bersama, pembagian nasi box, maupun dukungan kebutuhan sederhana bagi penerima manfaat.</p><p>Melalui program ini, YABISA ingin menjaga semangat kepedulian agar tidak hanya hadir pada momentum tertentu, tetapi menjadi kebiasaan baik yang terus tumbuh.</p><p>Kebaikan yang dilakukan bersama, meski sederhana, dapat menjadi sumber kebahagiaan dan semangat baru bagi anak-anak binaan serta masyarakat sekitar.</p>" }
  ],
  settings: { whatsapp: "6285882874778", email: "yabisaofficial2004@gmail.com" }
};

function yabisaClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function yabisaSlug(text) {
  return String(text || "item")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "item";
}

function yabisaText(value) {
  return String(value ?? "");
}

function yabisaSafeUrl(value, fallback = "") {
  const url = yabisaText(value).trim();
  if (!url) return fallback;
  if (/^(https?:|data:image\/|images\/|\.\/images\/)/i.test(url)) return url;
  return fallback;
}

function yabisaCleanPhone(value) {
  const digits = yabisaText(value).replace(/\D/g, "");
  if (!digits) return "6285882874778";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

function yabisaCampaignCategory(value, id = "") {
  const current = yabisaSlug(value || id);
  const byId = {
    "rumah-harapan-anak-yatim": "asrama-yatim",
    "sedekah-beras": "sedekah-beras",
    "wakaf-quran": "wakaf-quran",
    "jumat-berkah": "jumat-berkah",
    "wakaf-quran-braille": "wakaf-quran-braille",
    "mari-berqurban": "mari-berqurban"
  };
  const allowed = new Set(["asrama-yatim", "jumat-berkah", "sedekah-beras", "wakaf-quran", "wakaf-quran-braille", "mari-berqurban"]);
  if (allowed.has(current)) return current;
  return byId[yabisaSlug(id)] || "asrama-yatim";
}

function yabisaCategoryLabel(value) {
  return ({
    "asrama-yatim": "Asrama Yatim",
    "jumat-berkah": "Jumat Berkah",
    "sedekah-beras": "Sedekah Beras",
    "wakaf-quran": "Wakaf Al-Qur'an",
    "wakaf-quran-braille": "Wakaf Al-Qur'an Braille",
    "mari-berqurban": "Mari Berqurban"
  })[yabisaSlug(value)] || yabisaText(value || "Program");
}

function yabisaYouTubeId(value) {
  const url = yabisaText(value).trim();
  if (!url) return "";
  const patterns = [
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return "";
}

function yabisaYouTubeUrl(value) {
  const id = yabisaYouTubeId(value);
  return id ? `https://www.youtube.com/watch?v=${id}` : "";
}

function yabisaYouTubeThumbnail(value) {
  const id = yabisaYouTubeId(value);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "images/logo-yabisa.jpeg";
}

function yabisaEscapeHtml(value) {
  return yabisaText(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
}

function yabisaSanitizeHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = yabisaText(html);
  const allowedTags = new Set(["P", "BR", "STRONG", "EM", "UL", "OL", "LI", "H2", "H3", "BLOCKQUOTE", "A"]);
  const walk = node => {
    [...node.children].forEach(child => {
      if (!allowedTags.has(child.tagName)) {
        child.replaceWith(document.createTextNode(child.textContent || ""));
        return;
      }
      [...child.attributes].forEach(attr => {
        const name = attr.name.toLowerCase();
        if (child.tagName === "A" && name === "href" && /^(https?:|mailto:)/i.test(attr.value)) {
          child.setAttribute("target", "_blank");
          child.setAttribute("rel", "noopener noreferrer");
        } else {
          child.removeAttribute(attr.name);
        }
      });
      walk(child);
    });
  };
  walk(template.content);
  return template.innerHTML;
}

function yabisaNormalizeData(raw) {
  const base = yabisaClone(YABISA_DEFAULTS);
  const source = raw && typeof raw === "object" ? raw : {};
  const normalizeList = (key, mapper) => Array.isArray(source[key]) ? source[key].map((item, index) => mapper(item || {}, index)) : base[key];
  base.campaigns = normalizeList("campaigns", (item, index) => ({
    id: yabisaText(item.id || yabisaSlug(item.title) || `campaign-${index + 1}`),
    title: yabisaText(item.title || "Campaign YABISA"),
    category: yabisaCampaignCategory(item.category, item.id || item.title),
    target: yabisaText(item.target || "Belum diisi"),
    collected: yabisaText(item.collected || "Belum diisi"),
    percent: Math.max(0, Math.min(100, Number(item.percent) || 0)),
    image: yabisaSafeUrl(item.image, base.campaigns[0].image),
    desc: yabisaText(item.desc || "")
  }));
  base.programs = normalizeList("programs", (item, index) => ({
    id: yabisaText(item.id || yabisaSlug(item.title) || `program-${index + 1}`),
    title: yabisaText(item.title || "Program YABISA"),
    category: yabisaText(item.category || "sosial"),
    target: yabisaText(item.target || "Penerima manfaat"),
    status: yabisaText(item.status || "Berjalan"),
    image: yabisaSafeUrl(item.image, base.programs[0].image),
    campaignCategory: yabisaText(item.campaignCategory || item.campaign || item.id || "asrama-yatim"),
    desc: yabisaText(item.desc || ""),
    content: yabisaText(item.content || item.desc || "")
  }));
  const hasOldDefaultPrograms = Array.isArray(source.programs)
    && source.programs.length === 2
    && source.programs.some(item => item?.title === "Pengembangan dan Operasional Asrama Yatim")
    && source.programs.some(item => item?.id === "jumat-berkah");
  if (hasOldDefaultPrograms) base.programs = yabisaClone(YABISA_DEFAULTS.programs);
  base.gallery = normalizeList("gallery", (item, index) => ({
    id: yabisaText(item.id || yabisaSlug(item.title) || `galeri-${index + 1}`),
    title: yabisaText(item.title || "Dokumentasi Kegiatan"),
    tag: yabisaText(item.tag || "Dokumentasi"),
    image: yabisaSafeUrl(item.image || item.images?.[0], base.gallery[0].image),
    images: Array.isArray(item.images) && item.images.length ? item.images.slice(0, 6).map(src => yabisaSafeUrl(src, base.gallery[0].image)) : [yabisaSafeUrl(item.image, base.gallery[0].image)],
    desc: yabisaText(item.desc || "")
  }));
  const groupedGallery = new Map();
  base.gallery.forEach(item => {
    const titleBase = item.title.replace(/\s+\d+$/, "").trim() || item.title;
    const key = `${titleBase.toLowerCase()}|${item.tag.toLowerCase()}|${item.desc.toLowerCase()}`;
    if (!groupedGallery.has(key)) {
      groupedGallery.set(key, { ...item, id: yabisaSlug(titleBase), title: titleBase, images: [] });
    }
    const group = groupedGallery.get(key);
    [...(item.images || []), item.image].forEach(src => {
      const safe = yabisaSafeUrl(src, base.gallery[0].image);
      if (safe && !group.images.includes(safe) && group.images.length < 6) group.images.push(safe);
    });
    group.image = group.images[0] || item.image;
  });
  base.gallery = [...groupedGallery.values()];
  base.videos = normalizeList("videos", (item, index) => {
    const url = yabisaYouTubeUrl(item.url || item.youtube || item.link);
    return {
      id: yabisaText(item.id || yabisaSlug(item.title) || `video-${index + 1}`),
      title: yabisaText(item.title || "Dokumentasi Video"),
      category: yabisaText(item.category || "YouTube"),
      url,
      thumbnail: url ? yabisaYouTubeThumbnail(url) : yabisaSafeUrl(item.thumbnail, "images/logo-yabisa.jpeg"),
      desc: yabisaText(item.desc || "")
    };
  }).filter(video => video.url);
  base.articles = normalizeList("articles", (item, index) => ({
    id: yabisaText(item.id || yabisaSlug(item.title) || `artikel-${index + 1}`),
    title: yabisaText(item.title || "Artikel YABISA"),
    date: yabisaText(item.date || "2026-07-21"),
    category: yabisaText(item.category || "Artikel"),
    image: yabisaSafeUrl(item.image, base.articles[0].image),
    excerpt: yabisaText(item.excerpt || ""),
    content: yabisaText(item.content || "")
  }));
  base.settings = {
    whatsapp: yabisaCleanPhone(source.settings?.whatsapp === "6282320096788" ? base.settings.whatsapp : source.settings?.whatsapp || base.settings.whatsapp),
    email: yabisaText(source.settings?.email || base.settings.email)
  };
  return base;
}

function yabisaLoadCms() {
  try {
    return yabisaNormalizeData(JSON.parse(localStorage.getItem(YABISA_CMS_KEY) || "null"));
  } catch {
    return yabisaClone(YABISA_DEFAULTS);
  }
}

function yabisaSupabaseConfig() {
  const config = window.YABISA_SUPABASE_CONFIG || {};
  if (!config.url || !config.publishableKey) return null;
  return config;
}

async function yabisaLoadCmsRemote() {
  const config = yabisaSupabaseConfig();
  if (!config) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);
  const response = await fetch(`${config.url}/rest/v1/yabisa_cms?id=eq.main&select=data`, {
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${config.publishableKey}`
    },
    signal: controller.signal
  }).finally(() => clearTimeout(timeout));
  if (!response.ok) throw new Error(`Supabase read failed (${response.status})`);
  const rows = await response.json();
  return rows?.[0]?.data ? yabisaNormalizeData(rows[0].data) : null;
}

async function yabisaLoadCmsAsync() {
  try {
    const remote = await yabisaLoadCmsRemote();
    if (remote) {
      localStorage.setItem(YABISA_CMS_KEY, JSON.stringify(remote));
      return remote;
    }
  } catch (error) {
    console.warn("YABISA CMS Supabase load failed, using local fallback.", error);
  }
  return yabisaLoadCms();
}

async function yabisaSaveCmsRemote(nextData) {
  const normalized = yabisaNormalizeData(nextData);
  localStorage.setItem(YABISA_CMS_KEY, JSON.stringify(normalized));
  const config = yabisaSupabaseConfig();
  if (!config) return normalized;
  const accessToken = await window.yabisaSupabaseGetAccessToken?.();
  if (!accessToken) throw new Error("Sesi admin Supabase tidak ditemukan");
  const response = await fetch(`${config.url}/rest/v1/yabisa_cms`, {
    method: "POST",
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify({ id: "main", data: normalized, updated_at: new Date().toISOString() })
  });
  if (!response.ok) throw new Error(`Supabase save failed (${response.status})`);
  return normalized;
}

function yabisaWhatsAppLink(message, data = yabisaLoadCms()) {
  const phone = yabisaCleanPhone(data.settings?.whatsapp);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}


