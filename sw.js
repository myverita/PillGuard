// Service worker mínimo — necessário para o iOS considerar o site "instalável" como PWA.
// Pode ser expandido depois para cache offline se quiser.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Passa direto para a rede. Adicione cache aqui se quiser suporte offline.
});
