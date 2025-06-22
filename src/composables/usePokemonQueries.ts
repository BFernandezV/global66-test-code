import { useInfiniteQuery } from '@tanstack/vue-query'
import { fetchPokemonList } from '@/api/pokemon'

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
      const limit = 200
      const data = await fetchPokemonList({ limit, offset: pageParam })
      return {
        results: data.results.map(pokemon => ({ ...pokemon, favorite: false })),
        nextOffset: pageParam + limit,
        hasMore: data.next !== null,
      }
    },
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined
    },
    staleTime: 1000 * 60 * 5,
  })
}
