<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/tabs/chat" />
        </ion-buttons>

        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="chat-content">
      <div class="msgs">
        <div
          v-for="m in messages"
          :key="m.id"
          class="bubble"
          :class="m.from"
        >
          <div class="text">{{ m.text }}</div>
          <div class="meta">{{ m.time }}</div>
        </div>
      </div>
    </ion-content>

    <ion-footer class="composer">
      <ion-toolbar>
        <div class="row">
          <ion-input
            v-model="draft"
            placeholder="Escribe un mensaje…"
            class="input"
            @keyup.enter="send"
          />
          <ion-button class="send" @click="send" :disabled="draft.trim() === ''">
            Enviar
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonFooter, IonInput, IonButton
} from '@ionic/vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

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

  // respuesta simulada del vendedor
  setTimeout(() => {
    messages.value.push({
      id: crypto.randomUUID(),
      from: 'other',
      text: 'Perfecto 👍 ¿Quieres envío o recogida?',
      time: nowHHMM(),
    })
  }, 700)
}
</script>

<style scoped>
.chat-content {
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}

.msgs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 8px;
}

.bubble {
  max-width: 78%;
  padding: 10px 12px;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0,0,0,.06);
}

.bubble .text { font-size: 14px; }
.bubble .meta { font-size: 11px; opacity: .6; margin-top: 4px; }

.bubble.me {
  margin-left: auto;
  background: rgba(91, 24, 254, 0.12);
  border: 1px solid rgba(91, 24, 254, 0.18);
}

.bubble.other {
  margin-right: auto;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
}

.composer .row {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 6px 8px;
}

.input {
  flex: 1;
  background: #fff;
  border-radius: 999px;
  padding-left: 12px;
  border: 1px solid rgba(0,0,0,0.10);
}

.send {
  --border-radius: 999px;
}
</style>
