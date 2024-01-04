<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { UiSeparator } from '~/components/ui/separator'
</script>

<template>
  <div class="h-[100dvh] overflow-hidden relative flex flex-col">
    <TheHeader />
    <div class="pb-6">
      <UiSeparator orientation="horizontal" />
    </div>
    <main class="flex gap-2 flex-col overflow-y-auto px-6 relative">
      <div class="flex gap-4 sticky top-0 bg-background z-10">
        <Badge v-for="n in 7" :key="n" variant="secondary">
          tag{{ n }}
        </Badge>
      </div>
      <slot>[Slot] </slot>
    </main>
    <UiSeparator orientation="horizontal" />
    <TheFooter />
  </div>
</template>
