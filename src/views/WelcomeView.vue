<script setup lang="ts">
  import { useUIStore } from '@/stores/ui'
  import { useI18n } from 'vue-i18n'
  //import router from vue router
  import { useRouter } from 'vue-router'
  import ButtonComponent from '@/components/ButtonComponent.vue'

  const uiStore = useUIStore()

  const router = useRouter()
  const { t } = useI18n()

  const redirectToHome = () => {
    uiStore.loading = true
    router.push({ name: 'home' })
  }
</script>

<template>
  <section class="flex h-screen flex-col items-center justify-center gap-20">
    <img class="ml-7" src="@/assets/images/pikachu.webp" alt="pikachu_logo" />

    <div class="flex w-80 flex-col items-center justify-center gap-4 text-center">
      <h1 class="text-light-dark-grey text-3xl font-bold dark:text-white">
        {{ t('welcome.title') }}
      </h1>
      <p class="text-light-carbon-grey dark:text-dark-green-white text-lg">
        {{ t('welcome.subtitle') }}
      </p>

      <ButtonComponent type="primary" @click="redirectToHome" :label="t('welcome.getStarted')" />
    </div>
  </section>
</template>

<style></style>
