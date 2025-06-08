"use client"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"

export function TooltipUsageGuide() {
  return (
    <div className="space-y-8">
      <section className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">How to Use SimpleTooltip</h2>

        <div className="p-4 bg-muted rounded-md mb-6">
          <pre className="text-sm overflow-x-auto">
            {`import { SimpleTooltip } from "@/components/ui/simple-tooltip"

<SimpleTooltip content="Your tooltip text">
  <Button>Hover Me</Button>
</SimpleTooltip>`}
          </pre>
        </div>

        <div className="flex items-center gap-4">
          <SimpleTooltip content="This is how it looks!">
            <Button variant="outline" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Live Example
            </Button>
          </SimpleTooltip>
        </div>
      </section>

      <section className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Available Props</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Prop</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Default</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-sm">content</td>
                <td className="p-2">ReactNode</td>
                <td className="p-2">-</td>
                <td className="p-2">The content to display in the tooltip</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-sm">children</td>
                <td className="p-2">ReactNode</td>
                <td className="p-2">-</td>
                <td className="p-2">The trigger element</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-sm">side</td>
                <td className="p-2">top | right | bottom | left</td>
                <td className="p-2">top</td>
                <td className="p-2">The preferred side to show the tooltip</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-sm">align</td>
                <td className="p-2">start | center | end</td>
                <td className="p-2">center</td>
                <td className="p-2">The alignment along the side</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-sm">className</td>
                <td className="p-2">string</td>
                <td className="p-2">-</td>
                <td className="p-2">Additional classes for the trigger wrapper</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-sm">contentClassName</td>
                <td className="p-2">string</td>
                <td className="p-2">-</td>
                <td className="p-2">Additional classes for the tooltip content</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-sm">delayDuration</td>
                <td className="p-2">number</td>
                <td className="p-2">100</td>
                <td className="p-2">Delay before showing the tooltip (ms)</td>
              </tr>
              <tr>
                <td className="p-2 font-mono text-sm">skipDelayDuration</td>
                <td className="p-2">number</td>
                <td className="p-2">300</td>
                <td className="p-2">Delay before hiding the tooltip (ms)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
