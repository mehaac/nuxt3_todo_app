import { useMutation, useQueryClient } from '@tanstack/vue-query'

export const useChecked = () => useState<string[]>('checked', () => [])

export function useDelete() {
  const queryClient = useQueryClient()
  const checked = useChecked()
  const { mutateAsync } = useMutation({
    mutationFn: async (payload: string[] | string) => $fetch('/api/task', {
      method: 'DELETE',
      body: {
        payload,
      },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', 'all'] })
    },
  })

  const resetChecked = () => checked.value = []

  async function handleDelete() {
    await mutateAsync(checked.value)

    resetChecked()
  }

  return {
    handleDelete,
    size: computed(() => checked.value.length),
  }
}
