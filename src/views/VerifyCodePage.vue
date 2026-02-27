<template>
  <ion-page>
    <ion-content fullscreen class="verify-content">
      
      <div class="bg-deco" aria-hidden="true"></div>

      <ion-button fill="clear" class="back" @click="goForgot">
        <ion-icon :icon="arrowBackOutline" />
      </ion-button>

      <div class="container verify-card">
        <h1 class="title">Introduce el código</h1>
        <p class="subtitle">Hemos enviado un código a tu correo.</p>

        <ion-item class="pill" lines="none">
          <ion-input v-model="code" inputmode="numeric" :maxlength="6" placeholder="Código de 6 dígitos" />
        </ion-item>

        <ion-button class="btn" @click="verifyCode">
          Verificar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent, IonButton, IonIcon, IonItem, IonInput,
  toastController
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { arrowBackOutline } from 'ionicons/icons'

const router = useRouter()
const code = ref('')

function goForgot(){
  router.replace('/forgot')
}

async function showToast(message: string, color: 'success' | 'danger' | 'medium' = 'medium') {
  const toast = await toastController.create({
    message,
    duration: 1400,
    position: 'bottom',
    color,
    buttons: [{ text: 'OK', role: 'cancel' }],
  })
  await toast.present()
}

async function verifyCode(){
  if(code.value === '123456'){
    await showToast('Código correcto', 'success')
    router.replace('/login')
  } else {
    await showToast('Código incorrecto', 'danger')
  }
}
</script>

<style scoped>
/* MOVIL*/

.verify-content {
  position: relative;
}

.bg-deco {
  position: absolute;
  inset: 0;
  z-index: 1;
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

/* DESKTOP  */

@media (min-width: 768px) {
  .verify-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
  }

  :deep(.verify-content::part(scroll)) {
    height: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }

  
  .bg-deco {
    background-image:
      linear-gradient(180deg,
        rgba(20, 20, 40, 0.55) 0%,
        rgba(20, 20, 40, 0.78) 100%
      ),
      url("/src/assets/fondocontraseña.jpg");
  }

  
  .verify-card {
    position: relative;
    z-index: 2;
    max-width: 700px;
    width: 100%;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 32px;
    padding: 80px 60px 120px 60px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.22);
  }

  .container {
    min-height: auto;
    padding: 0;
    gap: 28px;
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
    max-width: 460px;
  }

  :deep(.pill::part(native)) {
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  :deep(.pill ion-input) {
    font-size: 16px;
    text-align: center;
  }

  .btn {
    height: 50px;
    margin: 10px 0;
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