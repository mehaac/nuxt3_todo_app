<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { UiSeparator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

const text = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aut, pariatur laborum quo commodi fuga nostrum. Dignissimos veritatis eum rem vel, veniam maiores quasi, reiciendis voluptate quam, porro rerum officiis?')
</script>

<template>
  <Card class=" max-w-full min-w-full overflow-hidden flex flex-col">
    <CardHeader class="p-2">
      <div class="flex gap-4">
        <div>
          status
        </div>
        <div>
          priority
        </div>
        <div>
          time add
        </div>
        <div class="ml-auto">
          o
        </div>
      </div>
    </CardHeader>
    <UiSeparator orientation="horizontal" />
    <CardContent class="grow p-2 overflow-y-auto flex flex-col w-full gap-2">
      {{ text }}
    </CardContent>
    <UiSeparator orientation="horizontal" />
    <CardFooter class="flex p-2">
      <div class="overflow-hidden">
        <div class="flex overflow-x-auto py-2 gap-2 ">
          <Badge v-for="n in 4" :key="n" as="button">
            tag{{ n }}
          </Badge>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
