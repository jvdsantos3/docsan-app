import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import { MoreHorizontal, Trash2 } from 'lucide-react'

type Service = {
  id: string
  imageUrl: string
  title: string
  description: string
}

type ServicesRowActionsProps<TData> = {
  row: Row<TData>
}

export function ServicesRowActions<TData>({
  row,
}: ServicesRowActionsProps<TData>) {
  const service = row.original as Service

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="text-blue-source size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 className="text-[#d82020]" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
