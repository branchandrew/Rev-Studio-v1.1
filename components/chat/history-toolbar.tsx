"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, History, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"

interface HistoryToolbarProps {
  className?: string
  compact?: boolean
}

interface ChatHistoryItem {
  id: string
  title: string
  date: string
  preview: string
}

// Sample chat history data
const initialChatHistory: ChatHistoryItem[] = [
  {
    id: "chat-1",
    title: "Document Analysis",
    date: "Today, 2:30 PM",
    preview: "I need help analyzing this legal contract...",
  },
  {
    id: "chat-2",
    title: "Technical Specifications Review",
    date: "Yesterday, 10:15 AM",
    preview: "Can you summarize the key points in this technical document?",
  },
  {
    id: "chat-3",
    title: "Witness Testimony Analysis",
    date: "May 2, 2023",
    preview: "What are the main contradictions in these testimonies?",
  },
  {
    id: "chat-4",
    title: "Legal Case Research",
    date: "Apr 28",
    preview: "Find precedents for this type of contract dispute...",
  },
  {
    id: "chat-5",
    title: "Meeting Notes Summary",
    date: "Jan 25, 2023",
    preview: "Can you extract the action items from these meeting notes?",
  },
]

// Add this utility function after the initialChatHistory declaration and before the HistoryItem component

function formatDate(dateString: string): string {
  // For demo purposes, we'll parse the sample strings
  // In a real app, you'd likely have actual Date objects or ISO strings

  // Current date for comparison
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const currentYear = now.getFullYear()

  // Parse the date string - this is simplified for the demo data format
  let date: Date

  if (dateString.toLowerCase().includes("today")) {
    // For "Today, 2:30 PM" format
    const timeStr = dateString.split(", ")[1]
    date = new Date()

    // Return only the time portion for today
    return timeStr
  } else if (dateString.toLowerCase().includes("yesterday")) {
    // For "Yesterday, 10:15 AM" format
    const timeStr = dateString.split(", ")[1]
    date = new Date()
    date.setDate(date.getDate() - 1)

    return "Yesterday, " + timeStr
  } else {
    // For "May 2, 2023" format
    const parts = dateString.split(" ")
    const month = parts[0]
    const day = Number.parseInt(parts[1].replace(",", ""))
    const year = parts.length > 2 ? Number.parseInt(parts[2]) : currentYear

    date = new Date(
      year,
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month),
      day,
    )

    // Format according to standards
    const monthAbbr = date.toLocaleString("en-US", { month: "short" }).substring(0, 3)

    if (date.getFullYear() === currentYear) {
      return `${monthAbbr} ${date.getDate()}`
    } else {
      return `${monthAbbr} ${date.getDate()}, ${date.getFullYear()}`
    }
  }
}

// Update the HistoryItem component to use the new formatDate function
// Replace the line that displays the date with:

function HistoryItem({
  item,
  onDelete,
  onClick,
}: {
  item: ChatHistoryItem
  onDelete: (id: string) => void
  onClick: () => void
}) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(item.id)
  }

  return (
    <div
      className="flex flex-col gap-1 p-3 hover:bg-gray-50 cursor-pointer border-b border-[#BEC8DA] last:border-0"
      onClick={onClick}
      data-name="history-item"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">{item.title}</h4>
        <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 truncate max-w-[300px]">{item.preview}</p>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-50"
          onClick={handleDelete}
          data-name="delete-history-item"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  )
}

export function HistoryToolbar({ className, compact = false }: HistoryToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(initialChatHistory)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()

  const filteredHistory = searchQuery
    ? chatHistory.filter(
        (chat) =>
          chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.preview.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chatHistory

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleDeleteChat = (id: string) => {
    const chatToDelete = chatHistory.find((chat) => chat.id === id)
    setChatHistory(chatHistory.filter((chat) => chat.id !== id))

    if (chatToDelete) {
      toast(`"${chatToDelete.title}" has been deleted from your chat history.`, {
        duration: 2000,
      })
    }
  }

  const handleSelectChat = (id: string) => {
    console.log(`Selected chat: ${id}`)
    setIsOpen(false)
    // Add functionality to load the selected chat
  }

  return (
    <div className="relative">
      {compact ? (
        <Button
          ref={buttonRef}
          type="button"
          variant="ghost"
          className="h-9 aspect-square rounded-full p-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <History className="h-5 w-5" />
          <span className="sr-only">History</span>
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          type="button"
          variant="ghost"
          className="h-9 px-2 text-xs flex items-center gap-1 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <History className="h-5 w-5" />
          History
          <ChevronDown className="h-4 w-4 ml-0.5" />
        </Button>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[80vh]">
            <div className="flex flex-col h-full p-4">
              <div className="text-center mb-4 text-lg font-bold">Chat History</div>
              <div className="p-3 border-b border-[#BEC8DA]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search chat history"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredHistory.length > 0 ? (
                  <div>
                    {filteredHistory.map((chat) => (
                      <HistoryItem
                        key={chat.id}
                        item={chat}
                        onDelete={handleDeleteChat}
                        onClick={() => handleSelectChat(chat.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {searchQuery ? "No matching chats found" : "No chat history"}
                  </div>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        /* Desktop Dropdown */
        isOpen && (
          <div
            ref={dropdownRef}
            className="absolute bottom-[calc(100%+8px)] left-0 w-[400px] bg-white rounded-md shadow-lg border border-[#BEC8DA] overflow-hidden z-[100] max-h-[80vh] overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            <div className="p-3 border-b border-[#BEC8DA]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search chat history"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredHistory.length > 0 ? (
              <div>
                {filteredHistory.map((chat) => (
                  <HistoryItem
                    key={chat.id}
                    item={chat}
                    onDelete={handleDeleteChat}
                    onClick={() => handleSelectChat(chat.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                {searchQuery ? "No matching chats found" : "No chat history"}
              </div>
            )}
          </div>
        )
      )}
    </div>
  )
}
