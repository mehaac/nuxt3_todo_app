<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useQueryClient } from '@tanstack/vue-query'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from './ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { UiMuted } from './ui/typography'
import { TaskStatus, taskFormSchema } from '~/server/utils'
import { useToast } from '@/components/ui/toast/use-toast'

const emit = defineEmits<{
  success: []
}>()

const queryClient = useQueryClient()

const { toast } = useToast()

const form = useForm({
  validationSchema: toTypedSchema(taskFormSchema),
  initialValues: {
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
})
const onSubmit = form.handleSubmit(async (values) => {
  try {
    await $fetch('/api/task/', {
      key: 'tasks',
      method: 'POST',
      body: values,
    })
    queryClient.invalidateQueries({ queryKey: ['task', 'all'] })
    // if (res[0].id) {
    //   queryClient.setQueryData(['task', 'all'], (data) => {
    //     return [res[0], ...data]
    //   })
    // }
    form.resetForm()
    toast({
      title: 'Success',
      description: `Task was added to your task list`,
    })
    emit('success')
  }
  catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-4 items-center">
      <div class="flex flex-col gap-5 min-w-[320px]">
        <FormField v-slot="{ componentField }" name="text">
          <FormItem>
            <FormControl>
              <div class="pt-4">
                <Textarea type="text" placeholder="Task text..." v-bind="componentField" />
              </div>
            </FormControl>
            <FormDescription as-child>
              <UiMuted
                :class="{
                  'text-red-600': componentField.modelValue?.length > 255 || componentField.modelValue?.length < 4 } "
              >
                {{ componentField.modelValue?.length ?? 0 }}/255
              </UiMuted>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="status">
          <FormItem v-auto-animate>
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
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="priority">
          <FormItem v-auto-animate>
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
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button class="w-full" @click="onSubmit">
        Submit
      </Button>
    </div>
  </form>
</template>
