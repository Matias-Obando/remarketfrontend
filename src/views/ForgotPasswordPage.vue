<template>
  <ion-page>
    <ion-content fullscreen class="forgot-content">
      
      <div class="bg-deco-forgot"></div>

      <ion-button fill="clear" class="back" @click="goLogin">
        <ion-icon :icon="arrowBackOutline" />
      </ion-button>

      <div class="container forgot-card">
        <h1 class="title">Recuperar contraseña</h1>
        <p class="subtitle">
          Introduce tu correo y te enviaremos un codigo de verificación.
        </p>

        <ion-item class="pill" lines="none">
          <ion-icon :icon="mailOutline" slot="start" class="icon" />
          <ion-input v-model="email" type="email" placeholder="Correo" />
        </ion-item>

        <ion-button class="btn" @click="sendCode">
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
  router.replace('/verify')
}
</script>

<style scoped>
/*  MOVIL*/

.forgot-content {
  position: relative;
}

/* FONDO IMAGEN MOVIL*/
.bg-deco-forgot {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.65) 0%,
      rgba(255,255,255,0.90) 60%,
      #ffffff 100%
    ),
    url("/src/assets/imagenLogin.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  position: relative;
  z-index: 2;
  padding: 20px;
  padding-top: 60px;
}

.back {
  position: absolute;
  top: 10px;
  left: 6px;
  z-index: 10;
  --color: #5B18FE;
}

.title {
  text-align: center;
  margin: 0;
  font-weight: 800;
  font-size: 28px;
  color: #1a1a1a;
}

.subtitle {
  text-align: center;
  opacity: 0.75;
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
}

.pill {
  --background: #ffffff;
  --border-radius: 999px;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

:deep(.pill::part(native)) {
  border: 1px solid rgba(0, 0, 0, 0.10);
}

:deep(.pill.ion-focused::part(native)) {
  border-color: #5B18FE;
  box-shadow: 0 4px 16px rgba(91, 24, 254, 0.15);
}

.icon {
  font-size: 20px;
  opacity: 0.55;
  color: #5B18FE;
}

.btn {
  --border-radius: 999px;
  --background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  --color: #ffffff;
  height: 48px;
  margin-top: 6px;
  font-weight: 700;
  box-shadow: none !important;
  --box-shadow: none;
  width: 180px; 
  margin-left: auto;  
  margin-right: auto;  
  display: block;
}

:deep(.btn::part(native)) {
  box-shadow: none !important;
}

/* DESKTOP */

@media (min-width: 768px) {
  .forgot-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
  }

  :deep(.forgot-content::part(scroll)) {
    height: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }

  /* Fondo oscuro  */
  .bg-deco-forgot {
    pointer-events: none;
    background-image:
      linear-gradient(180deg,
        rgba(20, 20, 40, 0.55) 0%,
        rgba(20, 20, 40, 0.78) 100%
      ),
      url("/src/assets/fondocontraseña.jpg");
  }

  /* Card glass */
  .forgot-card {
    position: relative;
    z-index: 2;
    max-width: 700px;
    width: 100%;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 32px;
    padding: 80px 60px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.22);
  }

  .container {
    min-height: auto;
    padding: 0;
    gap: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .back {
    position: absolute;
    top: 30px;
    left: 30px;
    --padding-start: 0;
    --padding-end: 0;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    --color: #fff;
  }

  .title {
    color: #fff;
    font-size: 42px;
    font-weight: 900;
    margin: 0;
    line-height: 1.2;
    text-align: center;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.85);
    opacity: 1;
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    text-align: center;
  }

  .pill {
    --background: rgba(255, 255, 255, 0.95);
    box-shadow: none;
    --min-height: 56px;
    --padding-start: 20px;
    --inner-padding-end: 20px;
    width: 100%;
    max-width: 470px;
  }

  :deep(.pill::part(native)) {
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 22px;
  }

  :deep(.pill ion-input) {
    font-size: 16px;
  }

  .btn {
    height: 50px;
    margin-bottom: 20px;
    font-size: 15px;
    letter-spacing: 0.5px;
    font-weight: 700;
    width: 280px;
    max-width: 100%;
  }

  :deep(.btn::part(native)) {
    border-radius: 999px !important;
  }
}
</style>