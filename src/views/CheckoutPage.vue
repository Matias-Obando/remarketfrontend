<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/tabs/tab1" />
        </ion-buttons>
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="card">
        <h2 class="h2">Resumen de compra</h2>

        <div class="row">
          <div class="label">Producto</div>
          <div class="value">Producto #{{ id }}</div>
        </div>

        <div class="row">
          <div class="label">Precio</div>
          <div class="value">99 €</div>
        </div>

        <div class="row">
          <div class="label">Envío</div>
          <div class="value">4,99 €</div>
        </div>

        <div class="row total">
          <div class="label">Total</div>
          <div class="value">103,99 €</div>
        </div>

        <ion-item class="pill" lines="none">
          <ion-input v-model="address" placeholder="Dirección (simulada)" />
        </ion-item>

        <ion-item class="pill" lines="none">
          <ion-input v-model="city" placeholder="Ciudad" />
        </ion-item>

        <ion-button expand="block" class="btn" @click="goPay">
          Ir al pago
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

const address = ref('')
const city = ref('')

function goPay() {
  router.replace(`/app/payment/${id}`)
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
.h2{ margin: 0 0 14px 0; font-weight: 900; }
.row{ display:flex; justify-content:space-between; padding: 8px 0; }
.label{ opacity: .7; }
.value{ font-weight: 800; }
.total{ border-top: 1px solid rgba(0,0,0,0.08); margin-top: 8px; padding-top: 12px; }
.pill{
  --background:#fff;
  --border-radius: 999px;
  --padding-start: 14px;
  --inner-padding-end: 14px;
  margin-top: 10px;
}
.btn{
  margin-top: 16px;
  --border-radius: 999px;
  height: 48px;
}
</style>
