import { TooltipExamples } from "@/components/examples/tooltip-examples"

export default function TooltipTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tooltip Test Page</h1>
      <p className="text-gray-600 mb-8">
        This page demonstrates our custom tooltip implementation that should work regardless of any issues with Radix
        UI.
      </p>
      <TooltipExamples />
    </div>
  )
}
