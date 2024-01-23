<script lang="ts" setup>
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

const searchStore = useSearchStore()
</script>

<template>
  <div class="flex gap-2">
    <Input
      :model-value="searchStore.filterSearch"
      type="text"
      placeholder="Search..."
      @update:model-value="searchStore.setFilterSearch"
    />
    <Transition name="slide-fade">
      <Button v-if="searchStore.filterSearch" size="sm" variant="outline" @click="searchStore.resetSearch">
        <Icon name="carbon:reset" />
      </Button>
    </Transition>
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
