"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TooltipExample() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="text-2xl font-bold">Tooltip Examples</h2>

      <div className="flex flex-wrap gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover Me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default">Top Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>This appears on top</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Bottom Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>This appears at the bottom</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive">Right Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>This appears on the right</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-medium mb-2">Important Notes:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Always wrap tooltips with <code className="bg-muted-foreground/20 px-1 rounded">TooltipProvider</code>
          </li>
          <li>
            Use <code className="bg-muted-foreground/20 px-1 rounded">asChild</code> on the trigger to use custom
            elements
          </li>
          <li>
            Set <code className="bg-muted-foreground/20 px-1 rounded">side</code> prop to control tooltip position
          </li>
          <li>For global tooltips, add the provider to your layout</li>
        </ul>
      </div>
    </div>
  )
}
