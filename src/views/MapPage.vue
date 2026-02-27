<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-solid">
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/tabs/tab3" class="back-btn" />
        </ion-buttons>
        <ion-title class="page-title">Mi ubicación</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content-map">
      <div id="map" class="leaflet-map"></div>

      <div class="location-info-panel">
        <div class="info-section">
          <p class="info-label">Coordenadas seleccionadas</p>
          <p class="info-value">
            Lat: {{ selectedLat.toFixed(4) }} | Lon: {{ selectedLon.toFixed(4) }}
          </p>
        </div>

        <ion-button expand="block" class="btn-save" @click="saveLocation">
          <ion-icon slot="start" :icon="checkmarkCircleOutline" />
          Guardar ubicación
        </ion-button>
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
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import L from 'leaflet'
import { checkmarkCircleOutline } from 'ionicons/icons'
import 'leaflet/dist/leaflet.css'

const router = useRouter()

const selectedLat = ref(41.3851)
const selectedLon = ref(2.1734)
let map: L.Map | null = null
let marker: L.Marker | null = null

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

function initMap() {
  if (map) return

  const mapContainer = document.getElementById('map')
  if (!mapContainer) return

  // Creo mapa
  map = L.map('map').setView([selectedLat.value, selectedLon.value], 13)

  // Añado tiles de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)

  // Creo marcador arrastrable
  marker = L.marker([selectedLat.value, selectedLon.value], {
    draggable: true,
  }).addTo(map)

  // Event al arrastrar el marcador
  marker.on('drag', function () {
    const latlng = marker!.getLatLng()
    selectedLat.value = latlng.lat
    selectedLon.value = latlng.lng
  })

  // Event al hacer click en el mapa
  map.on('click', function (e) {
    const latlng = e.latlng
    selectedLat.value = latlng.lat
    selectedLon.value = latlng.lng

    if (marker) {
      marker.setLatLng(latlng)
    }
  })

  // Ajustar mapa cuando cambie el tamaño
  setTimeout(() => {
    map?.invalidateSize()
  }, 100)
}

function saveLocation() {
  const locationData = {
    lat: selectedLat.value,
    lon: selectedLon.value,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem('userLocation', JSON.stringify(locationData))
  router.back()
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

.content-map {
  --background: #f9f9f9;
  --padding-start: 0px;
  --padding-end: 0px;
  --padding-top: 0px;
  --padding-bottom: 0px;
  display: flex;
  flex-direction: column;
}

.leaflet-map {
  width: 100%;
  height: 60%;
  flex: 1;
  min-height: 300px;
}

:deep(.leaflet-pane) {
  pointer-events: none;
}

:deep(.leaflet-pane[aria-hidden="true"]) {
  pointer-events: none;
}

:deep(.leaflet-interactive) {
  pointer-events: auto;
}


.location-info-panel {
  background: #ffffff;
  padding: 20px 16px;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}

.info-section {
  margin-bottom: 16px;
}

.info-label {
  font-size: 12px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 15px;
  font-weight: 800;
  color: #5B18FE;
  margin: 0;
  word-break: break-all;
}


.btn-save {
  --background: #5B18FE;
  --border-radius: 10px;
  --color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  height: 48px;
  box-shadow: 0 4px 12px rgba(91, 24, 254, 0.2);
}

.btn-save:active {
  --background: #4a1399;
}

:deep(.leaflet-container) {
  background: #e5e3df;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
}

:deep(.leaflet-control-attribution) {
  font-size: 11px;
}

@media (max-width: 768px) {
  .leaflet-map {
    height: 50vh;
  }

  .location-info-panel {
    padding: 16px 12px;
  }
}
</style>