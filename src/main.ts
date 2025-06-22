import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/plugins/i18n'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { RecycleScroller } from 'vue-virtual-scroller'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)

app.component('RecycleScroller', RecycleScroller)

app.mount('#app')
