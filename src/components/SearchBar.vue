<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDebounceFn } from '@vueuse/core'
  import { FilterType } from '@/enums/filters'
  import IconSearch from './icons/IconSearch.vue'

  const { t } = useI18n()

  const emit = defineEmits<{
    (e: 'update:searchTerm', searchTerm: string): void
    (e: 'setFilterType', filterType: FilterType): void
  }>()

  const searchInput = ref('')
  const searching = ref(false)
  const searchInputRef = ref<HTMLInputElement | null>(null)

  const debouncedSearch = useDebounceFn(() => {
    searching.value = false
    emit('update:searchTerm', searchInput.value)
    if (searchInput.value.trim() === '') {
      emit('setFilterType', FilterType.ALL)
    } else {
      emit('setFilterType', FilterType.SEARCH)
    }
  }, 1000)

  const clearInput = () => {
    searchInput.value = ''
  }

  const searchInputHandler = () => {
    searching.value = true
    debouncedSearch()
  }

  defineExpose({
    clearInput,
  })
</script>

<template>
  <div class="mt-5 w-full max-w-4xl min-w-[200px]">
    <div class="relative flex items-center">
      <IconSearch class="top-3.6 absolute left-2.5 h-5 w-5 text-slate-600" />

      <input
        ref="searchInputRef"
        v-model="searchInput"
        class="ease dark:bg-dark-carbon-grey text-md h-[50px] w-full rounded-md border border-slate-200 bg-white py-2 pr-3 pl-10 text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none dark:text-white dark:placeholder:text-white"
        :placeholder="t('common.search')"
        @input="searchInputHandler"
      />

      <div v-if="searching" class="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2">
        <div
          class="border-light-green-white h-5 w-5 animate-spin rounded-full border-4 border-t-transparent dark:border-white"
        ></div>
      </div>
    </div>
  </div>
</template>
