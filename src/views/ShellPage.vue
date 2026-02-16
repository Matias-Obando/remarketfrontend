<template>
  <ion-page>
    <ion-split-pane when="(min-width: 992px)" content-id="rm-main">
      <ion-menu content-id="rm-main" type="overlay">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menú</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <ion-item button router-link="/app/tabs/tab1">Inicio</ion-item>
            <ion-item button router-link="/app/tabs/favorites">Favoritos</ion-item>
            <ion-item button router-link="/app/tabs/tab2">Súbelo</ion-item>
            <ion-item button router-link="/app/tabs/chat">Chat</ion-item>

            <ion-item button router-link="/app/tabs/tab3">Perfil</ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <!--MAIN debe ser hijo directo -->
      <ion-router-outlet id="rm-main" />
    </ion-split-pane>

    <!--Footer web fuera del split-pane -->
    <DesktopFooter class="desktop-footer only-desktop" />
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
} from "@ionic/vue"

import DesktopFooter from "@/components/DesktopFooter.vue"
</script>

<style scoped>
.only-desktop {
  display: none;
}

@media (min-width: 992px) {
  .only-desktop {
    display: block;
  }

  /* Footer fijo abajo web */
  .desktop-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 298px;                 
    height: 80px;
    padding: 18px 24px;
    z-index: 999;
    display: flex;
    align-items: center;
    
    
  }
}
</style>
