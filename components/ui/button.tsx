"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-normal leading-none rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-secondary/80",
        secondary: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-secondary/80 hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-10 px-4 py-2",
        sm: "min-h-9 rounded-md px-3",
        lg: "min-h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "whitespace-normal leading-none")}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

/*
const ActivityCenterButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", size = "lg", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        id="activity_center_button"
        className={cn(buttonVariants({ variant, size }), "min-h-12 w-12 p-0 rounded-md", className)}
        ref={ref}
        {...props}
      >
        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.4325 17.0088C1.14916 17.0088 0.911662 16.913 0.719995 16.7213C0.528328 16.5296 0.432495 16.2921 0.432495 16.0088C0.432495 15.7255 0.528328 15.488 0.719995 15.2963C0.911662 15.1046 1.14916 15.0088 1.4325 15.0088H2.4325V8.00879C2.4325 6.62546 2.84916 5.39629 3.6825 4.32129C4.51583 3.24629 5.59916 2.54212 6.9325 2.20879V1.50879C6.9325 1.09212 7.07833 0.737956 7.37 0.446289C7.66166 0.154622 8.01583 0.00878906 8.4325 0.00878906C8.84916 0.00878906 9.20333 0.154622 9.495 0.446289C9.78666 0.737956 9.9325 1.09212 9.9325 1.50879V2.20879C11.2658 2.54212 12.3492 3.24629 13.1825 4.32129C14.0158 5.39629 14.4325 6.62546 14.4325 8.00879V15.0088H15.4325C15.7158 15.0088 15.9533 15.1046 16.145 15.2963C16.3367 15.488 16.4325 15.7255 16.4325 16.0088C16.4325 16.2921 16.3367 16.5296 16.145 16.7213C15.9533 16.913 15.7158 17.0088 15.4325 17.0088H1.4325ZM8.4325 20.0088C7.8825 20.0088 7.41166 19.813 7.02 19.4213C6.62833 19.0296 6.4325 18.5588 6.4325 18.0088H10.4325C10.4325 18.5588 10.2367 19.0296 9.845 19.4213C9.45333 19.813 8.9825 20.0088 8.4325 20.0088ZM4.4325 15.0088H12.4325V8.00879C12.4325 6.90879 12.0408 5.96712 11.2575 5.18379C10.4742 4.40046 9.5325 4.00879 8.4325 4.00879C7.3325 4.00879 6.39083 4.40046 5.6075 5.18379C4.82416 5.96712 4.4325 6.90879 4.4325 8.00879V15.0088Z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only">Activity Center</span>
      </Comp>
    )
  },
)
ActivityCenterButton.displayName = "ActivityCenterButton"
*/

const BreadcrumbButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { mode?: "resource" | "document"; onNavigateBack?: () => void }
>(
  (
    {
      className,
      variant = "ghost",
      size = "sm",
      asChild = false,
      mode = "resource",
      onNavigateBack,
      children,
      ...props
    },
    ref,
  ) => {
    // Don't render anything in resource mode
    if (mode === "resource") {
      return null
    }

    // In document mode, render a breadcrumb-style button
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
          className,
        )}
        onClick={onNavigateBack}
        ref={ref}
        {...props}
      >
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
          className="h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span>Resources</span>
        {children}
      </Comp>
    )
  },
)
BreadcrumbButton.displayName = "BreadcrumbButton"

// Temporary placeholder to prevent import errors
const ActivityCenterButton = () => null

export { Button, buttonVariants, ActivityCenterButton, BreadcrumbButton }
