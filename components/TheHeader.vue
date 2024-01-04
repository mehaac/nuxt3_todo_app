<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UiSeparator } from '@/components/ui/separator'
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
</script>

<template>
  <header class="px-6 py-4 flex flex-col gap-2 bg-background">
    <div class="flex items-center gap-4 py-2">
      <div class="logo">
        LOGO
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
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              User
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>User</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <UiSeparator orientation="horizontal" />
  </header>
</template>
