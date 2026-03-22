// serviceWorkerRegistration.js

// Detect if we are on localhost
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

/**
 * Register the service worker
 */
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is localhost. Check if the service worker exists.
        checkValidServiceWorker(swUrl);
      } else {
        // Not localhost. Just register.
        registerValidSW(swUrl);
      }
    });
  }
}

/**
 * Register a valid service worker
 */
function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registered:', registration);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('New content available; please refresh.');
              } else {
                console.log('Content cached for offline use.');
              }
            }
          };
        }
      };
    })
    .catch((error) => {
      console.error('SW registration failed:', error);
    });
}

/**
 * Check if service worker exists (only for localhost)
 */
function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType && !contentType.includes('javascript'))
      ) {
        // Service worker missing or wrong MIME type. Unregister
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Register normally
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

/**
 * Unregister the service worker
 */
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => console.error(error));
  }
}
