"use client"

import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface SimpleTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  className?: string
  contentClassName?: string
  delayDuration?: number
  skipDelayDuration?: number
  sideOffset?: number
}

export function SimpleTooltip({
  content,
  children,
  side = "top",
  align = "center",
  className,
  contentClassName,
  delayDuration = 100,
  skipDelayDuration = 300,
  sideOffset = 8,
}: SimpleTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true)
    }, delayDuration)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, skipDelayDuration)
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleBlur = () => {
    setIsOpen(false)
  }

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current || !isOpen) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    // Position based on side
    switch (side) {
      case "top":
        top = triggerRect.top - tooltipRect.height - sideOffset
        break
      case "bottom":
        top = triggerRect.bottom + sideOffset
        break
      case "left":
        left = triggerRect.left - tooltipRect.width - sideOffset
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        break
      case "right":
        left = triggerRect.right + sideOffset
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        break
    }

    // Adjust alignment
    if (side === "top" || side === "bottom") {
      switch (align) {
        case "start":
          left = triggerRect.left
          break
        case "center":
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case "end":
          left = triggerRect.right - tooltipRect.width
          break
      }
    } else if (side === "left" || side === "right") {
      switch (align) {
        case "start":
          top = triggerRect.top
          break
        case "center":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          break
        case "end":
          top = triggerRect.bottom - tooltipRect.height
          break
      }
    }

    // Apply position - fixed positioning relative to viewport
    if (tooltipRef.current) {
      tooltipRef.current.style.top = `${top}px`
      tooltipRef.current.style.left = `${left}px`
    }

    // Schedule next update
    animationFrameRef.current = requestAnimationFrame(updatePosition)
  }

  useEffect(() => {
    if (isOpen) {
      // Initial position update
      updatePosition()

      // Add event listeners
      window.addEventListener("scroll", updatePosition, true) // Capture phase to catch all scroll events
      window.addEventListener("resize", updatePosition)
    } else {
      // Clean up animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      // Remove event listeners
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [isOpen])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn("inline-block", className)}
      >
        {children}
      </div>
      {isMounted &&
        isOpen &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              "fixed z-[9999] px-3 py-1.5 text-sm bg-popover text-popover-foreground border border-border rounded-md shadow-md",
              "animate-in fade-in-0 zoom-in-95 duration-100",
              contentClassName,
            )}
            style={{ pointerEvents: "none" }}
            role="tooltip"
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  )
}

const SimpleTooltipTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  ),
)
SimpleTooltipTrigger.displayName = "SimpleTooltipTrigger"

const SimpleTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  ),
)
SimpleTooltipContent.displayName = "SimpleTooltipContent"

const SimpleTooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

export { SimpleTooltipTrigger, SimpleTooltipContent, SimpleTooltipProvider }
