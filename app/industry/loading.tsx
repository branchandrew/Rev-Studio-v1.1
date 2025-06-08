import { Skeleton } from "@/components/ui/skeleton"

export default function IndustryLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-10 bg-white">
      <div className="w-full max-w-3xl">
        {/* Logo Skeleton */}
        <div className="mb-12">
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>

        {/* Header Skeleton */}
        <div className="mb-10">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Industry Selection Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className={`h-16 rounded-md ${i === 8 ? "md:col-span-2" : ""}`} />
            ))}
        </div>

        {/* Navigation Buttons Skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}
