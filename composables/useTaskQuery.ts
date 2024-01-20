import { useQuery } from '@tanstack/vue-query'

export function useUseTaskQuery(
  calcOffset: MaybeRefOrGetter<number>,
  limit: MaybeRefOrGetter<number>,
  params: MaybeRefOrGetter<{ filter?: string, priority?: string, status?: string }>,
) {
  const paramsRef = toRef(params)
  const limitRef = toRef(limit)
  const calcOffsetRef = toRef(calcOffset)
  return useQuery({
    queryKey: ['task', 'all', 'offset: ', calcOffsetRef, 'limit: ', limitRef, params],
    queryFn: async () => await $fetch('/api/task/', {
      query: {
        offset: calcOffsetRef.value,
        limit: limitRef.value,
        search: paramsRef.value.filter,
        priority: paramsRef.value.priority,
        status: paramsRef.value.status,
      },
      method: 'GET',
    }),
    staleTime: 1000 * 60 * 5,
  })
}
