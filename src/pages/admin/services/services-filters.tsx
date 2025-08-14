import { SearchInput } from '@/components/ui/search-input'
import { useDebounce } from '@/hooks/use-debounce'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

export const ServicesFilters = () => {
  const [filter, setFilter] = useQueryState('filter', { defaultValue: '' })
  const [filterInputValue, setFilterInputValue] = useState(filter)
  const debouncedFilter = useDebounce(filterInputValue, 300)

  useEffect(() => {
    if (debouncedFilter.trim()) {
      setFilter(debouncedFilter)
    } else {
      setFilter(null)
    }
  }, [debouncedFilter, setFilter])

  return (
    <div className="flex gap-6">
      <div>
        <SearchInput
          value={filterInputValue}
          placeholder="Buscar por título..."
          onValueChange={setFilterInputValue}
        />
      </div>
    </div>
  )
}
