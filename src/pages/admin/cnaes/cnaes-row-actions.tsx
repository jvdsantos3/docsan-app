import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cnaes } from '@/data/mockups/cnaes'
import type { Row } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

type CNAEsRowActionsProps<TData> = {
  row: Row<TData>
}

export function CNAEsRowActions<TData>({ row }: CNAEsRowActionsProps<TData>) {
  const cnae = row.original as (typeof cnaes)[number]

  const handleDeleteCnae = (id: string) => {
    const index = cnaes.findIndex((cnae) => cnae.id === id)

    if (index !== -1) {
      cnaes.splice(index, 1)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="text-blue-source size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {}}>
          <Pencil />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteCnae(cnae.id)}>
          <Trash2 className="text-[#d82020]" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
