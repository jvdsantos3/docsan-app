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
  CircleCheckBig,
  CircleOff,
  Eye,
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
import { useToggleDocumentTypeStatus } from '@/http/use-toggle-document-type-status'
import type { GetDocumentTypesResponse } from '@/http/types/get-document-types-response'
import { useDeleteDocumentType } from '@/http/use-delete-document-type'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface DocumentTypesRowActionsProps<TData> {
  row: Row<TData>
}

export function DocumentTypesRowActions<TData>({
  row,
}: DocumentTypesRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const { mutateAsync: toggleStatus, error: toggleError } =
    useToggleDocumentTypeStatus()
  const { mutateAsync: deleteDocumentType, error: deleteError } =
    useDeleteDocumentType()
  const documentType = row.original as GetDocumentTypesResponse['data'][number]
  const [deleteOpen, setDeleteOpen] = useState(false)

  function handleViewDetails() {
    setSearchParams((prev) => {
      prev.set('modal', 'details')
      prev.set('documentTypeId', documentType.id)
      return prev
    })
  }

  async function handleToggleStatus() {
    await toggleStatus(documentType.id)
    toast.success('Status do tipo de documento alterado com sucesso!', {
      dismissible: true,
      duration: 5000,
    })
  }

  async function handleEdit() {
    setSearchParams((prev) => {
      prev.set('modal', 'edit')
      prev.set('documentTypeId', documentType.id)
      return prev
    })
  }

  async function handleDelete() {
    await deleteDocumentType(documentType.id)
    toast.success('Tipo de documento excluído com sucesso!', {
      dismissible: true,
      duration: 5000,
    })
  }

  if (toggleError) {
    toast.error(
      'Erro ao alterar status do tipo de documento. Tente novamente.',
      {
        dismissible: true,
        duration: 5000,
      },
    )
  }

  if (deleteError) {
    toast.error('Erro ao excluir tipo de documento. Tente novamente.', {
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
          <DropdownMenuItem onClick={handleViewDetails}>
            <Eye className="text-blue-source" />
            Ver detalhes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus}>
            {documentType.isActive ? (
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
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil />
            Editar
          </DropdownMenuItem>
          {documentType._count?.documents === 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                <Trash2 className="text-[#d82020]" />
                Excluir
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir do tipo de documento?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              tipo de documento.
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
