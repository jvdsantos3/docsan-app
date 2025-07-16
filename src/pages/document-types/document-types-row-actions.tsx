import type { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
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
import { useToggleDocumentTypeStatus } from '@/http/use-toggle-document-type-status'
import type { GetDocumentTypesResponse } from '@/http/types/get-document-types-response'
import { useDeleteDocumentType } from '@/http/use-delete-document-type'
import { useSearchParams } from 'react-router-dom'

interface DocumentTypesRowActionsProps<TData> {
  row: Row<TData>
}

export function DocumentTypesRowActions<TData>({
  row,
}: DocumentTypesRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const { mutateAsync: toggleStatus } = useToggleDocumentTypeStatus()
  const { mutateAsync: deleteDocumentType } = useDeleteDocumentType()
  const documentType = row.original as GetDocumentTypesResponse['data'][number]

  function handleViewDetails() {
    setSearchParams((prev) => {
      prev.set('modal', 'details')
      prev.set('documentTypeId', documentType.id)
      return prev
    })
  }

  async function handleToggleStatus() {
    await toggleStatus(documentType.id)
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
  }

  return (
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
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="text-[#d82020]" />
              Excluir
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
