<script lang="ts" setup>
import { Input } from '~/components/ui/input'

const searchStore = useSearchStore()
</script>

<template>
  <Input
    :model-value="searchStore.filterSearch"
    type="text"
    placeholder="Search..."
    @update:model-value="searchStore.setFilterSearch"
  />
</template>

<style>

</style>
