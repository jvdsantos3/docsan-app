import type { ColumnDef } from '@tanstack/react-table'
import { RegistryTypesRowActions } from './registry-types-row-actions'
import { OrderButton } from '@/components/tables/order-button'
import { ArrowUpDown } from 'lucide-react'
import type { GetBranchesActivityResponse } from '@/types/http/get-branches-activity-response'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<GetBranchesActivityResponse['branchesActivity']['data'][number]>[] =
  [
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
          <span className="font-bold text-gray-900">
            {row.getValue('name')}
          </span>
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
            <RegistryTypesRowActions row={row} />
          </div>
        )
      },
    },
  ]
