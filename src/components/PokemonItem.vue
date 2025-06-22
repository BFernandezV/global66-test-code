<script setup lang="ts">
  import type { PokemonListItem } from '@/interfaces/pokemon'
  import IconFavActive from './icons/IconFavActive.vue'
  import IconFavDisabled from './icons/IconFavDisabled.vue'

  defineProps<{
    pokemon: PokemonListItem
  }>()
</script>

<template>
  <article
    class="dark:bg-dark-carbon-grey mb-3 flex h-[60px] items-center justify-between rounded-md bg-white p-5 shadow"
  >
    <span class="text-light-dark-grey text-xl font-medium dark:text-white">{{ pokemon.name }}</span>

    <IconFavActive
      v-if="pokemon.favorite"
      class="cursor-pointer hover:opacity-75"
      @click="$emit('toggleFavorite', pokemon)"
    />

    <IconFavDisabled
      v-else
      class="cursor-pointer hover:opacity-75"
      @click="$emit('toggleFavorite', pokemon)"
    />
  </article>
</template>
