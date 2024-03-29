<script setup lang="ts">
import { Button } from './ui/button'
import { UiLarge } from './ui/typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Card } from '@/components/ui/card'
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

const checked = useChecked()
const { handleUpdateText, isDeleting, isUpdating, toggleEdited, isEdited, resetForm } = useUseTaskUpdateForm(props.task)

onUnmounted(() => {
  resetForm()
})
</script>

<template>
  <Card class="flex w-full max-w-xl relative items-center" as="article">
    <div class="flex items-center justify-center p-2 shrink-0 ">
      <Checkbox :checked="checked.includes(task.id)" @update:checked="emit('checked', { id: task.id })" />
    </div>
    <UiSeparator orientation="vertical" class="mx-2" />
    <div class="flex items-center p-2 gap-2 shrink-0 w-48 ">
      <Tooltip :delay-duration="0" disable-hoverable-content>
        <TooltipTrigger>
          <TaskFormPrioritySelect :disabled="isDeleting || isUpdating" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Priority</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip :delay-duration="0" disable-hoverable-content>
        <TooltipTrigger class="w-full">
          <TaskFormStatusSelect :disabled="isDeleting || isUpdating" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Status</p>
        </TooltipContent>
      </Tooltip>
    </div>
    <UiSeparator orientation="vertical" class="mx-2" />
    <Tooltip :delay-duration="0" disable-hoverable-content>
      <TooltipTrigger>
        <div class="flex grow items-center">
          <Popover :open="isEdited">
            <PopoverTrigger as-child>
              <Button variant="link" class="min-h-full h-full" :disabled="isDeleting || isUpdating">
                <UiLarge class="break-all line-clamp-1" @click="toggleEdited">
                  {{ task.text }}
                </UiLarge>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="flex flex-col gap-2 pt-4">
                <TaskFormTextarea :default="task.text" :disabled="isUpdating" />

                <Button
                  :disabled="isUpdating"
                  variant="secondary"
                  class="flex gap-2"
                  @click="handleUpdateText"
                >
                  <Icon name="carbon:checkmark-filled" />
                  Edit
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
      </TooltipTrigger>
      <TooltipContent side="top">
        {{ task.text }}
      </TooltipContent>
    </Tooltip>
  </Card>
</template>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  transition: all 1s linear;
  right: 0rem;
}
.loading-leave-to {
  transform: translate3d(4rem, 0, 0);
  opacity: 0;
}
</style>
