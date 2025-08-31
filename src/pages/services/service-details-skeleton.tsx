import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const ServiceDetailsSkeleton = () => {
  return (
    <div className="flex gap-12">
      <ServiceDetailsMainContentSkeleton />
      <ServiceDetailsAsideContentSkeleton />
    </div>
  )
}

const ServiceDetailsMainContentSkeleton = () => {
  return (
    <div className="space-y-4 flex-1">
      <Skeleton className="bg-neutral-200 rounded-full h-7 w-36" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="bg-neutral-200 rounded-full h-4 w-full"
          />
        ))}
        <Skeleton className="bg-neutral-200 rounded-full h-4 w-3/5" />
      </div>

      <div className="space-y-2 mt-12">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={index}
            className="bg-neutral-200 rounded-full h-4 w-full"
          />
        ))}
        <Skeleton className="bg-neutral-200 rounded-full h-4 w-4/5" />
        <Skeleton className="bg-neutral-200 rounded-full h-4 w-1/2" />
      </div>
    </div>
  )
}

const ServiceDetailsAsideContentSkeleton = () => {
  return (
    <aside className="w-full max-w-md">
      <Card className="sticky top-20">
        <Skeleton className="bg-neutral-200 h-56 w-full" />
        <CardContent>
          <Skeleton className="bg-neutral-200 h-9 w-full" />

          <div className="space-y-2 flex flex-col justify-center items-center mt-3">
            <Skeleton className="bg-neutral-200 h-4 w-full" />
            <Skeleton className="bg-neutral-200 h-4 w-3/5" />
          </div>

          <div className="space-y-2 mt-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="bg-neutral-200 rounded-full h-4 w-full"
              />
            ))}
            <Skeleton className="bg-neutral-200 rounded-full h-4 w-3/5" />
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
