"use client"

// Since there is no existing code, I will create a basic component structure and incorporate the requested button update.

import type React from "react"
import { Button } from "@/components/ui/button" // Assuming you have a Button component

interface SourceDocumentSheetProps {
  onClose: () => void
}

const SourceDocumentSheet: React.FC<SourceDocumentSheetProps> = ({ onClose }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end">
        {/* Updated Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-md"
          aria-label="Close document"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </div>
      <div>
        {/* Rest of the document content goes here */}
        <p>Source Document Content</p>
      </div>
    </div>
  )
}

export default SourceDocumentSheet
