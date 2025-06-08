"use client"
import { Button } from "@/components/ui/button"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"

export function TooltipExamples() {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Simple Tooltip Examples</h2>
        <div className="flex flex-wrap gap-8">
          <SimpleTooltip content="This is a top tooltip">
            <Button variant="outline">Hover Me (Top)</Button>
          </SimpleTooltip>

          <SimpleTooltip content="This is a right tooltip" side="right">
            <Button variant="outline">Hover Me (Right)</Button>
          </SimpleTooltip>

          <SimpleTooltip content="This is a bottom tooltip" side="bottom">
            <Button variant="outline">Hover Me (Bottom)</Button>
          </SimpleTooltip>

          <SimpleTooltip content="This is a left tooltip" side="left">
            <Button variant="outline">Hover Me (Left)</Button>
          </SimpleTooltip>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Alignment Examples</h2>
        <div className="flex flex-wrap gap-8">
          <SimpleTooltip content="Start aligned tooltip" side="bottom" align="start">
            <Button variant="outline">Start Aligned</Button>
          </SimpleTooltip>

          <SimpleTooltip content="Center aligned tooltip" side="bottom" align="center">
            <Button variant="outline">Center Aligned</Button>
          </SimpleTooltip>

          <SimpleTooltip content="End aligned tooltip" side="bottom" align="end">
            <Button variant="outline">End Aligned</Button>
          </SimpleTooltip>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Styled Examples</h2>
        <div className="flex flex-wrap gap-8">
          <SimpleTooltip content="Custom styled tooltip" contentClassName="bg-blue-500 text-white border-blue-600">
            <Button variant="outline">Blue Tooltip</Button>
          </SimpleTooltip>

          <SimpleTooltip content="Warning tooltip" contentClassName="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Button variant="outline">Warning Tooltip</Button>
          </SimpleTooltip>

          <SimpleTooltip
            content={
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span>With custom content</span>
              </div>
            }
          >
            <Button variant="outline">Complex Content</Button>
          </SimpleTooltip>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-medium mb-2">How This Works:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Uses React's createPortal to render tooltips directly in the document body</li>
          <li>Calculates positions manually based on the trigger element</li>
          <li>Handles mouse events for showing/hiding</li>
          <li>Updates position on scroll and resize</li>
          <li>Supports different sides, alignments, and custom styling</li>
        </ul>
      </div>
    </div>
  )
}
