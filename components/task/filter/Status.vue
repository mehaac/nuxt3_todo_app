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
import { TaskStatus } from '~/server/utils'

const searchStore = useSearchStore()
</script>

<template>
  <Select :model-value="searchStore.filterStatus" @update:model-value="searchStore.setFilterStatus">
    <SelectTrigger>
      <SelectValue placeholder="Filter by status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Status</SelectLabel>
        <SelectItem v-for="status in TaskStatus" :key="status" :value="status">
          {{ status }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style>

</style>
