import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles.css';
import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

/*
 * Register the service worker for PWA / offline support.
 *
 * Production only. In development the bundler serves unhashed URLs such as
 * /static/js/bundle.js, so a cached copy would shadow every code change and make
 * it look like edits are not taking effect.
 */
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // When an updated worker finishes installing, activate it and reload once
      // so returning visitors are not left running the previous release.
      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;

        if (!installing) {
          return;
        }

        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            installing.postMessage('SKIP_WAITING');
          }
        });
      });
    }).catch(() => {
      // Offline support is an enhancement; the app works without it.
    });
  });

  let hasReloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hasReloaded) {
      return;
    }

    hasReloaded = true;
    window.location.reload();
  });
} else if ('serviceWorker' in navigator) {
  // Clean up any worker left registered from a previous production visit or an
  // earlier build, so local development is never served from its cache.
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => registrations.forEach((registration) => registration.unregister()))
    .catch(() => undefined);

  if (typeof caches !== 'undefined') {
    caches.keys()
      .then((keys) => keys.forEach((key) => caches.delete(key)))
      .catch(() => undefined);
  }
}
