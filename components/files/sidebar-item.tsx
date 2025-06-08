"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

export function SidebarItem({ icon, label, onClick, className }: SidebarItemProps) {
  return (
    <div
      className={cn("flex items-center gap-2 text-foreground hover:bg-accent rounded-md p-2 cursor-pointer", className)}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

interface SidebarSubItemProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export function SidebarSubItem({ label, active = false, onClick }: SidebarSubItemProps) {
  return (
    <div
      className={cn(
        "text-sm p-1 cursor-pointer",
        active ? "text-primary font-medium" : "text-muted-foreground hover:text-primary",
      )}
      onClick={onClick}
    >
      {label}
    </div>
  )
}
