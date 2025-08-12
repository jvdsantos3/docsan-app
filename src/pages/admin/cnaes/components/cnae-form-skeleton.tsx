import { Skeleton } from '@/components/ui/skeleton'

export const CnaeFormSkeleton = () => {
  return (
    <div>
      <div className="space-y-6">
        <div className="grid gap-2">
          <Skeleton className="h-3.5 w-10 bg-neutral-200" />
          <Skeleton className="h-9 w-full bg-neutral-200" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-3.5 w-20 bg-neutral-200" />
          <Skeleton className="h-16 w-full bg-neutral-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-9 w-full bg-neutral-200" />
        <Skeleton className="h-9 w-full bg-neutral-200" />
      </div>
    </div>
  )
}
