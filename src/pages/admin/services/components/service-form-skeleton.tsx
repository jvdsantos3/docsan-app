import { Skeleton } from '@/components/ui/skeleton'

export const ServiceFormSkeleton = () => {
  return (
    <div>
      <div className="space-y-6 py-2">
        <div className="grid gap-2">
          <Skeleton className="bg-neutral-200 w-16 h-3.5" />
          <Skeleton className="bg-neutral-200 w-full h-9" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="bg-neutral-200 w-20 h-3.5" />
          <Skeleton className="bg-neutral-200 w-full h-16" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="bg-neutral-200 w-36 h-3.5" />
          <Skeleton className="bg-neutral-200 w-full h-28" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="bg-neutral-200 w-20 h-3.5" />
          <Skeleton className="bg-neutral-200 w-full h-80" />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Skeleton className="bg-neutral-200 w-24 h-9" />
      </div>
    </div>
  )
}
