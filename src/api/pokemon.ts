import pokemonApi from '@/plugins/axios'
import type { PokemonResponse, PokemonResponseList } from '@/interfaces/pokemon'

/**
 * Get Pokémon list from the API.
 * @param {Object} params - Pagination parameters.
 * @param {number} params.limit - Max number of Pokémon to fetch.
 * @param {number} params.offset - Offset for pagination.
 * @return {Promise<PokemonResponseList>} - Promise resolving to the Pokémon list.
 */
export const fetchPokemonList = async ({
  limit = 10000,
  offset = 0,
}: {
  limit: number
  offset: number
}): Promise<PokemonResponseList> => {
  try {
    const response = await pokemonApi.get(`/pokemon?limit=${limit}&offset=${offset}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Get Pokémon details by name .
 * @param {string} name - Pokémon name.
 * @return {Promise<PokemonResponse>} - Promise resolving to the Pokémon details.
 */
export const fetchPokemonByName = async (name: string): Promise<PokemonResponse> => {
  try {
    const response = await pokemonApi.get(`/pokemon/${name}`)
    return response.data
  } catch (error) {
    throw error
  }
}
