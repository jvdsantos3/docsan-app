import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { DocumentDataTableRowActions } from './actions'
import type { GetDocumentsResponse } from '@/types/http/get-documents-response'
import { SortByButton } from '../../components/tables/sort-by-button'

export const columns: ColumnDef<
  GetDocumentsResponse['documents']['data'][number]
>[] = [
  {
    accessorKey: 'name',
    header: () => <SortByButton sortBy="name">Nome</SortByButton>,
    cell: ({ row }) => {
      return (
        <span className="font-lato font-bold text-gray-900">
          {row.getValue('name')}
        </span>
      )
    },
  },
  {
    accessorKey: 'documentType.name',
    header: () => <SortByButton sortBy="type">Tipo</SortByButton>,
  },
  {
    accessorKey: 'status',
    header: () => <SortByButton sortBy="status">Status</SortByButton>,
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
  {
    accessorKey: 'duedate',
    header: () => <SortByButton sortBy="duedate">Vencimento</SortByButton>,
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('duedate')))
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <SortByButton sortBy="createdAt">Recebido em</SortByButton>,
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
