<script lang="ts" setup>
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

interface Props {
  taskCount: number
  limit: number
  modelValue: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [val: number]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="flex justify-center mt-auto pb-5">
    <Pagination
      v-if="taskCount !== 0"
      v-slot="{ page }"
      v-model:page="modelValue"
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
</template>
