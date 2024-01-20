<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { taskDtoSchema } from '~/server/utils'

import { useSearchStore } from '~/stores/search'

definePageMeta({
  middleware: ['protected'],
})

const queryClient = useQueryClient()

const searchStore = useSearchStore()
const { params } = storeToRefs(searchStore)

const { calcOffset, currentPage, limit } = useUsePagination()
const { data: tasks, status } = useUseTaskQuery(calcOffset, limit, params)

const parsedData = computed(() => {
  return taskDtoSchema.array().safeParse(tasks.value?.[0])
})
const taskCount = computed(() => {
  return +tasks.value?.[1].count || 0
})
watch(tasks, (current) => {
  if (current) {
    current[0].forEach((task) => {
      queryClient.setQueryData(['task', 'detail', task.id], () => task)
    })
  }
})
</script>

<template>
  <div class="flex flex-col px-4 sm:px-12 gap-4 relative grow overflow-y-scroll">
    <div
      v-if="status === 'success' && parsedData.success"
      v-auto-animate
      class="flex flex-col gap-4 items-center grow"
    >
      <TaskCard v-for="n in parsedData.data" :key="n.id" :task="n" />
      <TaskPagination v-model="currentPage" :task-count="taskCount" :limit="limit" />
    </div>

    <div
      v-else
      v-auto-animate
      class="flex flex-col gap-4 items-center grow"
    >
      <TaskCardSkeleton v-for="n in 3" :key="n" />
    </div>
  </div>
</template>
