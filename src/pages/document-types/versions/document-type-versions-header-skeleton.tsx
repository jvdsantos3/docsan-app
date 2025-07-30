import { Skeleton } from '@/components/ui/skeleton'

export const DocumentTypeVersionsHeaderSkeleton = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-6 w-96 mt-4" />
      </div>
    </div>
  )
}
