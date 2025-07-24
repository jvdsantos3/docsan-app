import { useSearchParams } from 'react-router-dom'
import { columns } from './columns'
import { DocumentPreviewDialog } from './components/preview-dialog'
import { NotifyDialog } from './components/notify-dialog'
import { ExportDialog } from './components/export-dialog'
import { useAuth } from '@/hooks/use-auth'
import { useDocuments } from '@/http/use-documents'
import { DocumentsFilters } from './filters'
import { DataTable } from '@/components/ui/data-table'
import { DocumentsPagination } from './pagination'

export const DocumentsDataTable = () => {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  // const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  // const sort = searchParams.get('sort') || 'createdAt'
  // const filter = searchParams.get('filter') || ''
  // const status = searchParams.get('status')
  const { data: response } = useDocuments(user?.profile?.companyId || '')

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
    <div className="bg-white rounded-lg border border-gray-100">
      <div className="px-8 py-6 flex justify-between items-center">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Documentos
        </h2>

        <DocumentsFilters />
      </div>

      {/* Data table */}
      <DataTable columns={columns} data={response?.data || []} />
      <DocumentsPagination
        currentPage={page}
        totalPages={response?.last || 1}
        paginationItemsToDisplay={5}
      />

      {/* Modal for document preview */}
      {documentId && modalType === 'preview' && (
        <DocumentPreviewDialog
          documentId={documentId}
          onOpenChange={handleCloseDialog}
        />
      )}

      {/* Modal for document notification */}
      {documentId && modalType === 'notify' && (
        <NotifyDialog
          documentId={documentId}
          onOpenChange={handleCloseDialog}
        />
      )}

      {/* Modal for document export */}
      {documentId && modalType === 'export' && (
        <ExportDialog
          documentId={documentId}
          onOpenChange={handleCloseDialog}
        />
      )}
    </div>
  )
}
