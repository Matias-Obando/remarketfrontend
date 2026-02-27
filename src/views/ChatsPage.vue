<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="chat-header">
        <ion-title>Chat</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="searchOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="chat-content">
      <div v-if="chats.length === 0" class="empty-state">
        <ion-icon :icon="chatbubblesOutline" class="empty-icon"></ion-icon>
        <h2>Sin conversaciones</h2>
        <p>Cuando alguien te escriba, aparecerá aquí</p>
      </div>

      <div v-else class="chats-container">
        <div class="search-section">
          <ion-searchbar
            v-model="searchQuery"
            placeholder="Buscar conversaciones..."
            :debounce="300"
            class="custom-searchbar"
          ></ion-searchbar>
        </div>

        <div class="chats-list">
          <div
            v-for="c in filteredChats"
            :key="c.id"
            class="chat-item"
            @click="openChat(c.id)"
          >
            <div class="chat-avatar">
              <img :src="c.avatar" :alt="c.name" />
              <div v-if="c.unread" class="unread-badge">{{ c.unread }}</div>
            </div>

            <div class="chat-info">
              <div class="chat-header-row">
                <h3 class="chat-name">{{ c.name }}</h3>
                <span class="chat-time">{{ c.time }}</span>
              </div>
              <p class="chat-message" :class="{ unread: c.unread }">
                {{ c.lastMessage }}
              </p>
            </div>

            <div class="chat-action">
              <ion-button fill="clear" size="small" @click.stop="deleteChat(c.id)">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </div>
          </div>
        </div>
      </div>

      <div class="hint">
        💬 Toca en una conversación para escribir mensajes
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonButton, IonButtons, IonSearchbar
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import {
  searchOutline,
  chatbubblesOutline,
  closeOutline,
} from 'ionicons/icons'

const router = useRouter()
const searchQuery = ref('')

type ChatPreview = {
  id: string
  name: string
  lastMessage: string
  time: string
  avatar: string
  unread?: number
}

const chats = ref<ChatPreview[]>([
  {
    id: 'seller-1',
    name: 'Vendedor Juan',
    lastMessage: 'Sí, sigue disponible 🙂',
    time: '12:10',
    avatar: 'https://i.pravatar.cc/120?img=12',
    unread: 1,
  },
  {
    id: 'seller-2',
    name: 'Vendedora Laura',
    lastMessage: '¿Te interesa envío o recogida?',
    time: 'Ayer',
    avatar: 'https://i.pravatar.cc/120?img=32',
    unread: 0,
  },
])

const filteredChats = computed(() => {
  if (!searchQuery.value) return chats.value
  return chats.value.filter(c =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function openChat(id: string) {
  router.push(`/app/chat/${id}`)
}

function deleteChat(id: string) {
  const index = chats.value.findIndex(c => c.id === id)
  if (index > -1) {
    chats.value.splice(index, 1)
  }
}
</script>

<style scoped>
.chat-header {
  --background: linear-gradient(135deg, #5B18FE 0%);
  --color: #ffffff;
  height: 76px;
  display: flex;
  align-items: center;
}

.chat-header ion-title {
  font-weight: 800;
  font-size: 24px;
}

.chat-header ion-buttons {
  margin-right: 16px;
}

.chat-header ion-button {
  --color: #ffffff;
  font-size: 24px;
}

.chat-content {
  --background: #f8f9fc;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 80px;
  color: #ddd;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h2 {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
}

.empty-state p {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.chats-container {
  padding: 16px;
}

.search-section {
  margin-bottom: 16px;
}

.custom-searchbar {
  --background: #ffffff;
  --border-radius: 12px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chats-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.chat-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.1);
}

.chat-avatar {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.chat-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.unread-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  border: 2px solid #ffffff;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.chat-name {
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.chat-time {
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
  margin-left: 8px;
}

.chat-message {
  font-size: 13px;
  color: #999;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.chat-message.unread {
  color: #666;
  font-weight: 500;
}

.chat-action {
  margin-left: 8px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.chat-item:hover .chat-action {
  opacity: 1;
}

.chat-action ion-button {
  --color: #ff4444;
  --padding-start: 0;
  --padding-end: 0;
}

.hint {
  text-align: center;
  padding: 24px;
  font-size: 13px;
  color: #999;
  margin-top: 16px;
}

@media (max-width: 768px) {
  .chats-container {
    padding: 12px;
  }

  .chat-item {
    padding: 10px 12px;
  }

  .chat-avatar {
    width: 48px;
    height: 48px;
  }

  .chat-action {
    opacity: 1;
  }
}
</style>