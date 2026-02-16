<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom" class="rm-tabbar">
        <ion-tab-button tab="tab1" href="/app/tabs/tab1">
          <ion-icon :icon="homeOutline" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/app/tabs/favorites">
          <ion-icon :icon="heartOutline" />
          <ion-label>Favoritos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/app/tabs/tab2">
          <ion-icon :icon="addCircleOutline" />
          <ion-label>Súbelo</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="chat" href="/app/tabs/chat">
          <ion-icon :icon="chatbubbleOutline" />
          <ion-label>Chat</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/app/tabs/tab3">
          <ion-icon :icon="personOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage } from '@ionic/vue'
import { homeOutline, addCircleOutline, personOutline, heartOutline,chatbubbleOutline } from 'ionicons/icons'
</script>

<style scoped>

@media (min-width: 992px) {
  ion-content {
    --padding-bottom: 56px;
  }
}
/* TAB BAR MÓVIL */
ion-tab-bar {
  --background: #5B18FE;   /* color del fondo */
  --color: #ffffff;       /* iconos/texto */
}

ion-tab-button {
  --color-selected: #ffffff; /* icono activo */
}

/* resaltar tab activo */
ion-tab-button.tab-selected {
  background: rgba(255,255,255,0.15);
  border-radius: 12px;
}


</style>
