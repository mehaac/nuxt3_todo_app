<script lang="ts" setup>
definePageMeta({
  middleware: ['protected'],
})
</script>

<template>
  <div class="flex flex-col px-12 gap-4 items-center relative">
    <TaskCard v-for="n in 5" :key="n" />
  </div>
</template>
