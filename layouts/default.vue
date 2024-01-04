<script setup lang="ts">
import { UiSeparator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { UiMuted } from '~/components/ui/typography'
</script>

<template>
  <div class="h-[100dvh] overflow-hidden relative flex flex-col">
    <TheHeader />
    <main class="flex gap-2 flex-col overflow-y-auto px-6 relative">
      <div class="flex gap-4 pb-4 sticky top-0 bg-background z-10">
        <Badge v-for="n in 7" :key="n" variant="secondary">
          tag{{ n }}
        </Badge>
      </div>
      <slot />
    </main>
    <footer class="px-6 py-4 flex flex-col gap-2 bg-background">
      <UiSeparator orientation="horizontal" />
      <div class="flex justify-between h-12">
        <div class="flex flex-col gap-2">
          <div>
            <UiMuted>
              copyright (C) mehaac
            </UiMuted>
          </div>
          <div>
            <UiMuted>
              GitHub
            </UiMuted>
          </div>
        </div>
        <div>
          <UiMuted>
            privacy | policy
          </UiMuted>
        </div>
      </div>
    </footer>
  </div>
</template>
