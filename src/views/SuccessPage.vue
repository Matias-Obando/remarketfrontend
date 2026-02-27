<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-large">
        <ion-title class="page-title-large">Compra realizada</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content-success">
      <div class="success-wrapper">
        
        <div class="success-icon">
          <ion-icon :icon="checkmarkCircleOutline" />
        </div>

        
        <div class="success-card">
          <h2 class="success-title">¡Listo!</h2>
          <p class="success-message">
            Tu compra del producto #{{ id }} se ha completado.
          </p>

          <div class="order-details">
            <p class="detail-label">Número de pedido</p>
            <p class="detail-value">#{{ Math.floor(Math.random() * 1000000) }}</p>
          </div>

          <ion-button expand="block" class="btn-home" @click="goHome">
            <ion-icon slot="start" :icon="homeOutline" />
            Volver al inicio
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonIcon
} from '@ionic/vue'
import { checkmarkCircleOutline, homeOutline } from 'ionicons/icons'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

function goHome(){
  router.replace('/app/tabs/tab1')
}
</script>

<style scoped>

.header-large {
  --background: #5B18FE;
  --padding-top: 24px;
  --padding-bottom: 12px;
  --padding-start: 20px;
  --padding-end: 20px;
}

.page-title-large {
  color: #ffffff;
  font-weight: 800;
  font-size: 28px;
  margin: 0;
}


.content-success {
  --background: #f9f9f9;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 40px;
  --padding-bottom: 40px;
}


.success-wrapper {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 28px;
}


.success-icon {
  flex-shrink: 0;
}

.success-icon ion-icon {
  font-size: 80px;
  color: #5B18FE;
  animation: scaleIn 0.6s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.success-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 28px 20px;
  box-shadow: 0 4px 16px rgba(91, 24, 254, 0.1);
  width: 100%;
}

.success-title {
  font-size: 28px;
  font-weight: 900;
  margin: 0 0 12px 0;
  color: #1a1a1a;
}

.success-message {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
}


.order-details {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 20px;
  border-left: 4px solid #5B18FE;
}

.detail-label {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 6px 0;
}

.detail-value {
  font-size: 18px;
  font-weight: 800;
  color: #5B18FE;
  margin: 0;
}

.btn-home {
  --background: #5B18FE;
  --border-radius: 10px;
  --color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  height: 48px;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.2);
}

.btn-home:active {
  --background: #4a1399;
}
</style>