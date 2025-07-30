import { DataTable } from '@/components/ui/data-table'
import { useSearchParams } from 'react-router-dom'
import { DocumentTypesPagination } from './document-type-versions-pagination'
import { columns } from './columns'
import { DocumentTypesVersionsTableSkeleton } from './document-type-versions-table-skeleton'
import { DocumentTypeVersionsPaginationSkeleton } from './document-type-versions-pagination-skeleton'
import { DocumentTypeVersionsFilters } from './document-type-versions-filters'
import { useDocumentTypeVersions } from '@/http/use-document-type-versions'
import { DocumentDetailsDialog } from '@/pages/documents/components/details-dialog'
import { DocumentPreviewDialog } from '@/pages/documents/components/preview-dialog'
import { ExportDialog } from '@/pages/documents/components/export-dialog'

type DocumentTypeVersionsTableProps = {
  companyId: string
  documentTypeId: string
}

export const DocumentTypeVersionsTable = ({
  companyId,
  documentTypeId
}: DocumentTypeVersionsTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  const filter = searchParams.get('filter') || ''

  const { data: response, isLoading } = useDocumentTypeVersions(
    companyId,
    documentTypeId,
    {
      page,
      order,
      filter,
    },
  )

  const handleCloseDialog = () => {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('documentId')
      return prev
    })
  }

  const modalType = searchParams.get('modal')
  const documentId = searchParams.get('documentId')

  return (
    <div>
      <div className="px-8 py-6 flex justify-between items-center">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Versões
        </h2>

        <DocumentTypeVersionsFilters />
      </div>

      {isLoading ? (
        <div>
          <DocumentTypesVersionsTableSkeleton />
          <DocumentTypeVersionsPaginationSkeleton />
        </div>
      ) : (
        <>
          <div>
            <DataTable columns={columns} data={response?.data || []} />
            <DocumentTypesPagination
              currentPage={page}
              totalPages={response?.last || 1}
              paginationItemsToDisplay={5}
            />
          </div>

          <DocumentDetailsDialog
            open={modalType === 'details' && !!documentId}
            onOpenChange={handleCloseDialog}
          />
    
          {/* Modal for document preview */}
          <DocumentPreviewDialog
            open={modalType === 'preview' && !!documentId}
            onOpenChange={handleCloseDialog}
          />
    
          {/* Modal for document export */}
          <ExportDialog
            open={modalType === 'export' && !!documentId}
            onOpenChange={handleCloseDialog}
          />
        </>
      )}
    </div>
  )
}
