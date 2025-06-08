"use client"
import { Header } from "@/components/layout/header"
import { ChatInputBox } from "@/components/chat/chat-input-box"
import { Button } from "@/components/ui/button"
import { StarIcon } from "@/lib/content/icons"
import { ChatMessage } from "@/components/chat/chat-message"
import { useState as useReactState } from "react"
import { FileTypeIcon } from "@/components/shared/file-type-icons"

export default function NewPage() {
  // Chat message type
  type Message = {
    id: string
    content: string
    isUser: boolean
    timestamp: Date
  }

  // Files data from resources panel
  const files = [
    {
      id: "1",
      name: "Technical Specifications and Documentation",
      type: "pdf",
      date: "03/18/2022",
    },
    {
      id: "2",
      name: "Legal Agreements and Contracts",
      type: "textUpload",
      date: "02/03/2022",
    },
    {
      id: "3",
      name: "TechInnovate-GlobalSoft Communications",
      type: "word",
      date: "01/12/2022",
    },
    {
      id: "4",
      name: "Witness Testimonies and Depositions",
      type: "videoUpload",
      date: "12/05/2022",
    },
    {
      id: "5",
      name: "Expert Analysis and Reports",
      type: "pdf",
      date: "01/30/2023",
    },
  ]

  // Chat state
  const [messages, setMessages] = useReactState<Message[]>([])
  const [isTyping, setIsTyping] = useReactState(false)

  // Function to generate a unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  // Function to handle sending a message
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI thinking
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        content: generateAIResponse(content),
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Function to generate AI responses based on input
  const generateAIResponse = (input: string) => {
    // Simple response logic
    if (input.toLowerCase().includes("evidence") || input.toLowerCase().includes("summarize")) {
      return "Based on my analysis of the evidence, the key events occurred in the following order: First, the incident was reported on June 12th. Then, witness testimonies were collected between June 13-15th. The forensic analysis was completed on June 20th, revealing important details about the timeline. Would you like me to elaborate on any specific aspect of this chronology?"
    } else if (
      input.toLowerCase().includes("inconsistency") ||
      input.toLowerCase().includes("contradiction") ||
      input.toLowerCase().includes("witness")
    ) {
      return "I've identified several inconsistencies in the witness testimonies. Witness A claimed the events occurred at 2:00 PM, while Witness B stated it was closer to 3:30 PM. Additionally, there are contradictions regarding the weather conditions and the number of people present at the scene. These discrepancies may significantly impact how we interpret the evidence."
    } else {
      return "I've analyzed the documents and found some interesting patterns. The evidence suggests a complex situation with multiple factors at play. Would you like me to focus on a specific aspect of the case or provide a general overview?"
    }
  }

  // Function to handle clicking on a prompt button
  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="flex flex-col min-h-screen h-screen bg-muted/40">
      <Header useSimpleTooltip={true} />
      <main className="flex-1 flex justify-center px-4 pb-4 lg:px-6 lg:pb-6 overflow-hidden">
        {/* Centered Chat Panel without Card */}
        <div className="w-full max-w-3xl h-full flex flex-col">
          <div className="flex-1 overflow-y-auto py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col h-full">
                {/* Files Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Files</h3>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="group relative flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-accent cursor-pointer bg-white/50"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileTypeIcon type={file.type} size="sm" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[#22085e] font-medium text-sm leading-none truncate">
                              {file.name}
                            </span>
                            <span className="text-[#687a97] text-xs mt-1">{file.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prompt Section */}
                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="max-w-lg text-center mb-6">
                    <h3 className="text-lg font-medium mb-2">What would you like to do with these documents?</h3>
                    <p className="text-muted-foreground">You can ask me anything. Or I can:</p>
                  </div>

                  <div className="space-y-2 w-full max-w-lg mb-6">
                    <Button
                      className="w-full justify-start text-left pl-4 pt-4 pb-4"
                      variant="outline"
                      size="lg"
                      onClick={() => handlePromptClick("Summarize key evidence in chronological order")}
                    >
                      <StarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>Summarize key evidence in chronological order</span>
                    </Button>
                    <Button
                      className="w-full justify-start text-left pl-4 pt-4 pb-4"
                      variant="outline"
                      size="lg"
                      onClick={() => handlePromptClick("Find inconsistencies in witness testimonies")}
                    >
                      <StarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>Find inconsistencies in witness testimonies</span>
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-center">
                    Or you can generate other documents using the templates below
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message.content} isUser={message.isUser} />
                ))}
                {isTyping && (
                  <div className="flex w-full flex-col gap-2 p-4 items-start">
                    <div className="text-[0.9rem] text-foreground w-full">
                      <div className="flex space-x-2">
                        <div
                          className="h-2 w-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-2 pb-4">
            <ChatInputBox
              useSimpleTooltip={true}
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              hideNewChatButton={true}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
