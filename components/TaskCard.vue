<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
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
import { updateTaskSchema } from '~/server/utils'
import TaskFormStatusSelect from '@/components/task/form/StatusSelect.vue'
import TaskFormTextarea from '@/components/task/form/Textarea.vue'
import { useToast } from '@/components/ui/toast'

interface Props {
  task: TaskDto
}

const props = defineProps<Props>()

const queryClient = useQueryClient()
const { toast } = useToast()
const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(updateTaskSchema),
  initialValues: {
    priority: props.task.priority,
    status: props.task.status,
    text: props.task.text,
    updatedAt: new Date().toISOString(),
  },
})

const { mutate: updateTask, isPending: isUpdating } = useMutation({
  mutationKey: ['task', 'detail', toValue(props.task.id)],
  mutationFn: async (body: Partial<TaskDto>) => await $fetch(`/api/task/${toValue(props.task.id)}`, {
    method: 'PUT',
    body,
  }),
  onMutate: async () => {
    await queryClient.cancelQueries({ queryKey: ['task'] })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['task'] })
    toast({
      title: 'Updated',
      description: `Task was updated`,
    })
  },
})

const { mutate: deleteTask, isPending: isDeleting } = useMutation({
  mutationKey: ['task', 'detail', toValue(props.task.id)],
  mutationFn: async () => await $fetch(`/api/task/${toValue(props.task.id)}`, {
    method: 'DELETE',
  }),
  onSuccess: () => {
    toast({
      title: 'Deleted',
      description: `Task was deleted`,
    })
    queryClient.invalidateQueries({ queryKey: ['task'] })
  },
})
const submit = handleSubmit((values) => {
  updateTask(values)
})

// priority watch
watch(() => toValue(values.priority), () => {
  submit()
})
// // status watch
watch(() => toValue(values.status), () => {
  submit()
})

const isEdited = ref(false)

function handleUpdateText() {
  submit()
  isEdited.value = !isEdited.value
}

function handleDelete() {
  deleteTask()
}
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
        <UiLarge class="break-all" @click="isEdited = !isEdited">
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
