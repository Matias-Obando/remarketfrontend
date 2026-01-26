<template>
  <ion-page>
    <ion-content fullscreen>
      <!-- Fondo con formas moradas simple pendiente de mejoras -->
      <div class="bg-top"></div>
      <div class="bg-bottom"></div>

      <div class="container ion-padding">
        <h1 class="title">Crear cuenta</h1>

        <div class="form">
          <ion-item class="pill" lines="none">
            <ion-icon :icon="personOutline" slot="start" class="icon" />
            <ion-input v-model="username" placeholder="Usuario" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="lockClosedOutline" slot="start" class="icon" />
            <ion-input v-model="password" type="password" placeholder="Contraseña" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="mailOutline" slot="start" class="icon" />
            <ion-input v-model="email" type="email" placeholder="Correo" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="callOutline" slot="start" class="icon" />
            <ion-input v-model="phone" type="tel" placeholder="Móvil" />
          </ion-item>

          <!-- Botonn estilo "Crear + flecha" -->
          <div class="create-row">
            <div class="create-text">Crear</div>
            <ion-button class="circle-btn" @click="doRegister">
              <ion-icon :icon="arrowForwardOutline" />
            </ion-button>
          </div>

          <p class="social-text">Crea una cuenta usando las redes sociales</p>

          <div class="social">
            <ion-button class="social-btn" fill="solid">
              <ion-icon :icon="logoFacebook" />
            </ion-button>
            <ion-button class="social-btn" fill="solid">
              <ion-icon :icon="logoTwitter" />
            </ion-button>
            <ion-button class="social-btn" fill="solid">
              <ion-icon :icon="logoGoogle" />
            </ion-button>
          </div>

          <ion-button fill="clear" class="back" @click="goLogin">
            Volver a login
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent, IonItem, IonInput, IonButton, IonIcon
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  personOutline,
  lockClosedOutline,
  mailOutline,
  callOutline,
  arrowForwardOutline,
  logoFacebook,
  logoTwitter,
  logoGoogle
} from 'ionicons/icons'

const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')
const phone = ref('')

function doRegister() {
  // Registro simulado: guardamos sesion y entramos
  localStorage.setItem('loggedIn', 'true')
  router.replace('/tabs/tab1')
}

function goLogin() {
  router.replace('/login')
}
</script>

<style scoped>
/* Fondo decorativo imitación del Figma  */
.bg-top{
  position:absolute;
  top:-120px;
  left:-120px;
  width: 260px;
  height: 260px;
  background: var(--ion-color-primary);
  border-radius: 50%;
  opacity: 0.95;
}
.bg-bottom{
  position:absolute;
  bottom:-140px;
  left:-140px;
  width: 320px;
  height: 320px;
  background: var(--ion-color-primary);
  border-radius: 50%;
  opacity: 0.95;
}

.container{
  position: relative;
  min-height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.title{
  text-align:center;
  margin: 0 0 22px 0;
  font-weight: 800;
  font-size: 32px;
}

.form{
  display:flex;
  flex-direction:column;
  gap: 14px;
}

.pill{
  --background: #ffffff;
  --border-radius: 999px;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.10);
}

.icon{
  font-size: 20px;
  opacity: 0.55;
}

.create-row{
  margin-top: 10px;
  display:flex;
  justify-content:center;
  align-items:center;
  gap: 14px;
}

.create-text{
  font-size: 28px;
  font-weight: 700;
}

.circle-btn{
  --border-radius: 999px;
  width: 52px;
  height: 52px;
}

.social-text{
  text-align:center;
  opacity: 0.75;
  margin: 18px 0 6px 0;
}

.social{
  display:flex;
  justify-content:center;
  gap: 14px;
}

.social-btn{
  --border-radius: 999px;
  width: 44px;
  height: 44px;
}

.back{
  margin-top: 6px;
  align-self:center;
}
</style>
