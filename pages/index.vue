<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

definePageMeta({
  middleware: ['protected'],
})
</script>

<template>
  <div class="flex flex-col px-12 gap-2 w-full relative">
    <Card v-for="n in 5" :key="n">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        Card Content
      </CardContent>
      <CardFooter>
        Card Footer
      </CardFooter>
    </Card>
    <Card class="sticky bottom-0 left-0">
      <CardContent class="flex items-center justify-center">
        ADD TODO
      </CardContent>
    </Card>
  </div>
</template>
