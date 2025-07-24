import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { usePagination } from '@/hooks/use-pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

type DocumentsPaginationProps = {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay: number
}

export const DocumentsPagination = ({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: DocumentsPaginationProps) => {
  const [, setSearchParams] = useSearchParams()
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  })
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  function previousPage() {
    if (!hasPreviousPage) {
      return null
    }

    setSearchParams((params) => {
      params.set('page', String(currentPage - 1))
      return params
    })
  }

  function nextPage() {
    if (!hasNextPage) {
      return null
    }

    setSearchParams((params) => {
      params.set('page', String(currentPage + 1))
      return params
    })
  }

  function goToPage(page: number) {
    setSearchParams((params) => {
      params.set('page', String(page))
      return params
    })
  }

  return (
    <div className="py-4 px-8">
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-label="Ir para a página anterior"
              aria-disabled={!hasPreviousPage}
              onClick={previousPage}
            >
              <ChevronLeft />
              <span className="sr-only">Página anterior</span>
            </PaginationLink>
          </PaginationItem>

          {/* Left ellipsis (...) */}
          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Page number links */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => goToPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Right ellipsis (...) */}
          {showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-label="Ir para a próxima página"
              aria-disabled={!hasNextPage}
              onClick={nextPage}
            >
              <ChevronRight />
              <span className="sr-only">Próxima página</span>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
