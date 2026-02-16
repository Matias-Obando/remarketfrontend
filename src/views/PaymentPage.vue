<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="`/app/checkout/${id}`" />
        </ion-buttons>
        <ion-title>Pago</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="card">
        <h2 class="h2">Pago seguro (simulado)</h2>
        <p class="sub">Introduce datos fake. No se cobra nada.</p>

        <ion-item class="pill" lines="none">
          <ion-input v-model="card" inputmode="numeric" placeholder="Número de tarjeta (16 dígitos)" />
        </ion-item>

        <div class="grid">
          <ion-item class="pill" lines="none">
            <ion-input v-model="exp" placeholder="MM/AA" />
          </ion-item>

          <ion-item class="pill" lines="none">
            <ion-input v-model="cvc" inputmode="numeric" placeholder="CVC" />
          </ion-item>
        </div>

        <ion-button expand="block" class="btn" @click="pay">
          Pagar 103,99 €
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonItem, IonInput
} from '@ionic/vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const card = ref('')
const exp = ref('')
const cvc = ref('')

function pay() {
  // ✅ Simulación simple: si hay algo escrito, "paga"
  if (!card.value || !exp.value || !cvc.value) {
    alert('Completa los datos (simulado).')
    return
  }
  router.replace(`/app/success/${id}`)
}
</script>

<style scoped>
.card{
  max-width: 640px;
  margin: 0 auto;
  background: rgba(255,255,255,0.95);
  border-radius: 22px;
  padding: 20px;
  box-shadow: 0 18px 45px rgba(0,0,0,0.10);
}
.h2{ margin: 0; font-weight: 900; }
.sub{ margin: 8px 0 14px 0; opacity: .7; }
.pill{
  --background:#fff;
  --border-radius: 999px;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  margin-top: 10px;
}
.grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}
.btn{
  margin-top: 16px;
  --border-radius: 999px;
  height: 48px;
}
</style>
