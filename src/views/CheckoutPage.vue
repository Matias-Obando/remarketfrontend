<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-solid">
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/tabs/tab1" class="back-btn" text="Atras" />
        </ion-buttons>
        <ion-title class="page-title">Checkout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content-checkout">
      <div class="checkout-container">
        <!-- resumen de compra -->
        <div class="summary-section">
          <h2 class="section-title">Resumen de compra</h2>

          <div class="summary-item">
            <span class="item-label">Producto</span>
            <span class="item-value">Producto #{{ id }}</span>
          </div>

          <div class="summary-item">
            <span class="item-label">Precio</span>
            <span class="item-value price">99 €</span>
          </div>

          <div class="summary-item">
            <span class="item-label">Envío</span>
            <span class="item-value">4,99 €</span>
          </div>

          <div class="summary-item total-item">
            <span class="item-label">Total</span>
            <span class="item-value total-price">103,99 €</span>
          </div>
        </div>

        <!-- direccion y ciudad -->
        <div class="form-section">
          <h3 class="section-title">Dirección de entrega</h3>

          <ion-item class="input-item" lines="none">
            <ion-icon slot="start" :icon="locationOutline" class="input-icon" />
            <ion-input v-model="address" placeholder="Dirección" />
          </ion-item>

          <ion-item class="input-item" lines="none">
            <ion-icon slot="start" :icon="homeOutline" class="input-icon" />
            <ion-input v-model="city" placeholder="Ciudad" />
          </ion-item>
        </div>

        <!-- btn pago -->
        <div class="action-section">
          <ion-button expand="block" class="btn-pay" @click="goPay">
            <ion-icon slot="start" :icon="cardOutline" />
            Ir al pago
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonItem, IonInput, IonIcon
} from '@ionic/vue'
import { locationOutline, homeOutline, cardOutline } from 'ionicons/icons'
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
/* HEADER*/
.header-solid {
  --background: #5B18FE;
  --padding-top: 16px;
  --padding-bottom: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
}

.page-title {
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
}

.back-btn {
  --color: #ffffff;
  --padding-start: 0;
}

/*CONTENT */
.content-checkout {
  --background: #f9f9f9;
  --padding-start: 0px;
  --padding-end: 0px;
}

/*CONTENEDOR PRINCIPAL*/
.checkout-container {
  padding: 20px 16px 40px 16px;
  max-width: 600px;
  margin: 0 auto;
}


.summary-section {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 16px 0;
  color: #1a1a1a;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.summary-item:last-child {
  border-bottom: none;
}

.item-label {
  font-size: 14px;
  color: #888;
  font-weight: 500;
}

.item-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.price {
  color: #5B18FE;
  font-weight: 700;
}

.total-item {
  border-top: 2px solid #f0f0f0;
  border-bottom: none;
  padding-top: 14px;
  margin-top: 8px;
  font-weight: 700;
}

.total-price {
  font-size: 18px;
  color: #5B18FE;
  font-weight: 900;
}

/*FORMULARIO */
.form-section {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.input-item {
  --background: #f9f9f9;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --border-radius: 10px;
  --inner-padding-end: 0;
  margin-bottom: 12px;
  border: 1px solid #f0f0f0;
}

.input-item:last-child {
  margin-bottom: 0;
}

.input-icon {
  color: #5B18FE;
  margin-right: 12px;
  font-size: 20px;
}

.input-item ion-input {
  --padding-start: 8px;
  font-size: 14px;
}

.input-item ion-input::placeholder {
  color: #ccc;
}


.action-section {
  padding: 16px;
  background: #f9f9f9;
  border-top: 1px solid #f0f0f0;
  margin: 0 -16px -40px -16px;
}

.btn-pay {
  --background: #5B18FE;
  --border-radius: 10px;
  --color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  height: 48px;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.2);
}

.btn-pay:active {
  --background: #4a1399;
}
</style>