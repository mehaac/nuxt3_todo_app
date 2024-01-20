<script setup lang="ts">
import { Button } from './ui/button'
import { UiLarge } from './ui/typography'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { UiSeparator } from '@/components/ui/separator'
import TaskFormPrioritySelect from '@/components/task/form/PrioritySelect.vue'
import TaskFormStatusSelect from '@/components/task/form/StatusSelect.vue'
import TaskFormTextarea from '@/components/task/form/Textarea.vue'

interface Props {
  task: TaskDto
}

const props = defineProps<Props>()

const { handleDelete, handleUpdateText, isDeleting, isEdited, isUpdating, toggleEdited } = useUseTaskUpdateForm(props.task)

// YYYY-MM-DD HH:mm:ss Do MMMM HH:mm
const formattedCreatedAt = useDateFormat(props.task.createdAt, 'Do MMMM HH:mm', {
  // locales: 'ru-RU',
})
</script>

<template>
  <Card
    class="overflow-hidden flex flex-col max-w-xl w-full min-w-[320px]" as="article"
  >
    <CardHeader class="">
      <div class="flex gap-4">
        <div>
          <TaskFormPrioritySelect :disabled="isDeleting || isUpdating" />
        </div>
        <div>
          <TaskFormStatusSelect :disabled="isDeleting || isUpdating" />
        </div>
        <div class="ml-auto">
          {{ formattedCreatedAt }}
        </div>
      </div>
    </CardHeader>
    <UiSeparator orientation="horizontal" class="mb-5" />
    <CardContent class="flex flex-col gap-2  grow-[2]">
      <Button v-show="!isEdited" variant="link" class="min-h-full h-full" :disabled="isDeleting || isUpdating">
        <UiLarge class="break-all" @click="toggleEdited">
          {{ task.text }}
        </UiLarge>
      </Button>
      <div v-show="isEdited" class="flex flex-col gap-2">
        <TaskFormTextarea />
        <Button
          variant="outline" @click="handleUpdateText"
        >
          Edit
        </Button>
      </div>
    </CardContent>
    <UiSeparator orientation="horizontal" class="mb-5 text-start" />
    <CardFooter>
      <div class="flex gap-4 items-center justify-between">
        <Button variant="destructive" :disabled="isDeleting" @click="handleDelete">
          Delete
        </Button>
        <div v-show="isUpdating">
          <Icon name="carbon:progress-bar-round" size="32" class="animate-spin" />
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
