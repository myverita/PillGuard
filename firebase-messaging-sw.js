// Este arquivo precisa ficar na RAIZ do site (mesmo nível do index.html).
// É ele que recebe as notificações push quando o site NÃO está aberto.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Cole a MESMA config usada no index.html
firebase.initializeApp({
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
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
