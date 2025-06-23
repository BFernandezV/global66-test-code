<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { toast } from 'vue3-toastify'
  import { useDark } from '@vueuse/core'
  import { computed, ref, watch } from 'vue'
  import IconClose from './icons/IconClose.vue'
  import IconFavActive from './icons/IconFavActive.vue'
  import { useFavoritesStore } from '@/stores/favorites'
  import IconFavDisabled from './icons/IconFavDisabled.vue'
  import { capitalizeFirstLetter } from '@/utils/string.utils'
  import ButtonComponent from '@/components/ButtonComponent.vue'
  import PokemonBackground from '@/assets/images/pokemonBackground.webp'
  import { usePokemonDetailsQuery } from '@/composables/usePokemonQueries'
  import type { Pokemon, PokemonDescriptionInfo, Type } from '@/interfaces/pokemon'

  const props = defineProps<{
    open: boolean
    pokemonName: string
  }>()

  const DESCRIPTION_DATA: Record<string, PokemonDescriptionInfo> = {
    name: {
      name: 'name',
      label: 'pokemonDetails.name',
    },

    weight: {
      name: 'weight',
      label: 'pokemonDetails.weight',
    },
    height: {
      name: 'height',
      label: 'pokemonDetails.height',
    },
    types: {
      name: 'types',
      label: 'pokemonDetails.types',
      format: (types: Type[]) =>
        types.map((type: Type) => capitalizeFirstLetter(type.type.name)).join(', '),
    },
  }

  const emit = defineEmits<{
    (e: 'update:open', open: boolean): void
  }>()

  const isDark = useDark()

  const isImageLoaded = ref(false)

  const { t } = useI18n()
  const favoritesStore = useFavoritesStore()

  const { data, isLoading, isError } = usePokemonDetailsQuery({
    name: computed(() => props.pokemonName),
    enabled: computed(() => props.open),
  })

  const pokemon = computed<Pokemon>(() => {
    if (isLoading.value || isError.value || !data.value) {
      return {
        id: 0,
        name: null,
        weight: null,
        height: null,
        types: [],
        image: '',
      } as Pokemon
    }

    return {
      id: data.value.id,
      name: capitalizeFirstLetter(data.value.name),
      weight: data.value.weight,
      height: data.value.height,
      types: data.value.types,
      image: data.value.sprites.other?.['official-artwork']?.front_default,
    }
  })

  const isCurrentPokemonFavorite = computed(() => {
    return favoritesStore.isFavorite(props.pokemonName)
  })

  const openPivot = computed({
    get() {
      return props.open
    },
    set(newValue) {
      emit('update:open', newValue)
    },
  })

  const copyPokemon = () => {
    const pokemonTypeData = pokemon.value.types.map((type: Type) => type.type.name).join(', ')

    const copyText =
      `Name: ${pokemon.value.name},\n` +
      `Weight: ${pokemon.value.weight},\n` +
      `Height: ${pokemon.value.height},\n` +
      `Types: ${pokemonTypeData}\n`

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toast(t('pokemonDetails.successCopy'), {
          theme: isDark.value ? 'dark' : 'light',
          type: 'info',
          autoClose: 1000,
        })
      })
      .catch(() => {
        toast(t('pokemonDetails.errorCopy'), {
          theme: isDark.value ? 'dark' : 'light',
          type: 'error',
          autoClose: 1000,
        })
      })
  }

  const cleanData = () => {
    isImageLoaded.value = false
  }

  const toggleFavorite = () => {
    if (!pokemon.value.name) return
    favoritesStore.toggleFavorite(pokemon.value.name)
  }

  watch(
    () => props.open,
    newValue => {
      if (!newValue) {
        cleanData()
      }
    },
  )

  watch(
    () => isError.value,
    newValue => {
      if (newValue) {
        toast(t('pokemonDetails.errorFetch'), {
          theme: isDark.value ? 'dark' : 'light',
          type: 'error',
          autoClose: 1000,
        })
      }
    },
  )
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <section
        v-if="openPivot"
        class="bg-light-dark-grey/75 absolute top-1/2 left-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
      >
        <article
          class="dark:bg-dark-carbon-grey relative flex h-2/3 w-5/6 flex-col items-center rounded-md bg-white shadow-lg md:w-2/5"
        >
          <header class="relative h-2/4 w-full">
            <ButtonComponent
              type="icon"
              @click="openPivot = false"
              class-name="absolute right-3 top-5"
            >
              <template #icon> <IconClose class="h-[26px] w-[26px] hover:opacity-75" /> </template>
            </ButtonComponent>
            <img
              :src="PokemonBackground"
              class="h-full rounded-md rounded-br-none rounded-bl-none object-cover"
              alt="pokemon_background"
            />
            <img
              :src="pokemon.image"
              class="hide-text absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 object-contain"
              alt="pokemon_image"
              loading="lazy"
              @load="isImageLoaded = true"
            />

            <div
              v-if="!isImageLoaded"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div
                class="border-light-green-white h-10 w-10 animate-spin rounded-full border-4 border-t-transparent dark:border-white"
              ></div>
            </div>
          </header>

          <section class="flex w-full grow flex-col px-7 py-5">
            <div
              v-for="(descriptionInfo, index) in DESCRIPTION_DATA"
              :key="index"
              class="mb-3 flex flex-col items-start justify-center gap-2"
            >
              <div class="flex items-center gap-2">
                <h3 class="text-light-carbon-grey text-lg font-bold dark:text-white">
                  {{ t(descriptionInfo.label) }}:
                </h3>
                <p class="text-light-carbon-grey text-lg dark:text-white">
                  {{
                    descriptionInfo.format && pokemon[descriptionInfo.name]
                      ? descriptionInfo.format(pokemon[descriptionInfo.name]) || '-'
                      : (pokemon[descriptionInfo.name] ?? '-')
                  }}
                </p>
              </div>

              <hr class="bg-light-green-white h-[1px] w-full border-t-0 dark:bg-white/10" />
            </div>
            <footer class="mt-3 flex grow items-center justify-between">
              <ButtonComponent
                type="primary"
                class-name="w-[195px] md:w-[250px] xs:text-xs"
                @click="copyPokemon"
                :disabled="!pokemon.name"
                :label="t('pokemonDetails.shareWithFriends')"
              >
              </ButtonComponent>
              <IconFavActive
                v-if="isCurrentPokemonFavorite"
                class="cursor-pointer hover:opacity-75"
                @click="toggleFavorite"
              />

              <IconFavDisabled
                v-else
                class="cursor-pointer hover:opacity-75"
                @click="toggleFavorite"
              />
            </footer>
          </section>
        </article>
      </section>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .hide-text {
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
