"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Home,
  ChevronDown,
  ChevronRight,
  Search,
  MoreHorizontal,
  Sparkles,
  Clock,
  Users,
  Plus,
  Trash2,
  FolderInput,
  Calendar,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarItem, SidebarSubItem } from "@/components/files/sidebar-item"
import { FileTypeIcon, type FileType } from "@/components/shared/file-type-icons"

interface FileItem {
  id: string
  name: string
  type: "doc" | "pdf" | "txt" | "docx"
  dateCreated: string
  length?: string
  owner: string
}

export default function FilesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Check if the URL has the processing=true parameter
    const processingParam = searchParams.get("processing")
    setIsProcessing(processingParam === "true")
  }, [searchParams])

  const files: FileItem[] = [
    {
      id: "case-file-1",
      name: "Case file 1",
      type: "pdf",
      dateCreated: "2 days ago",
      length: "1.2 MB",
      owner: "Bartholomew Branch",
    },
    {
      id: "case-document",
      name: "Case document",
      type: "doc",
      dateCreated: "2 days ago",
      length: "1.1 MB",
      owner: "Bartholomew Branch",
    },
    {
      id: "legal-notes",
      name: "Legal Notes",
      type: "txt",
      dateCreated: "2 days ago",
      length: "0.8 MB",
      owner: "Bartholomew Branch",
    },
    {
      id: "legal-transcription",
      name: "Legal transcription",
      type: "txt",
      dateCreated: "2 days ago",
      length: "0.9 MB",
      owner: "Bartholomew Branch",
    },
  ]

  const toggleSelectFile = (id: string) => {
    setSelectedFiles((prev) => (prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(files.map((file) => file.id))
    }
  }

  const navigateToStudio = () => {
    const variant = searchParams.get("variant")
    if (variant) {
      router.push("/?mode=MODE_DISCOVERY")
    } else {
      router.push("/")
    }
  }

  const getFileIcon = (type: string) => {
    const typeMap: Record<string, FileType> = {
      doc: "word",
      pdf: "pdf",
      txt: "textUpload",
      docx: "word",
    }

    const fileType = typeMap[type] || "textUpload"
    return (
      <div className="h-6 w-6 flex items-center justify-center">
        <FileTypeIcon type={fileType} className="[&_svg]:w-[60%] [&_svg]:h-full" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Header - now spans the entire width */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-4 z-10">
        <div className="flex items-center">
          <div className="flex items-center justify-center">
            <svg
              width="103"
              height="26"
              viewBox="0 0 103 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-auto"
              aria-label="Rev Studio Logo"
            >
              <path
                d="M38.3914 24.2588V2.26409H44.6826V5.6841C44.6826 5.6841 47.2061 3.06065 49.7239 2.31493C51.8465 1.68644 55.3439 2.04376 56.7014 2.51337C56.0321 3.31547 55.408 4.15405 54.8316 5.02523C54.222 5.92844 53.6976 6.88605 53.2646 7.88597C51.7689 7.89372 50.1397 8.10486 48.8465 8.80399C47.2937 9.64292 45.4133 11.6287 45.4133 11.6287V24.2552L38.3914 24.2588Z"
                fill="black"
              />
              <path
                d="M66.9468 24.7133C64.9706 24.7133 63.1839 24.4082 61.6479 23.8057C60.1124 23.2034 58.8303 22.3857 57.8092 21.3652C56.7946 20.358 55.9966 19.1541 55.4641 17.8273C54.9267 16.4838 54.653 15.0493 54.658 13.6023C54.658 11.4838 55.1316 9.51281 56.0649 7.74736C56.99 5.99886 58.3723 4.56958 60.1731 3.5103C61.9733 2.45104 64.257 1.90234 66.949 1.90234C69.6415 1.90234 71.9198 2.43833 73.7255 3.49547C75.5312 4.55261 76.9091 5.95227 77.8328 7.66188C78.764 9.38638 79.2361 11.2924 79.2361 13.3261C79.2361 13.7456 79.215 14.1792 79.1717 14.6142C79.1549 14.7879 79.1371 14.9543 79.1176 15.1135H62.1585L62.2234 15.987C62.2938 16.9573 62.5938 17.7708 63.1081 18.4043C63.6062 19.0184 64.2614 19.4856 65.0047 19.7559C65.7135 20.0185 66.4633 20.1527 67.2197 20.1521C68.2176 20.1521 69.1754 19.9402 70.5814 18.7849L78.0791 18.7934C76.9941 20.4176 76.3281 21.2149 75.679 21.7707C74.6205 22.6731 73.3497 23.3948 71.9036 23.923C70.4574 24.4512 68.7828 24.7133 66.9468 24.7133ZM66.8109 6.41832C65.9582 6.41832 65.184 6.59203 64.5104 6.93383C63.838 7.27128 63.2635 7.77558 62.8412 8.39844C62.4178 9.01637 62.153 9.76913 62.0469 10.6363L61.9354 11.548H71.6876L71.5755 10.6363C71.4688 9.77053 71.2019 9.01708 70.7812 8.39844C70.3595 7.77628 69.785 7.27237 69.1136 6.93458C68.4358 6.59203 67.6642 6.41832 66.8109 6.41832Z"
                fill="black"
              />
              <path
                d="M86.3776 24.2587L78.8799 2.26416H85.991L90.8871 19.0479L95.8341 2.26416H102.129L94.6316 24.2587H86.3776Z"
                fill="black"
              />
              <path
                d="M16.2364 13.1249H19.2059C19.192 12.2273 18.9132 11.3539 18.4047 10.6143C17.8961 9.87471 17.1804 9.30201 16.3475 8.96812C15.5145 8.63424 14.6016 8.55407 13.7232 8.7377C12.8449 8.92132 12.0404 9.3605 11.4108 10.0002C10.7813 10.6398 10.3547 11.4513 10.1847 12.3327C10.0147 13.2141 10.1089 14.1262 10.4554 14.9542C10.8019 15.7823 11.3853 16.4894 12.1322 16.9868C12.8793 17.4842 13.7565 17.7496 14.6538 17.7497H26.2602C26.0302 18.3306 25.7569 18.8934 25.4423 19.4332H14.6538C13.4206 19.4332 12.215 19.0673 11.1896 18.3819C10.1642 17.6964 9.3649 16.7222 8.89294 15.5823C8.42093 14.4424 8.29743 13.1881 8.53798 11.9781C8.77854 10.768 9.37232 9.65636 10.2443 8.7839C11.1163 7.91138 12.2273 7.31723 13.4369 7.07641C14.6464 6.83563 15.9001 6.95908 17.0396 7.43114C18.179 7.90321 19.1529 8.70265 19.8382 9.72846C20.5234 10.7543 20.8893 11.9603 20.8894 13.1941H23.854C23.8542 11.3726 23.3144 9.59201 22.3028 8.07751C21.2913 6.56296 19.8536 5.3826 18.1715 4.68564C16.4893 3.98868 14.6384 3.80647 12.8527 4.16204C11.0671 4.51762 9.42695 5.39501 8.13982 6.68326C6.85261 7.97151 5.97624 9.61265 5.62151 11.3992C5.26676 13.1858 5.4496 15.0376 6.1469 16.7201C6.8442 18.4028 8.0246 19.8407 9.53886 20.852C11.0531 21.8633 12.8331 22.4028 14.6538 22.402H23.0495C20.8694 24.3927 18.0581 25.5514 15.1091 25.675C12.1601 25.7983 9.26198 24.8786 6.92337 23.0769C4.5848 21.2754 2.95531 18.7072 2.321 15.8233C1.68669 12.9395 2.0881 9.92427 3.45477 7.30705C4.82144 4.68977 7.06599 2.63781 9.79436 1.51141C12.5227 0.385011 15.5606 0.256161 18.3744 1.14748C21.1883 2.0388 23.5985 3.89332 25.1815 6.38546C26.7648 8.87756 27.4199 11.848 27.0319 14.7752H14.6538C14.3436 14.7754 14.0402 14.6843 13.7812 14.5134C13.5223 14.3425 13.3193 14.0992 13.1973 13.8138C13.0754 13.5285 13.04 13.2135 13.0954 12.9082C13.1509 12.6028 13.2948 12.3205 13.5093 12.0962C13.7237 11.872 13.9993 11.7157 14.3018 11.6468C14.6043 11.578 14.9203 11.5995 15.2107 11.7088C15.501 11.818 15.7529 12.0103 15.935 12.2615C16.1171 12.5128 16.2214 12.8121 16.235 13.1221L16.2364 13.1249Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative w-[400px]">
            <Input placeholder="Search" className="pl-10 border-border bg-background rounded-md" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 text-foreground font-medium">
            <span>Hi Bartholomew</span>
            <ChevronRight size={16} className="text-primary" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-accent">
              Record
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
        </div>
      </header>

      <div className="flex w-full pt-16">
        {/* Sidebar */}
        <div className="w-[260px] bg-muted border-r border-border flex flex-col h-[calc(100vh-64px)]">
          <nav className="p-2 space-y-1">
            <SidebarItem icon={<Home size={18} />} label="Home" />

            <div>
              <div className="flex items-center justify-between text-foreground hover:bg-accent rounded-md p-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span className="text-sm font-medium">Workspaces</span>
                </div>
                <ChevronDown size={16} />
              </div>

              <div className="ml-8 mt-1 space-y-1">
                <SidebarSubItem label="My files" active />
                <SidebarSubItem label="My meetings" />
                <SidebarSubItem label="Shared with me" />
              </div>
            </div>

            <SidebarItem icon={<Calendar size={18} />} label="Meeting Hub" />
            <SidebarItem icon={<Clock size={18} />} label="Transactions history" />
            <SidebarItem icon={<Sparkles size={18} />} label="AI Summary Builder" />
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Content area */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My files</h1>
              </div>

              <Button variant="outline" className="border-primary text-primary hover:bg-accent">
                Add folder
              </Button>
            </div>

            <div className="flex items-center gap-1 mb-4 text-sm">
              <span className="text-primary hover:text-primary/90 cursor-pointer">Workspaces</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">My files</span>
            </div>

            <div className="flex gap-6 mb-6">
              <Button variant="ghost" className="text-primary hover:bg-accent p-0 h-auto font-medium">
                <FolderInput className="h-5 w-5 mr-2 text-primary" />
                Move
              </Button>
              <Button variant="ghost" className="text-primary hover:bg-accent p-0 h-auto font-medium">
                <Trash2 className="h-5 w-5 mr-2 text-primary" />
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm text-primary border-primary bg-background hover:bg-accent"
                onClick={navigateToStudio}
              >
                <Sparkles size={16} className="mr-2 h-4 w-4" /> Multi-file insights
              </Button>
            </div>

            {/* Files table */}
            <div className="bg-background rounded-md border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="w-10 px-4 py-3 text-left">
                      <Checkbox
                        checked={selectedFiles.length === files.length && files.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Created date</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Length</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Owner</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id} className="border-b border-border hover:bg-accent/50">
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedFiles.includes(file.id)}
                          onCheckedChange={() => toggleSelectFile(file.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        {file.name === "Wheeler Defense Motion" ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 text-primary animate-spin" />
                            <span className="text-foreground">{file.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="text-foreground">{file.name}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{file.dateCreated}</td>
                      <td className="px-4 py-3 text-muted-foreground">{file.length || ""}</td>
                      <td className="px-4 py-3 text-muted-foreground">{file.owner}</td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center px-4 py-3 text-sm text-muted-foreground">
                <div>
                  Rows per page: <span className="font-medium">10</span> <ChevronDown size={14} className="inline" />
                </div>
                <div>1-5 of 5</div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx global>{`
  .processing-container {
    position: relative;
    display: inline-block;
  }
  
  .processing-file-name {
    position: relative;
    color: #1a1a1a;
  }
`}</style>
    </div>
  )
}
