import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('UI', () => {
  const loading = ref(false)

  return { loading }
})
