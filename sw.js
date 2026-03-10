self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Escucha mensajes de la App
self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_REMINDER') {
        const { text, delay, time } = event.data;

        // En Android, este timeout es mucho más robusto
        setTimeout(() => {
            const options = {
                body: `Hora: ${time}\n${text}`,
                icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
                vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110],
                data: { url: self.registration.scope },
                requireInteraction: true, // La notificación no se quita hasta que la toques
                tag: 'task-' + time // Evita que se colapsen si hay varias
            };

            self.registration.showNotification('🚀 TaskEng: Recordatorio', options);
        }, delay);
    }
});

// Abrir la app al tocar la notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
