import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { DocumentDataTableRowActions } from './actions'
import type { GetDocumentsResponse } from '@/http/types/get-documents-response'

export const columns: ColumnDef<GetDocumentsResponse['data'][number]>[] = [
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
  { accessorKey: 'documentType.name', header: 'Tipo' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (row.getValue('status') === 'won') {
        return (
          <Badge
            variant="destructive"
            className="font-lato font-bold text-white"
          >
            <span>Vencido</span>
          </Badge>
        )
      }

      if (row.getValue('status') === 'near') {
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
  {
    accessorKey: 'dueDate',
    header: 'Vencimento',
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('dueDate')))
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Recebido em',
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
          <DocumentDataTableRowActions row={row} />
        </div>
      )
    },
  },
]
