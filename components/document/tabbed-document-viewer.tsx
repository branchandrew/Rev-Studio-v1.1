"use client"

import { DocumentHeader } from "@/components/document/document-header"

// This is a placeholder for the actual TabbedDocumentViewer component.
// Since I don't have the original code, I'm creating a basic structure
// that includes the DocumentHeader component as instructed.

import type React from "react"
import { useState } from "react"

interface Tab {
  id: string
  title: string
  content: React.ReactNode
}

interface TabbedDocumentViewerProps {
  tabs: Tab[]
  onClose: () => void
}

const TabbedDocumentViewer: React.FC<TabbedDocumentViewerProps> = ({ tabs, onClose }) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || "")

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId)
  }

  return (
    <div>
      <DocumentHeader title={activeTab?.title || "Document"} showTitle={true} onClose={onClose} />

      <div>
        {/* Tab Navigation */}
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ cursor: "pointer" }}>
              {tab.title}
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div>{activeTab ? activeTab.content : <p>No content to display.</p>}</div>
      </div>
    </div>
  )
}

export default TabbedDocumentViewer
