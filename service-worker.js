const CACHE_NAME = 'spidermix-cache-v1';

// قائمة الموارد الأساسية التي تريد تخزينها مؤقتًا
const RESOURCES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

// أثناء تثبيت الـ Service Worker، قم بتخزين الموارد المحددة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(RESOURCES_TO_CACHE);
    })
  );
});

// أثناء تفعيل الـ Service Worker، قم بإزالة الكاشات القديمة
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// التعامل مع طلبات الشبكة، إما من الكاش أو من الشبكة إذا لم يكن في الكاش
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => {
      return new Response('حدث خطأ في الشبكة.');
    })
  );
});
