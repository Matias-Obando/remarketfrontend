<template>
  <ion-page>
    <!-- ✅ añadimos clase register-content para centrar SOLO en desktop -->
    <ion-content fullscreen class="register-content">
      <!-- ✅ Fondo con imagen SOLO desktop (en móvil está apagado por CSS) -->
      <div class="bg-deco" aria-hidden="true"></div>

      <!-- ✅ Tus bolas moradas (móvil). En desktop las apagamos por CSS -->
      <div class="bg-top"></div>
      <div class="bg-bottom"></div>

      <!-- ✅ añadimos clase register-card: en desktop se convierte en "card" centrada -->
      <div class="container ion-padding register-card">
        <h1 class="title">Crear cuenta</h1>

        <div class="form">
          <ion-item class="pill" lines="none">
            <ion-icon :icon="person" slot="start" class="icon" />
            <ion-input v-model="username" placeholder="Usuario" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="lockClosed" slot="start" class="icon" />
            <ion-input v-model="password" type="password" placeholder="Contraseña" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="mail" slot="start" class="icon" />
            <ion-input v-model="email" type="email" placeholder="Correo" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="call" slot="start" class="icon" />
            <ion-input v-model="phone" type="tel" placeholder="Móvil" />
          </ion-item>

          <!-- Botón estilo "Crear + flecha" -->
          <ion-button expand="block" class="btn" @click="doRegister">
            CREAR
          </ion-button>

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
  person,
  lockClosed,
  mail,
  call,
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
  localStorage.setItem('loggedIn', 'true')
  router.replace('/app/tabs/tab1')
}

function goLogin() {
  router.replace('/login')
}
</script>

<style scoped>
/* =========================
   ✅ BASE (MÓVIL TAL CUAL)
   ========================= */

/* Fondo decorativo (tus bolas) */
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
  --background: transparent;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  overflow: hidden;
}
:deep(.pill::part(native)){
  background: #ffffff;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 6px 14px rgba(0,0,0,0.06);
}
:deep(.pill.ion-focused::part(native)){
  border-color: rgba(91,45,255,0.45);
  box-shadow: 0 8px 18px rgba(91,45,255,0.18);
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

/* =========================
   ✅ DESKTOP ONLY (SIN TOCAR MÓVIL)
   ========================= */

/* ion-content (solo para anclar el fondo) */
.register-content{
  position: relative;
}

/* Por defecto (móvil): NO cambiamos layout */
:deep(.register-content::part(scroll)){
  display: block;
}

/* Fondo con imagen: por defecto APAGADO (móvil) */
.bg-deco{
  display:none;
}

@media (min-width: 768px){

  /* ✅ CLAVE: el scroll debe medir toda la pantalla para centrar bien */
  :deep(.register-content::part(scroll)){
    height: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }

  /* Apagamos tus bolas en desktop */
  .bg-top,
  .bg-bottom{
    display:none;
  }

  /* Encendemos imagen de fondo SOLO desktop */
  .bg-deco{
    display:block;
    position:absolute;
    inset: 0;
    z-index: 1;

    background-image:
      linear-gradient(180deg,
        rgba(255,255,255,0.65) 0%,
        rgba(255,255,255,0.90) 60%,
        rgba(255,255,255,1) 100%
      ),
      url("/src/assets/imagenLogin.jpg");

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* ✅ Card centrada y más ALTA (crece vertical) */
  .register-card{
    position: relative;
    z-index: 2;

    max-width: 640px;
    width: 100%;
    min-height: 720px;         /* 👈 vertical */
    padding: 52px 34px;        /* 👈 más alto visual */

    background: rgba(255,255,255,0.95);
    border-radius: 22px;
    box-shadow: 0 18px 45px rgba(0,0,0,0.10);
    backdrop-filter: blur(6px);

    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  /* Evita que el container fuerce 100% en desktop */
  .container:not(.register-card){
  min-height: auto;
  width: 100%;
}
.btn{
  height: 48px;
  /* ANCHO del botón */
  max-width: 320px;
  width: 100%;
  /* centrado */
  margin: 16px auto 0;
  font-size: 15px;
  letter-spacing: 0.5px;

  --border-radius: 999px;
}

}
</style>


