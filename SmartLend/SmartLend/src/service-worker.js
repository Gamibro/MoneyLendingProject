/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Take control immediately
clientsClaim();

// 🔹 CRA injects the file list here at build time
precacheAndRoute(self.__WB_MANIFEST);

// 🔹 Cache API calls (example: employees)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 5,
  })
);

// 🔹 Cache static assets (images, css, js)
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// 🔹 Skip waiting on update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
