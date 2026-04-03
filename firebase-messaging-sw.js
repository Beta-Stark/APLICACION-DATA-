importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDlmtpUfYjs33qa9tLE7Fv2C5yszSZEnUw",
    projectId: "data-os-db30b",
    messagingSenderId: "149593183974",
    appId: "1:149593183974:web:e588fbee9a618e21980d27"
});

const messaging = firebase.messaging();

// Este evento detecta cuando llega una notificación mientras la app está cerrada
messaging.onBackgroundMessage((payload) => {
    console.log('Notificación en segundo plano recibida:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png' // Asegúrate de tener un icono o cámbialo por una URL
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
