<script setup lang="ts">
  import { computed } from 'vue'
  import Popper from 'vue3-popper'
  import { useI18n } from 'vue-i18n'
  import { Icon } from '@iconify/vue'
  import { useDark, useToggle } from '@vueuse/core'
  import ButtonComponent from '@/components/ButtonComponent.vue'

  const i18n = useI18n()

  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const togglePageMode = () => {
    toggleDark()
    localStorage.setItem('darkMode', isDark.value ? 'true' : 'false')
  }

  const availableLocales = computed(() => i18n.availableLocales)
  const currentLocale = computed(() => i18n.locale.value)

  const setLocale = (locale: string) => {
    i18n.locale.value = locale
    localStorage.setItem('locale', locale)
  }
</script>

<template>
  <header
    class="bg-light-background dark:bg-dark-background flex items-center justify-end px-2 pt-2"
  >
    <nav class="flex justify-end gap-2">
      <Popper>
        <ButtonComponent type="icon" class-name="bg-light-blue hover:bg-dark-blue">
          <template #icon>
            <Icon
              icon="lucide:languages"
              class="text-blue text-2xl text-indigo-200 dark:text-white"
            />
          </template>
        </ButtonComponent>
        <template #content>
          <section
            class="dark:bg-dark-carbon-grey dark:border-dark-pale-grey font-pokemon-gb w-[100px] rounded-md border-1 border-solid bg-white p-2 shadow-md dark:text-white"
          >
            <ul class="gap-2 text-center">
              <li
                v-for="locale in availableLocales"
                :key="locale"
                class="flex cursor-pointer hover:text-blue-500"
                @click="setLocale(locale)"
              >
                <span v-show="locale === currentLocale">▶</span>
                <span class="grow">{{ locale.trim() }}</span>
                <span v-show="locale === currentLocale" class="opacity-0">▶</span>
              </li>
            </ul>
          </section>
        </template>
      </Popper>

      <ButtonComponent
        type="icon"
        class-name="bg-light-blue hover:bg-dark-blue"
        @click="togglePageMode"
      >
        <template #icon>
          <Icon
            :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
            class="text-2xl text-indigo-200 dark:text-white"
          />
        </template>
      </ButtonComponent>
    </nav>
  </header>
</template>
