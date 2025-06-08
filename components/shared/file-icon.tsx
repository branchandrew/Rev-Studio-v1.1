import { cn } from "@/lib/utils"

export type FileIconType =
  | "folder"
  | "add"
  | "pdf"
  | "word"
  | "video"
  | "tnt"
  | "document"
  | "profile"
  | "cut"
  | "effects"
  | "card"
  | "cc"
  | "image"
  | "audio"
  | "spreadsheet"
  | "presentation"
  | "zip"
  | "code"
  | "unknown"

interface FileIconProps {
  type: FileIconType
  className?: string
  size?: "sm" | "md" | "lg"
}

export function FileIcon({ type, className, size = "md" }: FileIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const renderIcon = () => {
    switch (type) {
      case "folder":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-gray-500", className)}
          >
            <path
              d="M3 7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H9.67452C10.1637 4 10.4083 4 10.6385 4.05526C10.8425 4.10425 11.0376 4.18506 11.2166 4.29472C11.4184 4.4184 11.5914 4.5914 11.9373 4.9373L12.0627 5.0627C12.4086 5.4086 12.5816 5.5816 12.7834 5.70528C12.9624 5.81494 13.1575 5.89575 13.3615 5.94474C13.5917 6 13.8363 6 14.3255 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.07989 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8V7.2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "add":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white bg-emerald-600 rounded", className)}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" />
            <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "pdf":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#D0362F" />
            <path
              d="M7.5 15V9H9.5C10.05 9 10.5 9.45 10.5 10V11C10.5 11.55 10.05 12 9.5 12H8.5V15H7.5ZM8.5 11H9.5V10H8.5V11Z"
              fill="white"
            />
            <path d="M11.5 15V9H14.5V10H12.5V11.5H14V12.5H12.5V15H11.5Z" fill="white" />
            <path
              d="M15.5 15V9H17.5C18.05 9 18.5 9.45 18.5 10V14C18.5 14.55 18.05 15 17.5 15H15.5ZM16.5 14H17.5V10H16.5V14Z"
              fill="white"
            />
          </svg>
        )
      case "word":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#3F76FF" />
            <path
              d="M15.2 7L12 17L8.8 7M14.2 9H16M9.8 9H8M14.8 13H16M9.2 13H8M13.4 15H16M10.6 15H8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "video":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#D0362F" />
            <path
              d="M6 7.5H18M6 7.5V16.5H18V7.5M6 7.5L8 5H16L18 7.5M10 11V13M14 11V13"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 16.5L4.5 19.5H19.5L18 16.5H6Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "tnt":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#D0362F" />
            <path
              d="M8 8H16M8 12H16M8 16H12M12 8V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "document":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#7843EF" />
            <path
              d="M8 8H16M8 12H16M8 16H13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "profile":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#7843EF" />
            <path
              d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 19C6 16.7909 8.68629 15 12 15C15.3137 15 18 16.7909 18 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "cut":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#7843EF" />
            <path
              d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5M6.5 9.5C7.32843 9.5 8 8.82843 8 8C8 7.17157 7.32843 6.5 6.5 6.5C5.67157 6.5 5 7.17157 5 8C5 8.82843 5.67157 9.5 6.5 9.5ZM6.5 17.5C7.32843 17.5 8 16.8284 8 16C8 15.1716 7.32843 14.5 6.5 14.5C5.67157 14.5 5 15.1716 5 16C5 16.8284 5.67157 17.5 6.5 17.5ZM17.5 9.5C18.3284 9.5 19 8.82843 19 8C19 7.17157 18.3284 6.5 17.5 6.5C16.6716 6.5 16 7.17157 16 8C16 8.82843 16.6716 9.5 17.5 9.5ZM17.5 17.5C18.3284 17.5 19 16.8284 19 16C19 15.1716 18.3284 14.5 17.5 14.5C16.6716 14.5 16 15.1716 16 16C16 16.8284 16.6716 17.5 17.5 17.5Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "effects":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#7843EF" />
            <path
              d="M12 6V7M16.25 7.75L15.55 8.45M18 12H17M16.25 16.25L15.55 15.55M12 18V17M7.75 16.25L8.45 15.55M6 12H7M7.75 7.75L8.45 8.45M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "card":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#7843EF" />
            <path
              d="M5 9H19M5 12H19M5 15H12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "cc":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
          >
            <rect width="24" height="24" rx="4" fill="#7843EF" />
            <path
              d="M10 14.5C9.17157 14.5 8.5 13.8284 8.5 13C8.5 12.1716 9.17157 11.5 10 11.5M10 14.5C10.8284 14.5 11.5 13.8284 11.5 13C11.5 12.1716 10.8284 11.5 10 11.5M10 14.5H8.5M10 11.5H8.5M14 14.5C13.1716 14.5 12.5 13.8284 12.5 13C12.5 12.1716 13.1716 11.5 14 11.5M14 14.5C14.8284 14.5 15.5 13.8284 15.5 13C15.5 12.1716 14.8284 11.5 14 11.5M14 14.5H12.5M14 11.5H12.5M7 18H17C18.1046 18 19 17.1046 19 16V8C19 6.89543 18.1046 6 17 6H7C5.89543 6 5 6.89543 5 8V16C5 17.1046 5.89543 18 7 18Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "image":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white bg-green-600 rounded", className)}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" />
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M21 15L16 10L5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "audio":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white bg-purple-600 rounded", className)}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" />
            <path
              d="M12 6V14M16 8V16M8 10V18M7 22H17C19.2091 22 21 20.2091 21 18V6C21 3.79086 19.2091 2 17 2H7C4.79086 2 3 3.79086 3 6V18C3 20.2091 4.79086 22 7 22Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "spreadsheet":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white bg-green-600 rounded", className)}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" />
            <path
              d="M3 8H21M3 16H21M9 3V21M15 3V21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "presentation":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white bg-orange-500 rounded", className)}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" />
            <path
              d="M12 16V20M8 20H16M5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "zip":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white bg-yellow-600 rounded", className)}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" />
            <path
              d="M12 2V6M12 10V14M12 18V22M4 6H20C21.1046 6 22 5.10457 22 4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6ZM4 14H20C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10H4C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14ZM4 22H20C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18H4C2.89543 18 2 18.8954 2 20C2 21.1046 2.89543 22 4 22Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "code":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white bg-gray-700 rounded", className)}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" />
            <path
              d="M16 18L22 12L16 6M8 6L2 12L8 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      default:
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-gray-500", className)}
          >
            <path
              d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9M13 2L20 9M13 2V9H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
    }
  }

  return <div className={cn(sizeClasses[size])}>{renderIcon()}</div>
}

// Helper function to map file extensions to icon types
export function getIconTypeFromFileName(fileName: string): FileIconType {
  if (!fileName) return "unknown"

  const extension = fileName.split(".").pop()?.toLowerCase() || ""

  switch (extension) {
    case "pdf":
      return "pdf"
    case "doc":
    case "docx":
      return "word"
    case "xls":
    case "xlsx":
    case "csv":
      return "spreadsheet"
    case "ppt":
    case "pptx":
      return "presentation"
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "webp":
      return "image"
    case "mp4":
    case "mov":
    case "avi":
    case "webm":
      return "video"
    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
      return "audio"
    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
      return "zip"
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
    case "html":
    case "css":
    case "py":
    case "java":
    case "php":
      return "code"
    case "txt":
      return "document"
    default:
      return "unknown"
  }
}
