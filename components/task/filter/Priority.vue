<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const searchStore = useSearchStore()
</script>

<template>
  <Select :model-value="searchStore.filterPriority" @update:model-value="searchStore.setFilterPriority">
    <SelectTrigger>
      <SelectValue placeholder="Filter by priority" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Status</SelectLabel>
        <SelectItem v-for="status in 5" :key="status" :value="status.toString()">
          {{ status }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style>

</style>
