const banks = [
  { name: "BSI", number: "7473337449" },
  { name: "BCA", number: "4740966966" },
  { name: "BRI", number: "711101010524531" },
];

let yabisaRevealObserver;

function showToast(message, ok = true) {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  toast.textContent = message;
  toast.style.background = ok ? "#1f2b1d" : "#8a2d21";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function copyText(text) {
  if (!navigator.clipboard) {
    showToast("Browser belum mendukung salin otomatis.", false);
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => showToast("Berhasil disalin."))
    .catch(() => showToast("Gagal menyalin. Silakan salin manual.", false));
}

function currentCmsData() {
  return typeof yabisaLoadCms === "function" ? yabisaLoadCms() : { settings: { whatsapp: "6285882874778", email: "yabisaofficial2004@gmail.com" } };
}

function defaultWaMessage() {
  return "Halo Kak Odan, saya mendapatkan informasi Yayasan Bukit Cahaya Indonesia melalui website. Saya ingin mengetahui informasi lebih lanjut mengenai program dan donasi YABISA.";
}

function updateWhatsAppLinks(root = document) {
  const data = currentCmsData();
  const link = yabisaWhatsAppLink(defaultWaMessage(), data);
  root.querySelectorAll("[data-wa]").forEach(el => {
    el.setAttribute("href", link);
    if (el.tagName === "A") {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });
}

function renderDonationBanks() {
  document.querySelectorAll("[data-bank-list]").forEach((wrap) => {
    wrap.innerHTML = banks.map((bank) => `
      <div class="bank-row">
        <div><strong>${bank.name}</strong><br><span>${bank.number}</span><br><small>a.n. Yayasan Bukit Cahaya Indonesia</small></div>
        <button class="btn btn-ghost" data-copy="${bank.number}">Salin</button>
      </div>
    `).join("");
  });
  document.querySelectorAll("#donationModal .card-body").forEach((body) => {
    if (body.querySelector("[data-qris-donation]")) return;
    const qris = document.createElement("div");
    qris.className = "qris-box";
    qris.dataset.qrisDonation = "";
    qris.innerHTML = '<h3>Donasi QRIS</h3><p class="muted">Scan QRIS berikut untuk donasi atas nama Yayasan Bukit Cahaya Indonesia.</p><img src="images/qris-yabisa.jpeg" alt="QRIS Yayasan Bukit Cahaya Indonesia"><small class="muted">NMID: ID2022233138785</small>';
    body.append(qris);
  });
}

function setupNav() {
  const menu = document.querySelector(".nav-links");
  const btn = document.querySelector(".hamburger");
  btn?.addEventListener("click", () => menu?.classList.toggle("open"));
  document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => menu?.classList.remove("open")));
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
  if (!document.querySelector(".modal.open")) document.body.style.overflow = "";
}

function setupModals() {
  document.addEventListener("click", (event) => {
    const donate = event.target.closest("[data-open-donate]");
    if (donate) {
      event.preventDefault();
      openModal(document.querySelector("#donationModal"));
      return;
    }
    const confirmBtn = event.target.closest("[data-open-confirm]");
    if (confirmBtn) {
      event.preventDefault();
      openModal(document.querySelector("#confirmModal"));
      return;
    }
    const closeBtn = event.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(closeBtn.closest(".modal"));
      return;
    }
    if (event.target.classList?.contains("modal")) closeModal(event.target);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") document.querySelectorAll(".modal.open").forEach(closeModal);
  });
}

function setupFilters() {
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-filter]");
      if (!btn) return;
      const target = btn.dataset.filter;
      group.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(group.dataset.filterGroup).forEach((item) => {
        item.style.display = target === "all" || item.dataset.category?.includes(target) ? "" : "none";
      });
    });
  });
}

function setupCarousel() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    let index = 0;
    const slides = [...carousel.querySelectorAll(".slide")];
    const show = (next) => {
      if (!slides.length) return;
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    };
    carousel.querySelector("[data-prev]")?.addEventListener("click", () => show(index - 1));
    carousel.querySelector("[data-next]")?.addEventListener("click", () => show(index + 1));
    show(0);
    setInterval(() => show(index + 1), 6000);
  });
}

function setupFaq() {
  document.addEventListener("click", event => {
    const q = event.target.closest(".faq-q");
    if (q) q.closest(".faq-item")?.classList.toggle("open");
  });
}

function formValue(form, selector) {
  return form.querySelector(selector)?.value?.trim() || "";
}

function sendContactToWhatsApp(form) {
  const nama = formValue(form, "[name='nama'], input[placeholder*='Nama']");
  const email = formValue(form, "[name='email'], input[type='email']");
  const telepon = formValue(form, "[name='telepon'], input[placeholder*='WhatsApp']");
  const subjek = formValue(form, "select, [name='subjek']");
  const pesan = formValue(form, "textarea");
  const text = `Halo Kak Odan, saya ingin menghubungi Yayasan Bukit Cahaya Indonesia.\n\nNama: ${nama}\nNomor: ${telepon}\nEmail: ${email}\nSubjek: ${subjek}\nPesan: ${pesan}`;
  window.open(yabisaWhatsAppLink(text, currentCmsData()), "_blank", "noopener,noreferrer");
  showToast("WhatsApp dibuka. Silakan kirim pesan dari aplikasi WhatsApp.");
}

function sendDonationConfirmation(form) {
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const value = hint => fields.find(field => (field.placeholder || field.name || "").toLowerCase().includes(hint))?.value?.trim() || "";
  const nama = value("nama");
  const nomor = value("whatsapp");
  const nominal = value("nominal");
  const campaign = form.querySelector("select")?.value || "";
  const bank = form.querySelectorAll("select")[1]?.value || "";
  const pesan = form.querySelector("textarea")?.value?.trim() || "";
  const tanggal = new Date().toLocaleString("id-ID");
  const text = `Halo Kak Odan, saya ingin konfirmasi donasi.\n\nNama donatur: ${nama}\nNomor WhatsApp: ${nomor}\nCampaign: ${campaign}\nNominal: ${nominal}\nBank tujuan: ${bank}\nPesan/doa: ${pesan}\nTanggal konfirmasi: ${tanggal}\n\nBukti transfer akan saya kirim manual melalui chat ini.`;
  window.open(yabisaWhatsAppLink(text, currentCmsData()), "_blank", "noopener,noreferrer");
  showToast("WhatsApp dibuka. Kirim bukti transfer manual melalui chat.");
}

function setupForms() {
  document.querySelectorAll("form[data-prototype-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const invalid = [...form.querySelectorAll("[required]")].some((field) => !field.value.trim());
      if (invalid) return showToast("Mohon lengkapi kolom wajib.", false);
      if (form.closest("#confirmModal")) {
        sendDonationConfirmation(form);
      } else {
        sendContactToWhatsApp(form);
      }
    });
  });
}

function setupMisc() {
  document.addEventListener("click", event => {
    const copy = event.target.closest("[data-copy]");
    if (copy) {
      event.preventDefault();
      copyText(copy.dataset.copy);
      return;
    }
    const shareWa = event.target.closest("[data-share-wa]");
    if (shareWa) {
      event.preventDefault();
      const text = encodeURIComponent(`Saya ingin berbagi campaign YABISA: ${document.title} ${location.href}`);
      window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
      return;
    }
    const shareFb = event.target.closest("[data-share-fb]");
    if (shareFb) {
      event.preventDefault();
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`, "_blank", "noopener,noreferrer");
      return;
    }
    const top = event.target.closest("[data-to-top]");
    if (top) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const placeholder = event.target.closest("a[href='#']");
    if (placeholder) {
      event.preventDefault();
      showToast("Tautan ini masih placeholder prototype.");
    }
  });
  document.querySelectorAll('a[href^="http"]').forEach(a => {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });
}

function setupImageFallbacks() {
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied === "true") return;
      img.dataset.fallbackApplied = "true";
      img.src = "images/logo-yabisa.jpeg";
      img.alt = img.alt || "Logo Yayasan Bukit Cahaya Indonesia";
    });
  });
}

function refreshReveal(root = document) {
  if (!("IntersectionObserver" in window)) {
    root.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  if (!yabisaRevealObserver) {
    yabisaRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("visible", entry.isIntersecting));
    }, { threshold: 0.12 });
  }
  root.querySelectorAll(".reveal").forEach((el) => {
    yabisaRevealObserver.observe(el);
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDonationBanks();
  setupNav();
  setupModals();
  setupFilters();
  setupCarousel();
  setupFaq();
  setupForms();
  setupMisc();
  setupImageFallbacks();
  updateWhatsAppLinks();
  refreshReveal();
});
