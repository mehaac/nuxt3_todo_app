<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

definePageMeta({
  layout: 'auth',
})
const user = await useUser()
if (user.value)
  await navigateTo('/') // redirect to profile page
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <Card class="w-[320px]">
      <CardHeader class="text-center">
        <CardTitle>
          Sign in
        </CardTitle>
      </CardHeader>
      <CardContent class="flex justify-center">
        <Button as="a" href="/api/login/github">
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
