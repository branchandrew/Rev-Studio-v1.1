import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DocumentViewerSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            {/* No skeleton for the close button - it should always be visible */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pt-2">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div>
            <div className="space-y-4 mt-4">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="pt-4">
            <Skeleton className="h-5 w-48 mb-4" />
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-4 w-64 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TabbedDocumentViewerSkeleton() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-1 pt-1">
        <div className="flex gap-1">
          <Skeleton className="h-10 w-1/2 rounded-md" />
          <Skeleton className="h-10 w-1/2 rounded-md" />
        </div>
      </div>

      <div className="flex-1 mt-2">
        <DocumentViewerSkeleton />
      </div>
    </div>
  )
}

export function ContradictionViewerSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-64" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            {/* No skeleton for the close button - it should always be visible */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pt-2">
        <div className="space-y-6">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
