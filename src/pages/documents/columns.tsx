import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'
import {
  Download,
  Eye,
  FileText,
  MoreHorizontal,
  SquarePen,
} from 'lucide-react'

export type Document = {
  id: string
  name: string
  type: string
  status: 'overdue' | 'due_soon' | 'up_to_date'
  dueDate: Date
  receivedDate: Date
}

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      return (
        <span className="font-lato font-bold text-gray-900">
          {row.getValue('name')}
        </span>
      )
    },
  },
  { accessorKey: 'type', header: 'Tipo' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (row.getValue('status') === 'overdue') {
        return (
          <Badge
            variant="destructive"
            className="font-lato font-bold text-white"
          >
            <span>Vencido</span>
          </Badge>
        )
      }

      if (row.getValue('status') === 'due_soon') {
        return (
          <Badge className="bg-[#F58F00] font-lato font-bold text-white">
            <span>Próximo</span>
          </Badge>
        )
      }

      return (
        <Badge className="bg-green-700 font-lato font-bold text-white">
          <span>Em dia</span>
        </Badge>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Vencimento',
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('receivedDate')))
    },
  },
  {
    accessorKey: 'receivedDate',
    header: 'Recebido em',
    cell: ({ row }) => {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(row.getValue('receivedDate')))
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => console.log('View details', document)}
              >
                <Eye className="text-blue-source" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="text-green-source" />
                Pré-visualização
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="text-gray-600" />
                Exportar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SquarePen className="text-blue-600" />
                Configurar notificação
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
