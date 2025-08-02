import type { ColumnDef } from '@tanstack/react-table'
import { DocumentTypeVersionsRowActions } from './document-type-versions-row-actions'
import { OrderButton } from './order-button'
import { ArrowUpDown } from 'lucide-react'
import type { GetDocumentTypeVersionsResponse } from '@/types/http/get-document-type-versions-response'

export const columns: ColumnDef<
  GetDocumentTypeVersionsResponse['data'][number]
>[] = [
  {
    accessorKey: 'version',
    header: 'Versão',
    cell: ({ row }) => {
      return (
        <span className="font-bold text-gray-900">{row.getValue('version')}</span>
      )
    },
  },
  {
    accessorKey: 'name',
    header: () => (
      <OrderButton>
        Nome
        <ArrowUpDown />
      </OrderButton>
    ),
    cell: ({ row }) => {
      return (
        <span className="font-bold text-gray-900">{row.getValue('name')}</span>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
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
          <DocumentTypeVersionsRowActions row={row} />
        </div>
      )
    },
  },
]
