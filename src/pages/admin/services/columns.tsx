import type { ColumnDef } from '@tanstack/react-table'
import { ServicesRowActions } from './services-row-actions'

type Service = {
  id: string
  imageUrl: string
  title: string
  description: string
}

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => row.getValue('title'),
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate">
          {row.getValue('description')}
        </span>
      </div>
    ),
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
