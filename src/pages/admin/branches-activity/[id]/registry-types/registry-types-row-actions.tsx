import type { Row } from '@tanstack/react-table'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  CircleMinus,
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'
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
import type { GetRegistryTypesResponse } from '@/types/http/get-registry-types-response'
import { useDeleteRegistryType } from '@/http/use-delete-registry-type'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useToggleStatusRegistryType } from '@/http/use-toggle-status-registry-type'

interface RegistryTypesRowActionsProps<TData> {
  row: Row<TData>
}

export function RegistryTypesRowActions<TData>({
  row,
}: RegistryTypesRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const { mutateAsync: deleteRegistryType, error: deleteError } =
    useDeleteRegistryType()

  const { mutateAsync: toggleStatusRegistryType, error: toggleStatusError } =
    useToggleStatusRegistryType()
  const registryType =
    row.original as GetRegistryTypesResponse['registryTypes']['data'][number]
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toggleStatusOpen, setToggleStatusOpen] = useState(false)

  async function handleEdit() {
    setSearchParams((prev) => {
      prev.set('modal', 'edit')
      prev.set('registryTypeId', registryType.id)
      return prev
    })
  }

  async function handleDelete() {
    await deleteRegistryType(registryType.id)
    toast.success('Tipo de registro excluído com sucesso!', {
      dismissible: true,
      duration: 5000,
    })
  }

  async function handleToggleStatus() {
    await toggleStatusRegistryType(registryType.id)
    toast.success('Status alterado com sucesso!', {
      dismissible: true,
      duration: 5000,
    })
  }

  if (deleteError) {
    toast.error('Erro ao excluir tipo de registro. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  if (toggleStatusError) {
    toast.error('Erro ao alterar status. Tente novamente.', {
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
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setToggleStatusOpen(true)}>
            {registryType.isActive ? (
              <>
                <CircleMinus className="text-red-500" />
                Desativar
              </>
            ) : (
              <>
                <CirclePlus className="text-green-500" />
                Ativar
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir esse tipo de registro?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              tipo de registro.
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

      <AlertDialog open={toggleStatusOpen} onOpenChange={setToggleStatusOpen}>
        <AlertDialogContent className="bg-white sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente alterar o status deste tipo de registro?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta alteração impactará a visibilidade do tipo de registro no sistema. Caso
              necessário, será possível reverter a mudança posteriormente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className={cn(buttonVariants({ variant: 'default' }))}
              onClick={handleToggleStatus}
            >
              Alterar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
