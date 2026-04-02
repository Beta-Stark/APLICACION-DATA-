// firebase-messaging-sw.js

// 1. Importar las librerías necesarias de Firebase (versión compat para PWA)
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// 2. Configuración con tus credenciales exactas
const firebaseConfig = {
    apiKey: "AIzaSyDlmtpUfYjs33qa9tLE7Fv2C5yszSZEnUw",
    authDomain: "data-os-db30b.firebaseapp.com",
    projectId: "data-os-db30b",
    storageBucket: "data-os-db30b.firebasestorage.app",
    messagingSenderId: "149593183974",
    appId: "1:149593183974:web:e588fbee9a618e21980d27",
    measurementId: "G-VT52P7RX7K"
};

// 3. Inicializar Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 4. Manejar notificaciones cuando la app está cerrada o en segundo plano (Android)
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Recibido mensaje en segundo plano: ', payload);

    const notificationTitle = payload.notification.title || "DATA OS - Recordatorio";
    const notificationOptions = {
        body: payload.notification.body || "Tienes una tarea pendiente.",
        icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
        vibrate: [200, 100, 200],
        data: {
            url: payload.data?.url || '/' // Redirige al index al tocar
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 5. Lógica para que al tocar la notificación se abra la web
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});