<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="subelo-header">
        <ion-title>Súbelo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="subelo-content">
      <div class="form-container">
        <div class="header-section">
          <ion-icon :icon="cloudUploadOutline" class="upload-icon"></ion-icon>
          <h1>Publica tu producto</h1>
          <p>Llena los datos y comparte con la comunidad</p>
        </div>


        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">📝</span>
            Título del producto
          </label>
          <ion-input
            v-model="title"
            class="form-input"
            placeholder="Ej: Camiseta Real Madrid 2025"
            clearInput
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">💰</span>
              Precio (€)
            </label>
            <ion-input
              v-model.number="price"
              type="number"
              class="form-input"
              placeholder="30"
              clearInput
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📍</span>
              Ubicación
            </label>
            <ion-input
              v-model="location"
              class="form-input"
              placeholder="Barcelona"
              clearInput
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">🏷️</span>
            Categoría
          </label>
          <ion-select v-model="category" class="form-select" placeholder="Selecciona categoría">
            <ion-select-option v-for="c in categories" :key="c" :value="c">
              {{ c }}
            </ion-select-option>
          </ion-select>
        </div>

        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">✨</span>
            Estado
          </label>
          <div class="condition-buttons">
            <button
              v-for="cond in ['2ª mano', 'Nuevo']"
              :key="cond"
              :class="['condition-btn', { active: condition === cond }]"
              @click="condition = cond as '2ª mano', 'Nuevo' "
            >
              {{ cond }}
            </button>
          </div>
        </div>

        
        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">🖼️</span>
            Imágenes
          </label>
          <button class="image-upload-btn" @click="addFakeImage">
            <ion-icon :icon="addOutline"></ion-icon>
            Añadir imagen
          </button>

          <div v-if="images.length" class="images-grid">
            <div v-for="(img, i) in images" :key="img" class="image-item">
              <img :src="img" :alt="`Imagen ${i + 1}`" />
              <button class="remove-btn" @click="removeImg(i)" title="Quitar imagen">
                <ion-icon :icon="closeCircle"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        
        <div v-if="preview" class="preview-card">
          <h3 class="preview-title">Vista previa</h3>
          <div class="preview-content">
            <div class="preview-image">
              <ion-icon :icon="imageOutline"></ion-icon>
            </div>
            <div class="preview-info">
              <h4>{{ preview.title }}</h4>
              <p class="preview-location">📍 {{ preview.location }}</p>
              <div class="preview-footer">
                <span class="preview-price">{{ preview.price }}€</span>
                <span :class="['preview-badge', preview.condition === 'Nuevo' ? 'nuevo' : 'mano']">
                  {{ preview.condition }}
                </span>
              </div>
              <p class="preview-category">{{ preview.category }}</p>
            </div>
          </div>
        </div>

        
        <ion-button expand="block" class="publish-btn" @click="publish">
          <ion-icon :icon="checkmarkDoneCircle"></ion-icon>
          Publicar producto
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonSelect, IonSelectOption,
  IonButton, IonIcon,toastController
} from '@ionic/vue'
import { ref, computed } from 'vue'
import {
  cloudUploadOutline,
  addOutline,
  closeCircle,
  imageOutline,
  checkmarkDoneCircle,
} from 'ionicons/icons'
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
  const n = images.value.length + 1
  images.value.push(`https://picsum.photos/seed/remarket_upload_${n}/800/500`)
}

function removeImg(i: number) {
  images.value.splice(i, 1)
}

async function showToast(message: string, color: 'success' | 'warning' = 'success') {
  const toast = await toastController.create({
    message,
    duration: 2000,
    position: 'top',
    color,
  })
  await toast.present()
}

async function publish() {
  if (!title.value || !price.value || !location.value || !category.value) {
    await showToast('Rellena título, precio, ubicación y categoría.', 'warning')
    return
  }

  await addProduct({
    title: title.value,
    price: price.value,
    location: location.value,
    category: category.value,
    condition: condition.value,
    images: images.value,
    description: ""
  })

  await showToast('¡Producto publicado correctamente!', 'success')

  title.value = ''
  price.value = null
  location.value = ''
  category.value = ''
  condition.value = '2ª mano'
  images.value = []
}
</script>

<style scoped>
.subelo-header {
  --background: linear-gradient(135deg, #5B18FE 0%);
  --color: #ffffff;
  height: 76px;
  display: flex;
  align-items: center;
}

.subelo-header ion-title {
  font-weight: 800;
  font-size: 24px;
}

.subelo-content {
  --background: #f8f9fc;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px 100px 16px;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 32px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.08);
}

.upload-icon {
  font-size: 48px;
  color: #5B18FE;
  display: block;
  margin-bottom: 16px;
}

.header-section h1 {
  font-size: 28px;
  font-weight: 800;
  color: #333;
  margin: 0 0 8px 0;
}

.header-section p {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.label-icon {
  font-size: 18px;
}

.form-input,
.form-select {
  --background: #ffffff;
  --border-radius: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  border: 2px solid #f0f0f0;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus {
  border-color: #5B18FE;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.12);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.condition-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.condition-btn {
  padding: 14px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  background: #ffffff;
  font-size: 14px;
  font-weight: 600;
  color: #999;
  cursor: pointer;
  transition: all 0.3s ease;
}

.condition-btn:hover {
  border-color: #5B18FE;
  color: #5B18FE;
}

.condition-btn.active {
  background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  border-color: #5B18FE;
  color: #ffffff;
}

.image-upload-btn {
  width: 100%;
  padding: 16px;
  border: 2px dashed #5B18FE;
  border-radius: 12px;
  background: rgba(91, 24, 254, 0.05);
  color: #5B18FE;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.image-upload-btn:hover {
  background: rgba(91, 24, 254, 0.1);
  border-color: #7C3AED;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.image-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.image-item img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4444;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.remove-btn:hover {
  background: #ffffff;
  transform: scale(1.1);
}

.remove-btn ion-icon {
  font-size: 20px;
}

.preview-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.08);
  border-left: 4px solid #5B18FE;
}

.preview-title {
  font-size: 14px;
  font-weight: 700;
  color: #666;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-content {
  display: flex;
  gap: 16px;
}

.preview-image {
  width: 100px;
  height: 100px;
  background: #f5f7fb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;
  font-size: 40px;
  flex-shrink: 0;
}

.preview-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.preview-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.preview-location {
  font-size: 13px;
  color: #999;
  margin: 0 0 12px 0;
}

.preview-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.preview-price {
  font-size: 18px;
  font-weight: 800;
  color: #5B18FE;
}

.preview-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-badge.nuevo {
  background: #d4edda;
  color: #155724;
}

.preview-badge.mano {
  background: #ffeaa7;
  color: #d63031;
}

.preview-category {
  font-size: 12px;
  color: #bbb;
  margin: 0;
}

.publish-btn {
  --background: linear-gradient(135deg, #5B18FE 0%, #7C3AED 100%);
  --border-radius: 12px;
  height: 56px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.3);
  margin-top: 16px;
}

.publish-btn:hover {
  box-shadow: 0 8px 20px rgba(91, 24, 254, 0.4);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .images-grid {
    grid-template-columns: 1fr;
  }

  .preview-content {
    flex-direction: column;
  }

  .preview-image {
    width: 100%;
  }
}
</style>