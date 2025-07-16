import type { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  CircleCheckBig,
  CircleOff,
  Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import { useToggleDocumentTypeStatus } from '@/http/use-toggle-document-type-status'
import type { GetDocumentTypesResponse } from '@/http/types/get-document-types-response'
import { useDeleteDocumentType } from '@/http/use-delete-document-type'

interface DocumentTypesRowActionsProps<TData> {
  row: Row<TData>
}

export function DocumentTypesRowActions<TData>({
  row,
}: DocumentTypesRowActionsProps<TData>) {
  const { mutateAsync: toggleStatus } = useToggleDocumentTypeStatus()
  const { mutateAsync: deleteDocumentType } = useDeleteDocumentType()
  const documentType = row.original as GetDocumentTypesResponse['data'][number]

  async function handleToggleStatus() {
    await toggleStatus(documentType.id)
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
        <DropdownMenuItem
          onClick={() => console.log('View details', documentType)}
        >
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
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 className="text-[#d82020]" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
