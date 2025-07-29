import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import {
  Download,
  Eye,
  FileText,
  MoreHorizontal,
  SquarePen,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import type { GetDocumentsResponse } from '@/http/types/get-documents-response'

type DocumentDataTableRowActionsProps<TData> = {
  row: Row<TData>
}

export function DocumentDataTableRowActions<TData>({
  row,
}: DocumentDataTableRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const document = row.original as GetDocumentsResponse['data'][number]

  function handleViewDetails() {
    setSearchParams((prev) => {
      prev.set('modal', 'details')
      prev.set('documentId', document.id)
      return prev
    })
  }

  function handlePreview() {
    setSearchParams((prev) => {
      prev.set('modal', 'preview')
      prev.set('documentId', document.id)
      return prev
    })
  }

  function handleExport() {
    setSearchParams((prev) => {
      prev.set('modal', 'export')
      prev.set('documentId', document.id)
      return prev
    })
  }

  function handleNotify() {
    setSearchParams((prev) => {
      prev.set('modal', 'notify')
      prev.set('documentId', document.id)
      return prev
    })
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
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye className="text-blue-source" />
          Ver detalhes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePreview}>
          <FileText className="text-green-source" />
          Pré-visualização
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExport}>
          <Download className="text-gray-600" />
          Exportar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleNotify}>
          <SquarePen className="text-blue-600" />
          Configurar notificação
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
