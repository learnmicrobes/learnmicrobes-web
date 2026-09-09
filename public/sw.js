/*
 * Learn Microbes service worker.
 *
 * Bump CACHE_VERSION whenever the caching strategy below changes. Note that a
 * deploy does NOT require a bump: build output under /static/ is content-hashed
 * by the bundler, so a new release produces new URLs that miss the cache
 * naturally. Everything else is served stale-while-revalidate, so it self-heals
 * within a single visit instead of pinning users to an old build.
 */
const CACHE_VERSION = 'v3';
const SHELL_CACHE = `learn-microbes-shell-${CACHE_VERSION}`;
const ASSET_CACHE = `learn-microbes-assets-${CACHE_VERSION}`;
const CURRENT_CACHES = [SHELL_CACHE, ASSET_CACHE];

const OFFLINE_FALLBACK = '/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll([OFFLINE_FALLBACK]))
      // A failed precache must not block installation of an otherwise good worker.
      .catch(() => undefined)
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => !CURRENT_CACHES.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

// Content-hashed build output. These URLs change every release, so serving them
// from cache can never go stale.
const isHashedBuildAsset = (url) => url.pathname.startsWith('/static/');

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Never touch cross-origin traffic: Supabase, analytics, fonts, CDNs.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Navigations are network-first so a released build reaches people immediately,
  // with the cached shell only as an offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined);
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_FALLBACK)))
    );
    return;
  }

  if (isHashedBuildAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined);
        }
        return response;
      }))
    );
    return;
  }

  // Everything else same-origin (manifest, icons, images, JSON) is
  // stale-while-revalidate: fast from cache, refreshed in the background so the
  // next load is current even though the URL never changes.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined);
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});

// Lets the page ask a waiting worker to take over immediately.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
