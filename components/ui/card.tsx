"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 pt-3 px-6 pb-3 border-b", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  editable?: boolean
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, editable = false, children, defaultValue, onValueChange, ...props }, ref) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(defaultValue || (typeof children === "string" ? children : ""))

    const handleEdit = () => {
      if (editable) {
        setIsEditing(true)
      }
    }

    const handleSave = () => {
      setIsEditing(false)
      if (onValueChange) {
        onValueChange(value)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave()
      } else if (e.key === "Escape") {
        setIsEditing(false)
        setValue(defaultValue || (typeof children === "string" ? children : ""))
      }
    }

    return (
      <div ref={ref} {...props}>
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full px-1 py-0.5 text-xl font-semibold leading-none tracking-tight border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            autoFocus
          />
        ) : (
          <div
            className={cn(
              "text-xl font-semibold leading-none tracking-tight",
              editable && "group cursor-pointer hover:text-blue-600 flex items-center gap-1",
              className,
            )}
            onClick={handleEdit}
            role={editable ? "button" : undefined}
            tabIndex={editable ? 0 : undefined}
            onKeyDown={editable ? (e) => e.key === "Enter" && handleEdit() : undefined}
            aria-label={editable ? "Click to edit title" : undefined}
          >
            {defaultValue || value || children}
            {editable && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            )}
          </div>
        )}
      </div>
    )
  },
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} style={{ paddingTop: "24px" }} className={cn("p-6 pt-0", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
