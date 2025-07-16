import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { DocumentTypesRowActions } from './document-types-row-actions'
import type { DocumentType } from '@/types/document-type'
import { OrderButton } from './order-button'
import { ArrowUpDown } from 'lucide-react'

export const columns: ColumnDef<
  DocumentType & {
    _count: {
      documents: number
    }
  }
>[] = [
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
    accessorKey: '_count.documents',
    header: 'Documentos',
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
          <DocumentTypesRowActions row={row} />
        </div>
      )
    },
  },
]
