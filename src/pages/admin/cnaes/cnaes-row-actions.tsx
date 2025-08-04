import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import { Eye, MoreHorizontal } from 'lucide-react'

type CNAEsRowActionsProps<TData> = {
  row: Row<TData>
}

export function CNAEsRowActions<TData>({ row }: CNAEsRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="text-blue-source size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log(row.original)}>
          <Eye className="text-blue-source" />
          Ver detalhes
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
