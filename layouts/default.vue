<script setup lang="ts">
import { UiSeparator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="h-[100dvh] overflow-hidden relative flex flex-col">
    <header class="px-6 py-4 flex flex-col gap-2 bg-background">
      <div class="flex items-center gap-4 py-2">
        <div class="logo">
          LOGO
        </div>
        <div class="search w-full">
          <Input type="text" placeholder="Search..." />
        </div>
        <DarkToggle />

        <div class="avatar">
          AVATAR
        </div>
      </div>
      <UiSeparator orientation="horizontal" />
    </header>
    <main class="flex gap-2 flex-col overflow-y-auto px-6 relative">
      <div class="flex gap-4 pb-4 sticky top-0 bg-background z-10">
        <div v-for="n in 7" :key="n" class="bg-secondary border-[1px] px-4 py-1 rounded-lg border-primary">
          tag{{ n }}
        </div>
      </div>
      <slot />
    </main>
    <footer class="px-6 pt-4 flex flex-col gap-2 bg-background">
      <UiSeparator orientation="horizontal" />
      <div class="flex justify-between h-12">
        <div class="flex flex-col">
          <div>
            1
          </div>
          <div>2</div>
        </div>
        <div>
          1
        </div>
      </div>
    </footer>
  </div>
</template>
