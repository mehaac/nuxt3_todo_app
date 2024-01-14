<script setup lang="ts">
import { FormField } from '~/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { TaskStatus } from '~/server/utils'
</script>

<template>
  <FormField v-slot="{ componentField }" name="status">
    <Select v-bind="componentField">
      <SelectTrigger>
        <SelectValue placeholder="Select status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="item in TaskStatus" :key="item" :value="item">
            {{ item }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </FormField>
</template>
