import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { ProfessionalDataTableRowActions } from './actions'
import type { GetProfessionalsResponse } from '@/types/http/get-professionals-response'

export const columns: ColumnDef<
  GetProfessionalsResponse['professionals']['data'][number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      return (
        <span className="font-lato font-bold text-gray-900">
          {row.getValue('name')}
        </span>
      )
    },
  },
  { accessorKey: 'documentType.name', header: 'CPF/CNPJ' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (row.getValue('status') === 'overdue') {
        return (
          <Badge
            variant="destructive"
            className="font-lato font-bold text-white"
          >
            <span>Vencido</span>
          </Badge>
        )
      }

      if (row.getValue('status') === 'due_soon') {
        return (
          <Badge className="bg-[#F58F00] font-lato font-bold text-white">
            <span>Próximo</span>
          </Badge>
        )
      }

      return (
        <Badge className="bg-green-700 font-lato font-bold text-white">
          <span>Em dia</span>
        </Badge>
      )
    },
  },
  { accessorKey: 'documentType.name', header: 'E-mail' },
  {
    accessorKey: 'createdAt',
    header: 'Data de cadastro',
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('createdAt')))
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <ProfessionalDataTableRowActions row={row} />
        </div>
      )
    },
  },
]
