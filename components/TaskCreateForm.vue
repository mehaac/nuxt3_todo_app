<script setup lang="ts">
import { Label } from './ui/label'
import { Button } from '@/components/ui/button'

const emit = defineEmits<{
  success: []
}>()

const { onSubmit } = useCreateTaskForm()

async function handleSubmit(evt: Event) {
  const submit = onSubmit(() => emit('success'))
  await submit(evt)
}
</script>

<template>
  <form class="w-full gap-2 pt-4 flex" @submit.prevent="handleSubmit">
    <div class="flex gap-2 shrink-0">
      <div class="flex relative">
        <Label for="priority" class="absolute -top-6">
          Priority
        </Label>
        <TaskFormPrioritySelect />
      </div>
      <div class="flex relative">
        <Label for="status" class="absolute -top-6">
          Status
        </Label>
        <TaskFormStatusSelect />
      </div>
    </div>
    <div class="w-full pb-4 relative">
      <TaskFormInput />
    </div>
    <div class="flex shrink-0">
      <Button size="icon" variant="outline" @click="handleSubmit">
        <Icon name="carbon:add-filled" class="w-4 h-4" />
      </Button>
    </div>
  </form>
</template>
