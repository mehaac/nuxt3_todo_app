<script lang="ts" setup>
import { FormControl, FormDescription, FormField, FormItem } from '~/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { UiMuted } from '~/components/ui/typography'

interface Props {
  disabled?: boolean
}

defineProps<Props>()
</script>

<template>
  <FormField v-slot="{ componentField }" name="text">
    <FormItem>
      <FormControl>
        <Textarea v-bind="componentField" :disabled="disabled" />
      </FormControl>
      <FormDescription>
        <div class="w-full flex justify-end">
          <UiMuted
            :class="{
              'text-red-600': componentField.modelValue?.length > 255 || componentField.modelValue?.length < 4 } "
          >
            {{ componentField.modelValue?.length ?? 0 }}/255
          </UiMuted>
        </div>
      </FormDescription>
    </FormItem>
  </FormField>
</template>
