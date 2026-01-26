<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="favoriteProducts.length === 0" class="empty">
        No tienes favoritos aún
      </div>

      <ion-list v-else>
        <ion-item
          v-for="p in favoriteProducts"
          :key="p.id"
          button
          @click="openProduct(p.id)"
        >
          <ion-label>
            <h2>{{ p.title }}</h2>
            <p>{{ p.price }} € · {{ p.location }}</p>
          </ion-label>

          <ion-button
            fill="clear"
            slot="end"
            @click.stop="removeFav(p.id)"
          >
            <ion-icon :icon="heart" />
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonIcon
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { heart } from 'ionicons/icons'
import { getFavoriteIds, toggleFavorite } from '@/services/favorites'

// Por ahora usamos los mismos productos fake que en Home
// despues lo  moveremos a un "store" común (Pinia que es la segunda biblioteca).
const allProducts = [
  { id: 1, title: 'iPhone 12', price: 280, location: 'Barcelona' },
  { id: 2, title: 'Zapatillas Nike', price: 45, location: 'Madrid' },
  { id: 3, title: 'Silla gaming', price: 90, location: 'Valencia' },
  { id: 4, title: 'Bicicleta', price: 120, location: 'Sevilla' },
  { id: 5, title: 'Auriculares nuevos', price: 25, location: 'Bilbao' },
  { id: 6, title: 'Chaqueta', price: 30, location: 'Zaragoza' },
]

const router = useRouter()
const favoriteProducts = ref<typeof allProducts>([])

function loadFavorites() {
  const ids = getFavoriteIds()
  favoriteProducts.value = allProducts.filter(p => ids.includes(p.id))
}

// Se ejecuta cada vez que entras a la pestaña (para que se actualice)
onMounted(() => {
  loadFavorites()
})

function removeFav(id: number) {
  toggleFavorite(id)
  loadFavorites()
}

function openProduct(id: number) {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.empty{
  text-align:center;
  opacity:.7;
  margin-top: 30px;
}
</style>
