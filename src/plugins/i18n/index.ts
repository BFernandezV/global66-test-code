import { createI18n } from 'vue-i18n'

import es from './locales/es.json'
import en from './locales/en.json'

const messages = {
  es,
  en,
}

const browserLocale = navigator.language
const storedLocale = localStorage.getItem('locale')
const locale = storedLocale || browserLocale.split('-')[0] || 'en'

const i18n = createI18n({
  locale: locale,
  fallbackLocale: 'es',
  legacy: false,
  messages,
})

export default i18n
