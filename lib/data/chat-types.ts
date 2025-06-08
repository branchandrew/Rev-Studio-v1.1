// Chat message type
export type Message = {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

// Function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9)
}

// Function to generate AI responses based on input
export const generateAIResponse = (input: string): string => {
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
