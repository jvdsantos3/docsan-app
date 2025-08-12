import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { CNAEsPagination } from './cnaes-pagination'
import { useCnaes } from '@/http/use-cnaes'
import { parseAsInteger, useQueryState } from 'nuqs'
import { UpdateCnaeDialog } from './components/update-cnae-dialog'

export const CNAEsTable = () => {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [modal, setModal] = useQueryState('modal')
  const [cnaeId, setCnaeId] = useQueryState('cnaeId')
  const { data } = useCnaes()

  const handleCloseDialog = () => {
    setModal(null)
    setCnaeId(null)
  }

  return (
    <div>
      <div className="px-4 py-3 md:px-8 md:py-6 flex justify-between items-center">
        <h2 className="font-bold md:text-[21px] text-blue-1000">CNAEs</h2>
      </div>

      <div>
        <DataTable columns={columns} data={data?.cnaes.data || []} />
        <CNAEsPagination
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
