<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterView } from 'vue-router'
  import { useUIStore } from './stores/ui'
  import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
  import NavbarComponent from '@/components/NavbarComponent.vue'
  import LoaderComponent from '@/components/LoaderComponent.vue'
  import { useFavoritesStore } from './stores/favorites'

  const uiStore = useUIStore()
  const favoritesStore = useFavoritesStore()

  const isLoading = computed(() => uiStore.loading)
  favoritesStore.init()
</script>

<template>
  <main class="bg-light-background dark:bg-dark-background h-full">
    <Transition name="fade">
      <NavbarComponent />
    </Transition>

    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>

    <Transition name="fade">
      <LoaderComponent v-if="isLoading" />
    </Transition>

    <VueQueryDevtools />
  </main>
</template>

<style scoped></style>
