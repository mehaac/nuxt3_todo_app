<script setup lang="ts">
import { FormControl, FormField, FormItem } from '~/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <FormField v-slot="{ componentField }" name="priority">
    <FormItem>
      <Select
        v-bind="{
          ...componentField,
          modelValue: componentField.modelValue.toString(),
        }"
        id="priority"
        :disabled="disabled"
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="item in 5" :key="item" :value="item.toString()">
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
