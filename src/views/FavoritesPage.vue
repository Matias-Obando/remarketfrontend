<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="favorites-header">
        <ion-title>Mis Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="favorites-content">
      <div v-if="favoriteProducts.length === 0" class="empty-state">
        <ion-icon :icon="heartOutline" class="empty-icon"></ion-icon>
        <h2>No tienes favoritos aún</h2>
        <p>Explora productos y agrégalos a tus favoritos</p>
        <ion-button color="primary" router-link="/app/tabs/tab1">
          Ver todos los productos
        </ion-button>
      </div>

      <div v-else>
        <div class="favorites-header-info">
          <p class="favorites-count">{{ favoriteProducts.length }} producto{{ favoriteProducts.length !== 1 ? 's' : '' }} en favoritos</p>
        </div>

        <div class="products-grid">
          <div
            v-for="product in favoriteProducts"
            :key="product.id"
            class="product-card"
            @click="openProduct(product.id)"
          >
           <div class="product-image-wrapper">
              <img v-if="product.images && product.images.length > 0" :src="product.images[0]" :alt="product.title"
                class="product-img" />
              <div v-else class="product-image">
                <ion-icon :icon="imageOutline"></ion-icon>
              </div>
              <button class="favorite-btn active" @click.stop="removeFav(product.id)" title="Quitar de favoritos">
                <ion-icon :icon="heart"></ion-icon>
              </button>
            </div>

            <div class="product-info">
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-location">📍 {{ product.location }}</p>
              <div class="product-footer">
                <span class="product-price">{{ product.price }}€</span>
              </div>
            </div>
          </div>
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
  IonIcon,
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { heart, heartOutline, imageOutline } from 'ionicons/icons'
import { getFavoriteIds, toggleFavorite } from '@/services/favorites'
import { getProducts } from '@/services/products'

const allProducts = getProducts()

const router = useRouter()
const favoriteProducts = ref<typeof allProducts>([])

function loadFavorites() {
  const ids = getFavoriteIds()
  favoriteProducts.value = allProducts.filter(p => ids.includes(p.id))
}

onMounted(() => {
  loadFavorites()
})

function removeFav(id: number) {
  toggleFavorite(id)
  loadFavorites()
}

function openProduct(id: number) {
  router.push(`/app/product/${id}`)
}
</script>

<style scoped>

.favorites-header {
  --background: linear-gradient(135deg, #5B18FE 0%);
  --color: #ffffff;
  height: 76px;
  display: flex;
  align-items: center;
}

.favorites-header ion-title {
  font-weight: 800;
  font-size: 24px;
}

.favorites-content {
  --background: #f8f9fc;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 80px;
  color: #ddd;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h2 {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
}

.empty-state p {
  font-size: 14px;
  color: #999;
  margin: 0 0 30px 0;
}

.favorites-header-info {
  padding: 24px 16px 0 16px;
  margin-bottom: 16px;
}

.favorites-count {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin: 0;
  padding-left: 8px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 0 16px 100px 16px;
}

.product-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 16px rgba(91, 24, 254, 0.12);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fb 0%, #eef2f9 100%);
  font-size: 40px;
  color: #ddd;
  pointer-events: none;
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.favorite-btn:hover {
  background: #ffffff;
  transform: scale(1.1);
}

.favorite-btn.active {
  color: #5B18FE;
}

.favorite-btn ion-icon {
  font-size: 20px;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-title {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-location {
  font-size: 12px;
  color: #999;
  margin: 0 0 12px 0;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 18px;
  font-weight: 800;
  color: #5B18FE;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
    padding: 0 12px 100px 12px;
  }

  .favorites-header-info {
    padding: 16px 12px 0 12px;
  }
}
</style>