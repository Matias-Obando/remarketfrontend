<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/tabs/tab1" />
          <ion-buttons slot="end">
          <ion-button fill="clear" @click="toggleFav">
              <ion-icon :icon="isFav ? heart : heartOutline" />
          </ion-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Producto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Imagemes carrusel -->
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

      <h2 class="title">Producto #{{ id }}</h2>
      <div class="price">99 €</div>
      <div class="actions">
       <ion-button expand="block" class="buyBtn" @click="buyNow">
          Comprar ahora
        </ion-button>

        <ion-button expand="block" class="btn" @click="contactSeller">
          Contactar vendedor
        </ion-button>

      </div>

      <p class="desc">
        Descripción del producto (placeholder). Aquí irá la info real.
      </p>

      <ion-button expand="block" class="btn">
        Contactar vendedor
      </ion-button>
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
  
} from '@ionic/vue'
import { useRoute,useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { heart, heartOutline } from 'ionicons/icons'
import { getFavoriteIds, toggleFavorite } from '@/services/favorites'
import { computed, ref } from 'vue'


const images = [
  'https://picsum.photos/seed/remarket1/800/500',
  'https://picsum.photos/seed/remarket2/800/500',
  'https://picsum.photos/seed/remarket3/800/500',
]


const route = useRoute()
const id = route.params.id

const pid = Number(id)
const favs = ref<number[]>(getFavoriteIds())
const isFav = computed(() => favs.value.includes(pid))

function toggleFav() {
  favs.value = toggleFavorite(pid)
}
const router = useRouter()

function buyNow() {
  router.replace(`/app/checkout/${pid}`)
}

function contactSeller() {
  router.push(`/app/chat/seller-1?product=${id}`)
}


</script>

<style scoped>
.image-box{
  height: 220px;
  background: #f2f2f2;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius: 12px;
}
.image-box ion-icon{
  font-size: 48px;
  opacity: .45;
}
.title{
  margin: 14px 0 6px 0;
  font-weight: 800;
}
.price{
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 10px;
}
.desc{
  opacity: .8;
}
.btn{
  margin-top: 16px;
  --border-radius: 999px;
}
.carouselWrap{
  margin-top: 8px;
}

.slideImg{
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
}

</style>
