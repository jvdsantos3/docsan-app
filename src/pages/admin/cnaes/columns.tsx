import type { ColumnDef } from '@tanstack/react-table'
import { CNAEsRowActions } from './cnaes-row-actions'
import type { GetCnaesResponse } from '@/types/http/get-cnaes-response'

export const columns: ColumnDef<GetCnaesResponse['cnaes']['data'][number]>[] = [
  {
    accessorKey: 'code',
    header: 'CNAE',
    cell: ({ row }) => {
      return row.getValue('code')
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
    },
  },
]
