import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { DocumentDataTableRowActions } from './actions'

export type Document = {
  id: string
  name: string
  type: string
  status: 'overdue' | 'due_soon' | 'up_to_date'
  dueDate: Date
  receivedDate: Date
}

export const columns: ColumnDef<Document>[] = [
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
  { accessorKey: 'type', header: 'Tipo' },
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
  {
    accessorKey: 'dueDate',
    header: 'Vencimento',
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('receivedDate')))
    },
  },
  {
    accessorKey: 'receivedDate',
    header: 'Recebido em',
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('receivedDate')))
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <DocumentDataTableRowActions row={row} />
        </div>
      )
    },
  },
]
