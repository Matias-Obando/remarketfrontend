<template>
  <footer class="desktop-footer" :class="{ 'hidden': isOnChatDetailPage }">
    <div class="footer-content">
      <div class="footer-left">
        <span class="footer-brand">© 2026 ReMarket</span>
      </div>
      <nav class="footer-nav">
        <a href="#" class="footer-link">Privacidad</a>
        <span class="footer-divider">•</span>
        <a href="#" class="footer-link">Términos</a>
        <span class="footer-divider">•</span>
        <a href="#" class="footer-link">Contacto</a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isOnChatDetailPage = computed(() => {
  return route.path.match(/\/chat\/seller-[0-9]+/) || route.path.includes('/chat/seller-')
})
</script>

<style scoped>
.desktop-footer {
  height: 70px;
  border-top: 3px solid #5B18FE;
  background: linear-gradient(135deg, #5B18FE 0%);
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 -4px 16px rgba(91, 24, 254, 0.15);
}

.footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
}

.footer-brand {
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.footer-nav {
  display: flex;
  align-items: center;
  gap: 0;
}

.footer-link {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 8px 12px;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.footer-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.footer-divider {
  color: rgba(255, 255, 255, 0.4);
  margin: 0 4px;
  font-weight: 300;
}

.desktop-footer.hidden {
  display: none !important;
}

@media (max-width: 768px) {
  .desktop-footer {
    display: none;
  }

  .footer-nav {
    display: none;
  }
}

@media (min-width: 769px) {
  .desktop-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
  }
}
</style>