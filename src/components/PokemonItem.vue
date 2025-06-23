<script setup lang="ts">
  import { computed } from 'vue'
  import IconFavActive from './icons/IconFavActive.vue'
  import { useFavoritesStore } from '@/stores/favorites'
  import IconFavDisabled from './icons/IconFavDisabled.vue'
  import type { PokemonListItem } from '@/interfaces/pokemon'

  const props = defineProps<{
    pokemon: PokemonListItem
  }>()

  const emit = defineEmits<{
    (e: 'openPokemonDetails', pokemonName: string): void
  }>()

  const favoritesStore = useFavoritesStore()

  const isCurrentPokemonFavorite = computed(() => {
    return favoritesStore.isFavorite(props.pokemon.name)
  })
</script>

<template>
  <article
    class="dark:bg-dark-carbon-grey dark:hover:bg-dark-pale-grey hover:bg-light-smoke-white dark:hover:bg-dark-carbon-grey mb-3 flex h-[60px] cursor-pointer items-center justify-between rounded-md bg-white p-5 shadow"
    @click="emit('openPokemonDetails', pokemon.name)"
  >
    <span class="text-light-dark-grey text-xl font-medium dark:text-white">{{ pokemon.name }}</span>

    <IconFavActive
      v-if="isCurrentPokemonFavorite"
      class="cursor-pointer hover:opacity-75"
      @click.stop="favoritesStore.toggleFavorite(pokemon.name)"
    />

    <IconFavDisabled
      v-else
      class="cursor-pointer hover:opacity-75"
      @click.stop="favoritesStore.toggleFavorite(pokemon.name)"
    />
  </article>
</template>
