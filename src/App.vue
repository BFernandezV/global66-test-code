<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
  import NavbarComponent from '@/components/NavbarComponent.vue'

  import { useFavoritesStore } from './stores/favorites'
  import { useUIStore } from './stores/ui'

  const uiStore = useUIStore()

  const favoritesStore = useFavoritesStore()

  favoritesStore.init()
</script>

<template>
  <main class="bg-light-background dark:bg-dark-background flex h-screen flex-col">
    <NavbarComponent v-if="!uiStore.loading" />

    <RouterView v-slot="{ Component }" mode="out-in">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

    <VueQueryDevtools />
  </main>
</template>

<style scoped></style>
