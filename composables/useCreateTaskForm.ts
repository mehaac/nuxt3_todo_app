import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useQueryClient } from '@tanstack/vue-query'
import { taskFormSchema } from '~/server/utils'
import { useToast } from '@/components/ui/toast/use-toast'

export function useCreateTaskForm() {
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
      form.resetForm()
      toast({
        title: 'Success',
        description: `Task was added to your task list`,
      })
    }
    catch (e) {
      console.error(e)
    }
  })
  return {
    onSubmit,
  }
}
