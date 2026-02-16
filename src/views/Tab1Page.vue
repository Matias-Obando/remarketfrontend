<template>
  <ion-page @ionViewWillEnter="loadProducts">
    <ion-header>
      <ion-toolbar>
        <ion-title class="brandTitle">
          <img :src="logoUrl" class="brandLogo" alt="ReMarket" />
        </ion-title>

      </ion-toolbar>

      <!-- =========================
           1) BUSCADOR
           ========================= -->
      <ion-toolbar>
        <ion-searchbar
          v-model="query"
          placeholder="Buscar productos..."
          @ionInput="onSearch"
        />
      </ion-toolbar>

      <!-- =========================
           2) FILTROS RESPONSIVE
           - MÓVIL: 2 botones (Categorías + Favoritos) => ActionSheet
           - DESKTOP: Botón hamburguesa => Popover (dropdown al lado del botón)
           ========================= -->
      <ion-toolbar>
        <!-- 📱 MÓVIL -->
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

        <!-- 💻 DESKTOP -->
        <div class="filters-desktop">
          <!-- IMPORTANTE: pasamos $event para que el popover se ancle al botón -->
          <ion-button fill="outline" @click="openCatsDesktop($event)">
            <ion-icon slot="start" :icon="menuOutline" />
            Categorías
          </ion-button>

          <!-- Mostramos la categoría actual -->
          <ion-label class="current-cat">
            {{ selectedCatLabel }}
          </ion-label>
        </div>

        <!-- ✅ POPOVER SOLO PARA DESKTOP
             Esto crea el desplegable pegado al botón hamburguesa -->
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
              >
                <ion-label>{{ c }}</ion-label>
              </ion-item>

              <!-- opción cerrar -->
              <ion-item button @click="catsOpen = false">
                <ion-label>Cancelar</ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- =========================
           3) GRID PRODUCTOS RESPONSIVE
           ========================= -->
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
              <!-- Botón favoritos (sin abrir la tarjeta) -->
              <ion-button fill="clear" class="favBtn" @click.stop="onToggleFav(p.id)">
                <ion-icon :icon="favIcon(p.id)" />
              </ion-button>

              <!-- Imagen placeholder -->
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
import logoUrl from '@/assets/Logo.png'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
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
  actionSheetController, // para el menú móvil
} from '@ionic/vue'

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { imageOutline, heart, heartOutline, menuOutline } from 'ionicons/icons'
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

/* =========================
   Estado de búsqueda/filtro
   ========================= */
const query = ref('')
const selectedCat = ref<string | null>(null)

/* =========================
   Categorías disponibles
   ========================= */
const categories = [
  'Todo',
  'Tecnología',
  'Moda',
  'Hogar',
  'Deporte',
  'Motor',
  'Otros',
]

/* Etiqueta que mostramos en desktop */
const selectedCatLabel = computed(() => selectedCat.value ?? 'Todo')

/* =========================
   Productos
   ========================= */
const products = ref<Product[]>(getProducts())

function loadProducts() {
  products.value = getProducts()
}

/* =========================
   Favoritos
   ========================= */
const favoriteIds = ref<number[]>(getFavoriteIds())

function onToggleFav(id: number) {
  favoriteIds.value = toggleFavorite(id)
}

function favIcon(id: number) {
  return favoriteIds.value.includes(id) ? heart : heartOutline
}

/* =========================
   Filtro (búsqueda + categoría)
   ========================= */
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

function onSearch() {
  // no hace falta nada, computed filtra solo
}

/* =========================
   Selección de categoría (tu lógica original)
   ========================= */
function toggleCategory(c: string) {
  if (c === 'Todo') {
    selectedCat.value = null
    return
  }
  selectedCat.value = selectedCat.value === c ? null : c
}

/* =====================================================
   ✅ MENÚ DE CATEGORÍAS:
   - MÓVIL: ActionSheet
   - DESKTOP: Popover (dropdown pegado al botón)
   ===================================================== */

/* ---- 1) MÓVIL (ActionSheet) ---- */
async function openCatsMobile() {
  const sheet = await actionSheetController.create({
    header: 'Categorías',
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

/* ---- 2) DESKTOP (Popover) ---- */
const catsOpen = ref(false)                 // abre/cierra popover
const catsEvent = ref<Event | undefined>()  // evento para anclar al botón

function openCatsDesktop(ev: Event) {
  catsEvent.value = ev
  catsOpen.value = true
}

function selectCatFromPopover(c: string) {
  toggleCategory(c)
  catsOpen.value = false
}

/* =========================
   Navegación
   ========================= */
function goFavs() {
  router.push('/app/tabs/favorites')
}

function openProduct(id: number) {
  router.push(`/app/product/${id}`)
}
</script>

<style scoped>
/* =========================
   FILTROS RESPONSIVE
   ========================= */
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
  --border-radius: 14px;
}

.current-cat {
  margin-left: 12px;
  font-weight: 700;
  opacity: 0.7;
}

/* 📱 MÓVIL: mostramos 2 botones */
@media (max-width: 768px) {
  .filters-mobile {
    display: flex;
  }
}

/* 💻 DESKTOP: botón + categoría actual */
@media (min-width: 769px) {
  .filters-desktop {
    display: flex;
  }
}

/* =========================
   POPOVER DESKTOP (dropdown)
   ========================= */
.cats-popover {
  --padding-top: 6px;
  --padding-bottom: 6px;
  min-width: 220px;
}

.cats-popover ion-item {
  --min-height: 42px;
}

/* =========================
   CARDS
   ========================= */
.card {
  cursor: pointer;
}

.img {
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
}

.imgIcon {
  font-size: 34px;
  opacity: 0.45;
}

.title {
  font-size: 16px;
  line-height: 1.2;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: 800;
  font-size: 16px;
}

.favBtn {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 10;
  --padding-start: 8px;
  --padding-end: 8px;
  --border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
}

ion-card {
  position: relative;
}

/* Ajuste padding lateral del contenido */
ion-content {
  --padding-start: 0px;
  --padding-end: 0px;
}

/*tmaño logo y color logo*/ 

.brandTitle{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px; /* asegura espacio en el toolbar */
  padding: 0;
}

.brandLogo{
  height: 26px;      /* tamaño tipo header */
  width: auto;
  display: block;
  opacity: 1;
  filter: none;
}


</style>
