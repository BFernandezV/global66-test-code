import type { ComputedRef } from 'vue'
import { capitalizeFirstLetter } from '@/utils/string.utils'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { fetchPokemonList, fetchPokemonByName } from '@/api/pokemon'

const CACHE_TIME = import.meta.env.VITE_CACHE_TIME

/**
 * * Composable to fetch a paginated list of Pokémon.
 * * Uses `useInfiniteQuery` to support infinite scrolling or pagination.
 *  * @returns {import('@tanstack/vue-query').UseInfiniteQueryResult}
 * * */
export function usePokemonListQuery() {
  return useInfiniteQuery({
    queryKey: ['pokemonList'],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const limit = 300
      const data = await fetchPokemonList({ limit, offset: pageParam })
      return {
        results: data.results.map(pokemon => ({ name: capitalizeFirstLetter(pokemon.name) })),
        nextOffset: pageParam + limit,
        hasMore: data.next !== null,
      }
    },
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined
    },
    staleTime: CACHE_TIME,
  })
}

/**
 * * Composable to fetch details of a specific Pokémon by name.
 * * Uses `useQuery` to fetch data for a single Pokémon.
 *  * @param {Object} params - Parameters for the query.
 *  * @param {string} params.name - Name of the Pokémon to fetch.
 *  * @param {ComputedRef<boolean>} params.enabled - Whether the query should be enabled.
 *  * @returns {import('@tanstack/vue-query').UseQueryResult}
 * */
export function usePokemonDetailsQuery({
  name,
  enabled,
}: {
  name: ComputedRef<string> | string
  enabled: ComputedRef<boolean> | boolean
}) {
  return useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: () =>
      fetchPokemonByName(typeof name === 'object' && 'value' in name ? name.value : name),
    staleTime: CACHE_TIME,
    enabled,
  })
}
