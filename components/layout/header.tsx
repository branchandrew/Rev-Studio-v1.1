"use client"
import { ChevronDown, ChevronLeft, User } from "lucide-react"
import { ActivityCenterButton } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  onResourcesButtonClick?: () => void
  useSimpleTooltip?: boolean
  isDocumentViewerOpen?: boolean
  documentTitle?: string
  onBreadcrumbClick?: (path: string) => void
  showBreadcrumb?: boolean
  currentMode?: string
  onModeChange?: (mode: string) => void
  activeSourceDocument?: string
  hasActiveSource?: boolean // Add this line
  onDocumentBreadcrumbClick?: () => void // Add this line
}

export function Header(props: HeaderProps) {
  const {
    onResourcesButtonClick,
    isDocumentViewerOpen = false,
    documentTitle = "Chronological Summary of Evidence",
    onBreadcrumbClick,
    showBreadcrumb = true,
    currentMode,
    onModeChange,
    activeSourceDocument,
    hasActiveSource = false, // Add this line
    onDocumentBreadcrumbClick, // Add this line
  } = props

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleFilesClick = () => {
    if (onBreadcrumbClick) {
      onBreadcrumbClick("files")
    } else if (onResourcesButtonClick) {
      onResourcesButtonClick()
    }
  }

  const handleModeSelect = (mode: string) => {
    onModeChange?.(mode)
    setIsDropdownOpen(false)

    // Refresh the page when mode changes
    window.location.reload()
  }

  const getModeDisplayName = (mode: string) => {
    switch (mode) {
      case "MODE_DISCOVERY":
        return "Discovery Mode"
      case "MODE_ANALYSIS":
        return "Analysis Mode"
      case "MODE_LAUNCH":
        return "Launch Mode"
      case "MODE_EMPTY":
        return "Empty Mode"
      default:
        return "Empty Mode"
    }
  }

  return (
    <TooltipProvider>
      <header id="header" className="w-full pt-3 pr-4 pl-4 pb-3 lg:px-6 relative bg-zinc-50">
        <div className="flex w-full">
          {/* Left section - aligns with AI chat panel */}
          <div className="hidden md:flex w-1/3 min-w-[350px] max-w-[468px] items-center">
            <div className="flex items-center group cursor-not-allowed">
              <ChevronLeft className="h-5 w-5 mr-1" />
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
            <Badge
              data-name="beta-badge"
              className="ml-3 px-3 py-1 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
            >
              BETA
            </Badge>
          </div>

          {/* Mobile logo - only visible on small screens */}
          <div className="md:hidden flex items-center">
            <div className="flex items-center group cursor-not-allowed">
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                aria-label="Rev Mark"
              >
                <path
                  d="M27.0694 23.974H32.5876C32.5618 22.3088 32.0437 20.6884 31.0987 19.3164C30.1536 17.9443 28.8237 16.8818 27.2759 16.2624C25.7281 15.643 24.0316 15.4943 22.3994 15.8349C20.7673 16.1756 19.2723 16.9903 18.1024 18.177C16.9325 19.3636 16.1398 20.8691 15.8239 22.5044C15.508 24.1395 15.683 25.8316 16.327 27.3677C16.9709 28.9039 18.0549 30.2158 19.443 31.1385C20.8311 32.0612 22.4613 32.5536 24.1287 32.5538H45.6962C45.2687 33.6315 44.761 34.6755 44.1763 35.677H24.1287C21.837 35.677 19.5967 34.9983 17.6912 33.7266C15.7858 32.455 14.3006 30.6476 13.4235 28.5329C12.5464 26.4182 12.3169 24.0913 12.7639 21.8464C13.2109 19.6014 14.3143 17.5392 15.9348 15.9206C17.5551 14.302 19.6196 13.1997 21.8673 12.7529C24.1149 12.3062 26.4446 12.5353 28.562 13.411C30.6793 14.2868 32.4891 15.7699 33.7624 17.673C35.0359 19.576 35.7157 21.8135 35.7159 24.1023H41.2249C41.2253 20.7232 40.2221 17.4198 38.3424 14.6102C36.4628 11.8004 33.7911 9.61059 30.6653 8.3176C27.5395 7.02462 24.1 6.68659 20.7818 7.34624C17.4636 8.0059 14.4159 9.63363 12.024 12.0236C9.63209 14.4135 8.00359 17.4581 7.34441 20.7725C6.6852 24.087 7.02497 27.5223 8.32072 30.6438C9.61647 33.7654 11.8099 36.4329 14.6238 38.3092C17.4376 40.1853 20.7454 41.1862 24.1287 41.1847H39.7298C35.6787 44.8778 30.4547 47.0274 24.9747 47.2566C19.4948 47.4854 14.1093 45.7791 9.76358 42.4368C5.41795 39.0946 2.38994 34.3302 1.21124 28.9801C0.0325382 23.63 0.778471 18.0362 3.31807 13.1808C5.85768 8.32527 10.0286 4.51851 15.0986 2.42885C20.1686 0.339164 25.8136 0.100124 31.0424 1.75368C36.2714 3.40725 40.75 6.84772 43.6918 11.4711C46.6339 16.0944 47.8511 21.6051 47.1301 27.0356H24.1287C23.5522 27.0359 22.9884 26.867 22.5071 26.5499C22.026 26.2328 21.6487 25.7814 21.4222 25.252C21.1956 24.7227 21.1298 24.1383 21.2328 23.5719C21.3358 23.0054 21.6033 22.4817 22.0018 22.0656C22.4003 21.6496 22.9124 21.3597 23.4745 21.1042C24.0366 21.104 24.6239 21.144 25.1635 21.3468C25.7029 21.5495 26.171 21.9062 26.5094 22.3722C26.8478 22.8384 27.0416 23.3936 27.0668 23.9688L27.0694 23.974Z"
                  fill="black"
                />
              </svg>
            </div>
            <Badge
              data-name="beta-badge-mobile"
              className="ml-2 px-2 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
            >
              BETA
            </Badge>
          </div>

          {/* Right section - aligns with document viewer */}
          <div className="flex-1 flex items-center justify-end border-b-0">
            <div className="flex items-center justify-between w-full">
              <div className="relative">
                {/* Only show breadcrumb when showBreadcrumb is true */}
                {showBreadcrumb ? (
                  <Breadcrumb className="h-12 flex items-center">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handleFilesClick()
                          }}
                          className="text-sm font-medium"
                        >
                          Files
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      {isDocumentViewerOpen && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            {hasActiveSource ? (
                              <BreadcrumbLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  onDocumentBreadcrumbClick?.()
                                }}
                                className="text-sm font-medium"
                              >
                                {documentTitle}
                              </BreadcrumbLink>
                            ) : (
                              <BreadcrumbPage className="text-sm font-medium">{documentTitle}</BreadcrumbPage>
                            )}
                          </BreadcrumbItem>
                        </>
                      )}

                      {activeSourceDocument && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage className="text-sm font-medium">{activeSourceDocument}</BreadcrumbPage>
                          </BreadcrumbItem>
                        </>
                      )}
                    </BreadcrumbList>
                  </Breadcrumb>
                ) : (
                  <div className="h-12"></div> // Empty div to maintain spacing
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <SimpleTooltip content="Activity" side="bottom">
                    <ActivityCenterButton variant="ghost" size="lg" className="h-12 w-12 p-0" />
                  </SimpleTooltip>
                </div>

                {/* Custom dropdown implementation */}
                <div className="relative">
                  <div
                    className="flex items-center cursor-pointer hover:bg-secondary/80 rounded-md px-2 py-1 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {/* Mobile: Show user icon */}
                    <div className="md:hidden flex items-center">
                      <User className="h-5 w-5" />
                    </div>

                    {/* Desktop: Show user name and chevron */}
                    <div className="hidden md:flex items-center">
                      <span className="text-sm font-medium mr-1">Bartholomew Branch</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md border shadow-lg z-50">
                      <div className="py-1">
                        <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">Account</div>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Profile Settings
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Preferences
                        </button>

                        <div className="border-t my-1"></div>

                        <div className="px-3 py-2 text-xs font-medium text-gray-500">Mode</div>
                        <button
                          onClick={() => handleModeSelect("MODE_DISCOVERY")}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            currentMode === "MODE_DISCOVERY" ? "bg-blue-50 text-blue-700" : ""
                          }`}
                        >
                          Discovery Mode
                          {currentMode === "MODE_DISCOVERY" && <span className="float-right">✓</span>}
                        </button>
                        <button
                          onClick={() => handleModeSelect("MODE_ANALYSIS")}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            currentMode === "MODE_ANALYSIS" ? "bg-blue-50 text-blue-700" : ""
                          }`}
                        >
                          Analysis Mode
                          {currentMode === "MODE_ANALYSIS" && <span className="float-right">✓</span>}
                        </button>
                        <button
                          onClick={() => handleModeSelect("MODE_LAUNCH")}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            currentMode === "MODE_LAUNCH" ? "bg-blue-50 text-blue-700" : ""
                          }`}
                        >
                          Launch Mode
                          {currentMode === "MODE_LAUNCH" && <span className="float-right">✓</span>}
                        </button>
                        <button
                          onClick={() => handleModeSelect("MODE_EMPTY")}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            currentMode === "MODE_EMPTY" ? "bg-blue-50 text-blue-700" : ""
                          }`}
                        >
                          Empty Mode
                          {currentMode === "MODE_EMPTY" && <span className="float-right">✓</span>}
                        </button>

                        <div className="border-t my-1"></div>

                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Overlay to close dropdown when clicking outside */}
                  {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual separator that exactly matches the split in the main content */}
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div className="flex h-full">
            <div className="hidden md:block w-1/3 min-w-[350px] max-w-[468px]"></div>
            <div className="flex-1"></div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
