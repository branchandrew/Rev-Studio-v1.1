"use client"
import { useState, useRef, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { HoverDebug } from "@/components/debug/hover-debug"

import { Header } from "@/components/layout/header"
import { ChatInputBox } from "@/components/chat/chat-input-box"
import { ResourcesPanel } from "@/components/resources/resources-panel"
import DocumentViewer from "@/components/document/document-viewer"
import { SourceCard } from "@/components/document/source-card"
import { getSourceDocument, getSourceDocumentByName, type SourceReference } from "@/lib/data/source-documents"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StarIcon } from "@/lib/content/icons"
import { ChatMessage } from "@/components/chat/chat-message"
import { useState as useReactState } from "react"
import MarkdownStyleGuide from "@/components/markdown/markdown-style-guide"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { documentTypes, versionHistory, getRelativeTime } from "@/lib/data/document-types"
import { type Message, generateId, generateAIResponse } from "@/lib/data/chat-types"
import { contradictionContent } from "@/lib/data/contradiction-content"
import { useIsMobile } from "@/hooks/use-mobile"
import ContradictionViewer from "@/components/document/contradiction-viewer"
import { genericCaseContent } from "@/lib/data/generic-case-content"

// Add these mode constants for easier reference
const MODE_DISCOVERY = "MODE_DISCOVERY"
const MODE_ANALYSIS = "MODE_ANALYSIS"
const MODE_LAUNCH = "MODE_LAUNCH"
const MODE_EMPTY = "MODE_EMPTY"

export default function Home() {
  const router = useRouter()

  // State declarations
  const [activeSource, setActiveSource] = useState<SourceReference | null>(null)
  const [isSourceClosing, setIsSourceClosing] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(true)
  const [currentView, setCurrentView] = useState<"document" | "resources">("resources")
  const [isDocumentViewerVisible, setIsDocumentViewerVisible] = useState(false)
  const [isDocumentSliding, setIsDocumentSliding] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [artifactsMode, setArtifactsMode] = useState(false)
  const [markdownMode, setMarkdownMode] = useState(false)
  const [manyDocumentsMode, setManyDocumentsMode] = useState(false)
  const [activeDocumentView, setActiveDocumentView] = useState<string>("chronology")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAllTabsDropdownOpen, setIsAllTabsDropdownOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [resourcesPanelScale, setResourcesPanelScale] = useState(1)
  const [hasViewedDocument, setHasViewedDocument] = useState(false)
  const [currentMode, setCurrentMode] = useState(MODE_DISCOVERY)
  const [isSourceFromResourcesPanel, setIsSourceFromResourcesPanel] = useState(false)
  const [messages, setMessages] = useReactState<Message[]>([])
  const [isTyping, setIsTyping] = useReactState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isResizeHandleHover, setIsResizeHandleHover] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  // Refs
  const prevSourceRef = useRef<SourceReference | null>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  // Hooks
  const isMobile = useIsMobile()

  // Debug state
  const [debugInfo, setDebugInfo] = useState({
    isMobile: false,
    currentMode: MODE_DISCOVERY,
    shouldShowDrawer: false,
    drawerOpen: false,
  })

  // Function to handle mode changes from header dropdown
  const handleModeChange = (newMode: string) => {
    setCurrentMode(newMode)

    const url = new URL(window.location.href)
    url.searchParams.set("mode", newMode)
    window.history.pushState({}, "", url)

    setIsDocumentViewerVisible(false)
    setResourcesPanelScale(1)
    setActiveSource(null)
    setMessages([])
    setIsTyping(false)

    if (newMode === "MODE_ANALYSIS") {
      setHasViewedDocument(true)
    } else {
      setHasViewedDocument(false)
    }
  }

  // Function to handle chronology click
  const handleChronologyClick = () => {
    setCurrentMode(MODE_ANALYSIS)

    const url = new URL(window.location.href)
    url.searchParams.set("mode", MODE_ANALYSIS)
    window.history.pushState({}, "", url)

    setActiveDocumentView("chronology")
    setResourcesPanelScale(0.9)

    const userMessage: Message = {
      id: generateId(),
      content: "Create a timeline of events from the depositions to establish a clear sequence of occurrences.",
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    setIsTyping(true)
    setIsProcessing(true)
    setIsDocumentSliding(true)
    setIsDocumentViewerVisible(true)
    setHasViewedDocument(true)

    setTimeout(() => {
      setIsDocumentSliding(false)
    }, 300)

    setTimeout(() => {
      setIsProcessing(false)
      setIsTyping(false)
      addInitialChronologyMessage()
    }, 1500)
  }

  // Function to handle viewing existing document
  const handleViewExistingDocument = () => {
    if (currentMode !== MODE_ANALYSIS) {
      setCurrentMode(MODE_ANALYSIS)

      const url = new URL(window.location.href)
      url.searchParams.set("mode", MODE_ANALYSIS)
      window.history.pushState({}, "", url)
    }

    setActiveDocumentView("chronology")
    setResourcesPanelScale(0.9)
    setIsDocumentSliding(true)
    setIsDocumentViewerVisible(true)
    setHasViewedDocument(true)

    setTimeout(() => {
      setIsDocumentSliding(false)
    }, 300)
  }

  // Function to handle executive summary click
  const handleExecutiveSummaryClick = () => {
    setIsProcessing(true)
    setCurrentMode(MODE_ANALYSIS)

    const url = new URL(window.location.href)
    url.searchParams.set("mode", MODE_ANALYSIS)
    window.history.pushState({}, "", url)

    setActiveDocumentView("executive-summary")
    setResourcesPanelScale(0.9)
    setIsDocumentSliding(true)
    setIsDocumentViewerVisible(true)
    setHasViewedDocument(true)

    setTimeout(() => {
      setIsDocumentSliding(false)
    }, 300)

    setTimeout(() => {
      setIsProcessing(false)

      const userMessage: Message = {
        id: generateId(),
        content: "Generate an executive summary of the case",
        isUser: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      setIsTyping(true)

      setTimeout(() => {
        const aiMessage: Message = {
          id: generateId(),
          content:
            "I've created an executive summary of the case based on the depositions and evidence.\nYou can click on the citations in the document to verify the source of each event in the document. →",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      }, 1500)
    }, 2000)
  }

  // Function to transition to analysis mode
  const transitionToAnalysisMode = () => {
    setCurrentMode(MODE_ANALYSIS)

    const url = new URL(window.location.href)
    url.searchParams.set("mode", MODE_ANALYSIS)
    window.history.pushState({}, "", url)

    setHasViewedDocument(true)
    setResourcesPanelScale(1)
    setCurrentView("resources")
    setIsDocumentViewerVisible(false)
  }

  // Function to toggle resources
  const toggleResources = () => {
    if (isDocumentViewerVisible) {
      setIsDocumentSliding(true)
      setTimeout(() => {
        setIsDocumentViewerVisible(false)
        setIsDocumentSliding(false)
        setResourcesOpen(true)
        setCurrentView("resources")
        setResourcesPanelScale(1)
      }, 300)
    } else {
      setResourcesOpen(!resourcesOpen)
      setCurrentView(resourcesOpen ? "document" : "resources")
    }
  }

  // Function to handle source click
  const handleSourceClick = (doc: string, para: string, words: number) => {
    setActiveSource(null)
    setIsSourceClosing(false)

    setTimeout(() => {
      let documentName = doc

      if (doc.includes("Trump") && (doc.includes("Depo") || doc.includes("depo"))) {
        documentName = "Donald J. Trump, Sr. Deposition"
      }

      const newSource: SourceReference = {
        document: documentName,
        paragraph: para || "1",
        wordCount: words || 100,
      }

      setIsSourceFromResourcesPanel(false)
      setActiveSource(newSource)
      prevSourceRef.current = newSource
    }, 50)
  }

  // Function to close source sheet
  const closeSourceSheet = () => {
    if (isMobile) {
      setActiveSource(null)
      if (isSourceFromResourcesPanel) {
        setResourcesPanelScale(1)
        setIsSourceFromResourcesPanel(false)
      }
    } else {
      setIsSourceClosing(true)
      setTimeout(() => {
        setActiveSource(null)
        setIsSourceClosing(false)
        if (isSourceFromResourcesPanel) {
          setResourcesPanelScale(1)
          setIsSourceFromResourcesPanel(false)
        }
      }, 200)
    }
  }

  // Get active source document
  const activeSourceDocument = activeSource
    ? getSourceDocument(activeSource.document, activeSource.paragraph) || getSourceDocumentByName(activeSource.document)
    : undefined

  // Calculate document viewer scale class
  const documentViewerScaleClass =
    activeSource && !isSourceClosing && !isMobile ? "scale-90 opacity-100 origin-left" : "scale-100 opacity-100"

  // Get active document content
  const getActiveDocumentContent = () => {
    const activeDoc = documentTypes.find((doc) => doc.id === activeDocumentView)
    return activeDoc?.id === "contradictions"
      ? contradictionContent
      : activeDoc?.id === "chronology"
        ? genericCaseContent
        : genericCaseContent
  }

  // Function to add initial chronology message
  const addInitialChronologyMessage = () => {
    const aiMessage: Message = {
      id: generateId(),
      content:
        "I've created a chronological summary of evidence based on the files you have supplied.\nYou can click on the citations in the document to verify the source of each event in the document. →",
      isUser: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
  }

  // Function to handle sending message
  const handleSendMessage = (content: string) => {
    if (currentMode === MODE_DISCOVERY) {
      transitionToAnalysisMode()
      addMessage(content)
    } else {
      addMessage(content)
    }
  }

  // Helper function to add message
  const addMessage = (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      content,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

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

  // Function to handle prompt click
  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt)
  }

  // Function to check scrollability
  const checkScrollability = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }
  }

  // Function to scroll tabs left
  const scrollTabsLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  // Function to scroll tabs right
  const scrollTabsRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  // Function to handle resources panel click
  const handleResourcesPanelClick = () => {
    if (isDocumentViewerVisible) {
      setResourcesPanelScale(1)
      setIsDocumentSliding(true)
      setIsDocumentViewerVisible(false)

      setTimeout(() => {
        setIsDocumentSliding(false)
        setResourcesOpen(true)
        setCurrentView("resources")
      }, 300)
    }
  }

  // Function to handle close document viewer
  const handleCloseDocumentViewer = () => {
    handleResourcesPanelClick()
  }

  // Function to handle source file click
  const handleSourceFileClick = (documentName: string) => {
    setActiveSource(null)
    setIsSourceClosing(false)
    setResourcesPanelScale(0.9)
    setIsSourceFromResourcesPanel(true)

    setTimeout(() => {
      const newSource: SourceReference = {
        document: documentName,
        paragraph: "1",
        wordCount: 100,
      }

      setActiveSource(newSource)
      prevSourceRef.current = newSource
    }, 50)
  }

  // Function to handle upload from chat panel
  const handleUploadFromChatPanel = () => {
    const newFile = {
      id: `upload-${Date.now()}`,
      name: "Case Evidence Upload.pdf",
      type: "pdf",
      icon: "pdf",
      added: "Just now",
      size: "2.8 MB",
      loading: true,
    }

    const event = new CustomEvent("uploadFileFromChat", {
      detail: { file: newFile },
    })
    document.dispatchEvent(event)
  }

  // Function to get resources panel transform
  const getResourcesPanelTransform = () => {
    if (resourcesPanelScale === 1) {
      return "scale(1) translateX(0)"
    } else {
      return `scale(${resourcesPanelScale}) translateX(-1rem)`
    }
  }

  // Function to handle AI prompts link click
  const handleAIPromptsLinkClick = (e: MouseEvent) => {
    e.preventDefault()

    const openEvent = new CustomEvent("openAIPromptsDropdown")
    document.dispatchEvent(openEvent)

    const aiPromptsButton = document.querySelector('[data-ai-prompts-button="true"]')

    if (aiPromptsButton) {
      aiPromptsButton.classList.add("ai-prompts-glow")

      setTimeout(() => {
        aiPromptsButton.classList.remove("ai-prompts-glow")
      }, 2000)
    }
  }

  // Function to handle add files link click
  const handleAddFilesLinkClick = (e: MouseEvent) => {
    e.preventDefault()

    const fileSourcesSection = document.querySelector('[data-file-sources-section="true"]')

    if (fileSourcesSection) {
      fileSourcesSection.classList.add("add-files-glow")

      setTimeout(() => {
        fileSourcesSection.classList.remove("add-files-glow")
      }, 2000)
    }
  }

  // Function to handle summary click
  const handleSummaryClick = () => {
    setIsProcessing(true)
    setCurrentMode(MODE_ANALYSIS)

    const url = new URL(window.location.href)
    url.searchParams.set("mode", MODE_ANALYSIS)
    window.history.pushState({}, "", url)

    setActiveDocumentView("chronology")
    setResourcesPanelScale(0.9)

    const userMessage: Message = {
      id: generateId(),
      content: "Generate a comprehensive summary of the case files",
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    setIsTyping(true)
    setIsDocumentSliding(true)
    setIsDocumentViewerVisible(true)
    setHasViewedDocument(true)

    setTimeout(() => {
      setIsDocumentSliding(false)
    }, 300)

    setTimeout(() => {
      setIsProcessing(false)
      setIsTyping(false)

      const aiMessage: Message = {
        id: generateId(),
        content:
          "I've created a comprehensive summary of your case files based on the uploaded documents.\nYou can click on the citations in the document to verify the source of each fact in the summary. →",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1500)
  }

  // Chat Panel Content Component
  const ChatPanelContent = () => (
    <>
      {currentMode === MODE_DISCOVERY && <div className="pt-0 px-1"></div>}

      <div className={cn("overflow-y-auto py-4", "flex-1")}>
        {messages.length === 0 && !isTyping ? (
          <div className="flex h-full items-center justify-center"></div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                name={message.isUser ? undefined : "AI Assistant"}
              />
            ))}
            {isTyping && (
              <div className="flex w-full flex-col gap-2 p-4 items-start">
                <div className="flex items-center">
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <div className="text-sm text-foreground w-full">
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

      {currentMode === MODE_ANALYSIS && (
        <div className="space-y-2 mb-2">
          <Button
            className="w-full justify-start text-left pl-4 pt-4 pb-4"
            variant="outline"
            size="lg"
            onClick={() => handlePromptClick("What are the key admissions in this case?")}
          >
            <StarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>What are the key admissions in this case?</span>
          </Button>
          <Button
            className="w-full justify-start text-left pl-4 pt-4 pb-4"
            variant="outline"
            size="lg"
            onClick={() => handlePromptClick("What document handling practices were discussed?")}
          >
            <StarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>What document handling practices were discussed?</span>
          </Button>
        </div>
      )}

      <div className="mt-0">
        <ChatInputBox
          useSimpleTooltip={true}
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          isPostChronologyMode={currentMode === MODE_ANALYSIS}
          emptyMode={currentMode === MODE_EMPTY}
          onSummaryClick={handleSummaryClick}
          onUploadFile={handleUploadFromChatPanel}
        />
      </div>
    </>
  )

  // Effects
  useEffect(() => {
    const newDebugInfo = {
      isMobile,
      currentMode,
      shouldShowDrawer: currentMode === MODE_ANALYSIS || currentMode === MODE_LAUNCH,
      drawerOpen: isMobileDrawerOpen,
    }
    setDebugInfo(newDebugInfo)
  }, [isMobile, currentMode, isMobileDrawerOpen])

  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false)
      }
      if (isAllTabsDropdownOpen) {
        setIsAllTabsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen, isAllTabsDropdownOpen])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)

      const modeParam = urlParams.get("mode")
      if (modeParam) {
        switch (modeParam) {
          case MODE_DISCOVERY:
            setCurrentMode(MODE_DISCOVERY)
            break
          case MODE_ANALYSIS:
            setCurrentMode(MODE_ANALYSIS)
            setHasViewedDocument(true)
            break
          case MODE_LAUNCH:
            setCurrentMode(MODE_LAUNCH)
            break
          case MODE_EMPTY:
            setCurrentMode(MODE_EMPTY)
            break
          default:
            setCurrentMode(MODE_EMPTY)
        }
      } else {
        setCurrentMode(MODE_LAUNCH)
      }

      const markdownParam = urlParams.get("markdown")
      if (markdownParam !== null) {
        setMarkdownMode(true)
        return
      }

      const newParam = urlParams.get("new")
      if (newParam === "true") {
        setResourcesOpen(true)
        setCurrentView("resources")
      }

      const newResourcesParam = urlParams.get("new-resources")
      if (newResourcesParam !== null) {
        setResourcesOpen(true)
        setCurrentView("resources")
      }

      const artifactsParam = urlParams.get("artifacts")
      if (artifactsParam === "true") {
        setArtifactsMode(true)

        const manyParam = urlParams.get("many")
        if (manyParam === "true") {
          setManyDocumentsMode(true)
        }

        setActiveDocumentView("contradictions")

        const tabParam = urlParams.get("tab")
        if (tabParam && documentTypes.some((doc) => doc.id === tabParam)) {
          setActiveDocumentView(tabParam)
        }
      }

      const loadingParam = urlParams.get("loading")
      if (loadingParam === "true") {
        setIsProcessing(true)

        const timer = setTimeout(() => {
          setIsProcessing(false)

          const newUrl = new URL(window.location.href)
          newUrl.searchParams.delete("loading")
          window.history.pushState({}, "", newUrl)
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [])

  useEffect(() => {
    const tabsContainer = tabsContainerRef.current
    if (tabsContainer) {
      checkScrollability()
      tabsContainer.addEventListener("scroll", checkScrollability)
      window.addEventListener("resize", checkScrollability)
    }

    return () => {
      if (tabsContainer) {
        tabsContainer.removeEventListener("scroll", checkScrollability)
        window.removeEventListener("resize", checkScrollability)
      }
    }
  }, [manyDocumentsMode, artifactsMode])

  useEffect(() => {
    const forceLayoutRecalculation = () => {
      if (document.body) {
        const height = document.body.offsetHeight
      }
      window.dispatchEvent(new Event("resize"))
    }

    forceLayoutRecalculation()

    const timer = setTimeout(() => {
      forceLayoutRecalculation()
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (currentMode !== MODE_LAUNCH && currentMode !== MODE_ANALYSIS) {
      return
    }

    if (activeSource) {
      return
    }

    const resourcesPanel = document.getElementById("resources_panel_view")
    if (!resourcesPanel) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = resourcesPanel.getBoundingClientRect()
      const mouseX = event.clientX
      const leftBorderStart = rect.left
      const leftBorderEnd = rect.left + 5

      if (
        mouseX >= leftBorderStart &&
        mouseX <= leftBorderEnd &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        setIsResizeHandleHover(true)
      } else {
        setIsResizeHandleHover(false)
      }
    }

    const handleMouseLeave = () => {
      setIsResizeHandleHover(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    resourcesPanel.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      resourcesPanel.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [currentMode, isResizeHandleHover, activeSource])

  useEffect(() => {
    if (
      (currentMode === MODE_DISCOVERY || currentMode === MODE_LAUNCH || currentMode === MODE_EMPTY) &&
      messages.length === 0
    ) {
      setIsTyping(true)

      const timer = setTimeout(() => {
        let messageContent = ""

        if (currentMode === MODE_EMPTY) {
          messageContent = `Welcome to Rev Studio!

This AI-powered platform helps you analyze and create documents. You can:
• Chat with AI to ask questions about your documents
• Generate comprehensive summaries and analysis reports
• Create chronological timelines and contradiction analyses

Click <a href="#" onclick="window.handleAddFilesLinkClick(event)" style="color: #3b82f6; text-decoration: underline; cursor: pointer;">Add or Upload files</a> to get started.`
        } else {
          messageContent = `Ask me anything about your files, or use the <a href="#" onclick="window.handleAIPromptsLinkClick(event)" style="color: #3b82f6; text-decoration: underline; cursor: pointer;">AI Prompts</a> to generate comprehensive documents.`
        }

        const initialMessage: Message = {
          id: generateId(),
          content: messageContent,
          isUser: false,
          timestamp: new Date(),
        }

        if (currentMode === MODE_EMPTY) {
          ;(window as any).handleAddFilesLinkClick = handleAddFilesLinkClick
        } else {
          ;(window as any).handleAIPromptsLinkClick = handleAIPromptsLinkClick
        }

        setMessages([initialMessage])
        setIsTyping(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [currentMode, messages.length])

  useEffect(() => {
    if (currentMode === MODE_DISCOVERY || currentMode === MODE_LAUNCH || currentMode === MODE_EMPTY) {
      setIsTyping(true)
    }
  }, [])

  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen h-screen bg-zinc-50">
      <HoverDebug />
      <Header
        onResourcesButtonClick={toggleResources}
        useSimpleTooltip={true}
        isDocumentViewerOpen={isDocumentViewerVisible}
        documentTitle={
          activeDocumentView === "chronology"
            ? "Case Summary"
            : activeDocumentView === "executive-summary"
              ? "Executive Summary"
              : "Case Summary"
        }
        showBreadcrumb={isDocumentViewerVisible || !!activeSource}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        activeSourceDocument={activeSourceDocument?.document}
        hasActiveSource={!!activeSource}
        onDocumentBreadcrumbClick={closeSourceSheet}
      />
      <main
        className={cn(
          "flex-1 overflow-hidden relative p-4 pt-0",
          currentMode === MODE_DISCOVERY || currentMode === MODE_EMPTY
            ? "flex justify-center"
            : currentMode === MODE_LAUNCH || currentMode === MODE_EMPTY
              ? "flex items-center justify-center"
              : "flex gap-4 lg:gap-6",
        )}
      >
        {currentMode === MODE_LAUNCH || currentMode === MODE_EMPTY ? (
          <>
            <div id="desktop_chat_panel" className="hidden md:flex w-1/3 min-w-[350px] max-w-[468px] h-full flex-col">
              <ChatPanelContent />
            </div>

            <div id="document_viewer_container" className="flex-1 h-full relative ml-0 sm:ml-6">
              <div
                id="resources_panel_view"
                className={cn(
                  "h-full transition-all duration-300 origin-left rounded-lg",
                  isResizeHandleHover && "border-l-4 border-blue-500 cursor-col-resize",
                  resourcesPanelScale < 1 && (isDocumentViewerVisible || isSourceFromResourcesPanel)
                    ? "cursor-pointer hover:bg-gray-50/50"
                    : "",
                )}
                style={{ transform: getResourcesPanelTransform() }}
                onClick={
                  resourcesPanelScale < 1 && (isDocumentViewerVisible || isSourceFromResourcesPanel)
                    ? handleResourcesPanelClick
                    : undefined
                }
              >
                <ResourcesPanel
                  onChronologyClick={handleChronologyClick}
                  onSourceFileClick={handleSourceFileClick}
                  hasViewedDocument={hasViewedDocument}
                  onViewExistingDocument={handleViewExistingDocument}
                  setIsProcessing={setIsProcessing}
                  onExecutiveSummaryClick={handleExecutiveSummaryClick}
                  onSummaryClick={handleSummaryClick}
                  showAIPromptsInLeft={true}
                  currentMode={currentMode}
                  emptyMode={currentMode === MODE_EMPTY}
                />
              </div>

              <div
                id="ai_document_panel"
                className={cn(
                  "absolute transition-all duration-300 transform",
                  isDocumentViewerVisible
                    ? isDocumentSliding
                      ? "translate-x-1 opacity-100"
                      : "translate-x-1 opacity-100"
                    : "translate-x-full opacity-0 pointer-events-none",
                )}
                style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: "4px",
                }}
              >
                {isProcessing ? (
                  <div className={cn("transition-all duration-300 h-full", documentViewerScaleClass)}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-auto pt-2">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="relative w-16 h-16 mb-4">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>
                          </div>
                          <p className="text-lg font-medium text-muted-foreground">Processing your documents...</p>
                          <p className="text-sm text-muted-foreground mt-2">This will only take a few seconds</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className={cn("transition-all duration-300 h-full", documentViewerScaleClass)}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-normal">Case Summaries</h4>
                          <div className="flex items-center gap-2">
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    id="document-share"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-md"
                                    onClick={() => {}}
                                    aria-label="Share document"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5"
                                    >
                                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                      <polyline points="16,6 12,2 8,6" />
                                      <line x1="12" y1="2" x2="12" y2="15" />
                                    </svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Share</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-md"
                                    onClick={() => {}}
                                    aria-label="Download document"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5"
                                    >
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                      <polyline points="7,10 12,15 17,10" />
                                      <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-md"
                                    onClick={handleCloseDocumentViewer}
                                    aria-label="Close document"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5"
                                    >
                                      <line x1="18" y1="6" x2="6" y2="18" />
                                      <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Close</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-auto pt-2">
                        {isDocumentViewerVisible && (
                          <DocumentViewer
                            content={getActiveDocumentContent()}
                            onSourceClick={handleSourceClick}
                            isVisible={true}
                            useSimpleTooltip={true}
                            hideTitle={true}
                            className="h-full border-none"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {activeSource && activeSourceDocument && (
                <SourceCard
                  key={`${activeSource.document}-${activeSource.paragraph}-${Date.now()}`}
                  sourceDocument={activeSourceDocument}
                  onClose={closeSourceSheet}
                  isClosing={isSourceClosing}
                  isChangingSource={activeSource !== prevSourceRef.current}
                  fromResourcesPanel={isSourceFromResourcesPanel}
                />
              )}
            </div>
          </>
        ) : currentMode === MODE_DISCOVERY ? (
          <>
            <div className="flex-1"></div>
            <div className="w-1/2 h-full flex flex-col relative mr-4">
              <ChatPanelContent />
            </div>
            <div className="w-1/4 h-full">
              <ResourcesPanel
                onChronologyClick={handleChronologyClick}
                onSourceFileClick={handleSourceFileClick}
                onSummaryClick={handleSummaryClick}
                simplified={true}
                currentMode={currentMode}
                emptyMode={currentMode === MODE_EMPTY}
              />
            </div>
          </>
        ) : (
          <>
            <div id="desktop_chat_panel" className="hidden md:flex w-1/3 min-w-[350px] max-w-[468px] h-full flex-col">
              <ChatPanelContent />
            </div>

            <div id="document_viewer_container" className="flex-1 h-full relative">
              <div
                id="resources_panel_view"
                className={cn(
                  "h-full transition-all duration-300 origin-left rounded-lg",
                  isResizeHandleHover && "border-l-4 border-blue-500 cursor-col-resize",
                  resourcesPanelScale < 1 && (isDocumentViewerVisible || isSourceFromResourcesPanel)
                    ? "cursor-pointer hover:bg-gray-50/50"
                    : "",
                )}
                style={{ transform: getResourcesPanelTransform() }}
                onClick={
                  resourcesPanelScale < 1 && (isDocumentViewerVisible || isSourceFromResourcesPanel)
                    ? handleResourcesPanelClick
                    : undefined
                }
              >
                <ResourcesPanel
                  onChronologyClick={handleChronologyClick}
                  onSourceFileClick={handleSourceFileClick}
                  hasViewedDocument={hasViewedDocument}
                  onViewExistingDocument={handleViewExistingDocument}
                  setIsProcessing={setIsProcessing}
                  onExecutiveSummaryClick={handleExecutiveSummaryClick}
                  onSummaryClick={handleSummaryClick}
                  currentMode={currentMode}
                  emptyMode={currentMode === MODE_EMPTY}
                />
              </div>

              <div
                id="ai_document_panel"
                className={cn(
                  "absolute transition-all duration-300 transform",
                  isDocumentViewerVisible
                    ? isDocumentSliding
                      ? "translate-x-1 opacity-100"
                      : "translate-x-1 opacity-100"
                    : "translate-x-full opacity-0 pointer-events-none",
                )}
                style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: "4px",
                }}
              >
                {isProcessing ? (
                  <div className={cn("transition-all duration-300 h-full", documentViewerScaleClass)}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-auto pt-2">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="relative w-16 h-16 mb-4">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin"></div>
                          </div>
                          <p className="text-lg font-medium text-muted-foreground">Processing your documents...</p>
                          <p className="text-sm text-muted-foreground mt-2">This will only take a few seconds</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : markdownMode ? (
                  <div className={cn("transition-all duration-300 h-full", documentViewerScaleClass)}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-2 pt-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl">Markdown Style Guide</h2>
                          <div className="flex items-center gap-2">
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 flex items-center justify-center rounded-md"
                                    onClick={() => {}}
                                    aria-label="Download document"
                                  >
                                    <span className="material-icons-round text-base">download</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 flex items-center justify-center rounded-md"
                                    onClick={handleCloseDocumentViewer}
                                    aria-label="Close document"
                                  >
                                    <span className="material-icons-round text-base">close</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Close</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-auto pt-0">
                        <MarkdownStyleGuide />
                      </CardContent>
                    </Card>
                  </div>
                ) : artifactsMode && manyDocumentsMode ? (
                  <div className={cn("transition-all duration-300 h-full", documentViewerScaleClass)}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-2 pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center w-full relative">
                            <button
                              onClick={scrollTabsLeft}
                              className={cn(
                                "flex-shrink-0 p-1 rounded-full hover:bg-gray-100 focus:outline-none",
                                !canScrollLeft && "opacity-50 cursor-not-allowed",
                              )}
                              disabled={!canScrollLeft}
                            >
                              <span className="material-icons-round text-base text-[#22085e]">chevron_left</span>
                            </button>

                            <div
                              ref={tabsContainerRef}
                              className="flex space-x-4 overflow-x-auto scrollbar-hide mx-2 flex-grow"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {documentTypes.map((doc) => (
                                <div key={doc.id} className="flex items-center relative flex-shrink-0 w-[180px]">
                                  <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => {
                                      if (activeDocumentView !== doc.id) {
                                        setActiveDocumentView(doc.id)
                                        setIsDropdownOpen(false)
                                      } else {
                                        setIsDropdownOpen(!isDropdownOpen)
                                      }
                                    }}
                                  >
                                    <span
                                      className={cn(
                                        "text-sm transition-colors hover:text-[#22085e] max-w-[150px] truncate",
                                        activeDocumentView === doc.id ? "font-bold text-[#22085e]" : "text-gray-600",
                                      )}
                                      title={doc.title}
                                    >
                                      {doc.title}
                                    </span>
                                    {activeDocumentView === doc.id && (
                                      <span className="material-icons-round text-base text-[#22085e]">expand_more</span>
                                    )}
                                  </div>
                                  {activeDocumentView === doc.id && isDropdownOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                                      <div
                                        className="flex items-center rounded-sm py-1.5 px-2 text-sm outline-none cursor-pointer hover:bg-accent"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setIsDropdownOpen(false)
                                        }}
                                      >
                                        <span className="material-icons-round text-base">download</span>
                                        <span>Download</span>
                                      </div>
                                      <div
                                        className="flex items-center rounded-sm py-1.5 px-2 text-sm outline-none cursor-pointer hover:bg-accent"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setIsDropdownOpen(false)
                                        }}
                                      >
                                        <span>Rename</span>
                                      </div>
                                      <div className="h-px bg-gray-200 my-1"></div>
                                      {versionHistory.map((version) => (
                                        <div
                                          key={version.id}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setIsDropdownOpen(false)
                                          }}
                                          className="flex justify-between items-center rounded-sm py-1.5 px-2 text-sm outline-none cursor-pointer hover:bg-accent"
                                        >
                                          <span className="font-medium">{version.id}</span>
                                          <span className="text-xs text-muted-foreground">
                                            {getRelativeTime(version.timestamp)}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={scrollTabsRight}
                              className={cn(
                                "flex-shrink-0 p-1 rounded-full hover:bg-gray-100 focus:outline-none",
                                !canScrollRight && "opacity-50 cursor-not-allowed",
                              )}
                              disabled={!canScrollRight}
                            >
                              <span className="material-icons-round text-base">chevron_right</span>
                            </button>

                            <div className="relative ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIsAllTabsDropdownOpen(!isAllTabsDropdownOpen)
                                }}
                                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                              >
                                <span className="material-icons-round text-base text-[#22085e]">more_horiz</span>
                              </button>
                              {isAllTabsDropdownOpen && (
                                <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                                  <div className="py-1 px-2 text-xs font-medium text-gray-500">All Documents</div>
                                  {documentTypes.map((doc) => (
                                    <div
                                      key={doc.id}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveDocumentView(doc.id)
                                        setIsAllTabsDropdownOpen(false)

                                        if (tabsContainerRef.current) {
                                          const tabElement = tabsContainerRef.current.querySelector(
                                            `[data-tab-id="${doc.id}"]`,
                                          )
                                          if (tabElement) {
                                            tabElement.scrollIntoView({
                                              behavior: "smooth",
                                              block: "nearest",
                                              inline: "center",
                                            })
                                          }
                                        }
                                      }}
                                      className={cn(
                                        "flex items-center rounded-sm py-1.5 px-2 text-sm outline-none cursor-pointer",
                                        activeDocumentView === doc.id ? "bg-accent font-medium" : "hover:bg-accent",
                                      )}
                                    >
                                      <span className="truncate" title={doc.title}>
                                        {doc.title}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="ml-4">
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 flex items-center justify-center rounded-md"
                                    onClick={handleCloseDocumentViewer}
                                    aria-label="Close document"
                                  >
                                    <span className="material-icons-round text-base">close</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Close</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-auto pt-0">
                        {activeDocumentView === "contradictions" ? (
                          <ContradictionViewer
                            content={getActiveDocumentContent()}
                            onSourceClick={handleSourceClick}
                            isVisible={true}
                            useSimpleTooltip={true}
                            hideTitle={true}
                            className="h-full border-none"
                          />
                        ) : (
                          <DocumentViewer
                            content={getActiveDocumentContent()}
                            onSourceClick={handleSourceClick}
                            isVisible={true}
                            useSimpleTooltip={true}
                            hideTitle={true}
                            className="h-full border-none"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className={cn("transition-all duration-300 h-full", documentViewerScaleClass)}>
                    <Card className="h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-normal">Case Summaries</h4>

                          <div className="flex items-center gap-2">
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    id="document-share"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-md"
                                    aria-label="Share document"
                                    onClick={() => {}}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5"
                                    >
                                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                      <polyline points="16 6 12 2 8 6" />
                                      <line x1="12" y1="2" x2="12" y2="15" />
                                    </svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Share</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-md"
                                    onClick={() => {}}
                                    aria-label="Download document"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5"
                                    >
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                      <polyline points="7,10 12,15 17,10" />
                                      <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-md"
                                    onClick={handleCloseDocumentViewer}
                                    aria-label="Close document"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5"
                                    >
                                      <line x1="18" y1="6" x2="6" y2="18" />
                                      <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Close</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-auto pt-2">
                        {isDocumentViewerVisible && (
                          <DocumentViewer
                            content={getActiveDocumentContent()}
                            onSourceClick={handleSourceClick}
                            isVisible={true}
                            useSimpleTooltip={true}
                            hideTitle={true}
                            className="h-full border-none"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {activeSource && activeSourceDocument && (
                <SourceCard
                  key={`${activeSource.document}-${activeSource.paragraph}-${Date.now()}`}
                  sourceDocument={activeSourceDocument}
                  onClose={closeSourceSheet}
                  isClosing={isSourceClosing}
                  isChangingSource={activeSource !== prevSourceRef.current}
                  fromResourcesPanel={isSourceFromResourcesPanel}
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
