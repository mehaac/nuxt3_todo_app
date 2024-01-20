import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '@/components/ui/toast/use-toast'

export function useUseTaskMutate() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return {
    updateTask: (taskId: string) => {
      return useMutation({
        mutationKey: ['task', 'detail', taskId],
        mutationFn: async (body: Partial<TaskDto>) => await $fetch(`/api/task/${taskId}`, {
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
    },
    deleteTask: (taskId: string) => {
      return useMutation({
        mutationKey: ['task', 'detail', taskId],
        mutationFn: async () => await $fetch(`/api/task/${taskId}`, {
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
    },
  }
}
