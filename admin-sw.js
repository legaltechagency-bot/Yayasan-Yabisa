const ADMIN_CACHE = "yabisa-admin-v2";
const ADMIN_ASSETS = [
  "./admin.html",
  "./admin.css",
  "./admin.js",
  "./yabisa-data.js",
  "./admin-manifest.json",
  "./images/logo-yabisa.jpeg",
  "./images/admin-icon-192.png",
  "./images/admin-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(ADMIN_CACHE).then(cache => cache.addAll(ADMIN_ASSETS)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== ADMIN_CACHE).map(key => caches.delete(key))))
  );
});

self.addEventListener("fetch", event => {
  if (!event.request.url.includes("admin") && !event.request.url.includes("yabisa-data") && !event.request.url.includes("logo-yabisa") && !event.request.url.includes("admin-icon")) return;
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
