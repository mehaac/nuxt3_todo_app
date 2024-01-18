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
import { FormControl, FormField, FormItem } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { TaskStatus } from '~/server/utils'
import { Button } from '~/components/ui/button'

const searchStore = useSearchStore()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center py-2 gap-4 ">
    <div class="w-full">
      <FormField v-slot="{ componentField }" name="filterSearch">
        <FormItem>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Search..."
              class=""
            />
          </FormControl>
        </FormItem>
      </FormField>
    </div>
    <div class="flex gap-4 shrink-0">
      <div class="max-w-max flex">
        <FormField v-slot="{ componentField }" name="filterStatus">
          <FormItem>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem v-for="status in TaskStatus" :key="status" :value="status">
                    {{ status }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>
      </div>
      <div class="max-w-max flex ">
        <FormField v-slot="{ componentField }" name="filterPriority">
          <FormItem>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem v-for="status in 5" :key="status" :value="status.toString()">
                    {{ status }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>
      </div>
      <Button @click="searchStore.resetForm()">
        rest
      </Button>
    </div>
  </div>
</template>

<style>

</style>
