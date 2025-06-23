<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import ButtonComponent from '@/components/ButtonComponent.vue'

  const router = useRouter()
  const { t } = useI18n()

  const redirectToHome = () => {
    router.push({ name: 'home' })
  }
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-20"
    style="height: calc(100vh - 42px)"
  >
    <img class="ml-7" src="@/assets/images/pikachu.webp" alt="pikachu_logo" />

    <div class="flex w-80 flex-col items-center justify-center gap-6 text-center md:w-1/3">
      <h1 class="text-light-dark-grey text-3xl font-bold dark:text-white">
        {{ t('welcome.title') }}
      </h1>
      <p class="text-light-carbon-grey dark:text-dark-green-white text-lg">
        {{ t('welcome.subtitle') }}
      </p>

      <ButtonComponent
        type="primary"
        class-name="mt-4"
        @click="redirectToHome"
        :label="t('welcome.getStarted')"
      />
    </div>
  </section>
</template>

<style></style>
