"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function EnvChecker() {
  const publicUrl = process.env.NEXT_PUBLIC_URL

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Environment Variables Check</CardTitle>
        <CardDescription>Verifying your environment setup</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">NEXT_PUBLIC_URL:</span>
          {publicUrl ? (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Available</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Missing</span>
            </div>
          )}
        </div>
        {publicUrl && (
          <div className="mt-2 p-2 bg-muted rounded-md">
            <code className="text-sm break-all">{publicUrl}</code>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
