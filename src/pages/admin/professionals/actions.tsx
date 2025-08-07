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
  History,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import type { GetDocumentsResponse } from '@/types/http/get-documents-response'
import { Link } from 'react-router-dom'

type ProfessionalDataTableRowActionsProps<TData> = {
  row: Row<TData>
}

export function ProfessionalDataTableRowActions<TData>({
  row,
}: ProfessionalDataTableRowActionsProps<TData>) {
  const [, setSearchParams] = useSearchParams()
  const document =
    row.original as GetDocumentsResponse['documents']['data'][number]

  function handleViewDetails() {
    setSearchParams((prev) => {
      prev.set('modal', 'details')
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
