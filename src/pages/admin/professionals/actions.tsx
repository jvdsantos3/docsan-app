import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import {
  Check,
  Eye,
  MoreHorizontal,
  SquarePen,
  X,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import type { GetProfessionalsResponse } from '@/types/http/get-professionals-response'

type ProfessionalDataTableRowActionsProps<TData> = {
  row: Row<TData>
}

export function ProfessionalDataTableRowActions<TData>({
  row,
}: ProfessionalDataTableRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const professional =
    row.original as GetProfessionalsResponse['professionals']['data'][number]

  function handleViewDetails() {
    setSearchParams((prev) => {
      prev.set('modal', 'details')
      prev.set('professionalId', professional.id)
      return prev
    })
  }

  function handleApprove() {
    setSearchParams((prev) => {
      prev.set('modal', 'approve')
      prev.set('professionalId', professional.id)
      return prev
    })
  }

  function handleReproved() {
    setSearchParams((prev) => {
      prev.set('modal', 'reproved')
      prev.set('professionalId', professional.id)
      return prev
    })
  }

  function handleRequestCorrection() {
    setSearchParams((prev) => {
      prev.set('modal', 'request-correction')
      prev.set('professionalId', professional.id)
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
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye className="text-blue-source" />
          Ver detalhes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleApprove}>
          <Check className="text-green-700" />
          Aprovar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleReproved}>
          <X className="text-red-700" />
          Reprovar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRequestCorrection}>
          <SquarePen className="text-blue-source" />
          Solicitar correção
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
