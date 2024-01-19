<script lang="ts" setup>
import { UiSeparator } from './ui/separator'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <Card
    class="overflow-hidden flex flex-col max-w-xl h-[264px] w-full min-w-[320px]" as="article"
  >
    <CardHeader class="">
      <div class="flex gap-4">
        <div>
          <Skeleton class="w-12 h-8" />
        </div>
        <div>
          <Skeleton class="w-24 h-8" />
        </div>
        <div class="ml-auto">
          <Skeleton class="w-32 h-8" />
        </div>
      </div>
    </CardHeader>
    <UiSeparator orientation="horizontal" class="mb-5" />
    <CardContent class="flex flex-col gap-2  grow-[2]">
      <Skeleton class="w-full h-full" />
    </CardContent>
    <UiSeparator orientation="horizontal" class="mb-5 text-start" />
    <CardFooter>
      <div class="flex gap-4 items-center justify-between">
        <Skeleton class="w-20 h-8" />
      </div>
    </CardFooter>
  </Card>
</template>
