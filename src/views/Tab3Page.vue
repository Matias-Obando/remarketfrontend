<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="profile-header">
        <ion-title>Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="profile-content">
      
      <div class="profile-hero">
        <div class="hero-background"></div>
        <div class="hero-content">
          <div class="avatar-container">
            <img
              :src="avatar"
              :alt="name"
              class="avatar"
            />
            <div class="status-badge">✓</div>
          </div>
          <h1 class="hero-name">{{ name }}</h1>
          <div class="hero-rating">
            <span class="stars">★★★★☆</span>
            <span class="rating-text">4.8 • 147 reseñas</span>
          </div>
          <p class="hero-email">{{ email }}</p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">23</span>
              <span class="stat-label">Productos</span>
            </div>
            <div class="stat">
              <span class="stat-value">450</span>
              <span class="stat-label">Seguidores</span>
            </div>
            <div class="stat">
              <span class="stat-value">98%</span>
              <span class="stat-label">Positivas</span>
            </div>
          </div>
        </div>
      </div>

      
      <div class="action-buttons">
        <ion-button
          expand="block"
          class="action-btn primary"
          @click="showAlert('Mis productos')"
        >
          <ion-icon :icon="pricetag"></ion-icon>
          Mis productos
        </ion-button>
        <ion-button
          expand="block"
          class="action-btn secondary"
          @click="goFavorites"
        >
          <ion-icon :icon="heart"></ion-icon>
          Mis favoritos
        </ion-button>
      </div>

      
      <div class="menu-section">
        <div class="section-title">Cuenta</div>
        <div class="menu-items">
          <button class="menu-item" @click="showAlert('Editar perfil')">
            <div class="menu-item-icon">
              <ion-icon :icon="personOutline"></ion-icon>
            </div>
            <div class="menu-item-info">
              <div class="menu-item-title">Editar perfil</div>
              <div class="menu-item-subtitle">Nombre, foto, descripción</div>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-item-arrow"></ion-icon>
          </button>

          <button class="menu-item" @click="editLocation">
            <div class="menu-item-icon">
              <ion-icon :icon="locationOutline"></ion-icon>
            </div>
            <div class="menu-item-info">
              <div class="menu-item-title">Ubicación</div>
              <div class="menu-item-subtitle">{{ location }}</div>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-item-arrow"></ion-icon>
          </button>

          <button class="menu-item" @click="showAlert('Ayuda y soporte')">
            <div class="menu-item-icon">
              <ion-icon :icon="helpCircleOutline"></ion-icon>
            </div>
            <div class="menu-item-info">
              <div class="menu-item-title">Ayuda y soporte</div>
              <div class="menu-item-subtitle">Preguntas frecuentes</div>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-item-arrow"></ion-icon>
          </button>
        </div>
      </div>

      
      <div class="menu-section">
        <div class="section-title">Configuración</div>
        <div class="menu-items">
          <button class="menu-item" @click="showAlert('Notificaciones')">
            <div class="menu-item-icon">
              <ion-icon :icon="notificationsOutline"></ion-icon>
            </div>
            <div class="menu-item-info">
              <div class="menu-item-title">Notificaciones</div>
              <div class="menu-item-subtitle">Gestionar alertas</div>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-item-arrow"></ion-icon>
          </button>

          <button class="menu-item" @click="showAlert('Privacidad y seguridad')">
            <div class="menu-item-icon">
              <ion-icon :icon="shieldOutline"></ion-icon>
            </div>
            <div class="menu-item-info">
              <div class="menu-item-title">Privacidad y seguridad</div>
              <div class="menu-item-subtitle">Contraseña, 2FA</div>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-item-arrow"></ion-icon>
          </button>
        </div>
      </div>

      
      <div class="logout-section">
        <ion-button expand="block" class="logout-btn" @click="logout">
          <ion-icon :icon="logOutOutline"></ion-icon>
          Cerrar sesión
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonButtons,
  alertController,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  settingsOutline,
  pricetag,
  heart,
  personOutline,
  locationOutline,
  helpCircleOutline,
  chevronForwardOutline,
  notificationsOutline,
  shieldOutline,
  logOutOutline,
} from 'ionicons/icons'

const router = useRouter()

const name = ref('Matías Obando')
const email = ref('matias@gmail.com')
const avatar = ref('https://i.pravatar.cc/160?img=11')
const location = ref('Barcelona, España')

async function showAlert(message: string) {
  const alert = await alertController.create({
    header: message,
    message: `Estamos trabajando en esto. ¡Pronto estará disponible!`,
    buttons: [
      {
        text: 'Aceptar',
        role: 'confirm',
        handler: () => {},
      },
    ],
    cssClass: 'custom-alert',
  })

  await alert.present()
}

function editLocation() {
  router.push('/app/map')
}

function goFavorites() {
  router.push('/app/tabs/favorites')
}

function logout() {
  localStorage.removeItem('loggedIn')
  router.replace('/login')
}
</script>

<style scoped>
.profile-header {
  --background: linear-gradient(135deg, #5B18FE 0%);
  --color: #ffffff;
  height: 76px;
  display: flex;
  align-items: center;
}

.profile-header ion-title {
  font-weight: 800;
  font-size: 24px;
}

.profile-header ion-button {
  --color: #ffffff;
}

.profile-content {
  --background: #f8f9fc;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 100px;
}


.profile-hero {
  position: relative;
  padding-bottom: 24px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(135deg, #a5a5a5 0%, #111011 100%);
}

.hero-content {
  position: relative;
  text-align: center;
  padding: 40px 24px 24px 24px;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ffffff;
  box-shadow: 0 8px 24px rgba(91, 24, 254, 0.3);
}

.status-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 3px solid #ffffff;
  font-weight: 700;
}

.hero-name {
  font-size: 28px;
  font-weight: 800;
  color: #333;
  margin: 0 0 8px 0;
}

.hero-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stars {
  font-size: 18px;
  color: #f6c343;
  letter-spacing: 2px;
}

.rating-text {
  font-size: 13px;
  color: #999;
}

.hero-email {
  font-size: 14px;
  color: #999;
  margin: 0 0 20px 0;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: #5B18FE;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}


.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 16px 24px 16px;
}

.action-btn {
  --border-radius: 12px;
  height: 48px;
  font-weight: 700;
  font-size: 14px;
}

.action-btn.primary {
  --background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  --color: #ffffff;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.2);
}

.action-btn.secondary {
  --background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  --color: #ffffff;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.2);
}


.menu-section {
  padding: 0 16px 24px 16px;
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-left: 4px;
}

.menu-items {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border: none;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background: #f8f9fc;
}

.menu-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(91, 24, 254, 0.1);
  border-radius: 10px;
  color: #5B18FE;
  font-size: 20px;
  flex-shrink: 0;
}

.menu-item-info {
  flex: 1;
  text-align: left;
}

.menu-item-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.menu-item-subtitle {
  font-size: 13px;
  color: #999;
  margin-top: 2px;
}

.menu-item-arrow {
  color: #ddd;
  font-size: 20px;
}

.logout-section {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.logout-btn {
  --background: #ff4444;
  --border-radius: 12px;
  height: 48px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.2);
  max-width: 300px;
  width: 100%;
}

@media (max-width: 768px) {
  .action-buttons {
    gap: 10px;
    padding: 0 12px 20px 12px;
  }

  .menu-section {
    padding: 0 12px 20px 12px;
  }

  .hero-name {
    font-size: 24px;
  }

  .hero-stats {
    gap: 12px;
    padding: 12px;
  }
}
</style>