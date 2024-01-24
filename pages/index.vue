<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { taskDtoSchema } from '~/server/utils'

import { useSearchStore } from '~/stores/search'

definePageMeta({
  middleware: ['protected'],
})

const queryClient = useQueryClient()

const { resetChecked } = useDelete()
const checked = useChecked()

const searchStore = useSearchStore()
const { params } = storeToRefs(searchStore)

const { calcOffset, currentPage, limit } = useUsePagination()
const { data: tasks, status } = useUseTaskQuery(calcOffset, limit, params)

const parsedData = computed(() => {
  return taskDtoSchema.array().safeParse(tasks.value?.[0])
})
const taskCount = computed(() => {
  // @ts-expect-error need to make proper types
  return +tasks.value?.[1].count || 0
})
watch(tasks, (current) => {
  if (current) {
    // @ts-expect-error need to make proper types
    current[0].forEach((task) => {
      queryClient.setQueryData(['task', 'detail', task.id], () => task)
    })
  }
})

function getCheckedSet({ id }: { id: string }) {
  const checkedSet = new Set(checked.value)
  if (checkedSet.has(id)) {
    checkedSet.delete(id)
    return checkedSet
  }
  else {
    return checkedSet.add(id)
  }
}

function handleChecked({ id }: { id: string }) {
  const checkedSet = getCheckedSet({ id })
  checked.value = Array.from(checkedSet)
}
onUnmounted(() => {
  resetChecked()
})
</script>

<template>
  <div class="flex flex-col gap-4 relative overflow-hidden grow overflow-y-auto">
    <div
      v-if="status === 'success' && parsedData.success"
      v-auto-animate
      class="flex flex-col gap-4 items-center grow"
    >
      <TaskCard v-for="n in parsedData.data" :key="n.id" :task="n" @checked="handleChecked" />

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
