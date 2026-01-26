<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Tarjeta usuario -->
      <ion-card class="profileCard">
        <ion-card-content class="profileRow">
          <div class="avatar">
            <ion-icon :icon="person" />
          </div>

          <div class="info">
            <h2 class="name">{{ name }}</h2>
            <p class="email">{{ email }}</p>
          </div>
        </ion-card-content>
      </ion-card>

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

      <!-- Desarrollo -->
      <ion-list-header>Desarrollo</ion-list-header>
      <ion-list inset>
        <ion-item>
          <ion-label>Forzar modo “usuario nuevo”</ion-label>
          <ion-toggle v-model="devForceLogin" />
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
  IonCard,
  IonCardContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonListHeader,
  IonToggle,
} from '@ionic/vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { person, heart, pricetag, helpCircle } from 'ionicons/icons'

const router = useRouter()

// Datos fake (luego si quieres los guardamos al registrarte)
const name = ref('Matías Obando')
const email = ref('matias@gmail.com')

// DEV: guardar preferencia
const DEV_KEY = 'dev_force_login'
const devForceLogin = ref(localStorage.getItem(DEV_KEY) === 'true')

watch(devForceLogin, (v) => {
  localStorage.setItem(DEV_KEY, String(v))
})

function goFavorites() {
  router.push('/tabs/favorites')
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
.profileCard{
  margin-top: 10px;
}
.profileRow{
  display:flex;
  align-items:center;
  gap: 14px;
}
.avatar{
  width: 58px;
  height: 58px;
  border-radius: 999px;
  background: #f2f2f2;
  display:flex;
  justify-content:center;
  align-items:center;
}
.avatar ion-icon{
  font-size: 28px;
  opacity: .6;
}
.name{
  margin: 0;
  font-weight: 800;
}
.email{
  margin: 2px 0 0 0;
  opacity: .7;
}
.logout{
  margin-top: 16px;
  --border-radius: 999px;
  height: 48px;
}
</style>
