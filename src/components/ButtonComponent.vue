<script setup lang="ts">
  import { computed } from 'vue'
  import type { ButtonProps, ButtonType } from '@/interfaces/button'

  const props = withDefaults(defineProps<ButtonProps>(), {
    selected: true,
  })

  const BUTTON_TYPES_CLASS: Record<ButtonType, string> = {
    primary:
      'bg-light-carmine dark:bg-dark-scarlet hover:bg-light-scarlet dark:hover:bg-dark-carmine text-white dark:text-white flex items-center',
    unselected:
      'bg-light-pale-grey dark:bg-dark-pale-grey hover:bg-light-carbon-grey dark:hover:bg-dark-grey text-white flex items-center',
    icon: 'flex items-center justify-center w-[50px] h-[30px]',
  }

  const className = computed(() => {
    const baseClass = props.selected
      ? BUTTON_TYPES_CLASS[props.type ?? 'primary']
      : BUTTON_TYPES_CLASS.unselected

    return [baseClass, props.className].filter(Boolean).join(' ')
  })
</script>

<template>
  <button
    :class="className"
    type="button"
    @click="onClick"
    :disabled="disabled"
    :selected="selected"
  >
    <slot name="icon"></slot>
    <span>{{ label }}</span>
  </button>
</template>

<style scoped>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  }
</style>
