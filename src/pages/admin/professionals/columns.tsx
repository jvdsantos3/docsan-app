import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { ProfessionalDataTableRowActions } from './actions'
import type { GetProfessionalsResponse } from '@/types/http/get-professionals-response'
import { SortByButton } from '@/components/tables/sort-by-button'

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
  },
  {
    accessorKey: 'status',
    header: () => <SortByButton sortBy="status">Status</SortByButton>,
    cell: ({ row }) => {
      if (row.getValue('status') === 'REJECTED') {
        return (
          <Badge
            variant="destructive"
            className="font-lato font-bold text-white"
          >
            <span>Reprovado</span>
          </Badge>
        )
      }

      if (row.getValue('status') === 'PENDING') {
        return (
          <Badge className="bg-[#F58F00] font-lato font-bold text-white">
            <span>Pendente</span>
          </Badge>
        )
      }

      if (row.getValue('status') === 'BANNED') {
        return (
          <Badge className="bg-red-950 font-lato font-bold text-white">
            <span>Banido</span>
          </Badge>
        )
      }

      return (
        <Badge className="bg-green-700 font-lato font-bold text-white">
          <span>Aprovado</span>
        </Badge>
      )
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
