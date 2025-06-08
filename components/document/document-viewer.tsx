"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DocumentHeader } from "@/components/document/document-header"

interface SourceReference {
  document: string
  paragraph: string
  wordCount: number
  page?: string
  lines?: string
}

interface DocumentContent {
  title?: string
  subtitle?: string
  disclaimer?: string
  introduction?: {
    text: string
    source?: SourceReference | null
  }
  sections?: Array<{
    title: string
    content?: string
    source?: SourceReference
    subsections?: Array<{
      title?: string
      content: string
      source?: SourceReference
    }>
    bulletPoints?: Array<{
      title?: string
      content: string
      citation?: string
    }>
    tableRows?: Array<{
      time: string
      description: string
    }>
    examSections?: Array<{
      title: string
      content: string
    }>
    topicSummaries?: Array<{
      topic: string
      summary: string
      citation: string
    }>
    transcriptItems?: Array<{
      citation: string
      text: string
      summary: string
    }>
  }>
  chronology?: Array<{
    date: string
    text: string
    source?: SourceReference
  }>
  conclusion?: {
    text: string
    source?: SourceReference | null
  }
  signature?: {
    name: string
    firm: string
    date: string
  }
}

interface DocumentViewerProps {
  content: DocumentContent
  onSourceClick: (doc: string, para: string, words: number) => void
  isVisible?: boolean
  className?: string
  useSimpleTooltip?: boolean
  hideTitle?: boolean
  isLoading?: boolean
  onClose?: () => void
}

export function DocumentViewer({
  content,
  onSourceClick,
  isVisible = true,
  className = "",
  useSimpleTooltip = false,
  hideTitle = false,
  onClose,
}: DocumentViewerProps) {
  // Function to handle citation clicks
  const handleCitationClick = (source: SourceReference) => {
    // Add console log for debugging
    console.log("Citation clicked:", source)
    onSourceClick(source.document, source.paragraph, source.wordCount)
  }

  // Update the CitationButton component to use the Button component:
  const CitationButton = ({ source }: { source: SourceReference }) => {
    const tooltipContent = (
      <div className="text-xs">
        <p>Click to view source document</p>
        <p className="text-muted-foreground mt-1">
          {source.document} {source.paragraph && `¶${source.paragraph}`}
        </p>
      </div>
    )

    // Format citation text based on document type
    const formatCitation = () => {
      if (source.document.includes("Depo")) {
        if (source.page && source.lines) {
          return `(${source.document} ${source.page}:${source.lines})`
        }
        return `(${source.document} ${source.paragraph})`
      }
      return `("${source.document}", p. ${source.paragraph}, ${source.wordCount} l)`
    }

    return (
      <Button
        variant="link"
        size="sm"
        className="h-auto p-0 text-primary font-normal hover:text-primary/80"
        onClick={() => handleCitationClick(source)}
      >
        {formatCitation()}
      </Button>
    )
  }

  // Update the CitationText component:
  const CitationText = ({ citation }: { citation: string }) => {
    // Parse the citation to extract document name, page, and lines
    const parseCitation = (citationText: string) => {
      // Check if it's a Trump deposition citation format
      if (citationText.includes("Trump") && citationText.includes("Depo")) {
        // Extract page and line numbers if available
        const pageLineMatch = citationText.match(/(\d+):(\d+)\s*-\s*(\d+):(\d+)/)
        const singleLineMatch = citationText.match(/(\d+):(\d+)/)

        if (pageLineMatch) {
          return {
            document: "Donald J. Trump, Sr. Deposition",
            paragraph: `${pageLineMatch[1]}:${pageLineMatch[2]}-${pageLineMatch[3]}:${pageLineMatch[4]}`,
            wordCount: 100,
            page: pageLineMatch[1],
            lines: `${pageLineMatch[2]} - ${pageLineMatch[4]}`,
          }
        } else if (singleLineMatch) {
          return {
            document: "Donald J. Trump, Sr. Deposition",
            paragraph: `${singleLineMatch[1]}:${singleLineMatch[2]}`,
            wordCount: 100,
            page: singleLineMatch[1],
            lines: singleLineMatch[2],
          }
        }

        // If no page/line format, just use the document name
        return {
          document: "Donald J. Trump, Sr. Deposition",
          paragraph: "1",
          wordCount: 100,
        }
      }

      // Default case for other citation formats
      return null
    }

    const sourceRef = parseCitation(citation)

    if (sourceRef) {
      return (
        <Button
          variant="link"
          className="h-auto p-0 text-primary font-normal ml-2 hover:text-primary/80"
          onClick={() => handleCitationClick(sourceRef)}
        >
          ({citation})
        </Button>
      )
    }

    // If not a recognized citation format, just display as text
    return <span className="text-muted-foreground ml-2">({citation})</span>
  }

  // If content is undefined or null, return an empty div
  if (!content) {
    return (
      <div
        className={cn(
          "transition-all duration-300 h-full",
          className,
          !isVisible ? "opacity-0 pointer-events-none absolute inset-0" : "",
        )}
      />
    )
  }

  // Function to render content with line breaks preserved
  const renderContent = (text: string) => {
    // Safety check to ensure text is a string
    if (typeof text !== "string" || !text) {
      return <span>{text || ""}</span>
    }

    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div
      className={cn(
        "transition-all duration-300 h-full overflow-auto w-full",
        className,
        !isVisible ? "opacity-0 pointer-events-none absolute inset-0" : "",
      )}
      id="document_viewer"
      data-view-type="document"
    >
      <div className="max-w-[800px]">
        <DocumentHeader title={content.title} showTitle={!hideTitle && !!content.title} onClose={onClose} />
        <div className="space-y-6 text-sm">
          {!hideTitle && content.title && (
            <div className="pb-4">
              <h1 className="text-xl font-bold">{content.title}</h1>
              {content.subtitle && <p className="text-sm mt-1">{content.subtitle}</p>}
            </div>
          )}

          {content.introduction && (
            <div className="pb-4">
              <p>{content.introduction.text}</p>
              {content.introduction.source && <CitationButton source={content.introduction.source} />}
            </div>
          )}

          {content.sections && content.sections.length > 0 && (
            <div className="space-y-6">
              {content.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h2 className="font-semibold text-base pb-1">{section.title}</h2>

                  {/* Regular content */}
                  {section.content && <div className="whitespace-pre-line">{renderContent(section.content)}</div>}

                  {/* Subsections */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-4 pl-1">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="space-y-1">
                          {subsection.title && <h3 className="font-medium text-sm">{subsection.title}</h3>}
                          <p>{subsection.content}</p>
                          {subsection.source && <CitationButton source={subsection.source} />}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bullet Points */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <div className="space-y-3 pl-1">
                      {section.bulletPoints.map((bullet, bulletIndex) => (
                        <div key={bulletIndex} className="flex">
                          <div className="mr-2 mt-1.5">•</div>
                          <div className="space-y-1">
                            {bullet.title && <span className="font-medium">{bullet.title} </span>}
                            <span>{bullet.content}</span>
                            {bullet.citation && <CitationText citation={bullet.citation} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Table Rows */}
                  {section.tableRows && section.tableRows.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Time</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {section.tableRows.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            <TableCell className="font-mono text-xs">{row.time}</TableCell>
                            <TableCell>{row.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}

                  {/* Topic Summaries */}
                  {section.topicSummaries && section.topicSummaries.length > 0 && (
                    <div className="space-y-3">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/3">Topic</TableHead>
                            <TableHead className="w-1/2">Summary</TableHead>
                            <TableHead className="w-1/6">Citation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {section.topicSummaries.map((topic, topicIndex) => (
                            <TableRow key={topicIndex}>
                              <TableCell className="font-medium">{topic.topic}</TableCell>
                              <TableCell>{topic.summary}</TableCell>
                              <TableCell className="font-mono text-xs">{topic.citation}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Transcript Items */}
                  {section.transcriptItems && section.transcriptItems.length > 0 && (
                    <div className="space-y-4">
                      {section.transcriptItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-2">
                          <div className="font-mono text-xs text-muted-foreground">{item.citation}</div>
                          <pre className="whitespace-pre-wrap font-mono text-xs bg-gray-50 p-3 rounded-md">
                            {item.text}
                          </pre>
                          {item.summary && <p className="text-sm italic">{item.summary}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.source && <CitationButton source={section.source} />}
                </div>
              ))}
            </div>
          )}

          {content.chronology && content.chronology.length > 0 && (
            <div className="space-y-4 mt-4">
              <h2 className="font-semibold text-base pb-1">CHRONOLOGY</h2>
              {content.chronology.map((event, index) => (
                <div key={index}>
                  <p className="font-medium">{event.date}</p>
                  <p>
                    {event.text}
                    {event.source && <CitationButton source={event.source} />}
                  </p>
                </div>
              ))}
            </div>
          )}

          {content.conclusion && content.conclusion.text && (
            <div className="pt-4">
              <h2 className="font-semibold text-base pb-1">CONCLUSION</h2>
              <p className="mt-2">
                {content.conclusion.text}
                {content.conclusion.source && <CitationButton source={content.conclusion.source} />}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentViewer
