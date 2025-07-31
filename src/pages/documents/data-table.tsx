import { useSearchParams } from 'react-router-dom'
import { columns } from './columns'
import { DocumentPreviewDialog } from './components/preview-dialog'
import { NotifyDialog } from './components/notify-dialog'
import { ExportDialog } from './components/export-dialog'
import { useDocuments } from '@/http/use-documents'
import { DocumentsFilters } from './filters'
import { DataTable } from '@/components/ui/data-table'
import { DocumentsPagination } from './pagination'
import { DocumentDetailsDialog } from './components/details-dialog'
import { schema } from '@/http/types/get-documents-search-params'
import { useProfile } from '@/http/use-profile'

export const DocumentsDataTable = () => {
  const { data: profile } = useProfile()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const sort = searchParams.get('sort') ?? ''
  const direction = searchParams.get('direction') ?? 'asc'
  const filter = searchParams.get('filter') ?? ''
  const status = searchParams.get('status') ?? undefined
  const type = searchParams.get('type') ?? ''

  const parsedParams = schema.safeParse({
    page,
    order: direction,
    orderBy: sort,
    type,
    status,
    filter,
  })

  const companyId = profile?.user.owner?.companyId || ''
  const { data: response } = useDocuments(companyId, parsedParams.data)

  const modalType = searchParams.get('modal')
  const documentId = searchParams.get('documentId')

  const handleCloseDialog = () => {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('documentId')
      return prev
    })
  }

  return (
    <div>
      <div className="px-8 py-6 flex justify-between items-center">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Documentos
        </h2>

        <DocumentsFilters />
      </div>

      <div>
        <DataTable columns={columns} data={response?.documents.data || []} />
        <DocumentsPagination
          currentPage={page}
          totalPages={response?.documents.last || 1}
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

      {/* Modal for document notification */}
      <NotifyDialog
        open={modalType === 'notify' && !!documentId}
        onOpenChange={handleCloseDialog}
      />

      {/* Modal for document export */}
      <ExportDialog
        open={modalType === 'export' && !!documentId}
        onOpenChange={handleCloseDialog}
      />
    </div>
  )
}
