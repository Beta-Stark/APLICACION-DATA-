const CACHE_NAME = 'data-os-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;900&display=swap'
];

// Instalación y Cache de archivos base
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Estrategia: Primero Red, si falla, Caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Escucha de Notificaciones Push
self.addEventListener('push', (e) => {
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968534.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/5968/5968534.png',
    vibrate: [200, 100, 200]
  };
  e.waitUntil(self.registration.showNotification(data.title, options));
});
