<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Compra realizada</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="card">
        <h2 class="h2">¡Listo! ✅</h2>
        <p class="sub">Tu compra del producto #{{ id }} se ha completado (simulado).</p>

        <ion-button expand="block" class="btn" @click="goHome">
          Volver al inicio
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

function goHome(){
  router.replace('/app/tabs/tab1')
}
</script>

<style scoped>
.card{
  max-width: 640px;
  margin: 40px auto 0 auto;
  background: rgba(255,255,255,0.95);
  border-radius: 22px;
  padding: 26px;
  box-shadow: 0 18px 45px rgba(0,0,0,0.10);
  text-align:center;
}
.h2{ margin: 0; font-weight: 900; }
.sub{ margin: 10px 0 18px 0; opacity: .7; }
.btn{
  --border-radius: 999px;
  height: 48px;
}
</style>
