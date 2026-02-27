<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="chat-thread-header">
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/tabs/chat" />
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="chat-main-container">
      <div class="messages-wrapper">
        <div v-if="messages.length === 0" class="empty-state">
          <ion-icon :icon="chatbubbleOutline" class="empty-icon"></ion-icon>
          <p>Sin mensajes aún</p>
        </div>

        <div v-else class="messages">
          <div
            v-for="m in messages"
            :key="m.id"
            class="message-group"
            :class="m.from"
          >
            <div class="message-bubble">
              <p class="message-text">{{ m.text }}</p>
              <span class="message-time">{{ m.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Composer -->
      <div class="message-composer-wrapper">
        <div class="composer-input-wrapper">
          <ion-input
            v-model="draft"
            placeholder="Escribe un mensaje…"
            class="composer-input"
            @keyup.enter="send"
            clearInput
          />
          <button
            class="emoji-btn"
            @click="addEmoji"
            title="Agregar emoji"
          >
            😊
          </button>
        </div>
        <button
          class="send-btn"
          :disabled="draft.trim() === ''"
          @click="send"
          :class="{ active: draft.trim() !== '' }"
        >
          <ion-icon :icon="sendOutline"></ion-icon>
        </button>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonInput, IonButton, IonIcon
} from '@ionic/vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  ellipsisVertical,
  chatbubbleOutline,
  sendOutline,
} from 'ionicons/icons'

const route = useRoute()
const chatId = String(route.params.id ?? 'seller-1')
const productId = route.query.product ? String(route.query.product) : null

const title = computed(() => {
  const base = chatId === 'seller-2' ? 'Vendedora Laura' : 'Vendedor Juan'
  return productId ? `${base} · Prod #${productId}` : base
})

type Msg = { id: string; from: 'me' | 'other'; text: string; time: string }

const messages = ref<Msg[]>([
  { id: '1', from: 'other', text: 'Hola! ¿En qué puedo ayudarte?', time: '12:02' },
  { id: '2', from: 'me', text: 'Hola! ¿Sigue disponible?', time: '12:03' },
  { id: '3', from: 'other', text: 'Sí, sigue disponible 🙂', time: '12:04' },
])

const draft = ref('')

function nowHHMM() {
  const d = new Date()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

function send() {
  const text = draft.value.trim()
  if (!text) return

  messages.value.push({
    id: crypto.randomUUID(),
    from: 'me',
    text,
    time: nowHHMM(),
  })
  draft.value = ''

  setTimeout(() => {
    const messagesEl = document.querySelector('.messages-wrapper')
    if (messagesEl) {
      messagesEl.scrollTop = messagesEl.scrollHeight
    }
  }, 50)

  setTimeout(() => {
    messages.value.push({
      id: crypto.randomUUID(),
      from: 'other',
      text: 'Perfecto 👍 ¿Quieres envío o recogida?',
      time: nowHHMM(),
    })
    setTimeout(() => {
      const messagesEl = document.querySelector('.messages-wrapper')
      if (messagesEl) {
        messagesEl.scrollTop = messagesEl.scrollHeight
      }
    }, 50)
  }, 700)
}

function addEmoji() {
  draft.value += '😊'
}
</script>

<style scoped>
:deep(ion-app) {
  --keyboard-offset: 0;
}

:deep(.ion-page) {
  z-index: 1;
}

.chat-thread-header {
  --background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  --color: #ffffff;
  --border-bottom: none;
  height: 76px;
  display: flex;
  align-items: center;
}

.chat-thread-header ion-title {
  font-weight: 700;
  font-size: 16px;
}

.chat-thread-header ion-back-button {
  --color: #ffffff;
}

.chat-thread-header ion-button {
  --color: #ffffff;
}

.chat-main-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 76px);
  background: #f8f9fc;
}

.messages-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #999;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-group {
  display: flex;
  margin-bottom: 4px;
}

.message-group.me {
  justify-content: flex-end;
}

.message-group.other {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 18px;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.message-group.me .message-bubble {
  background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.message-group.other .message-bubble {
  background: #ffffff;
  color: #333;
  border-bottom-left-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 4px 0;
}

.message-time {
  font-size: 11px;
  opacity: 0.6;
  display: block;
  margin-top: 2px;
}

.message-composer-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 12px;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.composer-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 24px;
  padding: 8px 14px;
  gap: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  min-height: 44px;
}

.composer-input-wrapper:focus-within {
  background: #ffffff;
  border-color: #5B18FE;
  box-shadow: 0 0 0 3px rgba(91, 24, 254, 0.1);
}

.composer-input {
  flex: 1;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  font-size: 15px;
  --color: #333;
  --placeholder-color: #999;
}

.emoji-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-btn:active {
  transform: scale(1.15);
}

.send-btn {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: #f5f5f5;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 20px;
  flex-shrink: 0;
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.send-btn.active {
  background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.3);
}

.send-btn.active:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .message-bubble {
    max-width: 85%;
  }

  .messages-wrapper {
    padding: 12px 8px;
  }

  .message-composer-wrapper {
    padding: 10px;
    gap: 8px;
  }

  .composer-input-wrapper {
    min-height: 40px;
    padding: 6px 12px;
  }
}
</style>