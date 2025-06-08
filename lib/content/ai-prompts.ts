export interface AIPrompt {
  id: string
  title: string
  description: string
  type: "Legal" | "Basic"
  action?: () => void
}

export const aiPrompts: AIPrompt[] = [
  {
    id: "summary",
    title: "Summary",
    description:
      "Summarize key facts from a case or situation neutrally.",
    type: "Basic",
  },
  {
    id: "email",
    title: "Follow-up Email",
    description:
      "Draft a polite follow-up to reconnect or request updates.",
    type: "Basic",
  },
  {
    id: "statement",
    title: "Statement of Facts",
    description:
      "Summarize key facts from a case or situation neutrally.",
    type: "Legal",
  },
  {
    id: "chronological-summary",
    title: "Chronological Summary",
    description:
      "Organize testimony in timeline format highlighting key dates, events, and temporal relationships between events.",
    type: "Legal",
  },
  {
    id: "page-line-summary",
    title: "Page/Line Summary",
    description:
      "Generate structured format with specific transcript references and brief summaries of testimony segments.",
    type: "Legal",
  },
  {
    id: "issue-based-summary",
    title: "Issue-Based Summary",
    description:
      "Organize testimony by key case issues, categorized under relevant legal claims with cross-references to document exhibits.",
    type: "Legal",
  },
  {
    id: "witness-credibility",
    title: "Witness Credibility Assessment",
    description: "Analyze demeanor observations, inconsistencies with prior statements, and evasive answer patterns.",
    type: "Legal",
  },
  {
    id: "case-theory-support",
    title: "Case Theory Support",
    description:
      "Identify testimony directly supporting key elements of claims/defenses and admissions against interest.",
    type: "Legal",
  },
  {
    id: "document-contradictions",
    title: "Document Contradictions",
    description:
      "Highlight testimony that conflicts with documentary evidence with specific references to document IDs.",
    type: "Legal",
  },
]
