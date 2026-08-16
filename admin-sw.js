const ADMIN_CACHE = "yabisa-admin-v8";
const ADMIN_ASSETS = [
  "./admin-login.html",
  "./admin.html",
  "./admin.css",
  "./admin-auth.js",
  "./admin-supabase.js",
  "./admin.js",
  "./supabase-config.js",
  "./yabisa-data.js",
  "./admin-manifest.json",
  "./images/logo-yabisa.jpeg",
  "./images/admin-icon-192.png",
  "./images/admin-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(ADMIN_CACHE)
      .then(cache => cache.addAll(ADMIN_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("yabisa-admin-") && key !== ADMIN_CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  const isAdminAsset = url.pathname.includes("admin") || url.pathname.includes("yabisa-data") || url.pathname.includes("logo-yabisa") || url.pathname.includes("admin-icon");
  if (!isAdminAsset) return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(ADMIN_CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
