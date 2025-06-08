import type React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
  }[]
}

export function MainNav({ className, items, ...props }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Overview
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/examples/forms"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Forms
      </Link>
      <Link
        href="/examples/cards"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Cards
      </Link>
      <Link
        href="/examples/authentication"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Authentication
      </Link>
    </nav>
  )
}
