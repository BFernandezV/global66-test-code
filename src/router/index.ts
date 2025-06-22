import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PokedexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue'),
    },
    // {
    //   path: '/',
    //   name: 'welcome',
    //   component: () => import('../views/WelcomeView.vue'),
    // },
  ],
})

export default router
