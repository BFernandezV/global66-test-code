import HomeView from '../views/PokedexView.vue'
import i18n from '@/plugins/i18n'
import { createRouter, createWebHistory } from 'vue-router'

const { t } = i18n.global

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

router.beforeEach((to, _from, next) => {
  document.title = to.name === 'home' ? t('pokedex.title') : t('welcome.title')

  if (to.path === '/') {
    next(REDIRECT_ROUTE)
  } else {
    next()
  }
})

export default router
