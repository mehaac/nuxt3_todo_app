<script lang="ts" setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { taskDtoSchema } from '~/server/utils'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '~/components/ui/pagination'
import {
  Button,
} from '~/components/ui/button'

definePageMeta({
  middleware: ['protected'],
})

const queryClient = useQueryClient()
const limit = ref(3)
const currentPage = ref(1)
const searchStore = useSearchStore()

const { filter, status: searchStatus } = storeToRefs(searchStore)
const calcOffset = computed(() => {
  return (currentPage.value - 1) * limit.value
})
const { data: tasks, status } = useQuery({
  queryKey: ['task', 'all', 'offset: ', calcOffset, 'limit: ', limit],
  queryFn: async () => await $fetch('/api/task/', {
    query: {
      offset: calcOffset.value,
      limit: limit.value,
    },
    method: 'GET',
  }),
  staleTime: 1000 * 60 * 5,
})

const { data: tasksFiltered } = useQuery({
  queryKey: ['task', 'all', 'offset: ', calcOffset, 'limit: ', limit, filter],
  queryFn: async () => await $fetch('/api/task/', {
    query: {
      search: filter.value,
      offset: calcOffset.value,
      limit: limit.value,
    },
    method: 'GET',
  }),
  enabled: () => searchStatus.value === 'active',
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5,
})

const parsedData = computed(() => {
  return searchStatus.value === 'active' ? taskDtoSchema.array().safeParse(tasksFiltered.value?.[0]) : taskDtoSchema.array().safeParse(tasks.value?.[0])
})

const taskCount = computed(() => {
  return searchStatus.value === 'active' ? tasksFiltered.value?.[1].count : tasks.value?.[1].count
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
  <div class="flex flex-col sm:px-12 gap-4 items-center relative grow overflow-y-scroll">
    <div v-if="status === 'success' && parsedData.success" v-auto-animate class="flex flex-col gap-4 items-center grow ">
      <TaskCard v-for="n in parsedData.data" :key="n.id" :task="n" />
      <div class="flex justify-center mt-auto pb-5">
        <Pagination
          v-slot="{ page }"
          v-model:page="currentPage"
          :total="taskCount"
          :sibling-count="1"
          :items-per-page="limit"
          show-edges
          :default-page="1"
          class=""
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
              <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
          </PaginationList>
        </Pagination>
      </div>
    </div>

    <div v-else>
      Loading...
    </div>
  </div>
</template>
