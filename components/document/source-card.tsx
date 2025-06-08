"use client"

import { useRef, useEffect, useState } from "react"
import type { SourceDocument } from "@/lib/data/source-documents"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { X, Download, Play, Volume2, Subtitles, Maximize, ExternalLink, Share } from "lucide-react"
import { FileTypeIcon } from "@/components/shared/file-type-icons"

interface SourceCardProps {
  sourceDocument: SourceDocument
  onClose: () => void
  isClosing?: boolean
  isChangingSource?: boolean
  fromResourcesPanel?: boolean
}

export function SourceCard(props: SourceCardProps) {
  // Manually destructure props to avoid using rest/spread pattern
  const sourceDocument = props.sourceDocument
  const onClose = props.onClose
  const isClosing = props.isClosing || false
  const isChangingSource = props.isChangingSource || false
  const fromResourcesPanel = props.fromResourcesPanel || false

  const sourceCardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isContentReady, setIsContentReady] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const isDeposition = sourceDocument.document === "Legal transcription"

  // Debug logging
  console.log("SourceCard props:", {
    document: sourceDocument?.document,
    paragraph: sourceDocument?.paragraph,
    hasContent: !!sourceDocument?.content,
    contentType: typeof sourceDocument?.content,
    fromResourcesPanel,
  })

  // Handle drawer close
  const handleDrawerOpenChange = (open: boolean) => {
    setIsDrawerOpen(open)
    if (!open) {
      onClose()
    }
  }

  // Add click outside handler for desktop view
  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event: MouseEvent) => {
        if (sourceCardRef.current && !sourceCardRef.current.contains(event.target as Node)) {
          onClose()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [onClose, isMobile])

  // Initialize animation state after component mounts
  useEffect(() => {
    // Force a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsContentReady(true)
      // Add another small delay for animation
      setTimeout(() => {
        setShouldAnimate(true)
      }, 50)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Enhanced highlighting effect with better timing and error handling
  useEffect(() => {
    if (!contentRef.current || fromResourcesPanel || !isContentReady) return

    console.log("Highlighting effect running", {
      contentRef: !!contentRef.current,
      fromResourcesPanel,
      document: sourceDocument.document,
      paragraph: sourceDocument.paragraph,
      isContentReady,
    })

    // Use requestAnimationFrame to ensure DOM is fully rendered
    const highlightContent = () => {
      if (!contentRef.current) return

      try {
        // Define key text to highlight for each document
        const highlightTargets = {
          "Case file 1": "The plaintiff claims that despite multiple requests for status updates",
          "Legal Notes": "Jan 15, 2024 – Alleged PIP delivered",
          "Legal transcription": "You mentioned you weren't aware of her internal complaint",
          "Case document": "Medical expenses ($8,432.70 to date)",
        }

        const docName = sourceDocument.document
        const textToFind = highlightTargets[docName]

        console.log("Looking for text to highlight:", { docName, textToFind })

        if (textToFind) {
          // Wait for content to be fully rendered with multiple checks
          let attempts = 0
          const maxAttempts = 10

          const findAndHighlight = () => {
            attempts++

            if (!contentRef.current || attempts > maxAttempts) {
              console.log("Max attempts reached or content ref lost")
              return
            }

            // Find all text nodes in the content
            const walker = document.createTreeWalker(contentRef.current, NodeFilter.SHOW_TEXT, null)

            let node
            let found = false

            // Walk through all text nodes
            while ((node = walker.nextNode()) && !found) {
              if (node.textContent && node.textContent.includes(textToFind)) {
                console.log("Found text to highlight in node:", node.textContent.substring(0, 100))

                // Create a highlight span
                const span = document.createElement("span")
                span.className = "highlighted-content"
                span.style.cssText = `
                  background-color: rgba(255, 255, 0, 0.3) !important;
                  padding: 0.25em !important;
                  border-left: 3px solid #f59e0b !important;
                  border-radius: 2px !important;
                  box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
                  display: inline !important;
                  margin: 0 !important;
                  animation: highlight-pulse 2s ease-in-out 1 !important;
                `

                // Replace the text node with our highlighted version
                const text = node.textContent
                const index = text.indexOf(textToFind)

                if (index >= 0) {
                  // Split the text node into three parts: before, highlight, after
                  const before = document.createTextNode(text.substring(0, index))
                  const highlight = document.createTextNode(text.substring(index, index + textToFind.length))
                  const after = document.createTextNode(text.substring(index + textToFind.length))

                  span.appendChild(highlight)

                  const parent = node.parentNode
                  if (parent) {
                    parent.insertBefore(before, node)
                    parent.insertBefore(span, node)
                    parent.insertBefore(after, node)
                    parent.removeChild(node)

                    console.log("Highlighting applied, scrolling to element")

                    // Scroll to the highlighted element with multiple fallbacks
                    setTimeout(() => {
                      try {
                        span.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                          inline: "nearest",
                        })
                      } catch (scrollError) {
                        console.warn("Smooth scroll failed, trying alternative:", scrollError)
                        // Fallback to instant scroll
                        span.scrollIntoView({
                          block: "center",
                          inline: "nearest",
                        })
                      }
                    }, 300)

                    found = true
                  }
                }
              }
            }

            if (!found && attempts < maxAttempts) {
              console.log(`Text not found on attempt ${attempts}, retrying...`)
              // Retry after a short delay
              setTimeout(findAndHighlight, 100)
            } else if (!found) {
              console.log("Text not found after all attempts:", textToFind)
            }
          }

          // Start the highlighting process
          findAndHighlight()
        } else {
          console.log("No highlight target defined for document:", docName)
        }
      } catch (error) {
        console.error("Error in highlighting logic:", error)
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(highlightContent)
    })
  }, [sourceDocument, fromResourcesPanel, isContentReady])

  // Get the appropriate icon based on document type
  const getDocumentIcon = () => {
    const documentIconMap: Record<string, string> = {
      "Case file 1": "pdf",
      "Legal Notes": "textUpload",
      "Legal transcription": "transcript",
      "Case document": "word",
    }

    const iconType = documentIconMap[sourceDocument.document] || "document"

    return (
      <div className="scale-75">
        <FileTypeIcon type={iconType as any} size="sm" />
      </div>
    )
  }

  // Media player component for depositions
  const MediaPlayer = () => (
    <div className="sticky top-0 z-10 bg-black p-2 shadow-sm flex justify-center">
      <div className="relative max-w-[400px] w-full">
        <button
          className="absolute top-0 right-0 text-white p-1 flex items-center gap-1 hover:bg-white/10 rounded text-xs"
          aria-label="Detach video"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="text-xs">Detach video</span>
        </button>
        <div className="h-[20vh] bg-[#5a5a5a] rounded mb-2 mt-4"></div>
        <div className="flex justify-between text-white mb-1">
          <div className="text-xs">4:10</div>
          <div className="text-xs">20:00</div>
        </div>
        <div className="relative mb-2">
          <div className="h-1 bg-gray-400 rounded-full">
            <div className="h-1 bg-purple-600 rounded-full w-[40%]"></div>
          </div>
          <div className="absolute top-1/2 left-[40%] -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors" aria-label="Play">
              <Play className="h-5 w-5 text-white fill-white" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white p-0.5 rounded-full hover:bg-white/20 transition-colors" aria-label="Mute">
              <Volume2 className="h-5 w-5" />
            </button>
            <button
              className="text-white p-0.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Toggle captions"
            >
              <Subtitles className="h-5 w-5" />
            </button>
            <button
              className="text-white text-xs font-medium p-0.5 rounded hover:bg-white/20 transition-colors"
              aria-label="Playback speed"
            >
              2x
            </button>
            <button
              className="text-white p-0.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Render different UI based on screen size
  if (isMobile) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <div className="mx-auto w-full max-w-none">
            <div className="flex items-center justify-between p-4 border-b border-border rounded-t-lg">
              <div className="flex items-center space-x-2">
                {getDocumentIcon()}
                <h4 className="text-sm font-medium leading-none">{sourceDocument.document}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 hover:text-secondary-foreground min-h-10 h-10 w-10 rounded-md whitespace-normal leading-none"
                  aria-label="Share document"
                >
                  <Share className="h-5 w-5" />
                </button>
                <button
                  className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 hover:text-secondary-foreground min-h-10 h-10 w-10 rounded-md whitespace-normal leading-none"
                  aria-label="Download document"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 hover:text-secondary-foreground min-h-10 h-10 w-10 rounded-md whitespace-normal leading-none"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </div>
            {isDeposition && <MediaPlayer />}
            <div className="p-6 h-[calc(100%-4rem)] overflow-auto bg-zinc-100">
              <div
                ref={contentRef}
                className="source-content space-y-4 pb-8 transition-opacity duration-150 opacity-100"
                style={{
                  overscrollBehavior: "contain",
                  maxWidth: "800px",
                }}
              >
                <style jsx global>{`
                  .source-content, 
                  .source-content * {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
                    font-size: 14px !important;
                    line-height: 1.5 !important;
                    letter-spacing: -0.025em !important;
                  }
                  
                  .source-content h1, 
                  .source-content h2, 
                  .source-content h3, 
                  .source-content h4, 
                  .source-content h5, 
                  .source-content h6 {
                    font-weight: 600 !important;
                    margin-top: 1.5em !important;
                    margin-bottom: 0.5em !important;
                  }
                  
                  .source-content p {
                    margin-bottom: 1em !important;
                  }
                  
                  .source-content .highlighted-content {
                    background-color: rgba(255, 255, 0, 0.3) !important;
                    padding: 0.25em !important;
                    border-left: 3px solid #f59e0b !important;
                    border-radius: 2px !important;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
                    display: inline !important;
                    margin: 0 !important;
                    animation: highlight-pulse 2s ease-in-out 1 !important;
                  }
                  
                  @keyframes highlight-pulse {
                    0%, 100% { background-color: rgba(255, 255, 0, 0.3); }
                    50% { background-color: rgba(255, 255, 0, 0.6); }
                  }
                `}</style>
                {sourceDocument?.content ? (
                  sourceDocument.content
                ) : (
                  <div style={{ color: "red", padding: "20px" }}>
                    DEBUG: No content found for document: {sourceDocument?.document}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  // Desktop view - with improved animation
  return (
    <div
      id="source-document-card"
      ref={sourceCardRef}
      className={`absolute bg-background shadow-lg border border-border rounded-lg overflow-hidden ${
        fromResourcesPanel ? "ml-1" : "ml-6"
      } ${
        isClosing ? "animate-slide-out-right" : shouldAnimate ? "animate-slide-in-right" : "translate-x-full opacity-0"
      }`}
      style={{
        top: 0,
        right: 0,
        bottom: 0,
        left: "4px",
        zIndex: 100,
      }}
    >
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-out-right {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }

        .animate-slide-out-right {
          animation: slide-out-right 0.2s ease-in forwards;
        }

        @keyframes highlight-pulse {
          0%, 100% { background-color: rgba(255, 255, 0, 0.3); }
          50% { background-color: rgba(255, 255, 0, 0.6); }
        }
      `}</style>

      <div className="flex items-center justify-between p-3 border-b border-border rounded-tl-lg">
        <div className="flex items-center space-x-2">
          {getDocumentIcon()}
          <h4 className="font-normal">{sourceDocument.document}</h4>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 hover:text-secondary-foreground min-h-10 h-10 w-10 rounded-md whitespace-normal leading-none"
            aria-label="Share document"
          >
            <Share className="h-5 w-5" />
          </button>
          <button
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 hover:text-secondary-foreground min-h-10 h-10 w-10 rounded-md whitespace-normal leading-none"
            aria-label="Download document"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 hover:text-secondary-foreground min-h-10 h-10 w-10 rounded-md whitespace-normal leading-none"
            aria-label="View source"
          >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask
                id="mask0_3324_4454"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="25"
                height="25"
              >
                <rect x="0.231445" y="0.946289" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_3324_4454)">
                <path
                  d="M16.7314 20.9463H17.7314V16.9463H16.7314V20.9463ZM17.2314 15.9463C17.3648 15.9463 17.4814 15.8963 17.5814 15.7963C17.6814 15.6963 17.7314 15.5796 17.7314 15.4463C17.7314 15.313 17.6814 15.1963 17.5814 15.0963C17.4814 14.9963 17.3648 14.9463 17.2314 14.9463C17.0981 14.9463 16.9814 14.9963 16.8814 15.0963C16.7814 15.1963 16.7314 15.313 16.7314 15.4463C16.7314 15.5796 16.7814 15.6963 16.8814 15.7963C16.9814 15.8963 17.0981 15.9463 17.2314 15.9463ZM7.23145 14.9463H10.9064C11.0898 14.563 11.3023 14.2046 11.5439 13.8713C11.7856 13.538 12.0564 13.2296 12.3564 12.9463H7.23145V14.9463ZM7.23145 18.9463H10.3064C10.2564 18.613 10.2314 18.2796 10.2314 17.9463C10.2314 17.613 10.2564 17.2796 10.3064 16.9463H7.23145V18.9463ZM5.23145 22.9463C4.68145 22.9463 4.21061 22.7505 3.81895 22.3588C3.42728 21.9671 3.23145 21.4963 3.23145 20.9463V4.94629C3.23145 4.39629 3.42728 3.92546 3.81895 3.53379C4.21061 3.14212 4.68145 2.94629 5.23145 2.94629H13.2314L19.2314 8.94629V11.2463C18.9148 11.1463 18.5898 11.0713 18.2564 11.0213C17.9231 10.9713 17.5814 10.9463 17.2314 10.9463V9.94629H12.2314V4.94629H5.23145V20.9463H10.9064C11.0898 21.3296 11.3023 21.688 11.5439 22.0213C11.7856 22.3546 12.0564 22.663 12.3564 22.9463H5.23145ZM17.2314 12.9463C18.6148 12.9463 19.7939 13.4338 20.7689 14.4088C21.7439 15.3838 22.2314 16.563 22.2314 17.9463C22.2314 19.3296 21.7439 20.5088 20.7689 21.4838C19.7939 22.4588 18.6148 22.9463 17.2314 22.9463C15.8481 22.9463 14.6689 22.4588 13.6939 21.4838C12.7189 20.5088 12.2314 19.3296 12.2314 17.9463C12.2314 16.563 12.7189 15.3838 13.6939 14.4088C14.6689 13.4338 15.8481 12.9463 17.2314 12.9463Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 hover:text-secondary-foreground min-h-10 h-10 w-10 rounded-md whitespace-normal leading-none"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
      {isDeposition && <MediaPlayer />}
      <div className="h-[calc(100%-4rem)] overflow-auto bg-zinc-100" style={{ contain: "layout style paint" }}>
        <div
          ref={contentRef}
          className="source-content space-y-4 pb-8 transition-opacity duration-150 opacity-100 p-6"
          style={{
            overscrollBehavior: "contain",
            maxWidth: "800px",
          }}
        >
          {sourceDocument?.content ? (
            sourceDocument.content
          ) : (
            <div style={{ color: "red", padding: "20px" }}>
              DEBUG: No content found for document: {sourceDocument?.document}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
