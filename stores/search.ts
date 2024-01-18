import { useForm } from 'vee-validate'
import z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { TaskStatus, type TaskStatusType } from '~/server/utils/'

const filterSchema = z.object({
  filterSearch: z.string().optional(),
  filterPriority: z.coerce.number().optional(),
  filterStatus: z.enum(TaskStatus),
})

export function useFilterForm() {
  return useForm({
    validationSchema: toTypedSchema(filterSchema),
  })
}

export const useSearchStore = defineStore('search:store', () => {
  const filterSearch = ref<string>()
  const filterPriority = ref<string>()
  const filterStatus = ref<TaskStatusType>()

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
  function setFilterPriority(value: string) {
    filterPriority.value = value
  }
  function setFilterStatus(value: TaskStatusType) {
    filterStatus.value = value
  }
  const status = computed(() => {
    return !!debouncedFilterSearch.value || !!filterPriority.value || !!filterStatus.value
  })

  function restForm() {
    filterSearch.value = undefined
    filterPriority.value = undefined
    filterStatus.value = undefined
  }

  return {
    setFilterStatus,
    setFilterPriority,
    setFilterSearch,
    filterSearch: readonly(filterSearch),
    filterPriority: readonly(filterPriority),
    filterStatus: readonly(filterStatus),
    status,
    params,
    restForm,
  }
})
