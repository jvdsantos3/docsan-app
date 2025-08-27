import { DataTable } from '@/components/ui/data-table'
import { useRegistryTypes } from '@/http/use-registry-types'
import { useSearchParams } from 'react-router-dom'
import { RegistryTypesPagination } from './registry-types-pagination'
import { columns } from './columns'
import { RegistryTypesTableSkeleton } from './skeletons/registry-types-table-skeleton'
import { RegistryTypesPaginationSkeleton } from './skeletons/registry-types-pagination-skeleton'
import { RegistryTypesFilters } from './registry-types-filters'
import { UpdateRegistryTypeDialog } from './update-registry-types-dialog'

interface RegistryTypesByBranchTableProps {
  branchActivityId: string
}

export const RegistryTypesByBranchTable = ({
  branchActivityId,
}: RegistryTypesByBranchTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  const filter = searchParams.get('filter') || ''

  const { data: response, isLoading } = useRegistryTypes({
    page,
    order,
    filter,
    branchActivityId,
  })
  const modalType = searchParams.get('modal')
  const registryTypeId = searchParams.get('registryTypeId')

  function handleCloseDialog() {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('registryTypeId')
      return prev
    })
  }

  return (
    <div>
      <div className="px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center sm:space-y-0 space-y-6">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Tipos de registro profissional
        </h2>

        <RegistryTypesFilters />
      </div>

      {isLoading ? (
        <div>
          <RegistryTypesTableSkeleton />
          <RegistryTypesPaginationSkeleton />
        </div>
      ) : (
        <>
          <div>
            <DataTable
              columns={columns}
              data={response?.registryTypes.data || []}
            />
            <RegistryTypesPagination
              currentPage={page}
              totalPages={response?.registryTypes.last || 1}
              paginationItemsToDisplay={5}
            />
          </div>

          <UpdateRegistryTypeDialog
            open={modalType === 'edit' && !!registryTypeId}
            onOpenChange={handleCloseDialog}
          />
        </>
      )}
    </div>
  )
}
