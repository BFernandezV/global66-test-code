import { describe, it, expect, vi, beforeEach, Mocked } from 'vitest'
import { fetchPokemonByName, fetchPokemonList } from '../../../src/api/pokemon'
import pokemonApi from '../../../src/plugins/axios'
import { PokemonResponseList } from '../../../src/interfaces/pokemon'

vi.mock('@/plugins/axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('fetchPokemonList', () => {
  const mockedPokemonApi = pokemonApi as Mocked<typeof pokemonApi>

  beforeEach(() => {
    mockedPokemonApi.get.mockClear()
  })

  it('makes a get request to fetch the pokemon list', async () => {
    const mockResponseData: PokemonResponseList = {
      count: 2,
      next: null,
      previous: null,
      results: [{ name: 'bulbasaur' }, { name: 'charmander' }],
    }

    mockedPokemonApi.get.mockResolvedValueOnce({ data: mockResponseData })

    const result = await fetchPokemonList({ limit: 2, offset: 0 })

    expect(mockedPokemonApi.get).toHaveBeenCalledWith('/pokemon?limit=2&offset=0')
    expect(result).toEqual(mockResponseData)
  })

  it('throws an error if the API request fails', async () => {
    mockedPokemonApi.get.mockRejectedValueOnce(new Error('Network Error'))

    await expect(fetchPokemonList({ limit: 2, offset: 0 })).rejects.toThrow('Network Error')
  })
})

describe('fetchPokemonByName', () => {
  const mockedPokemonApi = pokemonApi as Mocked<typeof pokemonApi>
  beforeEach(() => {
    mockedPokemonApi.get.mockClear()
  })

  it('makes a get request to fetch a pokemon by name', async () => {
    const mockResponseData = { name: 'pikachu', id: 25 }

    mockedPokemonApi.get.mockResolvedValueOnce({ data: mockResponseData })

    const result = await fetchPokemonByName('pikachu')

    expect(mockedPokemonApi.get).toHaveBeenCalledWith('/pokemon/pikachu')
    expect(result).toEqual(mockResponseData)
  })

  it('throws an error if the API request fails', async () => {
    mockedPokemonApi.get.mockRejectedValueOnce(new Error('Network Error'))

    await expect(fetchPokemonByName('pikachu')).rejects.toThrow('Network Error')
  })
})
