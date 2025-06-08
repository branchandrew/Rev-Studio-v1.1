"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TemplateToolbar } from "./template-toolbar"
import { HistoryToolbar } from "./history-toolbar"
import { FilePickerModal } from "@/components/shared/file-picker-modal"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"
import type { AIPrompt } from "@/lib/content/ai-prompts"
import { Plus } from "lucide-react"

// Custom arrow up icon component
const ArrowUpIcon = () => (
  <svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-name="arrow-up-icon"
  >
    <path
      d="M5.4998 4.30002L2.5998 7.20002C2.41647 7.38336 2.18314 7.47502 1.8998 7.47502C1.61647 7.47502 1.38314 7.38336 1.1998 7.20002C1.01647 7.01669 0.924805 6.78336 0.924805 6.50002C0.924805 6.21669 1.01647 5.98336 1.1998 5.80002L5.7998 1.20002C5.9998 1.00002 6.23314 0.900024 6.4998 0.900024C6.76647 0.900024 6.9998 1.00002 7.1998 1.20002L11.7998 5.80002C11.9831 5.98336 12.0748 6.21669 12.0748 6.50002C12.0748 6.78336 11.9831 7.01669 11.7998 7.20002C11.6165 7.38336 11.3831 7.47502 11.0998 7.47502C10.8165 7.47502 10.5831 7.38336 10.3998 7.20002L7.4998 4.30002V12.5C7.4998 12.7834 7.40397 13.0209 7.2123 13.2125C7.02064 13.4042 6.78314 13.5 6.4998 13.5C6.21647 13.5 5.97897 13.4042 5.7873 13.2125C5.59564 13.0209 5.4998 12.7834 5.4998 12.5V4.30002Z"
      fill="currentColor"
    />
  </svg>
)

// Custom new chat icon component
const NewChatIcon = () => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-name="new-chat-icon"
  >
    <path
      d="M3.2666 14.2306L1.1166 16.3806C0.949935 16.5473 0.766602 16.589 0.566602 16.5056C0.366602 16.4223 0.266602 16.264 0.266602 16.0306V2.23062C0.266602 1.68062 0.462435 1.20979 0.854102 0.818121C1.24577 0.426455 1.7166 0.230621 2.2666 0.230621H14.2666C14.8166 0.230621 15.2874 0.426455 15.6791 0.818121C16.0708 1.20979 16.2666 1.68062 16.2666 2.23062V6.25562C16.2666 6.53895 16.1708 6.77229 15.9791 6.95562C15.7874 7.13895 15.5499 7.23062 15.2666 7.23062C14.9833 7.23062 14.7458 7.13479 14.5541 6.94312C14.3624 6.75145 14.2666 6.51395 14.2666 6.23062V2.23062H2.2666V12.2306H8.2666C8.54993 12.2306 8.78744 12.3265 8.9791 12.5181C9.17077 12.7098 9.2666 12.9473 9.2666 13.2306C9.2666 13.514 9.17077 13.7515 8.9791 13.9431C8.78744 14.1348 8.54993 14.2306 8.2666 14.2306H3.2666ZM5.2666 6.23062H11.2666C11.5499 6.23062 11.7874 6.13479 11.9791 5.94312C12.1708 5.75145 12.2666 5.51395 12.2666 5.23062C12.2666 4.94729 12.1708 4.70979 11.9791 4.51812C11.7874 4.32645 11.5499 4.23062 11.2666 4.23062H5.2666C4.98327 4.23062 4.74577 4.32645 4.5541 4.51812C4.36243 4.70979 4.2666 4.94729 4.2666 5.23062C4.2666 5.51395 4.36243 5.75145 4.5541 5.94312C4.74577 6.13479 4.98327 6.23062 5.2666 6.23062ZM5.2666 10.2306H8.2666C8.54993 10.2306 8.78744 10.1348 8.9791 9.94312C9.17077 9.75146 9.2666 9.51395 9.2666 9.23062C9.2666 8.94729 9.17077 8.70979 8.9791 8.51812C8.78744 8.32646 8.54993 8.23062 8.2666 8.23062H5.2666C4.98327 8.23062 4.74577 8.32646 4.5541 8.51812C4.36243 8.70979 4.2666 8.94729 4.2666 9.23062C4.2666 9.51395 4.36243 9.75146 4.5541 9.94312C4.74577 10.1348 4.98327 10.2306 5.2666 10.2306ZM14.2666 14.2306H12.2666C11.9833 14.2306 11.7458 14.1348 11.5541 13.9431C11.3624 13.7515 11.2666 13.514 11.2666 13.2306C11.2666 12.9473 11.3624 12.7098 11.5541 12.5181C11.7458 12.3265 11.9833 12.2306 12.2666 12.2306H14.2666V10.2306C14.2666 9.94729 14.3624 9.70979 14.5541 9.51812C14.7458 9.32646 14.9833 9.23062 15.2666 9.23062C15.5499 9.23062 15.7874 9.32646 15.9791 9.51812C16.1708 9.70979 16.2666 9.94729 16.2666 10.2306V12.2306H18.2666C18.5499 12.2306 18.7874 12.3265 18.9791 12.5181C19.1708 12.7098 19.2666 12.9473 19.2666 13.2306C19.2666 13.514 19.1708 13.7515 18.9791 13.9431C18.7874 14.1348 18.5499 14.2306 18.2666 14.2306H16.2666V16.2306C16.2666 16.514 16.1708 16.7515 15.9791 16.9431C15.7874 17.1348 15.5499 17.2306 15.2666 17.2306C14.9833 17.2306 14.7458 17.1348 14.5541 16.9431C14.3624 16.7515 14.2666 16.514 14.2666 16.2306V14.2306Z"
      fill="currentColor"
    />
  </svg>
)

// Custom microphone icon component
const MicrophoneIcon = () => (
  <svg
    width="14"
    height="18"
    viewBox="0 0 15 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-name="microphone-icon"
  >
    <path
      d="M7.1009 12.5027C6.26757 12.5027 5.55924 12.211 4.97591 11.6277C4.39257 11.0444 4.10091 10.336 4.10091 9.50269V3.50269C4.10091 2.66935 4.39257 1.96102 4.97591 1.37769C5.55924 0.794352 6.26757 0.502686 7.1009 0.502686C7.93424 0.502686 8.64257 0.794352 9.22591 1.37769C9.80924 1.96102 10.1009 2.66935 10.1009 3.50269V9.50269C10.1009 10.336 9.80924 11.0444 9.22591 11.6277C8.64257 12.211 7.93424 12.5027 7.1009 12.5027ZM6.10091 18.5027V16.4277C4.56757 16.211 3.25507 15.561 2.16341 14.4777C1.07174 13.3944 0.409239 12.0777 0.175905 10.5277C0.142572 10.2444 0.217572 10.0027 0.400905 9.80269C0.584239 9.60269 0.817572 9.50269 1.10091 9.50269C1.38424 9.50269 1.62174 9.59852 1.81341 9.79019C2.00507 9.98185 2.13424 10.2194 2.20091 10.5027C2.43424 11.6694 3.01341 12.6277 3.93841 13.3777C4.86341 14.1277 5.91757 14.5027 7.1009 14.5027C8.3009 14.5027 9.35924 14.1235 10.2759 13.3652C11.1926 12.6069 11.7676 11.6527 12.0009 10.5027C12.0676 10.2194 12.1967 9.98185 12.3884 9.79019C12.5801 9.59852 12.8176 9.50269 13.1009 9.50269C13.3842 9.50269 13.6176 9.60269 13.8009 9.80269C13.9842 10.0027 14.0592 10.2444 14.0259 10.5277C13.7926 12.0444 13.1342 13.3527 12.0509 14.4527C10.9676 15.5527 9.65091 16.211 8.1009 16.4277V18.5027C8.1009 18.786 8.00507 19.0235 7.81341 19.2152C7.62174 19.4069 7.38424 19.5027 7.1009 19.5027C6.81757 19.5027 6.58007 19.4069 6.38841 19.2152C6.19674 19.0235 6.1009 18.786 6.1009 18.5027ZM7.1009 10.5027C7.38424 10.5027 7.62174 10.4069 7.81341 10.2152C8.00507 10.0235 8.1009 9.78602 8.1009 9.50269V3.50269C8.1009 3.21935 8.00507 2.98185 7.81341 2.79019C7.62174 2.59852 7.38424 2.50269 7.1009 2.50269C6.81757 2.50269 6.58007 2.59852 6.38841 2.79019C6.19674 2.98185 6.1009 3.21935 6.1009 3.50269V9.50269C6.1009 9.78602 6.19674 10.0235 6.38841 10.2152C6.58007 10.4069 6.81757 10.5027 7.1009 10.5027Z"
      fill="currentColor"
    />
  </svg>
)

interface ChatInputBoxProps {
  useSimpleTooltip?: boolean
  onSendMessage?: (message: string) => void
  disabled?: boolean
  hideNewChatButton?: boolean
  isPostChronologyMode?: boolean
  emptyMode?: boolean
  onSummaryClick?: () => void
  onUploadFile?: () => void
}

export function ChatInputBox({
  useSimpleTooltip = false,
  onSendMessage,
  disabled = false,
  hideNewChatButton = false,
  isPostChronologyMode = true,
  emptyMode = false,
  onSummaryClick,
  onUploadFile,
}: ChatInputBoxProps) {
  const [message, setMessage] = useState("")
  const [isFilePickerOpen, setIsFilePickerOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isCompactHistory, setIsCompactHistory] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Check container width and update isCompactHistory state
  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        setIsCompactHistory(containerWidth < 410)
      }
    }

    // Initial check with a small delay to ensure DOM is fully rendered
    const initialCheckTimer = setTimeout(() => {
      checkWidth()
    }, 100)

    // Add event listener for window resize
    window.addEventListener("resize", checkWidth)

    // Cleanup
    return () => {
      clearTimeout(initialCheckTimer)
      window.removeEventListener("resize", checkWidth)
    }
  }, [])

  useEffect(() => {
    // Force a recheck after component is fully mounted and rendered
    const recheckTimer = setTimeout(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        setIsCompactHistory(containerWidth < 410)
      }
    }, 300)

    return () => clearTimeout(recheckTimer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      if (onSendMessage) {
        onSendMessage(message.trim())
      }
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Here you would add actual voice recording functionality
    console.log("Toggle voice recording:", !isRecording)
  }

  const handlePromptSelect = (prompt: AIPrompt) => {
    if (onSendMessage) {
      onSendMessage(prompt.title)
    }
  }

  const getPlaceholderText = () => {
    if (emptyMode) {
      return "What would you like to know?"
    }
    return isPostChronologyMode ? "Ask a question about your files" : "Ask a question about the files you've added..."
  }

  return (
    <div className="mt-auto w-full" ref={containerRef} data-name="chat-input-box">
      <form id="ai_chat_input" onSubmit={handleSubmit} className="relative">
        {/* Main textarea with extra padding at bottom to accommodate the toolbar */}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholderText()}
          className="min-h-[60px] resize-none pr-12 pb-16"
          disabled={disabled}
          data-name="message-textarea"
        />

        {/* Fixed position toolbar that stays within the textarea */}
        <div className="absolute left-0 right-0 bottom-0 p-3 pb-2" data-name="toolbar-container">
          <div className="flex items-end justify-between">
            {/* Left side buttons */}
            <div className="flex items-center space-x-1">
              {/* Add file button moved to the far left */}

              <div className="relative">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-8 w-9 rounded-full mr-1 min-h-9"
                  onClick={() => {
                    console.log("Add file button clicked")
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                  data-name="add-file-button"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add file</span>
                </Button>
                {isDropdownOpen && (
                  <div
                    className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]"
                    data-name="file-dropdown"
                  >
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => {
                        console.log("Add files menu item clicked")
                        setIsFilePickerOpen(true)
                        setIsDropdownOpen(false)
                      }}
                      data-name="add-files-menu-item"
                    >
                      Add files
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => {
                        console.log("Upload files menu item clicked")
                        if (onUploadFile) {
                          onUploadFile()
                        }
                        setIsDropdownOpen(false)
                      }}
                      data-name="upload-files-menu-item"
                    >
                      Upload files
                    </button>
                  </div>
                )}
              </div>

              <TemplateToolbar
                disabled={emptyMode}
                onSummaryClick={onSummaryClick}
                onPromptSelect={handlePromptSelect}
              />
              {isPostChronologyMode && <HistoryToolbar compact={isCompactHistory} />}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-1">
              {!hideNewChatButton &&
                isPostChronologyMode &&
                (useSimpleTooltip ? (
                  <SimpleTooltip content="New chat" side="top">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      data-name="new-chat-button"
                    >
                      <NewChatIcon />
                      <span className="sr-only">New chat</span>
                    </Button>
                  </SimpleTooltip>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    data-name="new-chat-button"
                  >
                    <NewChatIcon />
                    <span className="sr-only">New chat</span>
                  </Button>
                ))}
              {/* Microphone button */}
              {useSimpleTooltip ? (
                <SimpleTooltip content={isRecording ? "Stop recording" : "Voice input"} side="top">
                  <Button
                    type="button"
                    variant={isRecording ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={toggleRecording}
                    data-name="microphone-button"
                  >
                    <MicrophoneIcon />
                    <span className="sr-only">{isRecording ? "Stop recording" : "Voice input"}</span>
                  </Button>
                </SimpleTooltip>
              ) : (
                <Button
                  type="button"
                  variant={isRecording ? "default" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={toggleRecording}
                  data-name="microphone-button"
                >
                  <MicrophoneIcon />
                  <span className="sr-only">{isRecording ? "Stop recording" : "Voice input"}</span>
                </Button>
              )}
              {useSimpleTooltip ? (
                <SimpleTooltip content="Send message" side="top">
                  <Button
                    variant="default"
                    size="icon"
                    disabled={disabled || !message.trim()}
                    className="h-10 w-10 ml-1"
                    data-name="send-button"
                  >
                    <ArrowUpIcon />
                    <span className="sr-only">Send message</span>
                  </Button>
                </SimpleTooltip>
              ) : (
                <Button
                  variant="default"
                  size="icon"
                  disabled={disabled || !message.trim()}
                  className="h-10 w-10 ml-1"
                  data-name="send-button"
                >
                  <ArrowUpIcon />
                  <span className="sr-only">Send message</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
      <FilePickerModal
        isOpen={isFilePickerOpen}
        onClose={() => setIsFilePickerOpen(false)}
        onFileSelect={(files) => {
          console.log("Selected files:", files)
          setIsFilePickerOpen(false)
        }}
      />
    </div>
  )
}
