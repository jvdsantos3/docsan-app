import { DataTable } from '@/components/ui/data-table'
import { useDocumentTypes } from '@/http/use-document-types'
import { useSearchParams } from 'react-router-dom'
import { DocumentTypesPagination } from './document-types-pagination'
import { columns } from './columns'
import { DocumentTypesTableSkeleton } from './document-types-table-skeleton'
import { DocumentTypesPaginationSkeleton } from './document-types-pagination-skeleton'
import { DocumentTypesFilters } from './document-types-filters'
import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/http/use-profile'

export const DocumentTypesTable = () => {
  const { user } = useAuth()
  const { data: profileData } = useProfile({ enabled: !!user })
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  const filter = searchParams.get('filter') || ''
  const status = searchParams.get('status')

  const companyId = profileData?.user.owner?.companyId || ''
  const { data: response, isLoading } = useDocumentTypes(companyId, {
    page,
    order,
    filter,
    active:
      status === 'active' ? true : status === 'inactive' ? false : undefined,
  })

  return (
    <div>
      <div className="px-8 py-6 flex justify-between items-center">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Tipos de documentos
        </h2>

        <DocumentTypesFilters />
      </div>

      {isLoading ? (
        <div>
          <DocumentTypesTableSkeleton />
          <DocumentTypesPaginationSkeleton />
        </div>
      ) : (
        <div>
          <DataTable columns={columns} data={response?.data || []} />
          <DocumentTypesPagination
            currentPage={page}
            totalPages={response?.last || 1}
            paginationItemsToDisplay={5}
          />
        </div>
      )}
    </div>
  )
}
