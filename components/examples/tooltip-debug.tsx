"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TooltipDebug() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">Tooltip Debugging</h2>

      <div className="flex flex-col gap-4">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Standard Tooltip</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover Me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Standard tooltip content</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Controlled Tooltip</h3>
          <TooltipProvider>
            <Tooltip open={isOpen} onOpenChange={setIsOpen}>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? "Close Tooltip" : "Open Tooltip"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-blue-500 text-white border-blue-600">
                <p>This tooltip is controlled programmatically</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Inline Tooltip (No Portal)</h3>
          <div className="relative inline-block">
            <Button variant="outline">Hover (Inline)</Button>
            <div className="absolute top-full mt-2 z-50 bg-popover border rounded-md px-3 py-1.5 text-sm shadow-md">
              This is a manually positioned tooltip
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-medium mb-2">Troubleshooting:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>If you see the inline tooltip but not the Radix ones, it's likely a portal or z-index issue</li>
          <li>If the controlled tooltip works but hover doesn't, check event handling</li>
          <li>Try inspecting the DOM to see if tooltips are being rendered at all</li>
          <li>Check for CSS conflicts that might be hiding tooltips</li>
        </ul>
      </div>
    </div>
  )
}
