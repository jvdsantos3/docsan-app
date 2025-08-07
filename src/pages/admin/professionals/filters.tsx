import { useEffect, useRef, useState } from 'react'
import { CircleXIcon, SearchIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '@/hooks/use-debounce'

export const ProfessionalsFilters = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilter = searchParams.get('filter') || ''
  const [inputValue, setInputValue] = useState(initialFilter)
  const debouncedFilter = useDebounce(inputValue, 300)

  const handleClearInput = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSelectStatus = (value: string) => {
    setSearchParams((prev) => {
      if (value === 'all') {
        prev.delete('status')
        return prev
      }

      prev.set('status', value)
      return prev
    })
  }

  useEffect(() => {
    if (debouncedFilter.trim()) {
      setSearchParams((prev) => {
        prev.set('filter', debouncedFilter)
        return prev
      })
    } else {
      setSearchParams((prev) => {
        prev.delete('filter')
        return prev
      })
    }
  }, [debouncedFilter, setSearchParams])

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
      <div>
        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            className="peer ps-9 pe-9"
            placeholder="Buscar por nome, email..."
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

      <div>
        <Select defaultValue="all" onValueChange={handleSelectStatus}>
          <SelectTrigger className="sm:w-[180px] w-full">
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="reproved">Reprovado</SelectItem>
              <SelectItem value="in_correction">Em correção</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      
    </div>
  )
}
