import { trumpDepositionContent, chronologyDocumentContent } from "./trump-deposition-content"
import { contradictionContent } from "./contradiction-content"

// Define document types for the many tabs mode
export type DocumentType = {
  id: string
  title: string
  content: any // This would be the actual content component or data
}

// List of document types for many tabs mode
export const documentTypes: DocumentType[] = [
  { id: "chronology", title: "Chronological Summary of Evidence", content: chronologyDocumentContent },
  { id: "contradictions", title: "Key Contradictions in Evidence", content: contradictionContent },
  { id: "executive-summary", title: "Executive Summary", content: trumpDepositionContent },
  { id: "witness-a", title: "Witness A Testimony Analysis", content: trumpDepositionContent },
  { id: "witness-b", title: "Witness B Testimony Analysis", content: trumpDepositionContent },
  { id: "forensic", title: "Forensic Evidence Report", content: trumpDepositionContent },
  { id: "timeline", title: "Event Timeline", content: trumpDepositionContent },
  { id: "exhibits", title: "Key Exhibits", content: trumpDepositionContent },
]

// Mock version history for dropdown
export const versionHistory = [
  {
    id: "v3",
    timestamp: new Date(),
    label: "Current Version",
  },
  {
    id: "v2",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    label: "Draft Review",
  },
  {
    id: "v1",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    label: "Initial Draft",
  },
]

// Function to calculate relative time
export const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInMinutes < 1) return "just now"
  if (diffInMinutes === 1) return "1 minute ago"
  return `${diffInMinutes} minutes ago`
}
