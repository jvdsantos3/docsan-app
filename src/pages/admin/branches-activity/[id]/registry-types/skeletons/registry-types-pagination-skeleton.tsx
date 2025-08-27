import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const RegistryTypesPaginationSkeleton = () => {
  return (
    <div className="py-4 px-8">
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-label="Ir para a página anterior"
            >
              <ChevronLeft />
              <span className="sr-only">Página anterior</span>
            </PaginationLink>
          </PaginationItem>

          {/* Page number links */}
          {Array.from({ length: 5 }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink>
                <Skeleton className="size-9" />
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-label="Ir para a próxima página"
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
