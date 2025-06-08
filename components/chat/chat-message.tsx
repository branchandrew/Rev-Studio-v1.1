import { cn } from "@/lib/utils"
import { FeedbackButtons } from "./feedback-buttons"

export interface ChatMessageProps {
  message: string
  isUser: boolean
  name?: string
  messageId?: string
}

export function ChatMessage({ message, isUser, name = isUser ? "" : "AI Assistant", messageId }: ChatMessageProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2 p-0 sm:p-4", isUser ? "items-end" : "items-start")}>
      <div
        id={messageId}
        className={cn(
          "chat-message text-[0.9rem] whitespace-pre-wrap [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80",
          isUser ? "rounded-lg bg-blue-100 px-4 py-2 text-gray-800" : "text-foreground w-full",
        )}
        dangerouslySetInnerHTML={{ __html: message }}
      />

      {/* Only show feedback buttons for AI messages, not user messages */}
      {!isUser && <FeedbackButtons messageId={messageId} className="ml-1" />}
    </div>
  )
}
