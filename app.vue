<script setup lang="ts">
import { TooltipProvider } from './components/ui/tooltip'
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <Suspense>
    <TooltipProvider>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TooltipProvider>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style>
html,
body,
#__nuxt {
  height: 100dvh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
