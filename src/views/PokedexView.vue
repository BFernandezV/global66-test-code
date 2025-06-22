<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useUIStore } from '@/stores/ui'
  import { FilterType } from '@/enums/filters'
  import SearchBar from '@/components/SearchBar.vue'
  import PokemonList from '@/components/PokemonList.vue'
  import PokemonFilters from '@/components/PokemonFilters.vue'
  import { usePokemonListQuery } from '@/composables/usePokemonQueries'

  const uiStore = useUIStore()

  uiStore.loading = true

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonListQuery()

  const selectedFilterType = ref(FilterType.ALL)

  const pokemonList = computed(() => {
    return data.value?.pages.flatMap(page => page.results) || []
  })

  watch(isLoading, (newValue: boolean) => {
    if (!newValue) {
      setTimeout(() => {
        uiStore.loading = false
      }, 2000)
    }
  })

  watch(isError, (newValue: boolean) => {
    if (newValue) {
      console.error('Error fetching data:', error.value)
    }
  })

  const filterFavoritePokemons = () => {
    selectedFilterType.value = FilterType.FAVORITE
    console.log('Filter favorite pokemons')
  }

  const getAllPokemons = () => {
    selectedFilterType.value = FilterType.ALL
    console.log('Get all pokemons')
  }
</script>

<template>
  <section class="flex h-screen flex-col items-center justify-center">
    <div class="flex w-4/5 grow flex-col items-center justify-center md:w-2/3">
      <SearchBar />
      <PokemonList
        :pokemon-list="pokemonList"
        :loading="isFetchingNextPage"
        :has-next-page="hasNextPage"
        class="grow"
        @loadMore="fetchNextPage"
      />
    </div>

    <PokemonFilters
      :selectedFilterType="selectedFilterType"
      @allPokemons="getAllPokemons"
      @favoritePokemons="filterFavoritePokemons"
    />
  </section>
</template>
