import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen grid grid-cols-12 bg-white">
      <div className="col-span-1"></div>
      <div className="col-span-10 py-6 md:py-10">
        <div className="w-2/3 max-w-3xl">
          {/* Logo Skeleton */}
          <div className="mb-12">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          {/* Header Skeleton */}
          <div className="mb-10">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Option Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <Skeleton className="h-48 w-full rounded-md" />
            <Skeleton className="h-48 w-full rounded-md" />
          </div>

          {/* Navigation Buttons Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-[375px]" />
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  )
}
