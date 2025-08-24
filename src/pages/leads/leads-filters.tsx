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
import { useDebounce } from '@/hooks/use-debounce'
import type { Lead } from './columns'

interface LeadsFiltersProps {
  onFilter: (leads: Lead[]) => void
  allLeads: Lead[]
}

export const LeadsFilters = ({ onFilter, allLeads }: LeadsFiltersProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const debouncedFilter = useDebounce(inputValue, 300)

  const handleClearInput = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSelectStatus = (value: string) => {
    setSelectedStatus(value)
  }

  useEffect(() => {
    let filtered = allLeads

    // Filter by text (name, email, service)
    if (debouncedFilter.trim()) {
      filtered = filtered.filter((lead) =>
        lead.name.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
        lead.email.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
        lead.service.toLowerCase().includes(debouncedFilter.toLowerCase())
      )
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((lead) => lead.status === selectedStatus)
    }

    onFilter(filtered)
  }, [debouncedFilter, selectedStatus, allLeads, onFilter])

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
      <div>
        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            className="peer ps-9 pe-9"
            placeholder="Buscar por nome, email, serviço..."
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          {inputValue && (
            <button
              className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Limpar busca"
              onClick={handleClearInput}
            >
              <CircleXIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div>
        <Select value={selectedStatus} onValueChange={handleSelectStatus}>
          <SelectTrigger className="sm:w-[180px] w-full">
            <SelectValue placeholder="Selecionar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="NEW">Novo</SelectItem>
              <SelectItem value="CONTACTED">Em Contato</SelectItem>
              <SelectItem value="CONVERTED">Convertido</SelectItem>
              <SelectItem value="LOST">Perdido</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}