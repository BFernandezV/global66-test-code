<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import PokemonItem from './PokemonItem.vue'
  import { FilterType } from '@/enums/filters'
  import PokemonDetails from './PokemonDetails.vue'
  import { RecycleScroller } from 'vue-virtual-scroller'
  import type { PokemonListItem } from '@/interfaces/pokemon'
  import ButtonComponent from '@/components/ButtonComponent.vue'

  defineProps<{
    pokemonList: PokemonListItem[] | null
    loading?: boolean
    hasNextPage?: boolean
  }>()
  const emit = defineEmits<{
    (e: 'loadMore'): void
    (e: 'setFilterType', filterType: FilterType): void
  }>()

  const { t } = useI18n()

  const selectedPokemonName = ref<string>('')

  const openDetails = ref(false)

  const openPokemonDetails = (pokemonName: string) => {
    selectedPokemonName.value = pokemonName
    openDetails.value = true
  }
</script>

<template>
  <section class="w-full max-w-4xl grow">
    <RecycleScroller
      v-if="pokemonList && pokemonList.length > 0"
      ref="scrollerRef"
      class="scroller"
      :items="pokemonList"
      :item-size="72"
      key-field="name"
      v-slot="{ item }"
      @scroll-end="emit('loadMore')"
    >
      <PokemonItem :pokemon="item" @openPokemonDetails="openPokemonDetails" />
    </RecycleScroller>

    <div
      v-if="!pokemonList || pokemonList.length === 0"
      class="mt-6 flex w-full flex-col items-center justify-center text-center"
    >
      <h3 class="text-light-dark-grey text-4xl font-bold dark:text-white">
        {{ t('notFound.title') }}
      </h3>
      <p class="text-light-dark-grey font-regular mt-3 text-xl dark:text-white">
        {{ t('notFound.subtitle') }}
      </p>

      <ButtonComponent
        type="primary"
        class-name="w-[155px] mt-6"
        @click="emit('setFilterType', FilterType.ALL)"
        :label="t('common.goBackHome')"
      ></ButtonComponent>
    </div>
  </section>

  <PokemonDetails v-model:open="openDetails" :pokemonName="selectedPokemonName" />
</template>

<style>
  .scroller {
    height: calc(100vh - 212px);
    overflow: auto;

    scrollbar-width: none;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
</style>
