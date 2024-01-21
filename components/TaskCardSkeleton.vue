<script lang="ts" setup>
import { UiSeparator } from './ui/separator'
import {
  Card,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <Card
    class="flex w-full max-w-xl" as="article"
  >
    <div class="flex items-center p-2 gap-2 shrink-0">
      <Skeleton class="w-4 h-4" />
      <Skeleton class="w-12 h-8" />
      <Skeleton class="w-12 h-8" />
    </div>
    <UiSeparator orientation="vertical" class="mx-2" />
    <div class="flex grow items-center p-2">
      <Skeleton class="w-full h-4" />
    </div>
  </Card>
</template>
