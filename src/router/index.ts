import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/splash' },

  { path: '/splash', component: () => import('@/views/SplashPage.vue') },
  { path: '/login', component: () => import('@/views/LoginPage.vue') },
  { path: '/register', component: () => import('@/views/RegisterPage.vue') },
  { path: '/forgot', component: () => import('@/views/ForgotPasswordPage.vue') },

  
  { path: '/verify', component: () => import('@/views/VerifyCodePage.vue') },

  // Shell (layout)
  {
    path: '/app',
    component: () => import('@/views/ShellPage.vue'),
    children: [
      // redirect relativo (más limpio)
      { path: '', redirect: 'tabs/tab1' },

      // Tabs dentro de /app
      {
        path: 'tabs',
        component: () => import('@/views/TabsPage.vue'),
        children: [
          //redirect relativo
          { path: '', redirect: 'tab1' },
          { path: 'tab1', component: () => import('@/views/Tab1Page.vue') },
          { path: 'tab2', component: () => import('@/views/Tab2Page.vue') },
          { path: 'tab3', component: () => import('@/views/Tab3Page.vue') },
          { path: 'favorites', component: () => import('@/views/FavoritesPage.vue') },
          { path: 'chat', component: () => import('@/views/ChatsPage.vue') },

        ],
      },

      // Detalle dentro de /app
      { path: 'product/:id', component: () => import('@/views/ProductDetailPage.vue') },

      // Flujo compra dentro de /app
      { path: 'checkout/:id', component: () => import('@/views/CheckoutPage.vue') },
      { path: 'payment/:id', component: () => import('@/views/PaymentPage.vue') },

      // Si quieres mostrar el id en success, lo dejamos con :id
      { path: 'success/:id', component: () => import('@/views/SuccessPage.vue') },

      //chat
      { path: 'chat', component: () => import('@/views/ChatsPage.vue') },
      { path: 'chat/:id', component: () => import('@/views/ChatThreadPage.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// guard simple: si no logueado no entra a /app
router.beforeEach((to) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  if (!loggedIn && to.path.startsWith('/app')) return '/login'
  return true
})

export default router
