<script lang="ts" setup>
import { CheckIcon } from 'lucide-vue-next'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '~/components/ui/command'
import { Popover, PopoverTrigger } from '~/components/ui/popover'
import { UiSeparator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'

const options = [1, 2, 3, 4, 5] as const
const selectedValues = ref(new Set<number>())
const searchStore = useSearchStore()

function handleSelect(option: number) {
  const isSelected = selectedValues.value.has(option)
  if (isSelected)
    selectedValues.value.delete(option)
  else
    selectedValues.value.add(option)

  searchStore.setFilterPriority(Array.from(selectedValues.value))
}

function handleClear() {
  selectedValues.value = new Set()
  searchStore.resetPriority()
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button size="sm" variant="outline" class="h-8 border-dashed min-w-40 flex justify-start">
        <Icon name="carbon:add" class="w-4 h-4" />
        <span v-if="!selectedValues.size">Filter by priority</span>
        <template v-if="selectedValues.size > 0">
          <UiSeparator orientation="vertical" class="mx-2 h-4" />
          <div class="space-x-1 lg:flex">
            <Badge
              v-for="option in options
                .filter((option) => selectedValues.has(option))"
              :key="option"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ option }}
            </Badge>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[180px] max-w-[180px] p-0 z-30" align="start">
      <!-- @vue-expect-error  -->
      <Command :filter-function="(list: number[], term) => list.filter(i => i.toString() === term)">
        <CommandInput placeholder="Priority" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option"
              :value="option"
              @select="handleSelect(option)"
            >
              <div
                :class="cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  selectedValues.has(option)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )"
              >
                <CheckIcon :class="cn('h-4 w-4')" />
              </div>
              <span>{{ option }}</span>
            </CommandItem>
          </CommandGroup>
          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="handleClear"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<style>

</style>
