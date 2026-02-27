<template>
  <ion-page @ionViewWillEnter="loadProducts">
    <ion-header>
      <ion-toolbar class="header-premium">
        <div class="brand-container">
          <img :src="logoUrl" class="brandLogo" alt="ReMarket" />
          <span class="brand-text">ReMarket</span>
        </div>
      </ion-toolbar>

      <ion-toolbar class="search-toolbar">
        <ion-searchbar v-model="query" placeholder="Buscar productos..." @ionInput="onSearch"
          class="custom-searchbar" />
      </ion-toolbar>

      <ion-toolbar class="filters-toolbar">
        <div class="filters-mobile">
          <ion-button class="filter-btn" fill="outline" @click="openCatsMobile">
            <ion-icon slot="start" :icon="menuOutline" />
            Categorías
          </ion-button>

          <ion-button class="filter-btn" fill="outline" @click="goFavs">
            <ion-icon slot="start" :icon="heartOutline" />
            Favoritos
          </ion-button>
        </div>

        <div class="filters-desktop">
          <ion-button fill="outline" @click="openCatsDesktop($event)" class="desktop-cat-btn">
            <ion-icon slot="start" :icon="menuOutline" />
            Categorías
          </ion-button>

          <div class="selected-cat-badge">
            {{ selectedCatLabel }}
          </div>
        </div>

        <ion-popover
          :is-open="catsOpen"
          :event="catsEvent"
          @didDismiss="catsOpen = false"
        >
          <ion-content class="cats-popover">
            <ion-list>
              <ion-item
                v-for="c in categories"
                :key="c"
                button
                @click="selectCatFromPopover(c)"
                :class="{ 'cat-selected': selectedCat === c || (c === 'Todo' && !selectedCat) }"
              >
                <ion-label>{{ c }}</ion-label>
                <ion-icon v-if="selectedCat === c || (c === 'Todo' && !selectedCat)" slot="end" :icon="checkmark" />
              </ion-item>

              <ion-item button @click="catsOpen = false" class="cancel-item">
                <ion-label>Cancelar</ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="p in filteredProducts"
            :key="p.id"
            size="6"
            size-md="4"
            size-lg="3"
          >
            <ion-card class="card" @click="openProduct(p.id)">

              <div class="img-container">
                <img v-if="p.images && p.images.length > 0" :src="p.images[0]" :alt="p.title" class="product-img" />
                <div v-else class="img" aria-hidden="true">
                  <ion-icon :icon="imageOutline" class="imgIcon" />
                </div>
                <div class="img-overlay"></div>
              </div>

              <ion-card-header>
                <div class="header-top">
                  <ion-card-title class="title">{{ p.title }}</ion-card-title>
                  <ion-button fill="clear" class="favBtn" @click.stop="onToggleFav(p.id)">
                    <ion-icon :icon="favIcon(p.id)" />
                  </ion-button>
                </div>
                <ion-card-subtitle class="location">{{ p.location }}</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-footer">
                <div class="price-badge-row">
                  <div class="price">{{ p.price }} €</div>
                  <ion-badge :color="p.condition === 'Nuevo' ? 'success' : 'medium'" class="condition-badge">
                    {{ p.condition }}
                  </ion-badge>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import logoUrl from '@/assets/Logo.png'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
  actionSheetController,
} from '@ionic/vue'

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { imageOutline, heart, heartOutline, menuOutline, checkmark } from 'ionicons/icons'
import { getFavoriteIds, toggleFavorite } from '@/services/favorites'
import { getProducts } from '@/services/products'

type Product = {
  id: number
  title: string
  price: number
  condition: 'Nuevo' | '2ª mano'
  category: string
  location: string
  images: string[]
}

const router = useRouter()
const query = ref('')
const selectedCat = ref<string | null>(null)

const categories = [
  'Todo',
  'Tecnología',
  'Moda',
  'Hogar',
  'Deporte',
  'Motor',
  'Otros',
]

const selectedCatLabel = computed(() => selectedCat.value ?? 'Todo')
const products = ref<Product[]>(getProducts())

function loadProducts() {
  products.value = getProducts()
}

const favoriteIds = ref<number[]>(getFavoriteIds())

function onToggleFav(id: number) {
  favoriteIds.value = toggleFavorite(id)
}

function favIcon(id: number) {
  return favoriteIds.value.includes(id) ? heart : heartOutline
}

const filteredProducts = computed(() => {
  const q = query.value.trim().toLowerCase()

  return products.value.filter((p) => {
    const matchQuery =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)

    const cat = selectedCat.value
    const matchCat = !cat || cat === 'Todo' || p.category === cat

    return matchQuery && matchCat
  })
})

function onSearch() {}

function toggleCategory(c: string) {
  if (c === 'Todo') {
    selectedCat.value = null
    return
  }
  selectedCat.value = selectedCat.value === c ? null : c
}

async function openCatsMobile() {
  const sheet = await actionSheetController.create({
    header: 'Selecciona una categoría',
    buttons: [
      ...categories.map((c) => ({
        text: c,
        handler: () => toggleCategory(c),
      })),
      { text: 'Cancelar', role: 'cancel' },
    ],
  })
  await sheet.present()
}

const catsOpen = ref(false)
const catsEvent = ref<Event | undefined>()

function openCatsDesktop(ev: Event) {
  catsEvent.value = ev
  catsOpen.value = true
}

function selectCatFromPopover(c: string) {
  toggleCategory(c)
  catsOpen.value = false
}

function goFavs() {
  router.push('/app/tabs/favorites')
}

function openProduct(id: number) {
  router.push(`/app/product/${id}`)
}
</script>

<style scoped>
.header-premium {
  --background: linear-gradient(135deg, #5B18FE 0%);
  --padding-top: 16px;
  --padding-bottom: 16px;
  --padding-start: 18px;
  --padding-end: 18px;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.15);
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
}

.brandLogo {
  height: 44px;
  width: auto;
  display: block;
  opacity: 1;
}

.brand-text {
  font-size: 26px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.5px;
}


.search-toolbar {
  --background: #ffffff;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 20px;
  color: #999;
  pointer-events: none;
  z-index: 2;
}

.custom-searchbar {
  --background: #f5f5f5;
  --border-radius: 12px;
  --placeholder-opacity: 0.6;
  --icon-color: #999;
  margin-bottom: 12px;
  margin-top: 8px;
}

.custom-searchbar::part(native) {
  padding-left: 14px;
  font-size: 15px;
  border-radius: 12px;
}

.custom-searchbar::part(cancel-button) {
  display: none;
}

.custom-searchbar::part(search-icon) {
  display: none;
}


.filters-toolbar {
  --background: #ffffff;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}

.filters-mobile,
.filters-desktop {
  display: none;
  gap: 10px;
  align-items: center;
  width: 100%;
}

.filter-btn {
  flex: 1;
  height: 40px;
  --border-radius: 12px;
  --border-width: 2px;
  --border-style: solid;
  --border-color: #5B18FE;
  --color: #5B18FE;
  font-weight: 600;
  font-size: 14px;
}

.filter-btn:active {
  --background: rgba(91, 24, 254, 0.1);
}

.desktop-cat-btn {
  --border-width: 2px;
  --border-style: solid;
  --border-color: #5B18FE;
  --color: #5B18FE;
  font-weight: 600;
}

.selected-cat-badge {
  margin-left: 14px;
  padding: 8px 16px;
  background: rgba(91, 24, 254, 0.1);
  color: #5B18FE;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
}

@media (max-width: 768px) {
  .filters-mobile {
    display: flex;
  }
}

@media (min-width: 769px) {
  .filters-desktop {
    display: flex;
  }
}


.cats-popover {
  --padding-top: 8px;
  --padding-bottom: 8px;
  min-width: 240px;
}

.cats-popover ion-list {
  padding: 0;
}

.cats-popover ion-item {
  --min-height: 48px;
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 0;
}

.cats-popover ion-label {
  font-size: 15px;
  font-weight: 500;
}

.cat-selected {
  --background: rgba(91, 24, 254, 0.08);
  --border-left: 4px solid #5B18FE;
  --padding-start: 12px;
}

.cat-selected ion-label {
  color: #5B18FE;
  font-weight: 600;
}

.cancel-item {
  margin-top: 8px;
  border-top: 1px solid #e0e0e0;
  --color: #999;
}


.card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  margin: 8px 0;
}

.card:hover {
  transform: translateY(-6px);
  --box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.img-container {
  position: relative;
  overflow: hidden;
  height: 140px;
  background: #f2f2f2;
}

.img {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  transition: all 0.3s ease;
  pointer-events: none;
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.card:hover .img-overlay {
  background: rgba(91, 24, 254, 0.1);
}

.card:hover .img {
  transform: scale(1.05);
}

.imgIcon {
  font-size: 40px;
  opacity: 0.35;
  transition: opacity 0.3s ease;
}

.card:hover .imgIcon {
  opacity: 0.45;
}

ion-card-header {
  padding: 12px 14px 8px 14px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 6px;
}

.title {
  font-size: 14px;
  line-height: 1.3;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex: 1;
}

.location {
  font-size: 12px;
  color: #888;
  margin: 4px 0 0 0;
  opacity: 0.8;
}

.card-footer {
  padding: 8px 14px 12px 14px;
}

.price-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.price {
  font-weight: 800;
  font-size: 16px;
  color: #5B18FE;
}

.condition-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  --padding-top: 3px;
  --padding-bottom: 3px;
  --padding-start: 8px;
  --padding-end: 8px;
}

.favBtn {
  --padding-start: 0;
  --padding-end: 0;
  width: 28px;
  height: 28px;
  --border-radius: 50%;
  --icon-font-size: 18px;
  background: none;
  box-shadow: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.favBtn:hover {
  transform: scale(1.15);
}

.favBtn ion-icon {
  color: #5B18FE;
}

ion-card {
  position: relative;
}

ion-content {
  --padding-start: 0px;
  --padding-end: 0px;
  --background: #ffffff;
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
  padding: 8px; 
}
</style>