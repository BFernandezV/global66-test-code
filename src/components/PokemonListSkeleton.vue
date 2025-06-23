<script setup lang="ts">
  const skeletonItems = Array.from({ length: 20 }, (_, index) => index + 1)
</script>

<template>
  <div class="w-full max-w-4xl grow">
    <div class="scroller">
      <div
        v-for="(_skeletonItem, index) in skeletonItems"
        :key="index"
        class="dark:bg-dark-carbon-grey bg-light-pale-grey mb-2 h-[60px] w-full animate-pulse rounded"
      ></div>
    </div>
  </div>
</template>

<style>
  .scroller {
    height: calc(100vh - 212px);
    overflow: auto;

    scrollbar-width: none;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
</style>
