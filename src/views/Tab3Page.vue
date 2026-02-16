<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding profile-content">
      <!-- Cabecera perfil -->
      <div class="profile-hero">
        <div class="profile-card">
          <div class="hero-avatar">
            <img src="https://i.pravatar.cc/160?img=11" alt="Foto de perfil" />
          </div>

          <div class="hero-name">{{ name }}</div>
          <div class="hero-stars">★★★★☆</div>
          <div class="hero-email">{{ email }}</div>
        </div>
      </div>

      <!-- Opciones -->
      <ion-list inset>
        <ion-item button @click="goMyProducts">
          <ion-icon :icon="pricetag" slot="start" />
          <ion-label>Mis productos</ion-label>
        </ion-item>

        <ion-item button @click="goFavorites">
          <ion-icon :icon="heart" slot="start" />
          <ion-label>Favoritos</ion-label>
        </ion-item>

        <ion-item button @click="goHelp">
          <ion-icon :icon="helpCircle" slot="start" />
          <ion-label>Ayuda</ion-label>
        </ion-item>
      </ion-list>

      <!-- Cerrar sesión -->
      <ion-button expand="block" color="danger" class="logout" @click="logout">
        Cerrar sesión
      </ion-button>
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
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { heart, pricetag, helpCircle } from 'ionicons/icons'

const router = useRouter()

const name = ref('Matías Obando')
const email = ref('matias@gmail.com')

function goFavorites() {
  router.push('app/tabs/favorites')
}

function goMyProducts() {
  alert('Mis productos (pendiente)')
}

function goHelp() {
  alert('Ayuda (pendiente)')
}

function logout() {
  localStorage.removeItem('loggedIn')
  router.replace('/login')
}
</script>

<style scoped>
/* Mantener logout abajo del todo */
.profile-content::part(scroll) {
  display: flex;
  flex-direction: column;
}

/* Botón logout (más discreto) */
.logout {
  margin-top: auto;
  margin-bottom: 16px;
  height: 44px;
  --border-radius: 16px;
  font-size: 14px;
  font-weight: 700;
  max-width: 420px;
  width: calc(100% - 32px);
  margin-left: auto;
  margin-right: auto;
}

/* ===== Cabecera estilo Figma ===== */
.profile-hero {
  display: flex;
  justify-content: center;
  margin: 24px 0 22px 0;
}

.profile-card {
  position: relative;
  background: #f4f4f4;
  border-radius: 20px;
  padding: 24px;
  padding-right: 190px; /* espacio para el avatar a la derecha */
  min-height: 160px;
  max-width: 520px;
  width: 100%;
}

.hero-avatar {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  width: 140px;
  height: 140px;
  border-radius: 999px;
  overflow: hidden;
  background: #ddd;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
}

.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-name {
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 8px;
}

.hero-stars {
  font-size: 16px;
  color: #f6c343;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.hero-email {
  font-size: 15px;
  color: #777;
}

/*Móvil*/
@media (max-width: 600px) {
  .profile-hero {
    margin-top: 40px;
  }

  .profile-card {
    padding: 20px;
    padding-top: 52px;  /* espacio para la foto arriba */
    padding-right: 20px;
    text-align: center;
    max-width: 360px;
  }

  .hero-avatar {
    top: -42px;
    right: 50%;
    transform: translateX(50%);
    width: 96px;
    height: 96px;
  }

  .hero-name {
    font-size: 22px;
  }

  .hero-email {
    font-size: 14px;
  }
}
</style>
