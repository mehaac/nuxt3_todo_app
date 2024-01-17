import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search:store', () => {
  const filter = ref('')
  const debounced = refDebounced(filter, 1000)
  async function setFilter(value: string) {
    filter.value = value
  }
  const status = computed(() => {
    return filter.value ? 'active' : 'inactive'
  })

  return {
    filter: debounced,
    setFilter,
    status,
  }
})
