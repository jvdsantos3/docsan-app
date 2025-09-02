import type { ColumnDef } from '@tanstack/react-table'
import { ServicesRowActions } from './services-row-actions'
import { Badge } from '@/components/ui/badge'
import type { GetServicesResponse } from '@/types/http/get-services-response'
import { Star } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const columns: ColumnDef<
  GetServicesResponse['services']['data'][number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      const isHighlighted = row.original.isHighlighted

      return (
        <div className="flex gap-2 items-center">
          {isHighlighted && (
            <Tooltip>
              <TooltipTrigger>
                <Star className="text-yellow-500" size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Destacado</p>
              </TooltipContent>
            </Tooltip>
          )}
          {row.getValue('name')}
        </div>
      )
    },
  },
  {
    accessorKey: 'summary',
    header: 'Resumo',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate">
          {row.getValue('summary')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive')

      return isActive ? (
        <Badge className="bg-green-700 font-bold text-white">
          <span>Ativo</span>
        </Badge>
      ) : (
        <Badge variant="destructive" className="font-bold">
          <span>Inativo</span>
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <ServicesRowActions row={row} />
        </div>
      )
    },
  },
]
