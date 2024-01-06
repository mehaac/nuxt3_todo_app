<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UiLarge } from '@/components/ui/typography'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
  <header class="px-6 py-4 bg-background">
    <div class="flex items-center gap-4 py-2">
      <NuxtLink to="/">
        <UiLarge>
          ToDo
        </UiLarge>
      </NuxtLink>
      <div class="search w-full">
        <Input type="text" placeholder="Search..." />
      </div>
      <DarkToggle />
      <Tooltip :delay-duration="0">
        <TooltipTrigger as-child>
          <Avatar>
            <AvatarImage :src="`https://avatars.githubusercontent.com/${user.githubUsername}`" :alt="`github ${user.githubUsername} avatar`" />
            <AvatarFallback>{{ user.githubUsername }}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          {{ user.githubUsername }}
        </TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger class="flex items-center gap-2">
          {{ user.githubUsername }}
          <Icon name="i-carbon:chevron-sort-down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{{ user.githubUsername }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem as-child inset>
            <form method="post" action="/api/logout" @submit.prevent="handleLogout">
              <input type="submit" value="Sign out">
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
