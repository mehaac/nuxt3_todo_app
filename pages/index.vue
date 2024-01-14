<script lang="ts" setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

definePageMeta({
  middleware: ['protected'],
})

const queryClient = useQueryClient()
const { data: tasks, status } = useQuery({
  queryKey: ['task', 'all'],
  queryFn: async () => await $fetch('/api/task/', {
    method: 'GET',
  }),

})

watch(tasks, (current) => {
  if (current) {
    current.forEach((task) => {
      queryClient.setQueryData(['task', 'detail', task.id], () => task)
    })
  }
})
</script>

<template>
  <div class="flex flex-col px-12 gap-4 items-center relative py-4">
    <Card>
      <CardHeader>
        <CardTitle>
          Create Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskCreateForm />
      </CardContent>
    </Card>
    <div v-if="status === 'success'" class="flex flex-col gap-4 w-full">
      <TaskCard v-for="n in tasks" :key="n.id" :task="n" />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
