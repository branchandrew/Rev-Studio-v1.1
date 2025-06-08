"use client"

import React from "react"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Check, ArrowLeft, ChevronLeft, AlertCircle } from "lucide-react"
import { FileTypeIcon } from "@/components/shared/file-type-icons"
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FilePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onFileSelect: (files: File[]) => void
  onFileAdd?: (file: { name: string; type: string; size: string }) => void
}

type FileType = "all" | "document" | "image" | "video"

interface FileItem {
  id: string
  name: string
  type: string
  size: string
  date: string
  url: string
  selected?: boolean
  isFolder?: boolean
  parentId?: string
  specialBehavior?: "fileSizeLimit"
}

interface BreadcrumbPath {
  id: string
  name: string
}

export function FilePickerModal({ isOpen, onClose, onFileSelect, onFileAdd }: FilePickerModalProps) {
  const [activeTab, setActiveTab] = useState<string>("existing")
  const [fileType, setFileType] = useState<FileType>("all")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string>("root")
  const [breadcrumbPath, setBreadcrumbPath] = useState<BreadcrumbPath[]>([{ id: "root", name: "Workspaces" }])

  const isMobile = useIsMobile()
  const FILE_LIMIT = 60

  const [allFiles] = useState<FileItem[]>([
    // Top level folders
    {
      id: "my-files",
      name: "My Files",
      type: "folder",
      size: "",
      date: "05/15/2023",
      url: "",
      isFolder: true,
      parentId: "root",
    },
    {
      id: "my-meetings",
      name: "My Meetings",
      type: "folder",
      size: "",
      date: "05/15/2023",
      url: "",
      isFolder: true,
      parentId: "root",
    },
    {
      id: "shared-with-me",
      name: "Shared with Me",
      type: "folder",
      size: "",
      date: "05/15/2023",
      url: "",
      isFolder: true,
      parentId: "root",
    },

    // My Files subfolders
    {
      id: "folder-1",
      name: "Legal Documents",
      type: "folder",
      size: "",
      date: "03/15/2022",
      url: "",
      isFolder: true,
      parentId: "my-files",
    },
    {
      id: "folder-2",
      name: "Technical Specifications",
      type: "folder",
      size: "",
      date: "02/20/2022",
      url: "",
      isFolder: true,
      parentId: "my-files",
    },
    {
      id: "folder-3",
      name: "Communications",
      type: "folder",
      size: "",
      date: "01/10/2022",
      url: "",
      isFolder: true,
      parentId: "my-files",
    },

    // My Files root level files
    {
      id: "1",
      name: "Expert Analysis and Reports",
      type: "transcript",
      size: "3.7 MB",
      date: "01/30/2023",
      url: "/pdf-document.png",
      selected: false,
      parentId: "my-files",
    },
    // Special file to demonstrate file size limit error
    {
      id: "file-size-limit",
      name: "Use This To Show File Size Limit Error",
      type: "pdf",
      size: "25.8 MB",
      date: "06/01/2023",
      url: "/pdf-document.png",
      selected: false,
      parentId: "my-files",
      specialBehavior: "fileSizeLimit",
    },

    // Files in Legal Documents folder
    {
      id: "2",
      name: "Legal Agreements and Contracts",
      type: "humanTranscript",
      size: "1.8 MB",
      date: "02/03/2022",
      url: "/pdf-document.png",
      selected: false,
      parentId: "folder-1",
    },
    {
      id: "4",
      name: "Witness Testimonies and Depositions",
      type: "captions",
      size: "45.6 MB",
      date: "12/05/2022",
      url: "/video-production-setup.png",
      selected: false,
      parentId: "folder-1",
    },

    // Files in Technical Specifications folder
    {
      id: "5",
      name: "Technical Specifications and Documentation",
      type: "transcript",
      size: "2.4 MB",
      date: "03/18/2022",
      url: "/pdf-document.png",
      selected: false,
      parentId: "folder-2",
    },
    {
      id: "7",
      name: "Product Roadmap 2022-2023",
      type: "humanCaptions",
      size: "5.2 MB",
      date: "05/20/2022",
      url: "/dynamic-presentation.png",
      selected: false,
      parentId: "folder-2",
    },

    // Files in Communications folder
    {
      id: "3",
      name: "TechInnovate-GlobalSoft Communications",
      type: "transcript",
      size: "1.2 MB",
      date: "01/12/2022",
      url: "/word-art.png",
      selected: false,
      parentId: "folder-3",
    },
    {
      id: "6",
      name: "Meeting Minutes - Q1 Review",
      type: "humanTranscript",
      size: "0.9 MB",
      date: "04/15/2022",
      url: "/word-art.png",
      selected: false,
      parentId: "folder-3",
    },
    {
      id: "8",
      name: "Customer Testimonial - Johnson Inc",
      type: "captions",
      size: "78.3 MB",
      date: "06/12/2022",
      url: "/video-production-setup.png",
      selected: false,
      parentId: "folder-3",
    },

    // My Meetings files (transcription style documents)
    {
      id: "meeting-1",
      name: "Deposition - John Smith vs Acme Corp",
      type: "transcript",
      size: "2.3 MB",
      date: "04/12/2023",
      url: "/word-art.png",
      selected: false,
      parentId: "my-meetings",
    },
    {
      id: "meeting-2",
      name: "Witness Testimony - Jane Doe",
      type: "transcript",
      size: "3.1 MB",
      date: "04/15/2023",
      url: "/pdf-document.png",
      selected: false,
      parentId: "my-meetings",
    },
    {
      id: "meeting-3",
      name: "Court Hearing Transcript - Case #45678",
      type: "transcript",
      size: "1.8 MB",
      date: "04/18/2023",
      url: "/word-art.png",
      selected: false,
      parentId: "my-meetings",
    },
    {
      id: "meeting-4",
      name: "Expert Witness Interview - Dr. Robert Johnson",
      type: "transcript",
      size: "156.2 MB",
      date: "04/20/2023",
      url: "/video-production-setup.png",
      selected: false,
      parentId: "my-meetings",
    },

    // Shared with Me files
    {
      id: "shared-1",
      name: "Project Proposal - Q3 2023",
      type: "humanCaptions",
      size: "4.5 MB",
      date: "05/01/2023",
      url: "/dynamic-presentation.png",
      selected: false,
      parentId: "shared-with-me",
    },
    {
      id: "shared-2",
      name: "Budget Analysis - FY 2023",
      type: "transcript",
      size: "1.2 MB",
      date: "05/05/2023",
      url: "/excel-spreadsheet.png",
      selected: false,
      parentId: "shared-with-me",
    },
    {
      id: "shared-3",
      name: "Marketing Strategy - New Product Launch",
      type: "humanTranscript",
      size: "2.8 MB",
      date: "05/10/2023",
      url: "/pdf-document.png",
      selected: false,
      parentId: "shared-with-me",
    },
  ])

  const [existingFiles, setExistingFiles] = useState<FileItem[]>(allFiles)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentFolderItems = existingFiles.filter((item) => item.parentId === currentFolderId)
  const filteredExistingFiles = currentFolderItems

  const handleExistingFileSelect = (id: string) => {
    setExistingFiles((prev) => prev.map((file) => (file.id === id ? { ...file, selected: !file.selected } : file)))
  }

  const handleFolderSelect = (folderId: string) => {
    const folder = existingFiles.find((item) => item.id === folderId && item.isFolder)
    if (!folder) return

    const filesInFolder = allFiles.filter((file) => !file.isFolder && file.parentId === folderId)
    const allFilesSelected = filesInFolder.every((file) => existingFiles.find((ef) => ef.id === file.id)?.selected)

    setExistingFiles((prev) =>
      prev.map((file) => {
        if (!file.isFolder && file.parentId === folderId) {
          return { ...file, selected: !allFilesSelected }
        }
        return file
      }),
    )
  }

  const isFolderSelected = (folderId: string) => {
    const filesInFolder = allFiles.filter((file) => !file.isFolder && file.parentId === folderId)
    if (filesInFolder.length === 0) return false
    return filesInFolder.every((file) => existingFiles.find((ef) => ef.id === file.id)?.selected)
  }

  const handleFolderClick = (folder: FileItem) => {
    setCurrentFolderId(folder.id)
    setBreadcrumbPath((prev) => [...prev, { id: folder.id, name: folder.name }])
  }

  const handleBreadcrumbClick = (pathItem: BreadcrumbPath, index: number) => {
    setCurrentFolderId(pathItem.id)
    setBreadcrumbPath((prev) => prev.slice(0, index + 1))
  }

  const handleBackClick = () => {
    if (breadcrumbPath.length > 1) {
      const newPath = breadcrumbPath.slice(0, -1)
      setBreadcrumbPath(newPath)
      setCurrentFolderId(newPath[newPath.length - 1].id)
    }
  }

  const handleAddFiles = () => {
    const selectedExistingFiles = existingFiles.filter((file) => file.selected)
    console.log("Selected existing files:", selectedExistingFiles)
    onClose()
  }

  const getSelectedCount = () => {
    // Check if the special file is selected
    const hasFileSizeLimitFile = existingFiles.some((file) => file.specialBehavior === "fileSizeLimit" && file.selected)

    if (hasFileSizeLimitFile) {
      return 100 // Return 100 when the special file is selected
    }

    return existingFiles.filter((file) => file.selected).length
  }

  const isExceedingFileLimit = () => {
    return getSelectedCount() > FILE_LIMIT
  }

  const canGoBack = breadcrumbPath.length > 1
  const currentFolderName = breadcrumbPath[breadcrumbPath.length - 1]?.name || "Workspaces"

  const handleSelectAllInCurrentFolder = () => {
    const currentFolderFiles = existingFiles.filter((file) => file.parentId === currentFolderId && !file.isFolder)
    const allSelected = currentFolderFiles.every((file) => file.selected)

    setExistingFiles((prev) =>
      prev.map((file) => {
        if (file.parentId === currentFolderId && !file.isFolder) {
          return { ...file, selected: !allSelected }
        }
        return file
      }),
    )
  }

  const areAllFilesInCurrentFolderSelected = () => {
    const currentFolderFiles = existingFiles.filter((file) => file.parentId === currentFolderId && !file.isFolder)
    return currentFolderFiles.length > 0 && currentFolderFiles.every((file) => file.selected)
  }

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={onClose}>
          <DrawerContent className="h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                {canGoBack && (
                  <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-2">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                  </Button>
                )}
                <div>
                  <h2 className="text-lg font-semibold">{currentFolderName}</h2>
                </div>
              </div>

              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  aria-label="Rev Mark"
                  data-name="rev-mark"
                >
                  <path
                    d="M27.0694 23.974H32.5876C32.5618 22.3088 32.0437 20.6884 31.0987 19.3164C30.1536 17.9443 28.8237 16.8818 27.2759 16.2624C25.7281 15.643 24.0316 15.4943 22.3994 15.8349C20.7673 16.1756 19.2723 16.9903 18.1024 18.177C16.9325 19.3636 16.1398 20.8691 15.8239 22.5044C15.508 24.1395 15.683 25.8316 16.327 27.3677C16.9709 28.9039 18.0549 30.2158 19.443 31.1385C20.8311 32.0612 22.4613 32.5536 24.1287 32.5538H45.6962C45.2687 33.6315 44.761 34.6755 44.1763 35.677H24.1287C21.837 35.677 19.5967 34.9983 17.6912 33.7266C15.7858 32.455 14.3006 30.6476 13.4235 28.5329C12.5464 26.4182 12.3169 24.0913 12.7639 21.8464C13.2109 19.6014 14.3143 17.5392 15.9348 15.9206C17.5551 14.302 19.6196 13.1997 21.8673 12.7529C24.1149 12.3062 26.4446 12.5353 28.562 13.411C30.6793 14.2868 32.4891 15.7699 33.7624 17.673C35.0359 19.576 35.7157 21.8135 35.7159 24.1023H41.2249C41.2253 20.7232 40.2221 17.4198 38.3424 14.6102C36.4628 11.8004 33.7911 9.61059 30.6653 8.3176C27.5395 7.02462 24.1 6.68659 20.7818 7.34624C17.4636 8.0059 14.4159 9.63363 12.024 12.0236C9.63209 14.4135 8.00359 17.4581 7.34441 20.7725C6.6852 24.087 7.02497 27.5223 8.32072 30.6438C9.61647 33.7654 11.8099 36.4329 14.6238 38.3092C17.4376 40.1853 20.7454 41.1862 24.1287 41.1847H39.7298C35.6787 44.8778 30.4547 47.0274 24.9747 47.2566C19.4948 47.4854 14.1093 45.7791 9.76358 42.4368C5.41795 39.0946 2.38994 34.3302 1.21124 28.9801C0.0325382 23.63 0.778471 18.0362 3.31807 13.1808C5.85768 8.32527 10.0286 4.51851 15.0986 2.42885C20.1686 0.339164 25.8136 0.100124 31.0424 1.75368C36.2714 3.40725 40.75 6.84772 43.6918 11.4711C46.6339 16.0944 47.8511 21.6051 47.1301 27.0356H24.1287C23.5522 27.0359 22.9884 26.867 22.5071 26.5499C22.026 26.2328 21.6487 25.7814 21.4222 25.252C21.1956 24.7227 21.1298 24.1383 21.2328 23.5719C21.3358 23.0054 21.6033 22.4817 22.0018 22.0656C22.4003 21.6496 22.9124 21.3597 23.4745 21.2319C24.0366 21.1042 24.6239 21.144 25.1635 21.3468C25.7029 21.5495 26.171 21.9062 26.5094 22.3722C26.8478 22.8384 27.0416 23.3936 27.0668 23.9688L27.0694 23.974Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 overflow-auto px-4 pt-2">
              <div className="flex-1 overflow-auto">
                {filteredExistingFiles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-4"
                    >
                      <path
                        d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9M13 2L20 9M13 2V9H20"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="text-lg font-medium">No files found</h3>
                    <p className="text-sm text-muted-foreground mt-1">This folder is empty.</p>
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="w-8 px-2 py-2 text-left">
                            <div className="relative checkbox-area">
                              <div
                                className={`h-4 w-4 rounded-sm border ${
                                  areAllFilesInCurrentFolderSelected()
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "bg-background border-muted-foreground"
                                } flex items-center justify-center cursor-pointer`}
                                onClick={handleSelectAllInCurrentFolder}
                              >
                                {areAllFilesInCurrentFolderSelected() && <Check className="h-3 w-3" />}
                              </div>
                            </div>
                          </th>
                          <th className="px-2 py-2 text-left font-medium text-xs text-muted-foreground">Name</th>
                          <th className="w-16 px-2 py-2 text-left font-medium text-xs text-muted-foreground">Size</th>
                          <th className="w-20 px-2 py-2 text-left font-medium text-xs text-muted-foreground">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredExistingFiles.map((file) => (
                          <tr
                            key={file.id}
                            className={`border-b hover:bg-accent/50 cursor-pointer ${
                              file.isFolder && isFolderSelected(file.id)
                                ? "bg-primary/5"
                                : file.selected
                                  ? "bg-primary/5"
                                  : ""
                            }`}
                            onClick={(e) => {
                              if (file.isFolder) {
                                if (!e.target.closest(".checkbox-area")) {
                                  handleFolderClick(file)
                                }
                              } else {
                                handleExistingFileSelect(file.id)
                              }
                            }}
                          >
                            <td className="px-2 py-3">
                              <div className="relative checkbox-area">
                                <div
                                  className={`h-4 w-4 rounded-sm border ${
                                    file.isFolder
                                      ? isFolderSelected(file.id)
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "bg-background border-muted-foreground"
                                      : file.selected
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "bg-background border-muted-foreground"
                                  } flex items-center justify-center`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (file.isFolder) {
                                      handleFolderSelect(file.id)
                                    } else {
                                      handleExistingFileSelect(file.id)
                                    }
                                  }}
                                >
                                  {((file.isFolder && isFolderSelected(file.id)) ||
                                    (!file.isFolder && file.selected)) && <Check className="h-3 w-3" />}
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-3">
                              <div className="flex items-center gap-2">
                                {file.isFolder ? (
                                  <FileTypeIcon type="folder" size="sm" />
                                ) : (
                                  <FileTypeIcon type={file.type as any} size="sm" />
                                )}
                                <span className="font-medium text-sm truncate">{file.name}</span>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-xs text-muted-foreground">{file.size}</td>
                            <td className="px-2 py-3 text-xs text-muted-foreground">{file.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <DrawerFooter className="flex flex-row items-center justify-between px-4">
              <div className="text-sm flex items-center">
                <span className={isExceedingFileLimit() ? "text-destructive" : "text-muted-foreground"}>
                  {getSelectedCount()} file{getSelectedCount() !== 1 ? "s" : ""} selected
                </span>
                {isExceedingFileLimit() && (
                  <div className="flex items-center ml-2 text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">Exceeds limit of {FILE_LIMIT} files</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className={getSelectedCount() === 0 || isExceedingFileLimit() ? "cursor-not-allowed" : ""}
                        aria-disabled={getSelectedCount() === 0 || isExceedingFileLimit()}
                      >
                        <Button
                          onClick={handleAddFiles}
                          disabled={getSelectedCount() === 0 || isExceedingFileLimit()}
                          className="pointer-events-auto"
                        >
                          Add selected
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {(getSelectedCount() === 0 || isExceedingFileLimit()) && (
                      <TooltipContent>
                        <p>
                          {isExceedingFileLimit()
                            ? `Cannot add more than ${FILE_LIMIT} files at once`
                            : "Please select at least one file"}
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[800px] sm:max-h-[80vh] h-[60vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Add files</DialogTitle>
              <DialogDescription>Select existing files from Rev.</DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 my-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbPath.map((pathItem, index) => (
                      <React.Fragment key={pathItem.id}>
                        {index === breadcrumbPath.length - 1 ? (
                          <BreadcrumbItem>
                            <BreadcrumbPage>{pathItem.name}</BreadcrumbPage>
                          </BreadcrumbItem>
                        ) : (
                          <BreadcrumbItem>
                            <BreadcrumbLink
                              onClick={() => handleBreadcrumbClick(pathItem, index)}
                              className="cursor-pointer flex items-center gap-1"
                            >
                              {index === 0 && breadcrumbPath.length > 1 && pathItem.id !== "root" && (
                                <ArrowLeft className="h-3 w-3" />
                              )}
                              {pathItem.name}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        )}
                        {index < breadcrumbPath.length - 1 && <BreadcrumbSeparator />}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="flex-1 overflow-auto">
                {filteredExistingFiles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-4"
                    >
                      <path
                        d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9M13 2L20 9M13 2V9H20"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="text-lg font-medium">No files found</h3>
                    <p className="text-sm text-muted-foreground mt-1">This folder is empty.</p>
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="w-8 px-2 py-2 text-left">
                            <div className="relative checkbox-area">
                              <div
                                className={`h-4 w-4 rounded-sm border ${
                                  areAllFilesInCurrentFolderSelected()
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "bg-background border-muted-foreground"
                                } flex items-center justify-center cursor-pointer`}
                                onClick={handleSelectAllInCurrentFolder}
                              >
                                {areAllFilesInCurrentFolderSelected() && <Check className="h-3 w-3" />}
                              </div>
                            </div>
                          </th>
                          <th className="px-2 py-2 text-left font-medium text-xs text-muted-foreground">Name</th>
                          <th className="w-16 px-2 py-2 text-left font-medium text-xs text-muted-foreground">Size</th>
                          <th className="w-20 px-2 py-2 text-left font-medium text-xs text-muted-foreground">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredExistingFiles.map((file) => (
                          <tr
                            key={file.id}
                            className={`border-b hover:bg-accent/50 cursor-pointer ${
                              file.isFolder && isFolderSelected(file.id)
                                ? "bg-primary/5"
                                : file.selected
                                  ? "bg-primary/5"
                                  : ""
                            }`}
                            onClick={(e) => {
                              if (file.isFolder) {
                                if (!e.target.closest(".checkbox-area")) {
                                  handleFolderClick(file)
                                }
                              } else {
                                handleExistingFileSelect(file.id)
                              }
                            }}
                          >
                            <td className="px-2 py-3">
                              <div className="relative checkbox-area">
                                <div
                                  className={`h-4 w-4 rounded-sm border ${
                                    file.isFolder
                                      ? isFolderSelected(file.id)
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "bg-background border-muted-foreground"
                                      : file.selected
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "bg-background border-muted-foreground"
                                  } flex items-center justify-center`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (file.isFolder) {
                                      handleFolderSelect(file.id)
                                    } else {
                                      handleExistingFileSelect(file.id)
                                    }
                                  }}
                                >
                                  {((file.isFolder && isFolderSelected(file.id)) ||
                                    (!file.isFolder && file.selected)) && <Check className="h-3 w-3" />}
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-3">
                              <div className="flex items-center gap-2">
                                {file.isFolder ? (
                                  <FileTypeIcon type="folder" size="sm" />
                                ) : (
                                  <FileTypeIcon type={file.type as any} size="sm" />
                                )}
                                <span className="font-medium text-sm truncate">{file.name}</span>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-xs text-muted-foreground">{file.size}</td>
                            <td className="px-2 py-3 text-xs text-muted-foreground">{file.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between">
              <div className="text-sm flex items-center">
                <span className={isExceedingFileLimit() ? "text-destructive" : "text-muted-foreground"}>
                  {getSelectedCount()} file{getSelectedCount() !== 1 ? "s" : ""} selected
                </span>
                {isExceedingFileLimit() && (
                  <div className="flex items-center ml-2 text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">Exceeds limit of {FILE_LIMIT} files</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className={getSelectedCount() === 0 || isExceedingFileLimit() ? "cursor-not-allowed" : ""}
                        aria-disabled={getSelectedCount() === 0 || isExceedingFileLimit()}
                      >
                        <Button
                          onClick={handleAddFiles}
                          disabled={getSelectedCount() === 0 || isExceedingFileLimit()}
                          className="pointer-events-auto"
                        >
                          Add selected
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {(getSelectedCount() === 0 || isExceedingFileLimit()) && (
                      <TooltipContent>
                        <p>
                          {isExceedingFileLimit()
                            ? `Cannot add more than ${FILE_LIMIT} files at once`
                            : "Please select at least one file"}
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
