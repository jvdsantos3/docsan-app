import type { ColumnDef } from '@tanstack/react-table'
import { ServiceAreasRowActions } from './service-areas-row-actions'
import { OrderButton } from '@/components/tables/order-button'
import { ArrowUpDown } from 'lucide-react'
import type { GetServiceAreasResponse } from '@/types/http/get-service-areas-response'

export const columns: ColumnDef<
  GetServiceAreasResponse['data'][number]
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
          <ServiceAreasRowActions row={row} />
        </div>
      )
    },
  },
]
