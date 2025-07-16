import { DataTable } from '@/components/ui/data-table'
import { useDocumentTypes } from '@/http/use-document-types'
import { useSearchParams } from 'react-router-dom'
import { DocumentTypesPagination } from './document-types-pagination'
import { columns } from './columns'

export const DocumentTypesTable = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  const { data: response, isLoading } = useDocumentTypes({ page, order })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <DataTable columns={columns} data={response?.data || []} />
      <DocumentTypesPagination
        currentPage={page}
        totalPages={response?.last || 1}
        paginationItemsToDisplay={5}
      />
    </div>
  )
}
