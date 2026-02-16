<template>
  <ion-page>
    <ion-content fullscreen class="verify-content">
      <!-- Fondo oscuro con textura -->
      <div class="bg-deco" aria-hidden="true"></div>

      <div class="container ion-padding verify-card">
        <ion-button fill="clear" class="back" @click="goForgot">
          <ion-icon :icon="arrowBackOutline" />
        </ion-button>

        <h1 class="title">Introduce el código</h1>
        <p class="subtitle">Hemos enviado un código a tu correo.</p>

        <ion-item class="pill" lines="none">
          <ion-input v-model="code" inputmode="numeric" maxlength="6" placeholder="Código de 6 dígitos" />
        </ion-item>

        <ion-button expand="block" class="btn" @click="verifyCode">
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
/* =========================
   ✅ MÓVIL (IGUAL QUE FORGOT)
   ========================= */

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

/* pill igual que forgot */
.pill{
  --background: #ffffff;
  --border-radius: 999px;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.10);
}

.btn{
  --border-radius: 999px;
  height: 48px;
  margin-top: 6px;
}

/* =========================
   ✅ DESKTOP ONLY (SIN TOCAR MÓVIL)
   - igual que login/register
   ========================= */

/* Por defecto: apagamos fondo (móvil) */
.bg-deco{
  display:none;
}

@media (min-width: 768px){

  /* Centramos en desktop */
  .verify-content::part(scroll){
    height: 100%;
    min-height: 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    padding: 24px;
    position: relative;
  }

  /* ✅ Fondo oscuro con textura (igual que forgot) */
  .bg-deco{
    display:block;
    position:absolute;
    inset:0;
    z-index:1;

    
    background-image:
      linear-gradient(180deg,
        rgba(10,10,18,0.60) 0%,
        rgba(10,10,18,0.60) 100%
      ),
      url("/src/assets/fondocontraseña.jpg");

    background-size: cover;
    background-position:center;
    background-repeat:no-repeat;
  }
  :deep(ion-button.btn.button-block){
  width: 360px !important;      /* mismo ancho que login */
  max-width: 360px !important;
  height: 46px;                /* misma altura */
  margin: 14px auto 0 !important;
  display: block;
  font-size: 14px;
  letter-spacing: 0.5px;
}

  /* ✅ Card oscura translúcida (NO blanca) */
  .verify-card{
    position: relative;
    z-index: 2;

    max-width: 640px;
    width: 100%;
    min-height: 520px;

    background: rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 22px;
    padding: 46px 32px;

    box-shadow: 0 18px 45px rgba(0,0,0,0.35);
    backdrop-filter: blur(10px);

    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  /* ✅ Textos blancos en desktop (solo aquí) */
  .title{
    color: #fff;
    font-size: 34px;
    font-weight: 900;
  }

  .subtitle{
    color: rgba(255,255,255,0.78);
    opacity: 1;
  }

  /* Botón back blanco en desktop */
  .back{
    color: #fff;
  }

  /* Para que el contenedor no fuerce altura rara */
  .container{
    min-height: auto;
  }
}
</style>
