import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search:store', () => {
  const filter = ref('')
  const debounced = refDebounced(filter, 1000)
  async function setFilter(value: string) {
    filter.value = value
  }

  return {
    filter: debounced,
    setFilter,
  }
})
