<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterView } from 'vue-router'
  import { useUIStore } from './stores/ui'
  import NavbarComponent from '@/components/NavbarComponent.vue'
  import LoaderComponent from '@/components/LoaderComponent.vue'

  const uiStore = useUIStore()

  const isLoading = computed(() => uiStore.loading)
</script>

<template>
  <main class="bg-light-background dark:bg-dark-background h-full">
    <NavbarComponent />
    <RouterView />
    <LoaderComponent v-if="isLoading" />
  </main>
</template>

<style scoped></style>
