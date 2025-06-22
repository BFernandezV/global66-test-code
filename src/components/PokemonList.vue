<script setup lang="ts">
  import { RecycleScroller } from 'vue-virtual-scroller'
  import type { PokemonListItem } from '@/interfaces/pokemon'
  import PokemonItem from './PokemonItem.vue'

  defineProps<{
    pokemonList: PokemonListItem[] | null
    loading?: boolean
    hasNextPage?: boolean
  }>()

  const emit = defineEmits(['loadMore'])
</script>

<template>
  <section class="w-full max-w-4xl">
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
      <PokemonItem :pokemon="item" />
    </RecycleScroller>
    <div v-else-if="!pokemonList || pokemonList.length === 0" class="no-pokemons-message">
      No se encontraron Pokémon.
    </div>
  </section>
</template>

<style>
  .scroller {
    height: calc(100vh - 90px);
    overflow-y: hidden;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
  }
</style>
