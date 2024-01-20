import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { TaskDto } from '~/server/utils'
import { updateTaskSchema } from '~/server/utils'

export function useUseTaskUpdateForm(task: TaskDto) {
  const isEdited = ref(false)

  const { mutate: updateTask, isPending: isUpdating } = useUseTaskMutate().updateTask(task.id)

  const { mutate: deleteTask, isPending: isDeleting } = useUseTaskMutate().deleteTask(task.id)

  const { handleSubmit, values } = useForm({
    validationSchema: toTypedSchema(updateTaskSchema),
    initialValues: {
      priority: task.priority,
      status: task.status,
      text: task.text,
      updatedAt: new Date().toISOString(),
    },
  })

  const submit = handleSubmit((values) => {
    updateTask(values)
  })

  watch(() => toValue(values.priority), () => {
    submit()
  })
  // // status watch
  watch(() => toValue(values.status), () => {
    submit()
  })

  async function handleUpdateText() {
    await submit()
    toggleEdited()
  }
  function handleDelete() {
    deleteTask()
  }
  function toggleEdited() {
    isEdited.value = !isEdited.value
  }
  return {
    isEdited: readonly(isEdited),
    handleUpdateText,
    handleDelete,
    isUpdating,
    isDeleting,
    toggleEdited,
  }
}
