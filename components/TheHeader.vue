<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UiSeparator } from '@/components/ui/separator'
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
  <header class="px-6 py-4 flex flex-col gap-2 bg-background">
    <div class="flex items-center gap-4 py-2">
      <div class="logo">
        <UiLarge>
          ToDo
        </UiLarge>
      </div>
      <div class="search w-full">
        <Input type="text" placeholder="Search..." />
      </div>
      <DarkToggle />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Tooltip :delay-duration="0">
            <TooltipTrigger>
              <Avatar class="avatar">
                <AvatarImage :src="`https://avatars.githubusercontent.com/${user.githubUsername}`" :alt="`github ${user.githubUsername} avatar`" />
                <AvatarFallback>{{ user.githubUsername }}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              {{ user.githubUsername }}
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{{ user.githubUsername }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem as-child>
            <form method="post" action="/api/logout" @submit.prevent="handleLogout">
              <input type="submit" value="Sign out">
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <UiSeparator orientation="horizontal" />
  </header>
</template>
