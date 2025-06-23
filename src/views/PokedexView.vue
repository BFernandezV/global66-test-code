<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { toast } from 'vue3-toastify'
  import { useDark } from '@vueuse/core'
  import { useUIStore } from '@/stores/ui'
  import { computed, ref, watch } from 'vue'
  import { FilterType } from '@/enums/filters'
  import { fetchPokemonByName } from '@/api/pokemon'
  import SearchBar from '@/components/SearchBar.vue'
  import { useFavoritesStore } from '@/stores/favorites'
  import PokemonList from '@/components/PokemonList.vue'
  import type { PokemonListItem } from '@/interfaces/pokemon'
  import PokemonFilters from '@/components/PokemonFilters.vue'
  import { capitalizeFirstLetter } from '@/utils/string.utils'
  import LoaderComponent from '@/components/LoaderComponent.vue'
  import { usePokemonListQuery } from '@/composables/usePokemonQueries'
  import PokemonListSkeleton from '@/components/PokemonListSkeleton.vue'

  const uiStore = useUIStore()
  const favoritesStore = useFavoritesStore()

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonListQuery()

  const isDark = useDark()

  const selectedFilterType = ref(FilterType.ALL)

  const searchTerm = ref('')

  const { t } = useI18n()

  const searchBar = ref<InstanceType<typeof SearchBar> | null>(null)
  const loadingSearch = ref(false)

  uiStore.loading = true

  const filteredPokemonList = ref<PokemonListItem[]>([])

  const allPokemons = computed<PokemonListItem[]>(() => {
    return data.value?.pages.flatMap(page => page.results) || []
  })

  watch(
    [
      selectedFilterType,
      searchTerm,
      allPokemons,
      computed(() => favoritesStore.getFavoritePokemons()),
    ],
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
      toast(t('pokedex.errorFetch'), {
        theme: isDark.value ? 'dark' : 'light',
        type: 'error',
        autoClose: 1000,
      })
    }
  })

  const searchPokemon = async (): Promise<PokemonListItem[]> => {
    loadingSearch.value = true
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

    setTimeout(() => {
      loadingSearch.value = false
    }, 500)

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
  <Transition name="fade" mode="out-in">
    <section v-if="!uiStore.loading" class="flex grow flex-col items-center justify-center">
      <div class="flex w-4/5 grow flex-col items-center justify-center gap-5 md:w-2/3">
        <SearchBar ref="searchBar" v-model:searchTerm="searchTerm" @setFilterType="setFilterType" />
        <PokemonList
          v-if="!loadingSearch"
          :pokemon-list="filteredPokemonList"
          :loading="isFetchingNextPage"
          :has-next-page="hasNextPage"
          :selected-filter-type="selectedFilterType"
          @loadMore="fetchNextPage"
          @setFilterType="setFilterType"
        />
        <PokemonListSkeleton v-else />
      </div>

      <Transition name="fade" mode="out-in">
        <PokemonFilters
          v-if="
            selectedFilterType !== FilterType.SEARCH ||
            (selectedFilterType === FilterType.SEARCH && loadingSearch)
          "
          :selectedFilterType="selectedFilterType"
          @setFilterType="setFilterType"
        />
      </Transition>
    </section>

    <LoaderComponent v-else />
  </Transition>
</template>
