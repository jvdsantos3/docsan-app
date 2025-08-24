import type { ColumnDef } from '@tanstack/react-table'
import { LeadsDataTableRowActions } from './leads-row-actions'
import { SortByButton } from '@/components/tables/sort-by-button'
import { getLeadStatusBadge } from './get-status-badge'
import { formatPhone } from '@/utils/format'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface Lead {
  id: string
  name: string
  service: string
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST'
  email: string
  phone: string
  createdAt: string
}

export const columns: ColumnDef<Lead>[] = [
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
    accessorKey: 'service',
    header: () => <SortByButton sortBy="service">Serviço</SortByButton>,
    cell: ({ row }) => {
      return (
        <span className="font-lato text-gray-900">
          {row.getValue('service')}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => <SortByButton sortBy="status">Status</SortByButton>,
    cell: ({ row }) => {
      return getLeadStatusBadge(row.getValue('status'))
    },
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: ({ row }) => {
      return (
        <span className="font-lato text-gray-900">{row.getValue('email')}</span>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    cell: ({ row }) => {
      return (
        <span className="font-lato text-gray-900">
          {formatPhone(row.getValue('phone'))}
        </span>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <SortByButton sortBy="createdAt">Recebido em</SortByButton>,
    cell: ({ row }) => {
      return format(row.getValue('createdAt'), 'P', {
        locale: ptBR,
      })
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <LeadsDataTableRowActions row={row} />
        </div>
      )
    },
  },
]
