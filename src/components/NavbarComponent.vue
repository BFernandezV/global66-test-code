<script setup lang="ts">
  import { computed } from 'vue'
  import Popper from 'vue3-popper'
  import { Icon } from '@iconify/vue'
  import { useUIStore } from '@/stores/ui'
  import { useDark, useToggle } from '@vueuse/core'

  const uiStore = useUIStore()

  const isLoading = computed(() => uiStore.loading)

  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const togglePageMode = () => {
    toggleDark()
    localStorage.setItem('darkMode', isDark.value ? 'true' : 'false')
  }
</script>

<template>
  <header
    v-if="!isLoading"
    class="bg-light-background dark:bg-dark-background absolute top-0 right-0 z-10 flex items-center justify-between p-2"
  >
    <nav class="flex justify-end gap-2">
      <Popper>
        <button type="button" class="bg-light-blue dark:bg-light-green-white rounded-md p-1">
          <Icon
            icon="lucide:languages"
            class="dark:text-dark-carbon-grey text-blue text-2xl text-indigo-200"
          />
        </button>
        <template #content>
          <div>This is the Popper content</div>
        </template>
      </Popper>

      <button
        type="button"
        class="bg-light-blue dark:bg-light-green-white rounded-md p-1"
        @click="togglePageMode"
      >
        <Icon
          :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
          class="dark:text-dark-carbon-grey text-2xl text-indigo-200"
        />
      </button>
    </nav>
  </header>
</template>
