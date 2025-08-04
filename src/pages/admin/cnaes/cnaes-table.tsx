import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { cnaes } from '@/data/mockups/cnaes'
import { CNAEsPagination } from './cnaes-pagination'

export const CNAEsTable = () => {
  return (
    <div>
      <div className="px-8 py-6 flex justify-between items-center">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          CNAEs
        </h2>
      </div>

      <div>
        <DataTable columns={columns} data={cnaes} />
        <CNAEsPagination
          currentPage={1}
          totalPages={Math.ceil(cnaes.length / 15)}
          paginationItemsToDisplay={5}
        />
      </div>
    </div>
  )
}
