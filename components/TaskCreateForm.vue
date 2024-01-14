<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { useQueryClient } from '@tanstack/vue-query'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { UiMuted } from './ui/typography'
import { TaskStatus, taskFormSchema } from '~/server/utils'

const queryClient = useQueryClient()

const form = useForm({
  validationSchema: toTypedSchema(taskFormSchema),
  initialValues: {
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const res = await $fetch('/api/task/', {
      key: 'tasks',
      method: 'POST',
      body: values,
    })
    if (res[0].id)
      queryClient.setQueryData(['task', 'all'], data => [res[0], ...data])
    form.resetForm()
  }
  catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-4 items-center">
      <div class="flex flex-col gap-2 min-w-[320px]">
        <FormField v-slot="{ componentField }" name="text">
          <FormItem v-auto-animate>
            <FormLabel>Text...</FormLabel>
            <FormControl>
              <div class="flex flex-col items-end gap-2">
                <Textarea type="text" placeholder="Task text..." v-bind="componentField" />
                <UiMuted
                  :class="{
                    'text-red-600': componentField.modelValue?.length > 255 || componentField.modelValue?.length < 4 } "
                >
                  {{ componentField.modelValue?.length ?? 0 }}/255
                </UiMuted>
              </div>
            </FormControl>
            <FormDescription>
              Enter task text
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="status">
          <FormItem>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in TaskStatus" :key="item" :value="item">
                    {{ item }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="priority">
          <FormItem>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority..." />
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
      </div>
      <Button class="w-full" @click="onSubmit">
        Submit
      </Button>
    </div>
  </form>
</template>
