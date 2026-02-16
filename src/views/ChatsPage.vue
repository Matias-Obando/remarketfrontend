<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Chat</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list inset>
        <ion-item
          v-for="c in chats"
          :key="c.id"
          button
          @click="openChat(c.id)"
        >
          <ion-avatar slot="start">
            <img :src="c.avatar" alt="avatar" />
          </ion-avatar>

          <ion-label>
            <h2>{{ c.name }}</h2>
            <p>{{ c.lastMessage }}</p>
          </ion-label>

          <ion-note slot="end" class="time">{{ c.time }}</ion-note>
        </ion-item>
      </ion-list>

      <div class="hint ion-padding">
        (Simulado) Entra en uno y escribe mensajes.
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonAvatar, IonNote
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

type ChatPreview = {
  id: string
  name: string
  lastMessage: string
  time: string
  avatar: string
}

const chats = ref<ChatPreview[]>([
  {
    id: 'seller-1',
    name: 'Vendedor Juan',
    lastMessage: 'Sí, sigue disponible 🙂',
    time: '12:10',
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    id: 'seller-2',
    name: 'Vendedora Laura',
    lastMessage: '¿Te interesa envío o recogida?',
    time: 'Ayer',
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
])

function openChat(id: string) {
  router.push(`/app/chat/${id}`)
}
</script>

<style scoped>
.time { opacity: .6; font-size: 12px; }
.hint { opacity: .6; text-align: center; }
</style>
