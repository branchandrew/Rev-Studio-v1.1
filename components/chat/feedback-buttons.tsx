"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FeedbackButtonsProps {
  messageId?: string
  onThumbsUp?: () => void
  onThumbsDown?: () => void
  onCopy?: () => void
  className?: string
}

export function FeedbackButtons({ messageId, onThumbsUp, onThumbsDown, onCopy, className }: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)
  const [copied, setCopied] = useState(false)

  const handleThumbsUp = () => {
    setFeedback("up")
    console.log("Thumbs up for message:", messageId)
    onThumbsUp?.()
  }

  const handleThumbsDown = () => {
    setFeedback("down")
    console.log("Thumbs down for message:", messageId)
    onThumbsDown?.()
  }

  const handleCopy = () => {
    // Find the message content by its ID or closest parent
    const messageElement = messageId ? document.getElementById(messageId) : document.querySelector(".chat-message")

    if (messageElement) {
      const textToCopy = messageElement.textContent || ""
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Message copied to clipboard")
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          onCopy?.()
        })
        .catch((err) => {
          console.error("Failed to copy message:", err)
        })
    }
  }

  return (
    <div className={cn("flex items-center gap-1 mt-1", className)} data-name="feedback-buttons">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7",
          feedback === "up" && "text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700",
        )}
        onClick={handleThumbsUp}
        aria-label="Thumbs up"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_258_7170"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_258_7170)">
            <path
              d="M17.5 6.97915C17.875 6.97915 18.2188 7.1354 18.5312 7.4479C18.8438 7.7604 19 8.10415 19 8.47915V9.66665C19 9.77776 18.9896 9.88193 18.9688 9.97915C18.9479 10.0764 18.9167 10.1667 18.875 10.25L16.3958 16.0625C16.2708 16.3542 16.0382 16.5833 15.6979 16.75C15.3576 16.9167 15.0278 17 14.7083 17L5.5 16.9792V6.97915L10.375 2.10415C10.6389 1.84026 10.941 1.67013 11.2812 1.59374C11.6215 1.51735 11.9271 1.55554 12.1979 1.70832C12.4688 1.8611 12.6424 2.10763 12.7188 2.4479C12.7951 2.78818 12.7917 3.15971 12.7083 3.56249L12 6.97915H17.5ZM7 7.60415V15.4792H15L17.5 9.66665V8.47915H10.1667L11.1875 3.43749L7 7.60415ZM2.5 16.9792C2.06944 16.9792 1.71181 16.8323 1.42708 16.5385C1.14236 16.2448 1 15.8917 1 15.4792V8.47915C1 1.06665 1.14236 7.71353 1.42708 7.41978C1.71181 7.12603 2.06944 6.97915 2.5 6.97915H5.5V8.47915H2.5V15.4792H5.5V16.9792H2.5Z"
              fill="#261260"
            />
          </g>
        </svg>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7",
          feedback === "down" && "text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700",
        )}
        onClick={handleThumbsDown}
        aria-label="Thumbs down"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_258_7164"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_258_7164)">
            <path
              d="M2.5 13C2.125 13 1.78125 12.8437 1.46875 12.5312C1.15625 12.2187 1 11.875 1 11.5V10.3125C1 10.2013 1.01042 10.0972 1.03125 9.99996C1.05208 9.90274 1.08333 9.81246 1.125 9.72913L3.60417 3.91663C3.72917 3.62496 3.96181 3.39579 4.30208 3.22913C4.64236 3.06246 4.97222 2.97913 5.29167 2.97913L14.5 2.99996V13L9.625 17.875C9.36111 18.1388 9.05903 18.309 8.71875 18.3854C8.37847 18.4618 8.07292 18.4236 7.80208 18.2708C7.53125 18.118 7.35764 17.8715 7.28125 17.5312C7.20486 17.1909 7.20833 16.8194 7.29167 16.4166L8 13H2.5ZM13 12.375V4.49996H5L2.5 10.3125V11.5H9.83333L8.8125 16.5416L13 12.375ZM17.5 2.99996C17.9306 2.99996 18.2882 3.14683 18.5729 3.44058C18.8576 3.73433 19 4.08746 19 4.49996V11.5C19 11.9125 18.8576 12.2656 18.5729 12.5593C18.2882 12.8531 17.9306 13 17.5 13H14.5V11.5H17.5V4.49996H14.5V2.99996H17.5Z"
              fill="#261260"
            />
          </g>
        </svg>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7",
          copied && "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700",
        )}
        onClick={handleCopy}
        aria-label="Copy message"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_258_7177"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_258_7177)">
            <path
              d="M7.5 15C7.0875 15 6.73437 14.8531 6.44062 14.5594C6.14687 14.2656 6 13.9125 6 13.5V3.5C6 3.0875 6.14687 2.73438 6.44062 2.44063C6.73437 2.14688 7.0875 2 7.5 2H15.5C15.9125 2 16.2656 2.14688 16.5594 2.44063C16.8531 2.73438 17 3.0875 17 3.5V13.5C17 13.9125 16.8531 14.2656 16.5594 14.5594C16.2656 14.8531 15.9125 15 15.5 15H7.5ZM7.5 13.5H15.5V3.5H7.5V13.5ZM4.5 18C4.0875 18 3.73437 17.8531 3.44062 17.5594C3.14687 17.2656 3 16.9125 3 16.5V5.75C3 5.5375 3.07146 5.35937 3.21437 5.21562C3.35729 5.07187 3.53437 5 3.74562 5C3.95687 5 4.13542 5.07187 4.28125 5.21562C4.42708 5.35937 4.5 5.5375 4.5 5.75V16.5H13.25C13.4625 16.5 13.6406 16.5715 13.7844 16.7144C13.9281 16.8573 14 17.0344 14 17.2456C14 17.4569 13.9281 17.6354 13.7844 17.7812C13.6406 17.9271 13.4625 18 13.25 18H4.5Z"
              fill="#261260"
            />
          </g>
        </svg>
      </Button>
    </div>
  )
}
