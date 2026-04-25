importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const CACHE_NAME = 'stark-rem-v1';
const ASSETS = ['./', './index.html', './app.js'];

// Inicializar Firebase en el SW
firebase.initializeApp({
    apiKey: "TU_API_KEY_AQUI",
    projectId: "data-os-db30b",
    messagingSenderId: "149593183974"
});

const messaging = firebase.messaging();

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Manejo de Notificaciones
messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3209/3209260.png'
    });
});
