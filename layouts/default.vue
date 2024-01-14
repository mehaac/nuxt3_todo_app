<script setup lang="ts">
import { UiSeparator } from '~/components/ui/separator'
</script>

<template>
  <div class="h-[100dvh] overflow-hidden relative flex flex-col">
    <TheHeader />
    <div class="pb-6">
      <UiSeparator orientation="horizontal" />
    </div>
    <main class="flex gap-2 flex-col overflow-y-auto px-6 relative grow-[1]">
      <slot>[Slot] </slot>
    </main>
    <UiSeparator orientation="horizontal" />
    <TheFooter />
  </div>
</template>
