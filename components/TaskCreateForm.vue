<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { TaskStatus, taskFormSchema } from '~/server/utils'

const formSchema = toTypedSchema(taskFormSchema)
const formatted = useDateFormat(useNow(), 'YYYY-MM-DDTHH:mm:ssZ')

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    updatedAt: formatted.value,
    createdAt: formatted.value,
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await $fetch('/api/task/task', {
      key: 'tasks',
      method: 'POST',
      body: values,
    })
    await refreshNuxtData('tasks')
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
              <Input type="text" placeholder="Task text..." v-bind="componentField" />
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
