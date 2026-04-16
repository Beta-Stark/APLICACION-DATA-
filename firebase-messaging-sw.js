importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// Configuración de Firebase (Versión Compat para Service Workers)
firebase.initializeApp({
    apiKey: "AIzaSyDlmtpUfYjs33qa9tLE7Fv2C5yszSZEnUw",
    authDomain: "data-os-db30b.firebaseapp.com",
    projectId: "data-os-db30b",
    storageBucket: "data-os-db30b.firebasestorage.app",
    messagingSenderId: "149593183974",
    appId: "1:149593183974:web:e588fbee9a618e21980d27"
});

const messaging = firebase.messaging();

// Manejador de mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Mensaje recibido en segundo plano: ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png' // Puedes cambiar esto por tu logo
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
