const CACHE_NAME = 'postpilot-v1';
const STATIC_ASSETS = [
  '/logo.png',
  '/favicon.svg',
  '/landing-bg.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  // Network-first for API/Convex calls
  if (request.url.includes('convex') || request.url.includes('clerk')) return;

  // Cache-first for static assets
  if (STATIC_ASSETS.some((asset) => request.url.endsWith(asset))) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
    return;
  }

  // Network-first for everything else (HTML, JS, CSS)
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
