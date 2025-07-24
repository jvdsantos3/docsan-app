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
import { useNavigate } from 'react-router-dom'
import type { GetDocumentsResponse } from '@/http/types/get-documents-response'

type DocumentDataTableRowActionsProps<TData> = {
  row: Row<TData>
}

export function DocumentDataTableRowActions<TData>({
  row,
}: DocumentDataTableRowActionsProps<TData>) {
  const navigate = useNavigate()
  const document = row.original as GetDocumentsResponse['data'][number]

  function handleViewDetails() {
    navigate(`?documentId=${document.id}&modal=details`)
  }

  function handlePreview() {
    navigate(`?documentId=${document.id}&modal=preview`)
  }

  function handleExport() {
    navigate(`?documentId=${document.id}&modal=export`)
  }

  function handleNotify() {
    navigate(`?documentId=${document.id}&modal=notify`)
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
