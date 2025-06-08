import { PopoverGuide } from "@/components/ui/popover-guide"

export function DiscoveryModeGuide() {
  return (
    <PopoverGuide
      title="Start deposition discovery"
      description="Click a prompt to generate an AI document."
      side="right"
      caret={true}
      showCloseButton={false}
      className="w-full mt-16"
    />
  )
}
