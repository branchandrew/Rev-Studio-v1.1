import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-muted/40">
      <Header />
      <main className="flex-1 flex px-6 pb-6 overflow-hidden">
        <Card className="w-full h-full flex flex-col">
          <CardContent className="flex-1 overflow-auto pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="md:col-span-1">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-7 w-32" />
                </div>
                <div className="bg-white border border-[#BEC8DA] rounded-lg p-6 min-h-[400px]">
                  <div className="flex flex-col items-center justify-center h-full">
                    <Skeleton className="h-16 w-16 rounded-full mb-4" />
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-64 mb-1" />
                    <Skeleton className="h-4 w-56 mb-6" />
                    <Skeleton className="h-10 w-48" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 flex flex-col">
                <Skeleton className="h-7 w-48 mb-4" />
                <div className="bg-[#f5f7fa] rounded-lg p-4">
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-white border border-[#BEC8DA] rounded-lg p-4">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
