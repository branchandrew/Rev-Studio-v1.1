"use client"

import { useState } from "react"
import { ChatMessage, type ChatMessageProps } from "./chat-message"
import { ChatInput } from "./chat-input"

// Sample initial messages
const initialMessages: Omit<ChatMessageProps, "isUser">[] = [
  {
    message: "Hello! I'm your AI assistant. How can I help you today?",
    name: "AI Assistant",
  },
]

export function Chat() {
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    initialMessages.map((msg) => ({ ...msg, isUser: false })),
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      message: content,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessageProps = {
        message: `I received your message: "${content}". This is a simulated response.`,
        isUser: false,
        name: "AI Assistant",
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div id="chat_panel" className="flex h-full min-w-[350px] max-w-[468px] flex-col">
      <div className="flex-1 overflow-y-auto py-4">
        <div className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
      </div>
      <div className="border-t p-4">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
