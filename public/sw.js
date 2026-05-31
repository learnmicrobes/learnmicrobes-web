const CACHE_NAME = 'learn-microbes-cache-v2';

// Install event: cache root
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Pre-cache root to ensure offline start works immediately
      return cache.addAll(['/']);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Network-first for navigation, Cache-first for assets
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // For navigation requests (like going to / or /guides), try network first, then cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            // Fallback to root if specific route not found in cache
            return caches.match('/');
          });
        })
    );
    return;
  }

  // For static assets (JS, CSS, data), try cache first, then network
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(response => {
        // Don't cache non-success responses or opaque responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cache successful fetch
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Network failed and not in cache. Do nothing, app will handle empty data
      });
    })
  );
});
