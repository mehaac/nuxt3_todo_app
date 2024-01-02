<script setup lang="ts">
import { Button } from './ui/button'

const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button variant="default" size="icon" @click="toggleDark">
    <Icon :name="color.value === 'dark' ? 'i-carbon-sun' : 'i-carbon-moon'" size="24" />
  </Button>
</template>
