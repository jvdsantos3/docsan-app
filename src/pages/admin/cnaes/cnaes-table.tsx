import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { useCnaes } from '@/http/use-cnaes'
import { parseAsInteger, useQueryState } from 'nuqs'
import { UpdateCnaeDialog } from './components/update-cnae-dialog'
import { CnaesFilters } from './cnaes-filters'
import { useSearchParams } from 'react-router-dom'
import { AppPagination } from '@/components/app-pagination'

export const CNAEsTable = () => {
  const [searchParams] = useSearchParams()
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [modal, setModal] = useQueryState('modal')
  const [cnaeId, setCnaeId] = useQueryState('cnaeId')
  const [filter] = useQueryState('filter', { defaultValue: '' })
  const [status] = useQueryState('status', { defaultValue: '' })
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) ?? 'asc'
  const { data } = useCnaes({
    page,
    filter,
    active:
      status === 'active' ? true : status === 'inactive' ? false : undefined,
    order,
  })

  const handleCloseDialog = () => {
    setModal(null)
    setCnaeId(null)
  }

  return (
    <div>
      <div className="px-4 py-3 md:px-8 md:py-6 flex justify-between items-center">
        <h2 className="font-bold md:text-[21px] text-blue-1000">CNAEs</h2>

        <CnaesFilters />
      </div>

      <div>
        <DataTable columns={columns} data={data?.cnaes.data || []} />
        <AppPagination
          currentPage={page}
          totalPages={data?.cnaes.last || 1}
          paginationItemsToDisplay={5}
        />
      </div>

      <UpdateCnaeDialog
        open={modal === 'edit' && !!cnaeId}
        onOpenChange={handleCloseDialog}
      />
    </div>
  )
}
