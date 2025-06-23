import { createI18n } from 'vue-i18n'

import es from './locales/es.json'
import en from './locales/en.json'

const messages = {
  es,
  en,
}

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'es',
  legacy: false,
  messages,
})

export default i18n
