self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        // List of URLs to cache
        "/",
        "/index.html",
        "/style.css",
        "/spidermix.min.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith("chrome-extension")) {
    return; // Ignore chrome-extension URLs
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
