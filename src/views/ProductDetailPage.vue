<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-solid">
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/tabs/tab1" class="back-btn" text="Atras" />
        </ion-buttons>
        <ion-title class="page-title">Detalles</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content-product">
      <!-- carrusel de imagenes -->
      <div class="carouselWrap">
        <swiper
          :modules="[Pagination]"
          :pagination="{ clickable: true }"
          class="mySwiper">
          <swiper-slide v-for="img in images" :key="img">
            <img :src="img" class="slideImg" />
          </swiper-slide>
        </swiper>
      </div>

      
      <div class="product-container">
        <div class="product-header">
          <h1 class="product-title">{{ productTitle }}</h1>
          <p class="product-location">{{ productLocation }}</p>
        </div>

        <div class="price-section">
          <div class="price-group">
            <span class="price">{{ productPrice }} €</span>
            <ion-button fill="clear" @click="toggleFav" class="fav-btn-inline">
              <ion-icon :icon="isFav ? heart : heartOutline" />
            </ion-button>
          </div>
          <ion-badge :color="productCondition === 'Nuevo' ? 'success' : 'medium'" class="badge-condition">{{ productCondition }}</ion-badge>
        </div>

       
        <div class="seller-card">
          <ion-avatar class="avatar">
            <img alt="Vendedor" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </ion-avatar>
          <div class="seller-info">
            <p class="seller-name">Juan García</p>
            <p class="seller-rating">⭐ 4.8 (120 reviews)</p>
          </div>
        </div>

        
         <p class="product-description" v-if="product">{{ product.description }}</p>

        
        <div class="action-buttons">
          <ion-button expand="block" class="btn-primary" @click="buyNow">
            <ion-icon slot="start" :icon="cartOutline" />
            Comprar ahora
          </ion-button>
          <ion-button expand="block" class="btn-secondary" @click="contactSeller">
            <ion-icon slot="start" :icon="chatbubbleOutline" />
            Contactar vendedor
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
  IonButtons,
  IonBackButton,
  IonIcon,
  IonBadge,
  IonAvatar,
} from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { heart, heartOutline, cartOutline, chatbubbleOutline } from 'ionicons/icons'
import { getFavoriteIds, toggleFavorite } from '@/services/favorites'
import { getProductById } from '@/services/products'
import type { Product } from '@/services/products'
import { computed, ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const pid = Number(route.params.id)

const product = ref<Product | undefined>(undefined)
const images = ref<string[]>([])
const productTitle = ref('Producto')
const productLocation = ref('Barcelona')
const productPrice = ref(0)
const productCondition = ref('Nuevo')

const favs = ref<number[]>(getFavoriteIds())
const isFav = computed(() => favs.value.includes(pid))

onMounted(() => {
  product.value = getProductById(pid)
  if (product.value) {
    images.value = product.value.images
    productTitle.value = product.value.title
    productLocation.value = product.value.location
    productPrice.value = product.value.price
    productCondition.value = product.value.condition
  }
})

function toggleFav() {
  favs.value = toggleFavorite(pid)
}

function buyNow() {
  router.replace(`/app/checkout/${pid}`)
}

function contactSeller() {
  router.push(`/app/chat/seller-1?product=${pid}`)
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


.content-product {
  --background: #ffffff;
  --padding-start: 0px;
  --padding-end: 0px;
  --padding-bottom: 100px;
}


.carouselWrap {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slideImg {
  width: 100%;
  height: 260px;
  object-fit: scale-down;
  border-radius: 0;
}

:deep(.swiper-pagination-bullet) {
  background: #5B18FE;
  opacity: 0.4;
}

:deep(.swiper-pagination-bullet-active) {
  background: #5B18FE;
  opacity: 1;
}


.product-container {
  padding: 20px 16px 40px 16px;
}

.product-header {
  margin-bottom: 16px;
}

.product-title {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: #1a1a1a;
}

.product-location {
  font-size: 13px;
  color: #888;
  margin: 0;
}


.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.price-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 26px;
  font-weight: 900;
  color: #5B18FE;
}

.fav-btn-inline {
  --padding-start: 0;
  --padding-end: 0;
  --color: #5B18FE;
  font-size: 24px;
}

.fav-btn-inline ion-icon {
  font-size: 28px;
}

.badge-condition {
  font-size: 11px;
  font-weight: 700;
  --border-radius: 6px;
  padding: 4px 10px;
}

.seller-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #f9f9f9;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;
}

.avatar {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.seller-info {
  flex: 1;
}

.seller-name {
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.seller-rating {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #888;
}


.description {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 24px 0;
}


.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.btn-primary {
  --background: #5B18FE;
  --border-radius: 10px;
  --color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  height: 48px;
  box-shadow: 0 2px 8px rgba(91, 24, 254, 0.12);
}

.btn-primary:active {
  --background: #4a1399;
}

.btn-secondary {
  --background: transparent;
  --border-radius: 10px;
  --color: #5B18FE;
  --border: 2px solid #5B18FE;
  font-weight: 700;
  font-size: 15px;
  height: 48px;
}

.btn-secondary:active {
  --background: rgba(91, 24, 254, 0.05);
}



@media (min-width: 768px) {
  .content-product {
    --padding-bottom: 150px;
  }

  .action-buttons {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-primary,
  .btn-secondary {
    font-size: 16px;
    height: 54px;
  }
}
</style>