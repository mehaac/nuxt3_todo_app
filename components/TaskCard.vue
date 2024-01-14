<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
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

interface Props {
  task: TaskDto
}

const props = defineProps<Props>()

const queryClient = useQueryClient()

const { data, status, suspense } = useQuery({
  queryKey: ['task', 'detail', toValue(props.task.id)],
  queryFn: async () => await $fetch(`/api/task/${toValue(props.task.id)}`, {
    method: 'GET',
  }),
  initialData: props.task,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
})

await suspense()

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(updateTaskSchema),
  initialValues: {
    priority: data.value.priority,
    status: data.value.status,
    text: data.value.text,
    updatedAt: new Date().toISOString(),
  },
})

const { mutate: updateTask } = useMutation({
  mutationKey: ['task', 'detail', toValue(props.task.id)],
  mutationFn: async (body: Partial<TaskDto>) => await $fetch(`/api/task/${toValue(props.task.id)}`, {
    method: 'PUT',
    body,
  }),
  onSuccess: (data) => {
    queryClient.setQueryData(['task', 'detail', toValue(props.task.id)], x => ({ ...x, ...data }))
  },
})

const { mutate: deleteTask } = useMutation({
  mutationKey: ['task', 'detail', toValue(props.task.id)],
  mutationFn: async () => await $fetch(`/api/task/${toValue(props.task.id)}`, {
    method: 'DELETE',
  }),
  onSuccess: () => {
    queryClient.setQueryData(['task', 'all'], data => (data as TaskDto[]).filter(task => task.id !== toValue(props.task.id)))
  },
})
const submit = handleSubmit((values) => {
  updateTask(values)
})

// priority watch
watch(() => toValue(values.priority), () => {
  submit()
})
// status watch
watch(() => toValue(values.status), () => {
  submit()
})
// watch text
// watchDebounced(() => toValue(values.text), () => {
//   submit()
// }, {
//   debounce: 1000,
//   maxWait: 1000 * 60,
// })
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
  <Card v-if="data && status !== 'error'" class="overflow-hidden flex flex-col" as="article">
    <CardHeader class="">
      <div class="flex gap-4">
        <div>
          <TaskFormPrioritySelect />
        </div>
        <div>
          <TaskFormStatusSelect />
        </div>
        <div class="ml-auto">
          {{ formattedCreatedAt }}
        </div>
      </div>
    </CardHeader>
    <UiSeparator orientation="horizontal" class="mb-5" />
    <CardContent class="flex flex-col gap-2  grow-[2]">
      <Button v-show="!isEdited" variant="link" class="min-h-full h-full">
        <UiLarge class="break-all" @click="isEdited = !isEdited">
          {{ values.text }}
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
      <div>
        <Button variant="destructive" @click="handleDelete">
          Delete
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>
