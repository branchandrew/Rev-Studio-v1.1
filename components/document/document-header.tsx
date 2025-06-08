"use client"

import { Button } from "@/components/ui/button"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"
import { cn } from "@/lib/utils"

interface DocumentHeaderProps {
  onClose?: () => void
  onShare?: () => void
  onDownload?: () => void
  className?: string
  title?: string
  showTitle?: boolean
}

export function DocumentHeader({
  onClose,
  onShare,
  onDownload,
  className,
  title = "Document",
  showTitle = false,
}: DocumentHeaderProps) {
  return (
    null
  )
}
