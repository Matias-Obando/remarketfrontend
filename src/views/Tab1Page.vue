<template>
  <ion-page @ionViewWillEnter="loadProducts">
    <ion-header>
      <ion-toolbar>
        <ion-title>ReMarket</ion-title>
      </ion-toolbar>

      <!-- Buscador -->
      <ion-toolbar>
        <ion-searchbar
          v-model="query"
          placeholder="Buscar productos..."
          @ionInput="onSearch"
        />
      </ion-toolbar>

      <!-- Categorías scroll horizontal -->
      <ion-toolbar>
        <div class="cats">
          <ion-chip
            v-for="c in categories"
            :key="c"
            :outline="selectedCat !== c"
            color="primary"
            @click="toggleCategory(c)"
          >
            <ion-label>{{ c }}</ion-label>
          </ion-chip>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Grid productos responsive -->
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
              <ion-button fill="clear" class="favBtn" @click.stop="onToggleFav(p.id)">
                <ion-icon :icon="favIcon(p.id)" />
              </ion-button>

              <div class="img" aria-hidden="true">
                <ion-icon :icon="imageOutline" class="imgIcon" />
              </div>

              <ion-card-header>
                <ion-card-title class="title">{{ p.title }}</ion-card-title>
                <ion-card-subtitle>{{ p.location }}</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="row">
                <div class="price">{{ p.price }} €</div>
                <ion-badge :color="p.condition === 'Nuevo' ? 'success' : 'medium'">
                  {{ p.condition }}
                </ion-badge>
              </ion-card-content>
            </ion-card>

          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonSearchbar,
  IonChip,
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
} from '@ionic/vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { imageOutline } from 'ionicons/icons'
import { heart, heartOutline } from 'ionicons/icons'
import { getFavoriteIds, toggleFavorite } from '@/services/favorites'
import { getProducts } from '@/services/products'



type Product = {
  id: number
  title: string
  price: number
  condition: 'Nuevo' | '2ª mano'
  category: string
  location: string
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
    const matchCat =
      !cat || cat === 'Todo' || p.category === cat

    return matchQuery && matchCat
  })
})

function onSearch() {
  // no hace falta nada, computed filtra solo
}

function toggleCategory(c: string) {
  if (c === 'Todo') {
    selectedCat.value = null
    return
  }
  selectedCat.value = selectedCat.value === c ? null : c
}

function openProduct(id: number) {
  router.push(`/product/${id}`)
}
</script>



<style scoped>
.cats{
  display:flex;
  gap: 8px;
  overflow-x:auto;
  padding: 8px 10px;
}
.cats::-webkit-scrollbar{ display:none; }

.card{
  cursor: pointer;
}

.img{
  height: 130px;
  display:flex;
  justify-content:center;
  align-items:center;
  background: #f2f2f2;
}
.imgIcon{
  font-size: 34px;
  opacity: .45;
}

.title{
  font-size: 16px;
  line-height: 1.2;
}

.row{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.price{
  font-weight: 800;
  font-size: 16px;
}
.favBtn{
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 10;
  --padding-start: 8px;
  --padding-end: 8px;
  --border-radius: 999px;
  background: rgba(255,255,255,0.85);
}
ion-card{
  position: relative;
}

</style>
