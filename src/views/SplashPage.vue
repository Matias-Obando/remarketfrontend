<template>
  <ion-page>
    <ion-content fullscreen class="splash">
      <div class="wrap">
        
        <ion-spinner
          v-if="step === 0"
          class="spinner"
          name="crescent"
        />

        
        <div v-else class="logoBlock">
          <img class="logo" :src="logo" alt="ReMarket" />
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { IonPage, IonContent, IonSpinner } from "@ionic/vue"
import logo from "@/assets/Logo.png" 
const router = useRouter()
const step = ref(0)

let t1: number | undefined
let t2: number | undefined

onMounted(() => {
 
  t1 = window.setTimeout(() => {
    step.value = 1
  }, 1200)


  t2 = window.setTimeout(() => {
    router.replace("/login")
  }, 2200)
})

onBeforeUnmount(() => {
  if (t1) clearTimeout(t1)
  if (t2) clearTimeout(t2)
})
</script>

<style scoped>
.splash {
  --background: #5B18FE !important; 
}

.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.spinner {
  width: 84px;
  height: 84px;
  color: rgba(255, 255, 255, 0.95);
}


.logoBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeUp 260ms ease-out;
}

.logo {
  width: min(240px, 70vw);
  height: auto;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
