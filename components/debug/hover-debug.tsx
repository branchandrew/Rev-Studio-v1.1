"use client"

import { useEffect } from "react"

export function HoverDebug() {
  useEffect(() => {
    // Add debugging styles
    const style = document.createElement("style")
    style.textContent = `
      
      .hover\\:bg-secondary\\/80:hover {
        background-color: rgba(244, 244, 245, 0.8) !important;
      }
      
      .hover\\:bg-primary\\/90:hover {
        background-color: rgba(9, 9, 11, 0.9) !important;
      }
      
      /* Debug specific components */
      #activity_center_button:hover {
        background-color: rgba(244, 244, 245, 0.8) !important;
      }
      
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}
