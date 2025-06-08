"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { ContradictionContent } from "@/lib/data/contradiction-content"

interface ContradictionViewerProps {
  content: ContradictionContent
  onSourceClick: (doc: string, para: string, words: number) => void
  isVisible?: boolean
  className?: string
  useSimpleTooltip?: boolean
  hideTitle?: boolean
  onClose?: () => void
}

// Type for document version
interface DocumentVersion {
  id: string
  timestamp: Date
  label: string
  author: string
}

export function ContradictionViewer({
  content,
  onSourceClick,
  isVisible = true,
  className = "",
  useSimpleTooltip = false,
  hideTitle = false,
  onClose,
}: ContradictionViewerProps) {
  // State for document title
  const [documentTitle, setDocumentTitle] = useState(content.title)

  // State for versioning
  const [currentVersion, setCurrentVersion] = useState<DocumentVersion>({
    id: "v2",
    timestamp: new Date(),
    label: "Current Version",
    author: "Jennifer R. Martinez, Esq.",
  })

  // Mock version history
  const [versionHistory] = useState<DocumentVersion[]>([
    {
      id: "v2",
      timestamp: new Date(),
      label: "Current Version",
      author: "Jennifer R. Martinez, Esq.",
    },
    {
      id: "v1",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      label: "Initial Draft",
      author: "Legal Assistant",
    },
  ])

  // State for dropdown visibility
  const [isVersionOpen, setIsVersionOpen] = useState(false)

  // Function to handle version change
  const handleVersionChange = (version: DocumentVersion) => {
    setCurrentVersion(version)
    // In a real implementation, we would load the content for this version
  }

  // Function to handle title change
  const handleTitleChange = (newTitle: string) => {
    setDocumentTitle(newTitle)
  }

  // Function to calculate relative time
  const getRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

    if (diffInMinutes < 1) return "just now"
    if (diffInMinutes === 1) return "1 minute ago"
    return `${diffInMinutes} minutes ago`
  }

  // If hideTitle is true, render just the content without the Card wrapper
  if (hideTitle) {
    return (
      <div
        className={cn(
          "transition-all duration-300 h-full",
          className,
          !isVisible ? "opacity-0 pointer-events-none absolute inset-0" : "",
        )}
        id="contradictions_view"
        data-view-type="document"
      >
        <div className="space-y-6 text-sm h-full">
          <div className="border-b pb-4">
            <h5 className="font-semibold mb-2">INTRODUCTION</h5>
            <p>
              This document identifies and analyzes key contradictions in the evidence presented. These contradictions
              may impact the credibility of certain claims and should be considered when evaluating the overall case.
            </p>
          </div>

          <div className="space-y-6">
            {content.contradictions.map((contradiction, index) => (
              <div key={contradiction.id} className={index < content.contradictions.length - 1 ? "border-b pb-4" : ""}>
                <h5 className="font-semibold mb-2">{contradiction.title.toUpperCase()}</h5>
                <p className="mb-3">{contradiction.description}</p>

                <div className="space-y-4 mt-4">
                  {contradiction.evidence.map((item, idx) => (
                    <div key={idx}>
                      <p className="font-medium">{item.party}</p>
                      <p>
                        {item.claim}
                        {item.source && (
                          <button
                            onClick={() =>
                              onSourceClick(item.source!.document, item.source!.paragraph, item.source!.wordCount)
                            }
                            className="text-blue-600 ml-1 hover:underline focus:outline-none"
                          >
                            ("{item.source.document}", para. {item.source.paragraph}, {item.source.wordCount} words)
                          </button>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h5 className="font-semibold mb-2">CONCLUSION</h5>
            <p>
              The contradictions identified in this analysis raise significant questions about the credibility of
              certain claims. When considered alongside other evidence, these contradictions suggest potential
              inconsistencies that merit further investigation.
            </p>
          </div>

          <div className="pt-4">
            <p className="font-medium">Respectfully submitted,</p>
            <p className="mt-4">Jennifer R. Martinez, Esq.</p>
            <p>Blackwell & Associates LLP</p>
            <p>May 13, 2025</p>
          </div>
        </div>
      </div>
    )
  }

  // Standard view with title
  return (
    <div
      className={cn(
        "transition-all duration-300 h-full",
        className,
        !isVisible ? "opacity-0 pointer-events-none absolute inset-0" : "",
      )}
      id="contradictions_view"
      data-view-type="document"
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-normal">{documentTitle}</CardTitle>
            <div className="flex items-center gap-2 relative">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        /* Handle download functionality */
                      }}
                      className="h-8 w-8 p-0 flex items-center justify-center"
                      aria-label="Download document"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="ghost"
                size="m"
                onClick={() => setIsVersionOpen(!isVersionOpen)}
                className="h-8 border-input px-2 py-0 flex items-center justify-center"
              >
                {currentVersion.id}
                <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </Button>

              {isVersionOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                  {versionHistory.map((version) => (
                    <div
                      key={version.id}
                      onClick={() => {
                        handleVersionChange(version)
                        setIsVersionOpen(false)
                      }}
                      className="flex justify-between items-center rounded-sm py-1.5 px-2 text-sm outline-none cursor-pointer hover:bg-accent"
                    >
                      <span className="font-medium">{version.id}</span>
                      <span className="text-xs text-muted-foreground">{getRelativeTime(version.timestamp)}</span>
                    </div>
                  ))}
                </div>
              )}
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 flex items-center justify-center"
                  aria-label="Close document"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-2">
          <div className="space-y-6 text-sm">
            <div className="border-b pb-4">
              <h5 className="font-semibold mb-2">INTRODUCTION</h5>
              <p>
                This document identifies and analyzes key contradictions in the evidence presented. These contradictions
                may impact the credibility of certain claims and should be considered when evaluating the overall case.
              </p>
            </div>

            <div className="space-y-6">
              {content.contradictions.map((contradiction, index) => (
                <div
                  key={contradiction.id}
                  className={index < content.contradictions.length - 1 ? "border-b pb-4" : ""}
                >
                  <h5 className="font-semibold mb-2">{contradiction.title.toUpperCase()}</h5>
                  <p className="mb-3">{contradiction.description}</p>

                  <div className="space-y-4 mt-4">
                    {contradiction.evidence.map((item, idx) => (
                      <div key={idx}>
                        <p className="font-medium">{item.party}</p>
                        <p>
                          {item.claim}
                          {item.source && (
                            <button
                              onClick={() =>
                                onSourceClick(item.source!.document, item.source!.paragraph, item.source!.wordCount)
                              }
                              className="text-blue-600 ml-1 hover:underline focus:outline-none"
                            >
                              ("{item.source.document}", para. {item.source.paragraph}, {item.source.wordCount} words)
                            </button>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h5 className="font-semibold mb-2">CONCLUSION</h5>
              <p>
                The contradictions identified in this analysis raise significant questions about the credibility of
                certain claims. When considered alongside other evidence, these contradictions suggest potential
                inconsistencies that merit further investigation.
              </p>
            </div>

            <div className="pt-4">
              <p className="font-medium">Respectfully submitted,</p>
              <p className="mt-4">Jennifer R. Martinez, Esq.</p>
              <p>Blackwell & Associates LLP</p>
              <p>May 13, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContradictionViewer
