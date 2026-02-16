<template>
  <ion-page>
    <ion-content fullscreen class="login-content">

      <!-- Fondo decorativo SOLO desktop -->
      <div class="bg-deco" aria-hidden="true"></div>

      <!-- Caja login (en móvil ocupa, en desktop se convierte en card) -->
      <div class="login-card">

        <h1 class="title">Bienvenido</h1>
        <h3 class="subtitle">Registra tu cuenta</h3>

        <div class="form">
          <ion-item class="pill" lines="none">
            <ion-icon :icon="person" slot="start" class="icon" />
            <ion-input v-model="user" placeholder="Usuario o correo" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-icon :icon="lockClosed" slot="start" class="icon" />
            <ion-input v-model="pass" type="password" placeholder="Contraseña" />
          </ion-item>

          <ion-button expand="block" class="btn" @click="doLogin">
            Entrar
          </ion-button>

          <div class="links">
            <ion-button fill="clear" size="small" class="forgot" @click="goForgot">
              ¿Olvidaste la contraseña?
            </ion-button>

            <ion-button fill="clear" size="small" class="create" @click="goRegister">
              ¿No tienes cuenta? Crear
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
import { person, lockClosed} from 'ionicons/icons'

const router = useRouter()
const user = ref('')
const pass = ref('')

function doLogin() {
  localStorage.setItem('loggedIn', 'true')
  router.replace('/app/tabs/tab1')
}

function goRegister() {
  router.push('/register') 
}
function goForgot() {
  router.push('/forgot')   
}
</script>

<style scoped>
/* Contenedor general */
.login-content{
  min-height: 100%;
  display:flex;
  justify-content: center;  
  align-items: center;    
  position: relative;
}


/* Card: en móvil ocupa todo; en desktop se limita */
.login-card{
  width: 100%;
  min-height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap: 18px;
  position: relative;
  z-index: 2;
}

/* Fondo decorativo (apagado por defecto) */
.bg-deco{
  display:none;
}

/* ====== DESKTOP ====== */
@media (min-width: 768px){
  .login-card{
    margin: auto;
    min-height: 720px;
    max-width: 640px;              
    background: rgba(255,255,255,0.95);
    border-radius: 22px;
    padding: 34px 28px;
    box-shadow: 0 18px 45px rgba(0,0,0,0.10);
    backdrop-filter: blur(6px);
  }

.bg-deco{
  display: block;                 /* fondo solo desktop */
  position: absolute;
  inset: 0;
  z-index: 1;

  /* ✅ Imagen + overlay blanco (para que la card destaque) */
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
}

/* ====== TÍTULOS (los tuyos) ====== */
.title {
  text-align: center;
  margin: 0 0 8px 0;
  font-weight: 800;
  font-size: 42px;
  letter-spacing: -0.5px;
}

.subtitle {
  text-align: center;
  margin: 0 0 18px 0;
  font-weight: 600;
  font-size: 14px;
  color: #666;
}

.form{
  display:flex;
  flex-direction:column;
  gap: 14px;
}

/* ====== INPUTS (lo tuyo, intacto) ====== */
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

.icon {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.45);
}

.btn{
  --border-radius: 999px;
  height: 48px;
}

/* Links (como ya lo tenías, pero con clases claras) */
.links{
  display:flex;
  flex-direction:column;
  gap: 2px;
  margin-top: 6px;
}

.forgot{
  align-self: flex-end;
  color: #9aa0a6;
  font-size: 13px;
  text-transform: none;
}

.create{
  align-self: center;
  margin-top: 18px;
  color: #5B18FE;
  font-size: 13px;
  text-transform: none;
}
@media (min-width: 768px){
  .login-content::part(scroll){
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }
   .btn{
    height: 46px;            /* más bajito */
    max-width: 480px;        /* 🔑 clave: no ocupa todo */
    margin: 12px auto 0;     /* centrado */
    font-size: 14px;
    letter-spacing: 0.5px;
  }
  :deep(ion-button.btn.button-block){
    width: 320px !important;          /* el ancho que quieras */
    max-width: 360px !important;
    margin: 14px auto 0 !important;   /* centrado */
    display: block;
  }

  :deep(ion-button.btn){
    height: 46px;                      /* un pelín más alto */
    font-size: 15px;
    letter-spacing: .5px;
  }

}



</style>
