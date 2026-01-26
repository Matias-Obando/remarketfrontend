<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Súbelo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2 class="h">Publica tu producto</h2>

      <ion-item class="pill" lines="none">
        <ion-label position="stacked">Título</ion-label>
        <ion-input v-model="title" placeholder="Ej: Camiseta Real Madrid 2025" />
      </ion-item>

      <ion-item class="pill" lines="none">
        <ion-label position="stacked">Precio (€)</ion-label>
        <ion-input v-model.number="price" type="number" placeholder="Ej: 30" />
      </ion-item>

      <ion-item class="pill" lines="none">
        <ion-label position="stacked">Ubicación</ion-label>
        <ion-input v-model="location" placeholder="Ej: Barcelona" />
      </ion-item>

      <ion-item class="pill" lines="none">
        <ion-label position="stacked">Categoría</ion-label>
        <ion-select v-model="category" placeholder="Selecciona categoría">
          <ion-select-option v-for="c in categories" :key="c" :value="c">
            {{ c }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item class="pill" lines="none">
        <ion-label position="stacked">Estado</ion-label>
        <ion-segment v-model="condition">
          <ion-segment-button value="2ª mano">
            <ion-label>2ª mano</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Nuevo">
            <ion-label>Nuevo</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-item>

      <!-- Imágenes (simulado) -->
      <div class="images">
        <ion-button expand="block" fill="outline" @click="addFakeImage">
          Añadir imagen (simulado)
        </ion-button>

        <div v-if="images.length" class="thumbs">
          <div v-for="(img, i) in images" :key="img" class="thumb">
            <img :src="img" />
            <ion-button size="small" fill="clear" @click="removeImg(i)">Quitar</ion-button>
          </div>
        </div>
      </div>

      <ion-button expand="block" class="btn" @click="publish">
        Publicar
      </ion-button>

      <!-- Preview -->
      <ion-card v-if="preview" class="preview">
        <ion-card-header>
          <ion-card-title>{{ preview.title }}</ion-card-title>
          <ion-card-subtitle>{{ preview.location }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="row">
            <strong>{{ preview.price }} €</strong>
            <ion-badge :color="preview.condition === 'Nuevo' ? 'success' : 'medium'">
              {{ preview.condition }}
            </ion-badge>
          </div>
          <p class="small">Categoría: {{ preview.category }}</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonSegment, IonSegmentButton, IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonBadge,
} from '@ionic/vue'
import { ref, computed } from 'vue'
import { addProduct } from '@/services/products'

const categories = ['Tecnología', 'Moda', 'Hogar', 'Deporte', 'Motor', 'Otros']

const title = ref('')
const price = ref<number | null>(null)
const location = ref('')
const category = ref<string>('')
const condition = ref<'Nuevo' | '2ª mano'>('2ª mano')
const images = ref<string[]>([])

const preview = computed(() => {
  if (!title.value || !price.value || !location.value || !category.value) return null
  return {
    title: title.value,
    price: price.value,
    location: location.value,
    category: category.value,
    condition: condition.value,
  }
})

function addFakeImage() {
  // imágenes de prueba (luego input file..)
  const n = images.value.length + 1
  images.value.push(`https://picsum.photos/seed/remarket_upload_${n}/800/500`)
}

function removeImg(i: number) {
  images.value.splice(i, 1)
}

function publish() {
  if (!title.value || !price.value || !location.value || !category.value) {
    alert('Rellena título, precio, ubicación y categoría.')
    return
  }

  addProduct({
    title: title.value,
    price: price.value,
    location: location.value,
    category: category.value,
    condition: condition.value,
    images: images.value,
  })

  alert('Producto publicado')

  // reset
  title.value = ''
  price.value = null
  location.value = ''
  category.value = ''
  condition.value = '2ª mano'
  images.value = []
}
</script>

<style scoped>
.h{ margin: 0 0 12px 0; font-weight: 800; }
.pill{
  --background: #ffffff;
  --border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  margin-bottom: 12px;
}
.btn{
  --border-radius: 999px;
  height: 48px;
  margin-top: 10px;
}
.images{ margin: 6px 0 10px 0; }
.thumbs{
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.thumb{
  background:#fff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}
.thumb img{
  width: 100%;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
}
.preview{ margin-top: 14px; }
.row{ display:flex; justify-content:space-between; align-items:center; }
.small{ opacity:.75; margin: 8px 0 0 0; }
</style>
