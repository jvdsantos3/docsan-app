import { SearchInput } from '@/components/ui/search-input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/use-debounce'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

export const ServicesFilters = () => {
  const [filter, setFilter] = useQueryState('filter', { defaultValue: '' })
  const [, setStatus] = useQueryState('status', { defaultValue: '' })
  const [filterInputValue, setFilterInputValue] = useState(filter)
  const debouncedFilter = useDebounce(filterInputValue, 300)

  const handleSelectStatus = (value: string) => {
    setStatus(() => {
      if (value === 'all') {
        return null
      }
      return value
    })
  }

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
        <Select defaultValue="all" onValueChange={handleSelectStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <SearchInput
          value={filterInputValue}
          placeholder="Buscar por nome..."
          onValueChange={setFilterInputValue}
        />
      </div>
    </div>
  )
}
