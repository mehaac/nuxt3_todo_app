<script lang="ts" setup>
</script>

<template>
  <div class="flex flex-col px-4 sm:px-0 max-w-xl w-full py-2 gap-4">
    <TaskFilterSearch />
    <div class="flex gap-4 shrink-0">
      <div class="max-w-max flex">
        <TaskFilterStatus />
      </div>
      <div class="max-w-max flex ">
        <TaskFilterPriority />
      </div>
    </div>
  </div>
</template>
