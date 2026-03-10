self.addEventListener('install', (event) => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Escucha el evento de programar
self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_REMINDER') {
        const { text, delay } = event.data;
        
        // El Service Worker intenta mantener vivo el timer
        setTimeout(() => {
            self.registration.showNotification("🔔 Recordatorio TaskEng", {
                body: text,
                icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
                vibrate: [200, 100, 200],
                requireInteraction: true,
                tag: 'remind-' + Date.now()
            });
        }, delay);
    }
});
