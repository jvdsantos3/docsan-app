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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteCnae } from '@/http/use-delete-cnae'
import { useToggleStatusCnae } from '@/http/use-toggle-status-cnae'
import { cn } from '@/lib/utils'
import type { GetCnaesResponse } from '@/types/http/get-cnaes-response'
import type { Row } from '@tanstack/react-table'
import {
  CircleCheckBig,
  CircleOff,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { toast } from 'sonner'

type CNAEsRowActionsProps<TData> = {
  row: Row<TData>
}

export function CNAEsRowActions<TData>({ row }: CNAEsRowActionsProps<TData>) {
  const cnae = row.original as GetCnaesResponse['cnaes']['data'][number]
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [, setModal] = useQueryState('modal')
  const [, setCnaeId] = useQueryState('cnaeId')
  const {
    mutateAsync: toggleStatusCnaeFn,
    error: toggleError,
    isSuccess,
  } = useToggleStatusCnae()
  const { isPending, mutateAsync: deleteCnaeFn, error } = useDeleteCnae()

  const handleEditCnae = () => {
    setModal('edit')
    setCnaeId(cnae.id)
  }

  const handleToggleStatus = async () => {
    await toggleStatusCnaeFn({ id: cnae.id })

    if (isSuccess) {
      toast.success('Status do CNAE alterado com sucesso!', {
        dismissible: true,
        duration: 5000,
      })
    }

    if (toggleError) {
      toast.error('Erro ao alterar status do CNAE. Tente novamente.', {
        dismissible: true,
        duration: 5000,
      })
    }
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
          <DropdownMenuItem onClick={handleToggleStatus}>
            {cnae.isActive ? (
              <>
                <CircleOff className="text-gray-700" />
                Inativar
              </>
            ) : (
              <>
                <CircleCheckBig className="text-green-600" />
                Ativar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
