"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, Loader2 } from "lucide-react"
import { FileTypeIcon } from "@/components/shared/file-type-icons"
import { aiPrompts, type AIPrompt } from "@/lib/content/ai-prompts"
import { PopoverGuide } from "@/components/ui/popover-guide"
import { FilePickerModal } from "@/components/shared/file-picker-modal"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"

// Add a new prop to control simplified mode
interface ResourcesPanelProps {
  onChronologyClick: () => void
  onSourceFileClick?: (documentName: string, fromResourcesPanel?: boolean) => void
  hasViewedDocument?: boolean
  onViewExistingDocument?: () => void
  onPromptSelect?: (prompt: AIPrompt) => void
  setIsProcessing?: (isProcessing: boolean) => void
  onExecutiveSummaryClick?: () => void
  onSummaryClick?: () => void
  simplified?: boolean
  showAIPromptsInLeft?: boolean
  currentMode?: string
  emptyMode?: boolean // Add this new prop
}

// Update the component to use this prop
export function ResourcesPanel({
  onChronologyClick,
  onSourceFileClick,
  hasViewedDocument = false,
  onViewExistingDocument,
  onPromptSelect,
  setIsProcessing,
  onExecutiveSummaryClick,
  onSummaryClick,
  simplified = false,
  showAIPromptsInLeft = false,
  currentMode = "MODE_DISCOVERY",
  emptyMode = false, // Add this with default value
}: ResourcesPanelProps) {
  const [isFilePickerOpen, setIsFilePickerOpen] = useState(false)
  const router = useRouter()
  const { toast: shadcnToast } = useToast()

  const [sources, setSources] = useState(
    emptyMode
      ? []
      : [
          {
            id: "case-file-1",
            name: "Case file 1",
            type: "pdf",
            icon: "pdf",
            added: "2 days ago",
            size: "1.2 MB",
            loading: false,
          },
          {
            id: "legal-notes",
            name: "Legal Notes",
            type: "textUpload", // Changed from "document" to "textUpload"
            icon: "textUpload", // Changed from "document" to "textUpload"
            added: "2 days ago",
            size: "0.8 MB",
            loading: false,
          },
          {
            id: "legal-transcription",
            name: "Legal transcription",
            type: "transcript", // Changed from "document" to "transcript"
            icon: "transcript", // Changed from "document" to "transcript"
            added: "2 days ago",
            size: "0.9 MB",
            loading: false,
          },
          {
            id: "case-document",
            name: "Case document",
            type: "word",
            icon: "word",
            added: "2 days ago",
            size: "1.1 MB",
            loading: false,
          },
        ].sort((a, b) => a.name.localeCompare(b.name)),
  )

  // Add a new state to track uploading files
  const [uploadingFiles, setUploadingFiles] = useState<
    Array<{
      id: string
      name: string
      type: string
      icon: string
      added: string
      size: string
      loading: boolean
    }>
  >([])

  // Add an event listener to handle file uploads from the chat panel
  // Add this useEffect after the other state declarations:

  useEffect(() => {
    const handleUploadFromChat = (event: any) => {
      const { file } = event.detail

      // Add to uploading files
      setUploadingFiles((prev) => [...prev, file])

      // Simulate processing completion after 8 seconds
      setTimeout(() => {
        // Remove from uploading files
        setUploadingFiles((prev) => prev.filter((f) => f.id !== file.id))

        // Add to regular sources with loading set to false and sort alphabetically
        setSources((prev) =>
          [
            {
              ...file,
              loading: false,
            },
            ...prev,
          ].sort((a, b) => a.name.localeCompare(b.name)),
        )

        // Show completion toast with reduced duration (2 seconds instead of default 4)
        console.log("🐛 About to show Sonner toast for chat upload:", file.name)
        toast(`${file.name} has completed processing and is ready to view.`, {
          duration: 2000,
        })
        console.log("🐛 Sonner toast called for chat upload")
      }, 24000)
    }

    // Add event listener
    document.addEventListener("uploadFileFromChat", handleUploadFromChat)

    // Clean up
    return () => {
      document.removeEventListener("uploadFileFromChat", handleUploadFromChat)
    }
  }, [])

  const handleFileAdd = (file: { name: string; type: string; size: string }) => {
    const newSource = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: file.type,
      icon: file.type,
      added: "Just now",
      size: file.size,
      loading: true, // Mark as loading
    }

    setSources((prev) => [newSource, ...prev].sort((a, b) => a.name.localeCompare(b.name)))

    // Simulate processing time - remove loading state after 10 seconds
    setTimeout(() => {
      setSources((prev) =>
        prev
          .map((source) => (source.id === newSource.id ? { ...source, loading: false } : source))
          .sort((a, b) => a.name.localeCompare(b.name)),
      )

      // Show completion toast with reduced duration (2 seconds instead of default 4)
      console.log("🐛 About to show Sonner toast for file add:", newSource.name)
      toast(`${newSource.name} has completed processing and is ready to view.`, {
        duration: 2000,
      })
      console.log("🐛 Sonner toast called for file add")
    }, 10000)
  }

  // Add this function to handle file upload
  const handleFileUpload = (event?: React.MouseEvent) => {
    console.log("🐛 handleFileUpload called", {
      event: !!event,
      shiftKey: event?.shiftKey,
      type: event?.type,
    })

    // Check if Shift key is pressed
    if (event?.shiftKey) {
      console.log("🐛 Shift key detected, showing shadcn toast")
      // Show transcription minutes error toast using shadcn toast
      shadcnToast({
        title: "Need more transcription minutes.",
        description: "There are no minutes remaining in your plan. Upgrade your plan to transcribe more media.",
        action: (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {}}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => {}}>
              Upgrade
            </Button>
          </div>
        ),
      })
      return
    }

    console.log("🐛 Normal upload flow")
    // Original upload logic
    const newFile = {
      id: `upload-${Date.now()}`,
      name: "Legal Brief Upload.pdf",
      type: "pdf",
      icon: "pdf",
      added: "Just now",
      size: "3.4 MB",
      loading: true,
    }

    // Add to uploading files
    setUploadingFiles((prev) => [...prev, newFile])

    // Simulate processing completion after 8 seconds
    setTimeout(() => {
      // Remove from uploading files
      setUploadingFiles((prev) => prev.filter((file) => file.id !== newFile.id))

      // Add to regular sources with loading set to false and sort alphabetically
      setSources((prev) =>
        [
          {
            ...newFile,
            loading: false,
          },
          ...prev,
        ].sort((a, b) => a.name.localeCompare(b.name)),
      )

      // Show completion toast with reduced duration (2 seconds instead of default 4)
      console.log("🐛 About to show Sonner toast for file upload:", newFile.name)
      toast(`${newFile.name} has completed processing and is ready to view.`, {
        duration: 2000,
      })
      console.log("🐛 Sonner toast called for file upload")
    }, 8000) // Changed from 24000 to 8000 for faster testing
  }

  const handlePromptClick = (promptId: string) => {
    if (promptId === "chronology") {
      onChronologyClick()
    } else if (promptId === "executive-summary") {
      if (onExecutiveSummaryClick) {
        onExecutiveSummaryClick()
      }
    } else if (promptId === "summary") {
      // Handle summary prompt - call the same function as chronology but with different content
      if (onSummaryClick) {
        onSummaryClick()
      }
    } else if (promptId === "contradictions") {
      router.push("/?artifacts=true&loading=true")
    } else if (onPromptSelect) {
      const prompt = aiPrompts.find((p) => p.id === promptId)
      if (prompt) {
        onPromptSelect(prompt)
      }
    }
  }

  const renderFileIcon = (source: any) => {
    if (source.loading) {
      return <Loader2 className="h-5 w-5 text-primary animate-spin" />
    }
    return <FileTypeIcon type={source.type} size="sm" className="scale-75" />
  }

  // Filter AI prompts based on mode
  const getFilteredAIPrompts = () => {
    if (currentMode === "MODE_LAUNCH") {
      // For MODE_LAUNCH, exclude issue-based-summary, case-theory-support, and document-contradictions
      return aiPrompts.filter(
        (prompt) => !["issue-based-summary", "case-theory-support", "document-contradictions"].includes(prompt.id),
      )
    }
    if (currentMode === "MODE_ANALYSIS") {
      // For MODE_ANALYSIS, exclude summary since it's already been generated
      return aiPrompts.filter((prompt) => prompt.id !== "summary")
    }
    return aiPrompts
  }

  const filteredAIPrompts = getFilteredAIPrompts()

  // Function to handle Add files link click with glow effect
  const handleAddFilesLinkClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Find the file sources section using a data attribute - target the parent container with both buttons
    const fileSourcesSection = document.querySelector('[data-file-sources-section="true"]')

    if (fileSourcesSection) {
      // Add the glow class to trigger the animation
      fileSourcesSection.classList.add("add-files-glow")

      // Remove the glow class after the animation completes
      setTimeout(() => {
        fileSourcesSection.classList.remove("add-files-glow")
      }, 2000) // Animation lasts for 2 seconds
    }
  }

  // Create a combined and sorted list of all files for display
  const getAllFilesForDisplay = () => {
    const allFiles = [...uploadingFiles, ...sources]
    return allFiles.sort((a, b) => a.name.localeCompare(b.name))
  }

  const sortedFiles = getAllFilesForDisplay()

  return (
    <Card className="h-full flex flex-col" id="resources_panel_view" data-view-type="resources">
      <CardContent className="flex-1 overflow-auto pt-6">
        {simplified ? (
          // Simplified view - show different content based on emptyMode
          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="col-span-1">
              {emptyMode ? (
                // Empty mode - only show Add files button
                <div className="bg-muted rounded-lg p-3 border border-border mb-4" data-file-sources-section="true">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsFilePickerOpen(true)}>
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="currentColor" />
                      </svg>
                      Add files
                    </Button>
                    <Button variant="outline" size="sm" onClick={(e) => handleFileUpload(e)}>
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11 9.83L8.83 12L7.41 10.59L12 6L16.59 10.59L15.17 12L13 9.83V18H11V9.83ZM5 20V18H19V20H5Z"
                          fill="currentColor"
                        />
                      </svg>
                      Upload files
                    </Button>
                  </div>
                </div>
              ) : (
                // Regular simplified view with files
                <>
                  <div className="flex items-center mb-4">
                    <h3 className="text-sm font-semibold text-[#22085e]">Files</h3>
                  </div>
                  <div
                    id="file_sources"
                    className="bg-muted rounded-lg p-3 border border-border mb-4"
                    data-file-sources-section="true"
                  >
                    <div className="space-y-1">
                      {/* Show all files in alphabetical order */}
                      {sortedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="group relative flex items-center justify-between gap-2 rounded-lg p-1.5 hover:bg-white cursor-pointer"
                          onClick={() => !file.loading && onSourceFileClick && onSourceFileClick(file.name, true)}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {renderFileIcon(file)}
                            <div className="flex flex-col min-w-0">
                              <span className="text-[#687a97] font-normal text-sm leading-tight truncate">
                                {file.name}
                              </span>
                            </div>
                          </div>
                          {!file.loading && (
                            <button
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                              aria-label="Remove resource"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSources((prev) => prev.filter((s) => s.id !== file.id))
                              }}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsFilePickerOpen(true)}>
                        <svg
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="currentColor" />
                        </svg>
                        Add files
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => handleFileUpload(e)}>
                        <svg
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 9.83L8.83 12L7.41 10.59L12 6L16.59 10.59L15.17 12L13 9.83V18H11V9.83ZM5 20V18H19V20H5Z"
                            fill="currentColor"
                          />
                        </svg>
                        Upload files
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          // Full view - show both sections based on showAIPromptsInLeft prop
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="md:col-span-1 flex flex-col">
              {/* Show AI Prompts in left column when showAIPromptsInLeft is true */}
              {showAIPromptsInLeft ? (
                <>
                  <div className="flex items-center mb-4">
                    <h3 className="text-sm font-semibold text-[#22085e]">
                      {emptyMode ? "Create" : currentMode === "MODE_ANALYSIS" ? "Created" : "AI Prompts"}
                    </h3>
                  </div>
                  <div id="ai_prompts" className="bg-white rounded-lg pb-4 px-0 flex-1">
                    <div className="space-y-3">
                      {/* PopoverGuide as first item */}
                      <PopoverGuide
                        title=""
                        description={
                          emptyMode
                            ? "After adding or uploading files, select a prompt to generate an AI document."
                            : "Select a prompt to generate an AI document."
                        }
                        side="bottom"
                        caret={true}
                        showBadge={false}
                        showCloseButton={true}
                      />

                      {filteredAIPrompts.slice(0, 5).map((prompt) => (
                        <div
                          key={prompt.id}
                          className={cn(
                            "bg-white border border-[#BEC8DA] rounded-lg p-3 text-left transition-colors",
                            emptyMode ? "opacity-50 cursor-not-allowed" : "hover:bg-[#f5f7fa] cursor-pointer",
                          )}
                          onClick={emptyMode ? undefined : () => handlePromptClick(prompt.id)}
                        >
                          <h5
                            className={cn(
                              "font-medium text-sm mb-1 flex items-center",
                              emptyMode ? "text-gray-400" : "text-[#22085e]",
                            )}
                          >
                            <span>{prompt.title}</span>
                            {!emptyMode && <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />}
                          </h5>
                          <p className={cn("text-sm", emptyMode ? "text-gray-400" : "text-[#687a97]")}>
                            {prompt.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : currentMode === "MODE_ANALYSIS" ? (
                // Original Created section for analysis mode
                <>
                  <div className="flex items-center mb-4">
                    <h3 className="text-sm font-semibold text-[#22085e]">Created</h3>
                  </div>
                  <div id="created_documents" className="bg-muted rounded-lg p-3 border border-border">
                    <div className="space-y-1">
                      <div
                        className="group relative flex items-center justify-between gap-2 rounded-lg p-1.5 hover:bg-white cursor-pointer"
                        onClick={onViewExistingDocument}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="flex items-center gap-2 scale-75">
                            <div className="flex-shrink-0 h-6 w-6">
                              <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-full w-full"
                              >
                                <path
                                  d="M17.7773 0C18.9996 0 20 1.00043 20 2.22266V17.7773C20 18.9996 18.9996 20 17.7773 20H2.22266C1.00043 20 0 18.9996 0 17.7773V2.22266C0 1.00043 1.00043 0 2.22266 0H17.7773ZM7.9873 5.60742C7.82359 5.60742 7.6636 5.65738 7.5293 5.75098C7.39496 5.84466 7.29193 5.97719 7.23535 6.13086L6.2793 8.72461L3.68164 9.68066C3.5281 9.73727 3.39538 9.83943 3.30176 9.97363C3.20813 10.1079 3.1582 10.2679 3.1582 10.4316C3.15826 10.5953 3.20811 10.7554 3.30176 10.8896C3.39541 11.0238 3.5281 11.1261 3.68164 11.1826L6.27539 12.1436L7.23145 14.7393C7.28802 14.8929 7.39015 15.0255 7.52441 15.1191C7.65874 15.2128 7.81865 15.2627 7.98242 15.2627C8.14622 15.2627 8.30608 15.2128 8.44043 15.1191C8.57472 15.0255 8.67681 14.8929 8.7334 14.7393L9.68945 12.1445L12.2861 11.1895C12.4398 11.1329 12.5733 11.0298 12.667 9.8955C12.7605 9.7613 12.8105 9.6011 12.8105 9.4375C12.8105 9.2739 12.7606 9.1137 12.667 9.97949C12.5733 9.84525 12.4398 9.74307 12.2861 9.68652L12.2891 9.68359L9.69336 8.72754L8.73828 6.13086C8.68171 5.97731 8.57952 5.84463 8.44531 5.75098C8.31105 5.65734 8.151 5.60748 7.9873 5.60742ZM15.2842 8.0791C15.1776 8.07914 15.0754 8.12102 15 8.19629C14.9246 8.27172 14.8818 8.37477 14.8818 8.48145V8.88281H14.4795C14.3729 8.88288 14.2707 8.92563 14.1953 9.00098C14.1199 9.07634 14.0772 9.17858 14.0771 9.28516C14.0771 9.39183 14.1199 9.49488 14.1953 9.57031C14.2707 9.64553 14.373 9.68744 14.4795 9.6875H15.6865V8.48145C15.6865 8.37477 15.6438 8.27172 15.5684 8.19629"
                                  fill="#5614EB"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[#687a97] font-normal text-sm leading-tight truncate">
                              Case file 1 Summary
                            </span>
                          </div>
                        </div>
                        <button
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Remove document"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* AI Prompts section - separate from created documents */}
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-[#22085e] mb-3">AI Prompts</h4>
                    <div className="space-y-3">
                      {filteredAIPrompts.slice(0, 4).map((prompt) => (
                        <div
                          key={prompt.id}
                          className="bg-white border border-border rounded-lg p-3 text-left hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => handlePromptClick(prompt.id)}
                        >
                          <h5 className="font-medium text-sm mb-1 flex items-center text-[#22085e]">
                            <span>{prompt.title}</span>
                            <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                          </h5>
                          <p className="text-sm text-[#687a97]">{prompt.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <a
                        href="#"
                        className="text-sm text-[#5614EB] hover:text-[#4a11d1] cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault()
                          // Find the AI Prompts button in the template toolbar and trigger its click
                          const aiPromptsButton = document.querySelector('[data-ai-prompts-button="true"]')

                          if (aiPromptsButton) {
                            // Trigger a click event on the AI Prompts button to open the dropdown
                            ;(aiPromptsButton as HTMLElement).click()
                          }
                        }}
                      >
                        More AI Prompts
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                // Original AI Prompts section for discovery mode
                <>
                  <div className="flex items-center mb-4">
                    <h3 className="text-sm font-semibold text-[#22085e]">AI Prompts</h3>
                  </div>
                  <div id="ai_prompts" className="bg-white rounded-lg pb-4 px-0 flex-1">
                    <div className="space-y-3">
                      {filteredAIPrompts.slice(0, 5).map((prompt) => (
                        <div
                          key={prompt.id}
                          className={cn(
                            "bg-white border border-[#BEC8DA] rounded-lg p-3 text-left transition-colors",
                            emptyMode ? "opacity-50 cursor-not-allowed" : "hover:bg-[#f5f7fa] cursor-pointer",
                          )}
                          onClick={emptyMode ? undefined : () => handlePromptClick(prompt.id)}
                        >
                          <h5
                            className={cn(
                              "font-medium text-sm mb-1 flex items-center",
                              emptyMode ? "text-gray-400" : "text-[#22085e]",
                            )}
                          >
                            <span>{prompt.title}</span>
                            {!emptyMode && <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />}
                          </h5>
                          <p className={cn("text-sm", emptyMode ? "text-gray-400" : "text-[#687a97]")}>
                            {prompt.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="md:col-span-1">
              {/* Show Created documents in right column when showAIPromptsInLeft is true */}
              {showAIPromptsInLeft ? (
                <>
                  <div className="flex items-center mb-4">
                    <h3 className="text-sm font-semibold text-[#22085e]">Files</h3>
                  </div>
                  <div
                    id="file_sources"
                    className="bg-muted rounded-lg p-3 border border-border mb-4"
                    data-file-sources-section="true"
                  >
                    {sources.length > 0 ? (
                      <div className="space-y-1">
                        {/* Show all files in alphabetical order */}
                        {sortedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="group relative flex items-center justify-between gap-2 rounded-lg p-1.5 hover:bg-white cursor-pointer"
                            onClick={() => !file.loading && onSourceFileClick && onSourceFileClick(file.name, true)}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {renderFileIcon(file)}
                              <div className="flex flex-col min-w-0">
                                <span className="text-[#687a97] font-normal text-sm leading-tight truncate">
                                  {file.name}
                                </span>
                              </div>
                            </div>
                            {!file.loading && (
                              <button
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Remove resource"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSources((prev) => prev.filter((s) => s.id !== file.id))
                                }}
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div
                      className={
                        sources.length > 0
                          ? "mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2"
                          : "grid grid-cols-1 lg:grid-cols-2 gap-2"
                      }
                    >
                      <Button variant="outline" size="sm" onClick={() => setIsFilePickerOpen(true)}>
                        <svg
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="currentColor" />
                        </svg>
                        Add files
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => handleFileUpload(e)}>
                        <svg
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 9.83L8.83 12L7.41 10.59L12 6L16.59 10.59L15.17 12L13 9.83V18H11V9.83ZM5 20V18H19V20H5Z"
                            fill="currentColor"
                          />
                        </svg>
                        Upload files
                      </Button>
                    </div>
                  </div>
                </>
              ) : currentMode === "MODE_ANALYSIS" ? (
                // Show Files in right column - same as showAIPromptsInLeft
                <>
                  <div className="flex items-center mb-4">
                    <h3 className="text-sm font-semibold text-[#22085e]">Files</h3>
                  </div>
                  <div
                    id="file_sources"
                    className="bg-muted rounded-lg p-3 border border-border mb-4"
                    data-file-sources-section="true"
                  >
                    {sources.length > 0 ? (
                      <div className="space-y-1">
                        {/* Show all files in alphabetical order */}
                        {sortedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="group relative flex items-center justify-between gap-2 rounded-lg p-1.5 hover:bg-white cursor-pointer"
                            onClick={() => !file.loading && onSourceFileClick && onSourceFileClick(file.name, true)}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {renderFileIcon(file)}
                              <div className="flex flex-col min-w-0">
                                <span className="text-[#687a97] font-normal text-sm leading-tight truncate">
                                  {file.name}
                                </span>
                              </div>
                            </div>
                            {!file.loading && (
                              <button
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Remove resource"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSources((prev) => prev.filter((s) => s.id !== file.id))
                                }}
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div
                      className={
                        sources.length > 0
                          ? "mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2"
                          : "grid grid-cols-1 lg:grid-cols-2 gap-2"
                      }
                    >
                      <Button variant="outline" size="sm" onClick={() => setIsFilePickerOpen(true)}>
                        <svg
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="currentColor" />
                        </svg>
                        Add files
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => handleFileUpload(e)}>
                        <svg
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 9.83L8.83 12L7.41 10.59L12 6L16.59 10.59L15.17 12L13 9.83V18H11V9.83ZM5 20V18H19V20H5Z"
                            fill="currentColor"
                          />
                        </svg>
                        Upload files
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                // Original Created section for discovery mode
                <>
                  <div className="flex items-center mb-4">
                    <h3 className="text-sm font-semibold text-[#22085e]">Created</h3>
                  </div>
                  <div id="created_documents" className="bg-muted rounded-lg p-3 border border-border">
                    <div className="space-y-1">{/* Placeholder for created documents */}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <FilePickerModal isOpen={isFilePickerOpen} onClose={() => setIsFilePickerOpen(false)} onFileAdd={handleFileAdd} />
    </Card>
  )
}
