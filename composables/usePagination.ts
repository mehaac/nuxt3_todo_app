export function useUsePagination() {
  const limit = ref(3)

  const currentPage = ref(1)

  const calcOffset = computed(() => {
    return (currentPage.value - 1) * limit.value
  })

  return {
    limit: readonly(limit),
    calcOffset,
    currentPage,
  }
}
