<template>
  <ion-page>
    <ion-content fullscreen class="ion-padding">
      <div class="wrap">
        
        <h1 class="title">Bienvenido</h1>

        <h3 class="subtitle">Registra tu cuenta</h3>

        <div class="form">
          <ion-item class="pill" lines="none">
            <ion-icon :icon="personOutline" slot="start" class="icon" />
            <ion-input v-model="user" placeholder="Usuario o correo" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="lockClosedOutline" slot="start" class="icon" />
            <ion-input v-model="pass" type="password" placeholder="Contraseña" />
          </ion-item>

          <ion-button expand="block" class="btn" @click="doLogin">
            Entrar
          </ion-button>

          <div class="links">
            <ion-button fill="clear" size="small" @click="goForgot">
              ¿Olvidaste la contraseña?
            </ion-button>

            <ion-button fill="clear" size="small" @click="goRegister">
              Crear cuenta
            </ion-button>
          </div>
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
import { personOutline, lockClosedOutline } from 'ionicons/icons'

const router = useRouter()
const user = ref('')
const pass = ref('')

function doLogin() {
  localStorage.setItem('loggedIn', 'true')
  router.replace('/tabs/tab1')
}

function goRegister() {
  router.push('/register') // si aún no existe, luego la creamos!!!!!
}
function goForgot() {
  router.push('/forgot')   // si aún no existe, luego la creamos!!!!!
}
</script>

<style scoped>
.wrap{
  min-height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap: 18px;
}

.title{
  text-align:center;
  margin: 0 0 10px 0;
  font-weight: 700;
}
.subtitle{
  text-align:center;
  margin: 30px 0 10px 0;
  font-weight: 700;
}
.form{
  display:flex;
  flex-direction:column;
  gap: 14px;
}

.pill{
  --background: #f3f3f3;
  --border-radius: 999px;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
}

.icon{
  font-size: 20px;
  opacity: 0.55;
}

.btn{
  --border-radius: 999px;
  height: 48px;
}
.links{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap: 2px;
  margin-top: 6px;
}
</style>
