<template>
  <ion-page>
    <ion-split-pane when="(min-width: 992px)" content-id="rm-main">
      <ion-menu content-id="rm-main" type="overlay">
        <ion-header class="menu-header">
          <ion-toolbar>
            <ion-title>Menú</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="menu-content">
          <ion-list class="menu-list">
            <ion-item
              button
              router-link="/app/tabs/tab1"
              :class="{ 'menu-item-active': isActive('/app/tabs/tab1') }"
              class="menu-item"
            >
              <ion-icon slot="start" :icon="homeOutline" class="menu-icon" />
              <ion-label>Inicio</ion-label>
            </ion-item>

            <ion-item
              button
              router-link="/app/tabs/favorites"
              :class="{ 'menu-item-active': isActive('/app/tabs/favorites') }"
              class="menu-item"
            >
              <ion-icon slot="start" :icon="heartOutline" class="menu-icon" />
              <ion-label>Favoritos</ion-label>
            </ion-item>

            <ion-item
              button
              router-link="/app/tabs/tab2"
              :class="{ 'menu-item-active': isActive('/app/tabs/tab2') }"
              class="menu-item"
            >
              <ion-icon slot="start" :icon="addCircleOutline" class="menu-icon" />
              <ion-label>Súbelo</ion-label>
            </ion-item>

            <ion-item
              button
              router-link="/app/tabs/chat"
              :class="{ 'menu-item-active': isActive('/app/tabs/chat') }"
              class="menu-item"
            >
              <ion-icon slot="start" :icon="chatbubbleOutline" class="menu-icon" />
              <ion-label>Chat</ion-label>
            </ion-item>

            <ion-item
              button
              router-link="/app/tabs/tab3"
              :class="{ 'menu-item-active': isActive('/app/tabs/tab3') }"
              class="menu-item"
            >
              <ion-icon slot="start" :icon="personOutline" class="menu-icon" />
              <ion-label>Perfil</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="rm-main" />
    </ion-split-pane>

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
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/vue"

import {
  homeOutline,
  heartOutline,
  addCircleOutline,
  chatbubbleOutline,
  personOutline,
} from "ionicons/icons"

import { useRoute } from "vue-router"
import DesktopFooter from "@/components/DesktopFooter.vue"

const route = useRoute()

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path)
}
</script>

<style>
.only-desktop {
  display: none;
}

@media (min-width: 992px) {
  ion-menu::part(container) {
    --background: #f8f8fb;
  }

  ion-menu {
    --width: 280px;
  }

  .menu-header {
  background: linear-gradient(135deg, #5B18FE 0%);
  height: 76px;
  display: flex;
  align-items: center;
}

  .menu-header ion-toolbar {
    background: transparent;
    --background: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .menu-header ion-title {
    color: #ffffff;
    font-weight: 800;
    font-size: 22px;
    padding: 0 20px;
    margin: 0;
    margin-left: auto;
  }

  .menu-content {
    --background: #f8f8fb;
  }

  .menu-list {
    padding: 0;
    background: transparent;
  }

  .menu-item {
    --padding-start: 20px;
    --padding-end: 20px;
    --min-height: 52px;
    --border-bottom: 1px solid rgba(91, 24, 254, 0.08);
    margin: 0;
    transition: all 0.2s ease;
    --color: #333;
  }

  .menu-item ion-label {
    font-weight: 500;
    font-size: 15px;
    margin-left: 12px;
  }

  .menu-item:hover {
    --background: rgba(91, 24, 254, 0.08);
  }

  .menu-item-active {
    --background: rgba(91, 24, 254, 0.12);
    --border-left: 4px solid #5B18FE;
    --padding-start: 16px;
    --color: #5B18FE;
  }

  .menu-item-active ion-label {
    font-weight: 700;
    color: #5B18FE;
  }

  .menu-item-active .menu-icon {
    color: #5B18FE;
  }

  .menu-icon {
    font-size: 22px;
    color: #999;
    transition: color 0.2s ease;
  }

  .menu-item:hover .menu-icon {
    color: #5B18FE;
  }

  .only-desktop {
    display: block;
  }

  .desktop-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0px;
    height: 120px;
    padding: 18px 24px;
    z-index: 999;
    display: flex;
    align-items: center;
  }
}</style>