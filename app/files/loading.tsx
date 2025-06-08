import { Skeleton } from "@/components/ui/skeleton"

export default function FilesLoading() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex w-full pt-16">
        {/* Sidebar skeleton */}
        <div className="w-[260px] bg-muted border-r border-border flex flex-col h-[calc(100vh-64px)]">
          <div className="p-2 space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 flex flex-col bg-background p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-4 w-32 mb-4" />

          <div className="flex gap-4 mb-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-9 w-24" />
              ))}
          </div>

          <div className="border border-border rounded-md overflow-hidden">
            <Skeleton className="h-12 w-full" />
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
