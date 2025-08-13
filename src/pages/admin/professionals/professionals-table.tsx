import { useSearchParams } from 'react-router-dom'
import { columns } from './columns'
import { ProfessionalsFilters } from './professionals-filters'
import { DataTable } from '@/components/ui/data-table'
import { ProfessionalsPagination } from './professionals-pagination'
import { ProfessionalDetailsDialog } from './components/professional-details-dialog'
import { schema } from '@/types/http/get-professionals-search-params'
import { useProfessionals } from '@/http/use-professionals'
import { ProfessionalApproveDialog } from './components/professional-approve-dialog'
import { ProfessionalReproveDialog } from './components/professional-reprove-dialog'
import { ProfessionalBanDialog } from './components/professional-ban-dialog'

export const ProfessionalsDataTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const sort = searchParams.get('sort') ?? ''
  const direction = searchParams.get('direction') ?? 'asc'
  const filter = searchParams.get('filter') ?? ''
  const status = searchParams.get('status') ?? undefined

  const parsedParams = schema.safeParse({
    page,
    order: direction,
    orderBy: sort,
    status,
    filter,
  })

  const { data: response } = useProfessionals(parsedParams.data)

  const modalType = searchParams.get('modal')
  const professionalId = searchParams.get('professionalId')

  const handleCloseDialog = () => {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('professionalId')
      prev.delete('professionalStatus')
      return prev
    })
  }

  return (
    <div>
      <div className="px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center sm:space-y-0 space-y-6">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Lista de profissionais
        </h2>

        <ProfessionalsFilters />
      </div>

      <div>
        <DataTable
          columns={columns}
          data={response?.professionals.data || []}
        />
        <ProfessionalsPagination
          currentPage={page}
          totalPages={response?.professionals.last || 1}
          paginationItemsToDisplay={5}
        />
      </div>
      <ProfessionalDetailsDialog
        open={modalType === 'details' && !!professionalId}
        onOpenChange={handleCloseDialog}
      />
      <ProfessionalApproveDialog
        open={modalType === 'approve' && !!professionalId}
        onOpenChange={handleCloseDialog}
      />
      <ProfessionalReproveDialog
        open={modalType === 'reject' && !!professionalId}
        onOpenChange={handleCloseDialog}
      />

      <ProfessionalBanDialog
        open={modalType === 'ban' && !!professionalId}
        onOpenChange={handleCloseDialog}
      />
    </div>
  )
}
