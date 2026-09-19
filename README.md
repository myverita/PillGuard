# Caixa de Remédios — site (PWA)

## O que tem aqui
- `index.html` — página com o histórico de alarmes (tempo real via Firestore) e botão de ativar notificações
- `manifest.json` — permite "Adicionar à Tela de Início" no iOS/Android
- `sw.js` — service worker básico, necessário para instalação como PWA
- `firebase-messaging-sw.js` — recebe as notificações push em background
- `icons/` — ícones placeholder (troque pelos seus depois)

## 1. Configure o Firebase
1. Crie um projeto em https://console.firebase.google.com
2. Ative o **Firestore** (modo produção, região `southamerica-east1` se quiser)
3. Em **Project settings → General → Your apps**, crie um "Web app" e copie o objeto de config
4. Cole essa config em **dois lugares**: `index.html` (variável `firebaseConfig`) e `firebase-messaging-sw.js`
5. Em **Project settings → Cloud Messaging**, gere uma **Web Push certificate (VAPID key)** e cole em `index.html` na variável `VAPID_KEY`

## 2. Estrutura de dados esperada no Firestore
```
alarmes (coleção)
  {id}:
    horario_programado: timestamp
    horario_confirmacao: timestamp | null
    status: "pending" | "taken" | "missed"

dispositivos (coleção)
  caixa-remedio:
    fcm_token: string   ← preenchido automaticamente pelo site quando o usuário ativa notificações
```

## 3. Hospedagem
O jeito mais simples é o **Firebase Hosting** (grátis, HTTPS automático — necessário para push funcionar):
```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # aponte para esta pasta
firebase deploy
```
Isso te dá uma URL tipo `https://seu-projeto.web.app`.

## 4. Instalar no iOS
Notificação em background **só funciona no iPhone se o site for instalado na tela de início**:
1. Abra a URL no Safari (precisa ser Safari, não Chrome)
2. Toque em Compartilhar → **Adicionar à Tela de Início**
3. Abra o app pela tela de início (não pelo Safari) e toque em "Ativar notificações"

## 5. Próximos passos
- Trocar os ícones em `icons/` pelos seus
- Escrever a Cloud Function que lê `alarmes`, espera o tempo de tolerância, e manda push pro `fcm_token` salvo em `dispositivos/caixa-remedio` quando o status continuar `pending`
- Fazer o ESP32 gravar em `alarmes` via HTTPS (REST do Firestore, ou uma Cloud Function HTTP sua)
