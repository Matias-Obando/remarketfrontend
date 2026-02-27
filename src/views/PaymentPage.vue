<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-solid">
        <ion-buttons slot="start">
          <ion-back-button :default-href="`/app/checkout/${id}`" class="back-btn" text="Atras" />
        </ion-buttons>
        <ion-title class="page-title">Pago</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content-payment">
      <div class="payment-container">
        
        <div class="header-section">
          <h2 class="payment-title">Pago seguro</h2>
          <p class="payment-subtitle">Introduce tus datos.</p>
        </div>

        
        <div class="form-section">
          <ion-item class="input-item" lines="none">
            <ion-icon slot="start" :icon="cardOutline" class="input-icon" />
            <ion-input 
              v-model="card" 
              inputmode="numeric" 
              placeholder="Número de tarjeta (16 dígitos)"
              :maxlength="16"
            />
          </ion-item>

          <div class="input-grid">
            <ion-item class="input-item" lines="none">
              <ion-icon slot="start" :icon="calendarOutline" class="input-icon" />
              <ion-input 
                v-model="exp" 
                placeholder="MM/AA"
                :maxlength="5"
              />
            </ion-item>

            <ion-item class="input-item" lines="none">
              <ion-icon slot="start" :icon="lockClosedOutline" class="input-icon" />
              <ion-input 
                v-model="cvc" 
                inputmode="numeric" 
                placeholder="CVC"
                :maxlength="3"
              />
            </ion-item>
          </div>
        </div>

        
        <div class="action-section">
          <ion-button expand="block" class="btn-pay" @click="pay">
            <ion-icon slot="start" :icon="checkmarkCircleOutline" />
            Pagar 103,99 €
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
import { 
  cardOutline, 
  calendarOutline, 
  lockClosedOutline, 
  checkmarkCircleOutline 
} from 'ionicons/icons'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const card = ref('')
const exp = ref('')
const cvc = ref('')

function pay() {
  
  if (!card.value || !exp.value || !cvc.value) {
    alert('Completa los datos.')
    return
  }
  router.replace(`/app/success/${id}`)
}
</script>

<style scoped>
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

.content-payment {
  --background: #f9f9f9;
  --padding-start: 0px;
  --padding-end: 0px;
}

.payment-container {
  padding: 20px 16px 40px 16px;
  max-width: 600px;
  margin: 0 auto;
}

.header-section {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.payment-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: #1a1a1a;
}

.payment-subtitle {
  font-size: 13px;
  color: #888;
  margin: 0;
  line-height: 1.4;
}

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

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
}

.input-grid .input-item {
  margin-bottom: 0;
}

.action-section {
  position: sticky;
  bottom: 0;
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