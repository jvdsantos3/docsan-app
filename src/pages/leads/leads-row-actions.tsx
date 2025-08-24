import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import { Check, MoreHorizontal, Phone, RotateCcw, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import type { Lead } from './columns'

type LeadsDataTableRowActionsProps<TData> = {
  row: Row<TData>
}

export function LeadsDataTableRowActions<TData>({
  row,
}: LeadsDataTableRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const lead = row.original as Lead

  function handleMarkAsNew() {
    setSearchParams((prev) => {
      prev.set('modal', 'new')
      prev.set('leadId', lead.id)
      return prev
    })
  }

  function handleMarkAsContacted() {
    setSearchParams((prev) => {
      prev.set('modal', 'contacted')
      prev.set('leadId', lead.id)
      return prev
    })
  }

  function handleMarkAsConverted() {
    setSearchParams((prev) => {
      prev.set('modal', 'converted')
      prev.set('leadId', lead.id)
      return prev
    })
  }

  function handleMarkAsLost() {
    setSearchParams((prev) => {
      prev.set('modal', 'lost')
      prev.set('leadId', lead.id)
      return prev
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="text-blue-source size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {lead.status !== 'NEW' && (
          <DropdownMenuItem onClick={handleMarkAsNew}>
            <RotateCcw className="text-blue-500" />
            Marcar como novo
          </DropdownMenuItem>
        )}
        
        {lead.status !== 'CONTACTED' && (
          <DropdownMenuItem onClick={handleMarkAsContacted}>
            <Phone className="text-orange-500" />
            Marcar como em contato
          </DropdownMenuItem>
        )}
        
        {lead.status !== 'CONVERTED' && (
          <DropdownMenuItem onClick={handleMarkAsConverted}>
            <Check className="text-green-700" />
            Marcar como convertido
          </DropdownMenuItem>
        )}
        
        {lead.status !== 'LOST' && (
          <DropdownMenuItem onClick={handleMarkAsLost}>
            <X className="text-red-700" />
            Marcar como perdido
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
