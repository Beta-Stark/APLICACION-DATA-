const CACHE_NAME = 'taskeng-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Escucha mensajes del HTML para mostrar notificaciones programadas
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_NOTIF') {
        const { title, body, delay } = event.data;
        
        setTimeout(() => {
            self.registration.showNotification(title, {
                body: body,
                icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
                vibrate: [200, 100, 200]
            });
        }, delay);
    }
});

// Hacer que al tocar la notificación se abra la App
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('/');
        })
    );
});
