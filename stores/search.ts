import { useField, useForm } from 'vee-validate'
import z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { TaskStatus } from '~/server/utils/'

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
  const { values, resetForm, meta } = useFilterForm()
  const { value } = useField('filterSearch')

  const debouncedSearch = debouncedRef(value, 1000)
  const params = computed(() => {
    return {
      filter: debouncedSearch.value,
      priority: values.filterPriority,
      status: values.filterStatus,
    }
  })
  // function setFilter(value: string) {
  //   filter.value = value
  // }
  // function setSelectedPriority(value: string) {
  //   selectedPriority.value = value
  // }
  // function setSelectedStatus(value: TaskStatusType) {
  //   selectedStatus.value = value
  // }
  // const status = computed(() => {
  //   return filter.value ? 'active' : 'inactive'
  // })

  // watchEffect(() => {
  //   setFieldValue('filterSearch', filter.value)
  // })

  return {
    // filter: debounced,
    // setFilter,
    // setSelectedPriority,
    // setSelectedStatus,
    status: () => {},
    params,
    values,
    resetForm,
    meta,
  }
})
