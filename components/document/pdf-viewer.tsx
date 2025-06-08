"use client"

import { useState, useEffect } from "react"
import { X, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  pdfUrl: string
  isOpen: boolean
  onClose: () => void
  documentTitle?: string
  documentContent?: string
}

export function PDFViewer({ pdfUrl, isOpen, onClose, documentTitle, documentContent }: PDFViewerProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 // Simulate a multi-page document

  // Reset scale and rotation when opening a new PDF
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setRotation(0)
      setCurrentPage(1)
    }
  }, [isOpen, pdfUrl])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "+":
          setScale((prev) => Math.min(prev + 0.1, 2))
          break
        case "-":
          setScale((prev) => Math.max(prev - 0.1, 0.5))
          break
        case "r":
          setRotation((prev) => (prev + 90) % 360)
          break
        case "ArrowLeft":
          setCurrentPage((prev) => Math.max(prev - 1, 1))
          break
        case "ArrowRight":
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, totalPages])

  if (!isOpen) return null

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleDownload = () => {
    // In a real implementation, this would download the actual PDF
    // For now, we'll just show an alert
    alert(`Downloading ${documentTitle || "document"}.pdf`)
  }

  // Check if we're displaying the Case Overview document
  const isCaseOverview = documentTitle?.includes("Case Overview")

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black bg-opacity-50 text-white">
        <h2 className="text-lg font-medium truncate">{documentTitle || "Document"}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-white hover:bg-white/20">
            <ZoomIn className="h-5 w-5" />
            <span className="sr-only">Zoom In</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-white hover:bg-white/20">
            <ZoomOut className="h-5 w-5" />
            <span className="sr-only">Zoom Out</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRotate} className="text-white hover:bg-white/20">
            <RotateCw className="h-5 w-5" />
            <span className="sr-only">Rotate</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-white/20">
            <Download className="h-5 w-5" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <div
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
            transition: "transform 0.2s ease",
          }}
          className="h-full max-h-full"
        >
          {isCaseOverview ? (
            <div className="bg-white p-12 shadow-lg max-w-4xl mx-auto">
              <div className="w-[8.5in] min-h-[11in] text-black font-serif">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-1">CASE OVERVIEW AND PROCEDURAL HISTORY</h1>
                  <p className="mb-1">Case No. CV-2023-0142-JRT</p>
                  <p className="mb-1">TechInnovate, Inc. v. GlobalSoft Solutions, LLC</p>
                  <p className="mb-1">United States District Court, Northern District of California</p>
                  <p className="mb-1">Judge: Hon. Julia R. Thompson</p>
                  <p>Filed: March 15, 2023</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">1. INTRODUCTION</h2>
                  <p className="mb-4">
                    The following document presents a chronological summary of evidence in the matter of TechInnovate,
                    Inc. v. GlobalSoft Solutions, LLC. This summary has been prepared based on discovery materials,
                    depositions, and documentary evidence obtained through April 15, 2025.
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">2. PARTIES</h2>
                  <p className="mb-2">
                    <span className="font-bold">2.1 Plaintiff:</span> TechInnovate, Inc. ("TechInnovate") is a Delaware
                    corporation with its principal place of business in San Francisco, California. Founded in 2015,
                    TechInnovate specializes in developing machine learning algorithms and artificial intelligence
                    solutions for the financial services industry. The company has approximately 120 employees and
                    reported annual revenue of $28 million in 2022.
                  </p>
                  <p>
                    <span className="font-bold">2.2 Defendant:</span> GlobalSoft Solutions, LLC ("GlobalSoft") is a
                    Delaware limited liability company with its principal place of business in San Francisco,
                    California. Founded in 2010, GlobalSoft provides data processing and analytics software to financial
                    institutions. The company has approximately 350 employees and reported annual revenue of $75 million
                    in 2022.
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">3. FACTUAL BACKGROUND</h2>
                  <p className="mb-2">
                    <span className="font-bold">3.1 Initial Contact:</span> In January 2022, representatives from
                    GlobalSoft contacted TechInnovate to explore a potential business partnership. The parties discussed
                    the possibility of integrating TechInnovate's machine learning algorithms with GlobalSoft's data
                    processing framework to create a joint financial analytics product.
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">3.2 Non-Disclosure Agreement:</span> On February 3, 2022, the parties
                    executed a Non-Disclosure Agreement (NDA) to protect confidential information that would be shared
                    during partnership discussions. The NDA specifically covered algorithms, source code, data
                    processing methodologies, technical specifications, and implementation details.
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">3.3 Technical Meetings:</span> Between April 5-29, 2022, the parties
                    held a series of technical meetings during which TechInnovate shared detailed information about its
                    proprietary machine learning algorithms, including its ensemble approach combining gradient-boosted
                    decision trees with neural networks and its multi-stage normalization process with adaptive feature
                    selection.
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">3.4 Termination of Discussions:</span> On June 15, 2022, GlobalSoft
                    informed TechInnovate that it had decided not to proceed with the partnership, citing "strategic
                    differences" in approach.
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">3.5 Patent Application:</span> On August 23, 2022, GlobalSoft filed
                    patent application US2022/0157893 for a financial analytics system that TechInnovate alleges
                    contains technical specifications substantially similar to its proprietary algorithms and
                    methodologies.
                  </p>
                  <p>
                    <span className="font-bold">3.6 Product Launch:</span> On November 18, 2022, GlobalSoft announced
                    the launch of "DataSynthAI," a financial analytics product that TechInnovate alleges incorporates
                    its proprietary technology.
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">4. CLAIMS</h2>
                  <p className="mb-2">
                    <span className="font-bold">4.1 Misappropriation of Trade Secrets:</span> TechInnovate alleges that
                    GlobalSoft misappropriated its trade secrets in violation of the Defend Trade Secrets Act, 18 U.S.C.
                    § 1836 et seq., by improperly using confidential information shared under the NDA to develop and
                    commercialize DataSynthAI.
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">4.2 Breach of Contract:</span> TechInnovate alleges that GlobalSoft
                    breached the Non-Disclosure Agreement by using TechInnovate's confidential information for purposes
                    beyond evaluating a potential business relationship.
                  </p>
                  <p>
                    <span className="font-bold">4.3 Patent Infringement:</span> TechInnovate alleges that GlobalSoft's
                    patent application US2022/0157893 infringes on TechInnovate's intellectual property rights.
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">5. PROCEDURAL HISTORY</h2>
                  <p className="italic">[... Full text included in complete document ...]</p>
                </div>

                <div className="mt-12 text-sm border-t pt-4">
                  <p>
                    This document was prepared by the legal team at Blackwell & Associates LLP for internal use and case
                    management purposes. It contains attorney work product and privileged information. Do not distribute
                    without authorization.
                  </p>
                </div>

                {/* Page number */}
                <div className="absolute bottom-8 right-12 text-sm">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0"
              title={documentTitle || "PDF Document"}
            />
          )}
        </div>
      </div>

      {/* Page navigation - only show for Case Overview */}
      {isCaseOverview && (
        <div className="bg-black bg-opacity-50 text-white p-4 flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous Page
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="text-white hover:bg-white/20"
          >
            Next Page
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default PDFViewer
