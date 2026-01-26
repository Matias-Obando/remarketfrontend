import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/splash'
  },
  {
    path: '/splash',
    component:() => import ('@/views/SplashPage.vue')
  },
  {
    path: '/login',
    component:() => import ('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    component:() => import ('@/views/RegisterPage.vue')
  },
  {
  path: '/forgot',
  component: () => import('@/views/ForgotPasswordPage.vue')
},
{
  path: '/product/:id',
  component: () => import('@/views/ProductDetailPage.vue')
},


  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
       path: 'favorites',
       component: () => import('@/views/FavoritesPage.vue')
      }

      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

//si no hay login ,no entra a inicio o tabs

router.beforeEach((to) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  
  if (!loggedIn && to.path.startsWith('/tabs')) {
    return '/login';
  }
/* comentado porque queremos ver siempre login al desarrollar
  if (loggedIn && to.path === '/login') {
    return '/tabs/tab1';
  }*/
});

export default router
