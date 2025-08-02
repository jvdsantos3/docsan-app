import type { Row } from '@tanstack/react-table'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
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
import type { GetServiceAreasResponse } from '@/types/http/get-service-areas-response'
import { useDeleteServiceArea } from '@/http/use-delete-service-area'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ServiceAreasRowActionsProps<TData> {
  row: Row<TData>
}

export function ServiceAreasRowActions<TData>({
  row,
}: ServiceAreasRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const { mutateAsync: deleteServiceArea, error: deleteError } =
    useDeleteServiceArea()
  const serviceArea = row.original as GetServiceAreasResponse['data'][number]
  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleEdit() {
    setSearchParams((prev) => {
      prev.set('modal', 'edit')
      prev.set('serviceAreaId', serviceArea.id)
      return prev
    })
  }

  async function handleDelete() {
    await deleteServiceArea(serviceArea.id)
    toast.success('Área de serviço excluída com sucesso!', {
      dismissible: true,
      duration: 5000,
    })
  }

  if (deleteError) {
    toast.error('Erro ao excluir área de serviço. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="text-blue-source size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil />
            Editar
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
              Tem certeza que deseja excluir essa área de serviço?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a
              área de serviço.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className={cn(buttonVariants({ variant: 'destructive' }))}
              onClick={handleDelete}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
