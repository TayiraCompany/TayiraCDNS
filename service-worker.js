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
  // Skip chrome-extension requests and other unsupported schemes
  if (
    event.request.url.startsWith("chrome-extension") ||
    event.request.url.startsWith("file:") ||
    event.request.url.startsWith("data:") ||
    event.request.url.startsWith("about:")
  ) {
    return; // Ignore unsupported schemes
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        return caches.open("my-cache").then((cache) => {
          // Cache valid HTTP/HTTPS responses
          if (event.request.url.startsWith("http")) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    })
  );
});
