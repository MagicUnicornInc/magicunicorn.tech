const CACHE_NAME = 'magic-unicorn-tech-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/styles/index.css',
  '/src/images/unicorn.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
