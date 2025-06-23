import type { PokemonListItem } from '@/interfaces/pokemon'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoritePokemonNames = ref<string[]>([])

  const init = () => {
    const storedFavorites = localStorage.getItem('favoritePokemonNames')
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites)
      parsedFavorites.forEach((name: string) => favoritePokemonNames.value.push(name))
    }
  }

  const toggleFavorite = (name: string) => {
    if (isFavorite(name)) {
      removeFavorite(name)
    } else {
      addFavorite(name)
    }
  }

  const addFavorite = (name: string) => {
    if (isFavorite(name)) return
    favoritePokemonNames.value.push(name)
    localStorage.setItem('favoritePokemonNames', JSON.stringify(favoritePokemonNames.value))
  }

  const removeFavorite = (name: string) => {
    favoritePokemonNames.value = favoritePokemonNames.value.filter(n => n !== name)
    localStorage.setItem('favoritePokemonNames', JSON.stringify(favoritePokemonNames.value))
  }

  const getRichPokemons = (pokemons: PokemonListItem[]) => {
    return pokemons.map(pokemon => ({
      ...pokemon,
      favorite: isFavorite(pokemon.name),
    }))
  }

  const getFavoritePokemons = (): PokemonListItem[] => {
    return favoritePokemonNames.value.map(name => ({
      name,
    }))
  }

  const isFavorite = (name: string) => {
    return favoritePokemonNames.value.includes(name)
  }

  return {
    favoritePokemonNames,
    init,
    toggleFavorite,
    isFavorite,
    getRichPokemons,
    getFavoritePokemons,
  }
})
