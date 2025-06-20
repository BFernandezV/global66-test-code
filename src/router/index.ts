import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const REDIRECT_PATH = '/welcome'

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
      name: 'about',
      component: () => import('../views/WelcomeView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { path } = to

  if (path === '/') {
    return next(REDIRECT_PATH)
  }

  next()
})

export default router
