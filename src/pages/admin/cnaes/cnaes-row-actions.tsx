import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cnaes } from '@/data/mockups/cnaes'
import { useDeleteCnae } from '@/http/use-delete-cnae'
import { cn } from '@/lib/utils'
import type { Row } from '@tanstack/react-table'
import { Loader2, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { toast } from 'sonner'

type CNAEsRowActionsProps<TData> = {
  row: Row<TData>
}

export function CNAEsRowActions<TData>({ row }: CNAEsRowActionsProps<TData>) {
  const cnae = row.original as (typeof cnaes)[number]
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [, setModal] = useQueryState('modal')
  const [, setCnaeId] = useQueryState('cnaeId')
  const { isPending, mutateAsync: deleteCnaeFn, error } = useDeleteCnae()

  const handleEditCnae = () => {
    setModal('edit')
    setCnaeId(cnae.id)
  }

  const handleDeleteCnae = async (id: string) => {
    await deleteCnaeFn(id)
  }

  if (error) {
    toast.error('Erro ao excluir CNAE. Tente novamente.')
  }

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
          <DropdownMenuItem onClick={handleEditCnae}>
            <Pencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            <Trash2 className="text-[#d82020]" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir o CNAE?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              CNAE.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className={cn(buttonVariants({ variant: 'destructive' }))}
              onClick={() => handleDeleteCnae(cnae.id)}
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
