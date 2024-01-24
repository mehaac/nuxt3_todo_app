<script lang="ts" setup>
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

const searchStore = useSearchStore()
</script>

<template>
  <div class="flex gap-2 w-full ">
    <div class="relative w-full">
      <Input
        :model-value="searchStore.filterSearch"
        type="text"
        placeholder="Search..."
        class="pr-16"
        @update:model-value="searchStore.setFilterSearch"
      />

      <div v-if="searchStore.searchStatus !== 'idle'" class="w-full absolute -top-3">
        <div class="h-2 w-full bg-background overflow-hidden rounded-md">
          <div class="animate-progress w-full h-full bg-secondary origin-left-right rounded-md" />
        </div>
      </div>
      <Transition name="slide-fade">
        <Button
          v-if="searchStore.filterSearch"
          variant="ghost"
          class="absolute right-2 top-0"
          @click="searchStore.resetSearch"
        >
          <Icon name="carbon:clean" />
        </Button>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
