<template>
  <ion-page>
    <ion-content fullscreen class="splash">
      <div class="center">
        <ion-spinner name="crescent" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.replace('/login')
  }, 900)
})

</script>

<style scoped>
.splash {
  --background: #5B18FE;
}
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
