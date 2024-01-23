<script lang="ts" setup>
import { UiLead } from '@/components/ui/typography'
import { Button } from '~/components/ui/button'
</script>

<template>
  <Button variant="destructive" class="flex gap-2">
    <Icon name="carbon:trash-can" class="w-4 h-4" />
    <UiLead><slot /></UiLead>
  </Button>
</template>

<style>

</style>
