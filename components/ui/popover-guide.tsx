"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PopoverGuideProps {
  title: string
  description: string
  side?: "top" | "right" | "bottom" | "left"
  caret?: boolean
  showBadge?: boolean
  buttonText?: string
  onButtonClick?: () => void
  onClose?: () => void
  className?: string
  initiallyVisible?: boolean
  showCloseButton?: boolean
}

export function PopoverGuide({
  title,
  description,
  side = "top",
  caret = true,
  showBadge = false,
  buttonText,
  onButtonClick,
  onClose,
  className,
  initiallyVisible = true,
  showCloseButton = true,
}: PopoverGuideProps) {
  const [isVisible, setIsVisible] = useState(initiallyVisible)

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <div className={cn("relative", className)}>
      <div
        className="rounded-lg p-[2px] shadow-md relative"
        style={{
          background: "linear-gradient(135deg, #3F00FF 0%, #8D57FF 100%)",
          borderRadius: "8px",
        }}
      >
        <div className="bg-white rounded-[6px] p-4 h-full">
          {/* Close button - shown by default unless disabled */}
          {showCloseButton && (
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Badge */}
          {showBadge && (
            <div className="bg-[#22085e] text-white px-3 py-1 rounded-md text-sm font-medium mb-2 inline-block">
              NEW
            </div>
          )}

          {/* Content */}
          <div className={cn(showCloseButton ? "pr-8" : "")}>
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            <p className="text-gray-700">{description}</p>

            {/* Optional button */}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="bg-[#22085e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#22085e]/90 transition-colors"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>

        {/* Caret - Fixed directions */}
        {caret && (
          <div
            className={cn(
              "absolute w-4 h-4 rotate-45 bg-white",
              side === "top" && "top-[-5px] left-1/2 transform -translate-x-1/2",
              side === "right" && "right-[-5px] top-1/2 transform -translate-y-1/2",
              side === "bottom" && "bottom-[-5px] left-1/2 transform -translate-x-1/2",
              side === "left" && "left-[-5px] top-1/2 transform -translate-y-1/2",
            )}
            style={{
              boxShadow:
                side === "top"
                  ? "-2px -2px 0 0 #3F00FF"
                  : side === "right"
                    ? "2px -2px 0 0 #3F00FF"
                    : side === "bottom"
                      ? "2px 2px 0 0 #3F00FF"
                      : "-2px 2px 0 0 #3F00FF",
            }}
          />
        )}
      </div>
    </div>
  )
}
