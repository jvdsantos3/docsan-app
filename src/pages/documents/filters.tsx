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
import { useDocumentTypes } from '@/http/use-document-types'
import { ComboBox } from '@/components/ui/combobox'
import { useDocumentType } from '@/http/use-document-type'
import { useProfile } from '@/http/use-profile'

export const DocumentsFilters = () => {
  const { data: profile } = useProfile()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialType = searchParams.get('type') || ''
  const [type, setType] = useState(initialType)
  const initialFilter = searchParams.get('filter') || ''
  const [inputValue, setInputValue] = useState(initialFilter)
  const debouncedFilter = useDebounce(inputValue, 300)

  const companyId = profile?.user.owner?.companyId || ''

  const [filter, setFilter] = useState('')
  const { data: documentType } = useDocumentType(type, companyId)
  const { data: response, isLoading } = useDocumentTypes(companyId, {
    active: true,
    filter,
  })

  const selected = documentType
    ? { value: documentType.id, label: documentType.name }
    : undefined

  const handleClearInput = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSelectType = (value: string) => {
    setType(value === type ? '' : value)
    setSearchParams((prev) => {
      if (value === type) {
        prev.delete('type')
      } else {
        prev.set('type', value)
      }
      return prev
    })
  }

  const handleSelectStatus = (value: string) => {
    setSearchParams((prev) => {
      let status: string = ''

      switch (value) {
        case 'all':
          prev.delete('status')
          return prev
        case 'up_to_date':
          status = 'inDay'
          break
        case 'due_soon':
          status = 'near'
          break
        case 'overdue':
          status = 'won'
          break
      }

      prev.set('status', status)
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
              <SelectItem value="up_to_date">Em dia</SelectItem>
              <SelectItem value="due_soon">Próximo</SelectItem>
              <SelectItem value="overdue">Vencido</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <ComboBox
          items={
            response?.documentTypes.data.map((item) => ({
              value: item.id,
              label: item.name,
            })) || []
          }
          onChange={handleSelectType}
          onSearch={(value) => setFilter(value)}
          value={type}
          selectedItem={selected}
          isLoading={isLoading}
          className="w-[180px]"
          contentClassName="w-[180px]"
          placeholder="Todos os tipos"
          emptyMessage="Nenhum tipo de documento encontrado."
          delay={300}
          shouldFilter={false}
        />
      </div>

      <div>
        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            className="peer ps-9 pe-9"
            placeholder="Buscar por nome..."
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
