<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useUIStore } from '@/stores/ui'
  import { FilterType } from '@/enums/filters'
  import SearchBar from '@/components/SearchBar.vue'
  import PokemonList from '@/components/PokemonList.vue'
  import PokemonFilters from '@/components/PokemonFilters.vue'
  import { usePokemonListQuery } from '@/composables/usePokemonQueries'
  import type { PokemonListItem } from '@/interfaces/pokemon'
  import { useFavoritesStore } from '@/stores/favorites'
  import { fetchPokemonByName } from '@/api/pokemon'
  import { capitalizeFirstLetter } from '@/utils/string.utils'

  const uiStore = useUIStore()
  const favoritesStore = useFavoritesStore()

  uiStore.loading = true

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonListQuery()

  const selectedFilterType = ref(FilterType.ALL)

  const searchTerm = ref('')

  const searchBar = ref<InstanceType<typeof SearchBar> | null>(null)

  const filteredPokemonList = ref<PokemonListItem[]>([])

  const allPokemons = computed<PokemonListItem[]>(() => {
    return data.value?.pages.flatMap(page => page.results) || []
  })

  watch(
    [selectedFilterType, searchTerm, allPokemons],
    async () => {
      if (selectedFilterType.value === FilterType.FAVORITE) {
        filteredPokemonList.value = favoritesStore.getFavoritePokemons()
      } else if (selectedFilterType.value === FilterType.SEARCH) {
        filteredPokemonList.value = await searchPokemon()
      } else {
        filteredPokemonList.value = allPokemons.value
      }
    },
    { immediate: true },
  )

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

  const searchPokemon = async (): Promise<PokemonListItem[]> => {
    const search = searchTerm.value.toLowerCase()
    const results = new Set<string>()

    try {
      const result = await fetchPokemonByName(searchTerm.value)
      results.add(capitalizeFirstLetter(result.name))
    } catch (error) {
      console.warn('Error in searchPokemon:', error)
    }

    const partialMatches = allPokemons.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search),
    )

    partialMatches.forEach(pokemon => results.add(pokemon.name))

    const resultsArray = Array.from(results)

    return resultsArray.map(name => {
      return {
        name,
      }
    })
  }

  const setFilterType = (filterType: FilterType) => {
    selectedFilterType.value = filterType

    if (filterType === FilterType.ALL) {
      searchTerm.value = ''
      searchBar.value?.clearInput()
    }
  }
</script>

<template>
  <section class="flex h-screen flex-col items-center justify-center">
    <div class="flex w-4/5 grow flex-col items-center justify-center gap-5 md:w-2/3">
      <SearchBar ref="searchBar" v-model:searchTerm="searchTerm" @setFilterType="setFilterType" />
      <PokemonList
        :pokemon-list="filteredPokemonList"
        :loading="isFetchingNextPage"
        :has-next-page="hasNextPage"
        @loadMore="fetchNextPage"
        @setFilterType="setFilterType"
      />
    </div>

    <PokemonFilters :selectedFilterType="selectedFilterType" @setFilterType="setFilterType" />
  </section>
</template>
