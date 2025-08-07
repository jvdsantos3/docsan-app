import { useSearchParams } from 'react-router-dom'
import { columns } from './columns'
import { ProfessionalsFilters } from './filters'
import { DataTable } from '@/components/ui/data-table'
import { ProfessionalsPagination } from './pagination'
import { ProfessionalDetailsDialog } from './details-dialog'
import { schema } from '@/types/http/get-professionals-search-params'
// import { useProfile } from '@/http/use-profile'
import { useProfessionals } from '@/http/use-professionals'

export const ProfessionalsDataTable = () => {
  // const { data: profile } = useProfile()
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

  // const companyId = profile?.user.owner?.companyId || ''
  const { data: response } = useProfessionals(parsedParams.data)

  const modalType = searchParams.get('modal')
  const professionalId = searchParams.get('professionalId')

  const handleCloseDialog = () => {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('professionalId')
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
        <DataTable columns={columns} data={response?.data || []} />
        <ProfessionalsPagination
          currentPage={page}
          totalPages={response?.last || 1}
          paginationItemsToDisplay={5}
        />
      </div>

      <ProfessionalDetailsDialog
        open={modalType === 'details' && !!professionalId}
        onOpenChange={handleCloseDialog}
      />

    </div>
  )
}
