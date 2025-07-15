import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from './data-table-row-actions'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

export type DocumentType = {
  id: string
  name: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<DocumentType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-bold text-gray-900">{row.getValue('name')}</span>
      )
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      return row.getValue('isActive') ? (
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
    accessorKey: 'createdAt',
    header: 'Criado em',
    // cell: ({ row }) => {
    //   return new Intl.DateTimeFormat('pt-BR', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //   }).format(new Date(row.getValue('receivedDate')))
    // },
    cell: ({ row }) => {
      return (
        <span className="text-gray-500">
          {new Date(row.getValue('createdAt')).toLocaleDateString()}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <DataTableRowActions row={row} />
        </div>
      )
    },
  },
]
