<script setup lang="ts">
import { Button } from './ui/button'
import { UiLarge } from './ui/typography'
import {
  Card,
} from '@/components/ui/card'
import { UiSeparator } from '@/components/ui/separator'
import TaskFormPrioritySelect from '@/components/task/form/PrioritySelect.vue'
import TaskFormStatusSelect from '@/components/task/form/StatusSelect.vue'
import TaskFormTextarea from '@/components/task/form/Textarea.vue'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  task: TaskDto
}

const props = defineProps<Props>()
const emit = defineEmits<{
  checked: [val: { id: string }]
}>()

const { handleUpdateText, isDeleting, isEdited, isUpdating, toggleEdited } = useUseTaskUpdateForm(props.task)
</script>

<template>
  <Card class="flex w-full max-w-xl relative" as="article">
    <div class="flex items-center justify-center p-2 shrink-0 ">
      <Checkbox @update:checked="emit('checked', { id: task.id })" />
    </div>
    <UiSeparator orientation="vertical" class="mx-2" />
    <div class="flex items-center p-2 gap-2 shrink-0 w-48">
      <TaskFormPrioritySelect :disabled="isDeleting || isUpdating" />
      <TaskFormStatusSelect :disabled="isDeleting || isUpdating" />
    </div>
    <UiSeparator orientation="vertical" class="mx-2" />
    <div class="flex grow items-center">
      <Button v-show="!isEdited" variant="link" class="min-h-full h-full" :disabled="isDeleting || isUpdating">
        <UiLarge class="break-all line-clamp-1" @click="toggleEdited">
          {{ task.text }}
        </UiLarge>
      </Button>
      <div v-show="isEdited" class="flex flex-col gap-2 grow">
        <TaskFormTextarea />
        <Button
          variant="outline" @click="handleUpdateText"
        >
          Edit
        </Button>
      </div>
      <Transition name="loading">
        <div
          v-if="isUpdating"
          class="absolute"
        >
          <Icon
            name="carbon:progress-bar-round"
            size="32"
            class="animate-spin"
          />
        </div>
      </Transition>
    </div>
  </Card>
</template>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  transition: all 1s linear;
  right: -2.5rem;
}
.loading-leave-to {
  transform: translate3d(4rem, 0, 0);
  opacity: 0;
}
</style>
