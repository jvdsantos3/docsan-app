import { Skeleton } from '@/components/ui/skeleton'

export const DetailsSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="bg-neutral-200 w-full h-3" />
            <Skeleton className="bg-neutral-200 w-1/2 h-2" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="bg-neutral-200 w-full h-3" />
        ))}
        <Skeleton className="bg-neutral-200 w-2/3 h-3" />
      </div>
    </div>
  )
}
