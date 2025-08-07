import { DataTable } from '@/components/ui/data-table'
import { useBranchesActivity } from '@/http/use-branches-activity'
import { useSearchParams } from 'react-router-dom'
import { BranchesActivityPagination } from './branches-activity-pagination'
import { columns } from './columns'
import { BranchesActivityTableSkeleton } from './branches-activity-table-skeleton'
import { BranchesActivityPaginationSkeleton } from './branches-activity-pagination-skeleton'
import { BranchesActivityFilters } from './branches-activity-filters'
import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/http/use-profile'
import { UpdateBranchActivityDialog } from './update-branches-activity-dialog'

export const BranchesActivityTable = () => {
  const { user } = useAuth()
  const { data: profileData } = useProfile({ enabled: !!user })
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  const filter = searchParams.get('filter') || ''

  const companyId = profileData?.user.owner?.companyId || ''
  const { data: response, isLoading } = useBranchesActivity(companyId, {
    page,
    order,
    filter,
  })
  const modalType = searchParams.get('modal')
  const branchActivitId = searchParams.get('branchActivitId')
  
  function handleCloseDialog() {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('branchActivitId')
      return prev
    })
  }

  return (
    <div>
      <div className="px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center sm:space-y-0 space-y-6">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Ramos de atuação
        </h2>

        <BranchesActivityFilters />
      </div>

      {isLoading ? (
        <div>
          <BranchesActivityTableSkeleton />
          <BranchesActivityPaginationSkeleton />
        </div>
      ) : (
        <>
          <div>
            <DataTable columns={columns} data={response?.data || []} />
            <BranchesActivityPagination
              currentPage={page}
              totalPages={response?.last || 1}
              paginationItemsToDisplay={5}
            />
          </div>

          <UpdateBranchActivityDialog
            open={modalType === 'edit' && !!branchActivitId}
            onOpenChange={handleCloseDialog}
          />
        </>
      )}
    </div>
  )
}
