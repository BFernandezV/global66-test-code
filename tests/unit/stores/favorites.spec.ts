import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFavoritesStore } from '../../../src/stores/favorites'
import type { PokemonListItem } from '../../../src/interfaces/pokemon'

describe('useFavoritesStore', () => {
  let setItemSpy: ReturnType<typeof vi.spyOn>
  let getItemSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    setActivePinia(createPinia())
    setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {})
    getItemSpy = vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => null)
  })

  describe('init', () => {
    it('should initialize the store with favorites from localStorage if they exist', () => {
      getItemSpy.mockImplementation(() => JSON.stringify(['squirtle', 'jigglypuff']))

      const store = useFavoritesStore()
      store.init()

      expect(store.favoritePokemonNames).toEqual(['squirtle', 'jigglypuff'])
    })

    it('should initialize the store as empty if no favorites in localStorage', () => {
      const store = useFavoritesStore()
      store.init()

      expect(store.favoritePokemonNames).toEqual([])
    })

    it('should not add duplicates if init is called multiple times with the same data', () => {
      getItemSpy.mockImplementation(() => JSON.stringify(['mewtwo']))
      const store = useFavoritesStore()
      store.init()
      store.init()

      expect(store.favoritePokemonNames).toEqual(['mewtwo'])
      expect(store.favoritePokemonNames.length).toBe(1)
    })
  })

  describe('localStorage interactions', () => {
    it('addFavorite should save favorites to localStorage', () => {
      const store = useFavoritesStore()
      store.addFavorite('snorlax')
      expect(setItemSpy).toHaveBeenCalledWith('favoritePokemonNames', '["snorlax"]')
    })

    it('removeFavorite should update favorites in localStorage', () => {
      getItemSpy.mockImplementation(() => JSON.stringify(['snorlax', 'onix']))
      const store = useFavoritesStore()
      store.init()

      setItemSpy.mockClear()

      store.removeFavorite('snorlax')
      expect(setItemSpy).toHaveBeenCalledWith('favoritePokemonNames', '["onix"]')
    })

    it('toggleFavorite should save changes to localStorage when adding', () => {
      const store = useFavoritesStore()
      store.toggleFavorite('eevee')
      expect(setItemSpy).toHaveBeenCalledWith('favoritePokemonNames', '["eevee"]')
    })

    it('toggleFavorite should save changes to localStorage when removing', () => {
      getItemSpy.mockImplementation(() => JSON.stringify(['eevee', 'lapras']))
      const store = useFavoritesStore()
      store.init()

      setItemSpy.mockClear()

      store.toggleFavorite('eevee')
      expect(setItemSpy).toHaveBeenCalledWith('favoritePokemonNames', '["lapras"]')
    })
  })

  describe('addFavorite behavior', () => {
    it('should not add a Pokémon if it is already a favorite', () => {
      const store = useFavoritesStore()
      store.addFavorite('mew')
      store.addFavorite('mew')
      expect(store.favoritePokemonNames).toEqual(['mew'])
      expect(store.favoritePokemonNames.length).toBe(1)
    })

    it('isFavorite returns true if the Pokémon is a favorite', () => {
      const store = useFavoritesStore()
      store.addFavorite('charmander')
      expect(store.isFavorite('charmander')).toBe(true)
      expect(store.isFavorite('pikachu')).toBe(false)
    })

    it('getFavoritePokemons returns the list of favorites', () => {
      const store = useFavoritesStore()
      store.addFavorite('pikachu')
      store.addFavorite('bulbasaur')
      const favs = store.getFavoritePokemons()
      expect(favs).toEqual([{ name: 'pikachu' }, { name: 'bulbasaur' }])
    })
  })

  describe('getRichPokemons', () => {
    it('should correctly mark Pokémon as favorites in the enriched list', () => {
      const store = useFavoritesStore()
      store.addFavorite('charizard')
      store.addFavorite('blastoise')

      const allPokemons: PokemonListItem[] = [
        { name: 'charizard' },
        { name: 'venusaur' },
        { name: 'blastoise' },
        { name: 'articuno' },
      ]

      const richPokemons = store.getRichPokemons(allPokemons)

      expect(richPokemons).toEqual([
        { name: 'charizard', favorite: true },
        { name: 'venusaur', favorite: false },
        { name: 'blastoise', favorite: true },
        { name: 'articuno', favorite: false },
      ])
    })

    it('should return an empty list if the input is an empty list', () => {
      const store = useFavoritesStore()
      const richPokemons = store.getRichPokemons([])
      expect(richPokemons).toEqual([])
    })
  })
})
