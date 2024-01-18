<script lang="ts" setup>
import { Button } from '~/components/ui/button'

const searchStore = useSearchStore()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center py-2 gap-4 max-w-xl w-full mx-auto">
    <TaskFilterSearch />
    <div class="flex gap-4 shrink-0">
      <div class="max-w-max flex">
        <TaskFilterStatus />
      </div>
      <div class="max-w-max flex ">
        <TaskFilterPriority />
      </div>
      <Button @click="searchStore.restForm()">
        rest
      </Button>
    </div>
  </div>
</template>

<style>

</style>
