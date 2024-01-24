const searchStatusType = ['typing', 'fetching', 'idle'] as const
type SearchStatus = typeof searchStatusType[number]

export const useSearchStatus = () => useState<SearchStatus>('search:status', () => 'idle')
