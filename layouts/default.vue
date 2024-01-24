<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { UiSeparator } from '~/components/ui/separator'

import { Button } from '~/components/ui/button'

const { handleDelete, size, resetChecked } = useDelete()

const showCreateForm = ref(false)
function toggleShowCreateForm() {
  showCreateForm.value = !showCreateForm.value
}
</script>

<template>
  <div class="h-[100dvh] overflow-hidden  relative flex flex-col">
    <TheHeader />
    <UiSeparator orientation="horizontal" class="mb-4" />
    <main v-auto-animate class="flex gap-2 px-4 flex-col relative grow overflow-hidden">
      <div v-auto-animate class="flex max-w-xl w-full self-center">
        <div v-if="size" class="flex gap-2 pr-2">
          <TaskDeleteBtn @click="handleDelete">
            {{ size }}
          </TaskDeleteBtn>
          <Button class="flex gap-2 py-0 h-8" variant="outline" @click="resetChecked">
            <Icon name="carbon:clean" />
          </Button>
        </div>
        <FilterForm />
      </div>

      <div v-auto-animate class="max-w-xl w-full flex flex-col self-center relative">
        <Button class="w-full gap-2" variant="secondary" @click="toggleShowCreateForm">
          <template v-if="!showCreateForm">
            <Icon name="carbon:add-alt" class="h-6 w-6" />
            <span>Create task</span>
          </template>
          <template v-else-if="showCreateForm">
            <Icon name="carbon:close" class="h-6 w-6" />
            <span>Close</span>
          </template>
        </Button>
      </div>
      <div v-if="showCreateForm" class="w-full relative">
        <TaskCreateForm @success="showCreateForm = false" />
      </div>
      <slot>
        [Slot]
      </slot>
    </main>

    <UiSeparator orientation="horizontal" />
    <TheFooter />
  </div>
</template>
