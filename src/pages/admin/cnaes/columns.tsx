import type { ColumnDef } from '@tanstack/react-table'
import { CNAEsRowActions } from './cnaes-row-actions'

export const columns: ColumnDef<{
  id: string
  cnae: string
  description: string
}>[] = [
  {
    accessorKey: 'cnae',
    header: 'CNAE',
    cell: ({ row }) => {
      return row.getValue('cnae')
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      return row.getValue('description')
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <CNAEsRowActions row={row} />
        </div>
      )
    }
  },
]
