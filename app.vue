<script setup lang="ts">
import { Toaster } from './components/ui/toast'
import { TooltipProvider } from './components/ui/tooltip'
import { Button } from './components/ui/button'
import { appName } from '~/constants'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

useHead({
  title: appName,
})

const accepted = useCookie<boolean>('accepted')

const show = ref(false)

function handleAccept() {
  show.value = false
  accepted.value = true
}

onMounted(() => {
  if (accepted.value === true)
    return
  setTimeout(() => {
    show.value = true
  }, 5000)
})
</script>

<template>
  <Suspense>
    <TooltipProvider>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
        <Sheet v-model:open="show">
          <SheetContent side="bottom" class="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Cookie Consent</SheetTitle>
              <SheetDescription>
                This website uses <NuxtLink to="/privacy" class="text-blue-600 visited:text-blue-400">
                  cookies
                </NuxtLink> to ensure you get the best experience. By clicking "Accept," you agree to our use of cookies.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button @click="handleAccept">
                Accept
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Toaster />
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
