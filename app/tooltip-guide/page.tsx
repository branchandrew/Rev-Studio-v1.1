import { TooltipUsageGuide } from "@/components/examples/tooltip-usage-guide"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"
import { Button } from "@/components/ui/button"

export default function TooltipGuidePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">SimpleTooltip Guide</h1>
      <p className="text-gray-600 mb-8">A custom tooltip implementation that works without Radix UI dependencies</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TooltipUsageGuide />
        </div>
        <div className="space-y-6">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-4">Live Examples</h2>
            <div className="flex flex-col gap-4">
              <SimpleTooltip content="Default tooltip">
                <Button variant="outline" className="w-full justify-start">
                  Default
                </Button>
              </SimpleTooltip>

              <SimpleTooltip content="Right side tooltip" side="right">
                <Button variant="outline" className="w-full justify-start">
                  Right Side
                </Button>
              </SimpleTooltip>

              <SimpleTooltip
                content="Custom styled tooltip"
                contentClassName="bg-green-100 text-green-800 border-green-200"
              >
                <Button variant="outline" className="w-full justify-start">
                  Custom Style
                </Button>
              </SimpleTooltip>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-4">Why Use This?</h2>
            <ul className="space-y-2">
              <li>✅ No Radix UI dependencies</li>
              <li>✅ Simple implementation</li>
              <li>✅ Fully customizable</li>
              <li>✅ Handles positioning automatically</li>
              <li>✅ Works with any React component</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
