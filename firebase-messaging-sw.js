importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDlmtpUfYjs33qa9tLE7Fv2C5yszSZEnUw",
    authDomain: "data-os-db30b.firebaseapp.com",
    projectId: "data-os-db30b",
    storageBucket: "data-os-db30b.firebasestorage.app",
    messagingSenderId: "149593183974",
    appId: "1:149593183974:web:e588fbee9a618e21980d27",
    measurementId: "G-VT52P7RX7K"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
        data: { url: payload.data?.url || '/APLICACION-DATA-/' }
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
