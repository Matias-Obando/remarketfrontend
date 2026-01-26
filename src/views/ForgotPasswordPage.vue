<template>
  <ion-page>
    <ion-content fullscreen>
      <div class="container ion-padding">
        <ion-button fill="clear" class="back" @click="goLogin">
          <ion-icon :icon="arrowBackOutline" />
        </ion-button>

        <h1 class="title">Recuperar contraseña</h1>
        <p class="subtitle">
          Introduce tu correo y te enviaremos un código (simulado).
        </p>

        <ion-item class="pill" lines="none">
          <ion-icon :icon="mailOutline" slot="start" class="icon" />
          <ion-input v-model="email" type="email" placeholder="Correo" />
        </ion-item>

        <ion-button expand="block" class="btn" @click="sendCode">
          Enviar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent, IonButton, IonIcon, IonItem, IonInput
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { arrowBackOutline, mailOutline } from 'ionicons/icons'

const router = useRouter()
const email = ref('')

function goLogin() {
  router.replace('/login')
}

function sendCode() {
  // Simulación no backend !!

  alert('Código enviado (simulado).')
  router.replace('/login')
}
</script>

<style scoped>
.container{
  min-height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap: 14px;
}
.back{
  position: absolute;
  top: 10px;
  left: 6px;
}
.title{
  text-align:center;
  margin: 0;
  font-weight: 800;
  font-size: 28px;
}
.subtitle{
  text-align:center;
  opacity: .75;
  margin: 0 0 10px 0;
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
.btn{
  --border-radius: 999px;
  height: 48px;
  margin-top: 6px;
}
</style>
