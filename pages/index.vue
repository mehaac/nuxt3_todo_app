<script lang="ts" setup>
definePageMeta({
  middleware: ['protected'],
})

const user = useAuthenticatedUser()

async function handleLogout(e: Event) {
  if (!(e.target instanceof HTMLFormElement))
    return
  await $fetch('/api/logout', {
    method: 'POST',
    redirect: 'manual',
  })
  await navigateTo('/login')
}
</script>

<template>
  <DarkToggle />
  <h1>Profile</h1>
  <p>User id: {{ user.userId }}</p>
  <p>GitHub username: {{ user.githubUsername }}</p>
  <form method="post" action="/api/logout" @submit.prevent="handleLogout">
    <input type="submit" value="Sign out">
  </form>
</template>