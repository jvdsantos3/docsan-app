import { Skeleton } from '@/components/ui/skeleton'

export const AppHeaderSkeleton = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between gap-4 px-4 xl:px-0 container mx-auto">
        <div>
          <Skeleton className="h-8 w-20 bg-neutral-200" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-8 w-24 bg-neutral-200" />
          <Skeleton className="h-8 w-16 bg-neutral-200" />
          <Skeleton className="h-8 w-16 bg-neutral-200" />
          <Skeleton className="size-8 bg-neutral-200 rounded-full" />
        </div>
      </div>
    </header>
  )
}
