<template>
  <ion-page>
    <!-- ✅ SOLO añadimos una clase al ion-content para poder aplicar estilos SOLO desktop -->
    <ion-content fullscreen class="forgot-content">
      <!-- ✅ Fondo SOLO desktop (en móvil está apagado por CSS) -->
      <div class="bg-deco-forgot" aria-hidden="true"></div>

      <div class="container ion-padding forgot-card">
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
  router.replace('/verify')
}

</script>

<style scoped>
/* =========================
   ✅ MÓVIL (NO TOCAR)
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

/* =========================
   ✅ DESKTOP ONLY (SIN TOCAR MÓVIL)
   ========================= */

/* Solo para poder colocar el fondo en desktop */
.forgot-content{
  position: relative;
}

/* Fondo apagado en móvil */
.bg-deco-forgot{
  display: none;
}

/* En desktop centramos y activamos fondo + card glass */
@media (min-width: 768px){

  /* ✅ Centramos de verdad el contenido en desktop */
  .forgot-content::part(scroll){
    height: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }

  /* ✅ Fondo SOLO desktop (pon aquí tu imagen de forgot) */
  .bg-deco-forgot{
    display: block;
    position: absolute;
    inset: 0;
    z-index: 1;

    /* Cambia la ruta si tu imagen se llama diferente */
    background-image:
      linear-gradient(180deg,
        rgba(20,20,40,0.55) 0%,
        rgba(20,20,40,0.78) 100%
      ),
      url("/src/assets/fondocontraseña.jpg");

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* ✅ Card glass SOLO desktop */
  .forgot-card{
    position: relative;
    z-index: 2;

    max-width: 600px;
    width: 100%;
    min-height: 520px;

    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    border-radius: 22px;
    padding: 46px 38px;

    box-shadow: 0 25px 60px rgba(0,0,0,0.22);
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

  /* Texto sobre fondo oscuro */
  .title{
    color: #fff;
    font-size: 34px;
  }
  .subtitle{
    color: rgba(255,255,255,0.78);
    opacity: 1;
  }

  /* El input se ve mejor sobre glass */
  .pill{
    --background: rgba(255,255,255,0.92);
  }

  /* La flecha atrás se ve mejor en oscuro */
  .back{
    color: #fff;
  }
}
</style>
