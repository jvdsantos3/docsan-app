import type { ColumnDef } from '@tanstack/react-table'
import { ProfessionalDataTableRowActions } from './professionals-row-actions'
import type { GetProfessionalsResponse } from '@/types/http/get-professionals-response'
import { SortByButton } from '@/components/tables/sort-by-button'
import { getStatusBadge } from './get-status-badge'
import { formatCPFCNPJ } from '@/utils/format'

export const columns: ColumnDef<
  GetProfessionalsResponse['professionals']['data'][number]
>[] = [
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
    accessorKey: 'cpf',
    header: () => <SortByButton sortBy="cpf">CPF</SortByButton>,
    cell: ({ row }) => {
      return (
        <span className="font-lato font-bold text-gray-900">
          {formatCPFCNPJ(row.getValue('cpf'))}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => <SortByButton sortBy="status">Status</SortByButton>,
    cell: ({ row }) => {
      return getStatusBadge(row.getValue('status'))
    },
  },
  {
    accessorKey: 'user.email',
    // header: () => <SortByButton sortBy="email">E-mail</SortByButton>,
    header: 'E-mail',
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <SortByButton sortBy="createdAt">Data de cadastro</SortByButton>
    ),
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('createdAt')))
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <ProfessionalDataTableRowActions row={row} />
        </div>
      )
    },
  },
]
