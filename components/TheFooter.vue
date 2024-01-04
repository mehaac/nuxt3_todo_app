<script setup lang="ts">
import { UiSeparator } from '~/components/ui/separator'
import { UiMuted } from '~/components/ui/typography'
</script>

<template>
  <footer class="px-6 py-4 flex flex-col gap-2 bg-background">
    <UiSeparator orientation="horizontal" />
    <div class="flex justify-between h-12">
      <div class="flex flex-col gap-2">
        <div>
          <NuxtLink to="/">
            <UiMuted class="hover:text-foreground">
              ToDo copyright (c) mehaac
            </UiMuted>
          </NuxtLink>
        </div>
        <NuxtLink to="https://github.com/mehaac" target="_blank" no-rel>
          <UiMuted class="hover:text-foreground">
            GitHub
          </UiMuted>
        </NuxtLink>
      </div>
      <div>
        <NuxtLink to="/privacy">
          <UiMuted class="hover:text-foreground">
            privacy | policy
          </UiMuted>
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
