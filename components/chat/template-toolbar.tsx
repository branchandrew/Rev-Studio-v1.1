"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, Layers, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { aiPrompts, type AIPrompt } from "@/lib/content/ai-prompts"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"

interface TemplateToolbarProps {
  className?: string
  onPromptSelect?: (prompt: AIPrompt) => void
  onSummaryClick?: () => void
  disabled?: boolean
}

export function TemplateToolbar({ className, onPromptSelect, onSummaryClick, disabled = false }: TemplateToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()
  const [filteredTypes, setFilteredTypes] = useState<Set<string>>(new Set())

  const filteredPrompts = aiPrompts.filter((prompt) => {
    // Filter by search query
    const matchesSearch =
      !searchQuery ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.type.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by type (exclude if type is in filteredTypes set)
    const matchesType = !filteredTypes.has(prompt.type)

    return matchesSearch && matchesType
  })

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

  // Add effect to listen for programmatic opening
  useEffect(() => {
    const handleProgrammaticOpen = () => {
      setIsOpen(true)
    }

    // Listen for custom event to open the dropdown
    document.addEventListener("openAIPromptsDropdown", handleProgrammaticOpen)

    return () => {
      document.removeEventListener("openAIPromptsDropdown", handleProgrammaticOpen)
    }
  }, [])

  const handlePromptClick = (prompt: AIPrompt) => {
    if (prompt.id === "summary" && onSummaryClick) {
      onSummaryClick()
    } else if (onPromptSelect) {
      onPromptSelect(prompt)
    }
    setIsOpen(false)
  }

  const handleTypeToggle = (type: string) => {
    const newFilteredTypes = new Set(filteredTypes)
    if (newFilteredTypes.has(type)) {
      newFilteredTypes.delete(type)
    } else {
      newFilteredTypes.add(type)
    }
    setFilteredTypes(newFilteredTypes)
  }

  return (
    <div className="relative" data-name="template-toolbar">
      <style jsx global>{`
        @keyframes aiPromptsGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.5);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .ai-prompts-glow {
          animation: aiPromptsGlow 2s ease-out;
        }
      `}</style>

      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        className={`h-9 px-2 text-xs flex items-center gap-1 rounded-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        data-ai-prompts-button="true"
        disabled={disabled}
        data-name="ai-prompts-button"
      >
        <Layers className={`h-4 w-4 ${disabled ? "text-gray-400" : "text-[#22085e]"}`} />
        AI Prompts
        <ChevronDown className="h-4 w-4 ml-0.5" />
      </Button>

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer open={isOpen && !disabled} onOpenChange={(open) => !disabled && setIsOpen(open)}>
          <DrawerContent className="h-[80vh]">
            <div className="flex flex-col h-full p-4" data-name="mobile-drawer-content">
              <div className="text-center mb-4 text-lg font-bold">AI Prompts</div>
              <div className="p-3 border-b border-[#BEC8DA]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search AI prompts"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-name="search-input"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-3 p-3">
                  {filteredPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="bg-white border border-[#BEC8DA] rounded-lg p-3 text-left hover:bg-[#f5f7fa] cursor-pointer transition-colors"
                      onClick={() => handlePromptClick(prompt)}
                      data-name={`prompt-item-${prompt.id}`}
                    >
                      <h5 className="font-medium text-sm mb-1 flex items-center justify-between text-[#22085e]">
                        <div className="flex items-center">
                          <span>{prompt.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                        </div>
                        <Badge variant="default" className="text-xs">
                          {prompt.type}
                        </Badge>
                      </h5>
                      <p className="text-sm text-[#687a97]">{prompt.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        /* Desktop Dropdown */
        isOpen &&
        !disabled && (
          <div
            ref={dropdownRef}
            className="absolute bottom-[calc(100%+8px)] left-0 w-[400px] bg-white rounded-md shadow-lg border border-[#BEC8DA] overflow-hidden z-[100] max-h-[80vh]"
            style={{ maxHeight: "calc(100vh - 200px)" }}
            data-name="desktop-dropdown"
          >
            <div className="p-3 sticky top-0 bg-white z-10 border-b border-[#BEC8DA]">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search AI prompts"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-name="search-input"
                />
              </div>
              <div className="flex gap-2">
                <Badge
                  variant={filteredTypes.has("Basic") ? "secondary" : "default"}
                  className="cursor-pointer text-xs"
                  onClick={() => handleTypeToggle("Basic")}
                  data-name="filter-basic"
                >
                  Basic
                </Badge>
                <Badge
                  variant={filteredTypes.has("Legal") ? "secondary" : "default"}
                  className="cursor-pointer text-xs"
                  onClick={() => handleTypeToggle("Legal")}
                  data-name="filter-legal"
                >
                  Legal
                </Badge>
              </div>
            </div>
            <div className="space-y-3 p-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
              {filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="bg-white border border-[#BEC8DA] rounded-lg p-3 text-left hover:bg-[#f5f7fa] cursor-pointer transition-colors"
                  onClick={() => handlePromptClick(prompt)}
                  data-name={`prompt-item-${prompt.id}`}
                >
                  <h5 className="font-medium text-sm mb-1 flex items-center justify-between text-[#22085e]">
                    <div className="flex items-center">
                      <span>{prompt.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                    </div>
                    <Badge variant="default" className="text-xs">
                      {prompt.type}
                    </Badge>
                  </h5>
                  <p className="text-sm text-[#687a97]">{prompt.description}</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
