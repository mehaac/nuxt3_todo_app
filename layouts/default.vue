<script setup lang="ts">
import { UiSeparator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
</script>

<template>
  <header class="px-6 py-4 flex flex-col gap-2">
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
  <main class="pt-4">
    <slot />
  </main>
</template>
