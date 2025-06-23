import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PokedexView.vue'

const REDIRECT_ROUTE = '/welcome'

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
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next(REDIRECT_ROUTE)
  } else {
    next()
  }
})

export default router
