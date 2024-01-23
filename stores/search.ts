import type { TaskStatus } from '~/server/utils/'

export const useSearchStore = defineStore('search:store', () => {
  const filterSearch = ref<string>()
  const filterPriority = ref<number[]>([])
  const filterStatus = ref<typeof TaskStatus[number][]>([])

  const debouncedFilterSearch = debouncedRef(filterSearch, 1000)

  const params = computed(() => {
    return {
      filter: debouncedFilterSearch.value,
      priority: filterPriority.value,
      status: filterStatus.value,
    }
  })
  function setFilterSearch(value: string) {
    filterSearch.value = value
  }
  function setFilterPriority(value: number[]) {
    filterPriority.value = value
  }
  function setFilterStatus(value: typeof TaskStatus[number][]) {
    filterStatus.value = value
  }
  const status = computed(() => {
    return !!debouncedFilterSearch.value || !!filterPriority.value || !!filterStatus.value
  })

  function resetStatus() {
    filterStatus.value = []
  }
  function resetPriority() {
    filterPriority.value = []
  }
  function resetSearch() {
    filterSearch.value = undefined
  }

  function restForm() {
    resetSearch()
    resetPriority()
    resetStatus()
  }

  return {
    setFilterStatus,
    setFilterPriority,
    setFilterSearch,
    filterSearch: readonly(filterSearch),
    filterPriority: readonly(filterPriority),
    filterStatus: readonly(filterStatus),
    resetStatus,
    resetPriority,
    resetSearch,
    status,
    params,
    restForm,
  }
})
