<script lang="ts" setup>
import { useField } from 'vee-validate'
import { Input } from '~/components/ui/input'

interface Props {
  disabled?: boolean
  default?: string
}
defineProps<Props>()
const { value, errorMessage } = useField<string | undefined>('text')
</script>

<template>
  <div class="pb-2">
    <div class="relative">
      <Input
        v-model:model-value="value"
        :disabled="disabled"
        name="text"
        placeholder="Enter task text"
      />
      <div v-if="errorMessage" class="h-1 bg-destructive w-full absolute -bottom-1 z-10" />
    </div>
    <Transition name="slide-down">
      <span v-if="errorMessage" class="absolute min-w-max -bottom-2 text-destructive">{{ errorMessage }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-1rem);
  opacity: 0;
}
</style>
