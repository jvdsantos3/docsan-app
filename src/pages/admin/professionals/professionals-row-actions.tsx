import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import { Ban, Check, Eye, MoreHorizontal, UserCheck, X } from 'lucide-react'
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

  function handleReject() {
    setSearchParams((prev) => {
      prev.set('modal', 'reject')
      prev.set('professionalId', professional.id)
      return prev
    })
  }

  function handleBan() {
    setSearchParams((prev) => {
      prev.set('modal', 'ban')
      prev.set('professionalId', professional.id)
      prev.set('profesional', professional.status)
      
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
        {professional.status === 'PENDING' && (
          <>
            <DropdownMenuItem onClick={handleApprove}>
              <Check className="text-green-700" />
              Aprovar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleReject}>
              <X className="text-red-700" />
              Reprovar
            </DropdownMenuItem>
          </>
        )}
        {professional.status === 'APPROVED' ||
          (professional.status === 'PENDING' && (
            <DropdownMenuItem onClick={handleBan}>
              <Ban className="text-red-950" />
              Banir
            </DropdownMenuItem>
          ))}

        {professional.status === 'BANNED' && (
          <DropdownMenuItem onClick={handleBan}>
            <UserCheck className="text-green-700" />
            Desbanir
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
