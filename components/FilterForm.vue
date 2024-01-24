<script lang="ts" setup>
const filterStore = useSearchStore()

onUnmounted(() => {
  filterStore.restForm()
})
</script>

<template>
  <div class="flex max-w-xl w-full gap-4">
    <div class="max-w-max flex">
      <TaskFilterStatus />
    </div>
    <div class="max-w-max flex ">
      <TaskFilterPriority />
    </div>
  </div>
</template>
