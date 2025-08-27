import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToggleHighlightService } from '@/http/use-toggle-highlight-service'
import { useToggleStatusService } from '@/http/use-toggle-status-service'
import type { Service } from '@/types/service'
import type { Row } from '@tanstack/react-table'
import {
  CircleCheckBig,
  CircleOff,
  MoreHorizontal,
  Pencil,
  Star,
  StarOff,
  Trash2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type ServicesRowActionsProps<TData> = {
  row: Row<TData>
}

export function ServicesRowActions<TData>({
  row,
}: ServicesRowActionsProps<TData>) {
  const service = row.original as Service
  const navigate = useNavigate()
  const { mutateAsync: toggleStatus } = useToggleStatusService()
  const { mutateAsync: toggleHighlight } = useToggleHighlightService()

  const handleToggleStatus = async () => {
    await toggleStatus(service.id)
  }

  const handleToggleHighlight = async () => {
    await toggleHighlight(service.id)
  }

  const handleUpdateService = () => {
    navigate(`/admin/services/edit/${service.id}`)
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="text-blue-source size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleUpdateService}>
            <Pencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleHighlight}>
            {service.isHighlighted ? (
              <>
                <StarOff />
                Remover dos destaques
              </>
            ) : (
              <>
                <Star className="text-yellow-500" />
                Destacar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus}>
            {service.isActive ? (
              <>
                <CircleOff className="text-gray-700" />
                Inativar
              </>
            ) : (
              <>
                <CircleCheckBig className="text-green-600" />
                Ativar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 className="text-[#d82020]" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
