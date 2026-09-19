// Este arquivo precisa ficar na RAIZ do site (mesmo nível do index.html).
// É ele que recebe as notificações push quando o site NÃO está aberto.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Mesma config usada no index.html
firebase.initializeApp({
  apiKey: "AIzaSyBJTHw5vQuZ4Xc2zUELtl9OPUDdp_ukxMQ",
  authDomain: "pillguard-adeec.firebaseapp.com",
  projectId: "pillguard-adeec",
  storageBucket: "pillguard-adeec.firebasestorage.app",
  messagingSenderId: "535386021906",
  appId: "1:535386021906:web:d31e3e67cdbb1d6d1b38cb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Alerta de remédio';
  const options = {
    body: payload.notification?.body || 'Um alarme não foi confirmado.',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png'
  };
  self.registration.showNotification(title, options);
});