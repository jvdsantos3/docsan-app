import { Input } from '@/components/ui/input'
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
import { CircleXIcon, SearchIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect, useRef, useState } from 'react'

export const CnaesFilters = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useQueryState('filter', { defaultValue: '' })
  const [, setStatus] = useQueryState('status', { defaultValue: '' })
  const [inputValue, setInputValue] = useState(filter)
  const debouncedFilter = useDebounce(inputValue, 300)

  const handleSelectStatus = (value: string) => {
    setStatus(() => {
      if (value === 'all') {
        return null
      }
      return value
    })
  }

  const handleClearInput = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
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
        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            className="peer ps-9 pe-9"
            placeholder="Buscar por código ou descrição..."
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          {inputValue && (
            <button
              className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Clear input"
              onClick={handleClearInput}
            >
              <CircleXIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
