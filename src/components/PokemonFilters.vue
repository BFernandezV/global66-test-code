<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import IconList from './icons/IconList.vue'
  import IconStar from './icons/IconStar.vue'
  import { FilterType } from '@/enums/filters'
  import ButtonComponent from '@/components/ButtonComponent.vue'

  const { t } = useI18n()

  const emit = defineEmits(['allPokemons', 'favoritePokemons'])

  defineProps<{
    selectedFilterType: string
  }>()
</script>

<template>
  <div
    class="dark:bg-dark-carbon-grey flex h-[80px] w-full items-center justify-center gap-5 bg-white shadow"
  >
    <ButtonComponent
      type="primary"
      class-name="w-[150px] lg:w-[275px]"
      @click="emit('allPokemons')"
      :label="t('common.all')"
      :selected="selectedFilterType === FilterType.ALL"
    >
      <template #icon> <IconList class="me-2 h-[18px] w-[18px]" /> </template>
    </ButtonComponent>
    <ButtonComponent
      type="primary"
      :label="t('common.favorites')"
      class-name="w-[150px] lg:w-[275px]"
      @click="emit('favoritePokemons')"
      :selected="selectedFilterType === FilterType.FAVORITE"
    >
      <template #icon> <IconStar class="me-2 h-[18px] w-[18px]" /> </template
    ></ButtonComponent>
  </div>
</template>

<style scoped>
  .shadow {
    box-shadow: 0px -5px 4px 0px rgba(0, 0, 0, 0.05);
  }
</style>
