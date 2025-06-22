// src/lib/axios.ts
import axios from 'axios'

const pokemonApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default pokemonApi
