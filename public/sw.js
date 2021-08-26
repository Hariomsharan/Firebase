const CACHE_NAME = "REACT:FIREBASE:PWA:VERSION:1";

const self = this;

self.addEventListener("install", (event) => {
  event.waitUntill(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        "/css/bootstrap.min.css",
        "/js/jquery-3.5.1.min.js",
        "/js/bootstrap.bundle.min.js",
        "/js/bootstrap.bundle.js", 
        "/static/js/main.chunk.js",
        "static/js/vendors~main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/index.html",
        "/firestore",
        "/auth",
        "/",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  const cacheList = [];
  cacheList.push(CACHE_NAME);
  event.waitUntill(
    caches.keys().then((cacheName) =>
      Promise.all(
        cacheName.map((cacheName) => {
          if (!cacheList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
