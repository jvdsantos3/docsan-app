import { Skeleton } from '@/components/ui/skeleton'

export const RegistryTypeFormSkeleton = () => {
  return (
    <div className="space-y-6 py-2">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}