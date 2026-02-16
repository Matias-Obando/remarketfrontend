<template>
  <footer class="desktop-footer">
    <div class="footer-content">
      <span>© 2026 ReMarket</span>
      <nav>
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
        <a href="#">Contacto</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.desktop-footer {
  height: 50px;
  border-top: 1px solid #e5e5e5;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

nav a {
  margin-left: 16px;
  color: #666;
  text-decoration: none;
}

nav a:hover {
  color: var(--ion-color-primary);
}
</style>
