import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { AppPagination } from '@/components/app-pagination'
import { ServicesFilters } from './services-filters'
import { useServices } from '@/http/use-services'
import { parseAsInteger, useQueryState } from 'nuqs'
import { ServicesTableSkeleton } from './services-table-skeleton'
import { ServicesPaginationSkeleton } from './services-pagination-skeleton'

export const ServicesTable = () => {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [filter] = useQueryState('filter', { defaultValue: '' })
  const [status] = useQueryState('status', { defaultValue: '' })
  const { data, isLoading } = useServices({
    page,
    filter,
    status:
      status === 'active' ? true : status === 'inactive' ? false : undefined,
  })

  return (
    <div>
      <div className="px-4 py-3 md:px-8 md:py-6 flex justify-between items-center">
        <h2 className="font-bold md:text-[21px] text-blue-1000">Serviços</h2>

        <ServicesFilters />
      </div>

      {isLoading ? (
        <div>
          <ServicesTableSkeleton />
          <ServicesPaginationSkeleton />
        </div>
      ) : (
        <div>
          <DataTable columns={columns} data={data?.services.data || []} />
          <AppPagination currentPage={1} totalPages={1} />
        </div>
      )}
    </div>
  )
}
