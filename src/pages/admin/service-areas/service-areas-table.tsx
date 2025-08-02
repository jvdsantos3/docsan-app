import { DataTable } from '@/components/ui/data-table'
import { useServiceAreas } from '@/http/use-service-areas'
import { useSearchParams } from 'react-router-dom'
import { ServiceAreasPagination } from './service-areas-pagination'
import { columns } from './columns'
import { ServiceAreasTableSkeleton } from './service-areas-table-skeleton'
import { ServiceAreasPaginationSkeleton } from './service-areas-pagination-skeleton'
import { ServiceAreasFilters } from './service-areas-filters'
import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/http/use-profile'
import { UpdateServiceAreaDialog } from './update-service-areas-dialog'

export const ServiceAreasTable = () => {
  const { user } = useAuth()
  const { data: profileData } = useProfile({ enabled: !!user })
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  const filter = searchParams.get('filter') || ''

  const companyId = profileData?.user.owner?.companyId || ''
  const { data: response, isLoading } = useServiceAreas(companyId, {
    page,
    order,
    filter
  })
  const modalType = searchParams.get('modal')
  const serviceAreaId = searchParams.get('serviceAreaId')

  function handleCloseDialog() {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('serviceAreaId')
      return prev
    })
  }

  return (
    <div>
      <div className="px-8 py-6 flex justify-between items-center">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Áreas de serviço
        </h2>

        <ServiceAreasFilters />
      </div>

      {isLoading ? (
        <div>
          <ServiceAreasTableSkeleton />
          <ServiceAreasPaginationSkeleton />
        </div>
      ) : (
        <>
          <div>
            <DataTable
              columns={columns}
              data={response?.data || []}
            />
            <ServiceAreasPagination
              currentPage={page}
              totalPages={response?.last || 1}
              paginationItemsToDisplay={5}
            />
          </div>

          <UpdateServiceAreaDialog
            open={modalType === 'edit' && !!serviceAreaId}
            onOpenChange={handleCloseDialog}
          />
        </>
      )}
    </div>
  )
}
