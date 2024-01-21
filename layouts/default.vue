<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { UiSeparator } from '~/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

const { handleDelete, size } = useDelete()
</script>

<template>
  <div class="h-[100dvh] overflow-hidden  relative flex flex-col">
    <TheHeader />
    <div class="pb-6">
      <UiSeparator orientation="horizontal" />
    </div>
    <main class="flex gap-2 flex-col relative grow-[1] overflow-hidden">
      <div v-auto-animate class="h-20 flex justify-center items-center">
        <Button v-if="size" class="ml-auto" variant="destructive" @click="handleDelete">
          Delete
        </Button>
        <FilterForm />
      </div>
      <slot>[Slot] </slot>
    </main>

    <UiSeparator orientation="horizontal" />
    <TheFooter />
    <Sheet>
      <SheetTrigger as-child>
        <Button size="icon" class="flex shrink-0 fixed bottom-24 right-10">
          <Icon name="i-carbon-add" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Create Task</SheetTitle>
        </SheetHeader>
        <Card class="max-w-max min-w-max w-full m-auto">
          <CardContent>
            <TaskCreateForm />
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  </div>
</template>
