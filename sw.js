// Este archivo permite que la App funcione offline y gestione notificaciones
self.addEventListener('push', function(event) {
    const options = {
        body: event.data.text(),
        icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png'
    };
    event.waitUntil(
        self.registration.showNotification('Recordatorio de Ingeniería', options)
    );
});
