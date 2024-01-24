<script setup lang="ts">
import { Button } from './ui/button'
import { Label } from './ui/label'

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
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-4 items-center w-full">
      <div class="flex flex-col gap-6 min-w-[320px]">
        <TaskFormTextarea />
        <div class="flex gap-2 items-center">
          <div class="flex flex-1  flex-col relative">
            <Label for="status" class="absolute -top-6">
              Status
            </Label>
            <TaskFormStatusSelect />
          </div>
          <div class="flex flex-col flex-1 relative">
            <Label for="priority" class="absolute -top-6">
              Priority
            </Label>
            <TaskFormPrioritySelect />
          </div>
          <div>
            <Button class="" @click="handleSubmit">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
