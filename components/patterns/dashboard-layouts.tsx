"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CustomTooltip } from "@/components/design-system/custom-tooltip"

export function DashboardLayoutPatterns() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Dashboard Layout Patterns</h3>
        <p className="text-muted-foreground">Common layout patterns for dashboard interfaces.</p>
      </div>

      <Tabs defaultValue="sidebar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sidebar">Sidebar Layout</TabsTrigger>
          <TabsTrigger value="topnav">Top Navigation</TabsTrigger>
          <TabsTrigger value="multi">Multi-Column</TabsTrigger>
        </TabsList>

        <TabsContent value="sidebar">
          <Card>
            <CardHeader>
              <CardTitle>Sidebar Dashboard Layout</CardTitle>
              <CardDescription>A classic dashboard layout with collapsible sidebar.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="flex h-[500px] flex-col overflow-hidden rounded-lg">
                  {/* Header */}
                  <header className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px]">
                    <div className="flex items-center gap-2 font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                        <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                      </svg>
                      <span className="">Acme Inc</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Input type="search" placeholder="Search..." className="h-9 md:w-[200px] lg:w-[300px]" />
                      </div>
                      <CustomTooltip content="Your profile">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                        </Button>
                      </CustomTooltip>
                    </div>
                  </header>

                  <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <aside
                      className={`flex-shrink-0 border-r bg-muted/40 ${
                        isSidebarCollapsed ? "w-[60px]" : "w-[240px]"
                      } transition-all duration-300`}
                    >
                      <div className="flex h-full flex-col">
                        <div className="flex h-14 items-center border-b px-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                              <line x1="9" x2="15" y1="3" y2="3" />
                              <line x1="9" x2="15" y1="21" y2="21" />
                              <line x1="3" x2="3" y1="9" y2="15" />
                              <line x1="21" x2="21" y1="9" y2="15" />
                            </svg>
                          </Button>
                        </div>
                        <nav className="flex-1 overflow-auto p-2">
                          <div className="grid gap-1">
                            <Button
                              variant="ghost"
                              className={`flex items-center justify-${isSidebarCollapsed ? "center" : "start"} gap-2`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                              </svg>
                              {!isSidebarCollapsed && <span>Dashboard</span>}
                            </Button>
                            <Button
                              variant="ghost"
                              className={`flex items-center justify-${isSidebarCollapsed ? "center" : "start"} gap-2`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              {!isSidebarCollapsed && <span>Users</span>}
                            </Button>
                            <Button
                              variant="ghost"
                              className={`flex items-center justify-${isSidebarCollapsed ? "center" : "start"} gap-2`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                              </svg>
                              {!isSidebarCollapsed && <span>Content</span>}
                            </Button>
                            <Button
                              variant="ghost"
                              className={`flex items-center justify-${isSidebarCollapsed ? "center" : "start"} gap-2`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M12 2H2v10h10V2Z" />
                                <path d="M12 12H2v10h10V12Z" />
                                <path d="M22 2h-10v20h10V2Z" />
                              </svg>
                              {!isSidebarCollapsed && <span>Analytics</span>}
                            </Button>
                            <Button
                              variant="ghost"
                              className={`flex items-center justify-${isSidebarCollapsed ? "center" : "start"} gap-2`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-1.5-1.5-1.5-1.5" />
                                <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                                <path d="M16 11h0" />
                              </svg>
                              {!isSidebarCollapsed && <span>Settings</span>}
                            </Button>
                          </div>
                        </nav>
                      </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto p-4">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold">Dashboard</h2>
                          <Button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4"
                            >
                              <path d="M5 12h14" />
                              <path d="M12 5v14" />
                            </svg>
                            New Project
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-muted-foreground"
                              >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                              </svg>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">$45,231.89</div>
                              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-muted-foreground"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">+2,350</div>
                              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="col-span-4">
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your team's activity in the last 24 hours.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">John Doe</p>
                                  <p className="text-sm text-muted-foreground">Created a new project</p>
                                </div>
                                <Badge variant="outline">2h ago</Badge>
                              </div>
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Sarah Davis</p>
                                  <p className="text-sm text-muted-foreground">Completed task "Design homepage"</p>
                                </div>
                                <Badge variant="outline">5h ago</Badge>
                              </div>
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>RJ</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Robert Johnson</p>
                                  <p className="text-sm text-muted-foreground">Commented on "API Integration"</p>
                                </div>
                                <Badge variant="outline">8h ago</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topnav">
          <Card>
            <CardHeader>
              <CardTitle>Top Navigation Dashboard Layout</CardTitle>
              <CardDescription>A dashboard layout with top navigation bar.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="flex h-[500px] flex-col overflow-hidden rounded-lg">
                  {/* Header */}
                  <header className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                        </svg>
                        <span className="">Acme Inc</span>
                      </div>
                      <nav className="hidden md:flex md:gap-6">
                        <Button variant="ghost" className="text-sm font-medium">
                          Dashboard
                        </Button>
                        <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
                          Projects
                        </Button>
                        <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
                          Team
                        </Button>
                        <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
                          Reports
                        </Button>
                      </nav>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Input type="search" placeholder="Search..." className="h-9 md:w-[200px] lg:w-[300px]" />
                      </div>
                      <CustomTooltip content="Notifications">
                        <Button variant="ghost" size="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                          </svg>
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip content="Your profile">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                        </Button>
                      </CustomTooltip>
                    </div>
                  </header>

                  {/* Main Content */}
                  <main className="flex-1 overflow-auto p-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <Button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                          New Project
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-muted-foreground"
                            >
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-muted-foreground"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">+2,350</div>
                            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-muted-foreground"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <path d="M2 10h20" />
                            </svg>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground">+19% from last month</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-muted-foreground"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">+201 since last hour</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                          <CardHeader>
                            <CardTitle>Recent Projects</CardTitle>
                            <CardDescription>Your team's recent projects.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5 text-primary"
                                    >
                                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                      <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="font-medium">Website Redesign</p>
                                    <p className="text-sm text-muted-foreground">Updated 2 days ago</p>
                                  </div>
                                </div>
                                <Badge>In Progress</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-5 w-5 text-primary"
                                    >
                                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                      <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="font-medium">Mobile App Development</p>
                                    <p className="text-sm text-muted-foreground">Updated 5 days ago</p>
                                  </div>
                                </div>
                                <Badge variant="outline">Planning</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="col-span-3">
                          <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>Your team members and their roles.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium">John Doe</p>
                                  <p className="text-sm text-muted-foreground">Project Manager</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium">Sarah Davis</p>
                                  <p className="text-sm text-muted-foreground">UI Designer</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>RJ</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium">Robert Johnson</p>
                                  <p className="text-sm text-muted-foreground">Developer</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multi">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Column Dashboard Layout</CardTitle>
              <CardDescription>A dashboard layout with multiple columns for complex interfaces.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="flex h-[500px] flex-col overflow-hidden rounded-lg">
                  {/* Header */}
                  <header className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px]">
                    <div className="flex items-center gap-2 font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                        <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                      </svg>
                      <span className="">Acme Inc</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CustomTooltip content="Your profile">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                        </Button>
                      </CustomTooltip>
                    </div>
                  </header>

                  {/* Main Content */}
                  <div className="flex flex-1 overflow-hidden">
                    {/* Left Sidebar */}
                    <aside className="hidden w-[240px] flex-shrink-0 border-r bg-muted/40 md:block">
                      <div className="flex h-full flex-col">
                        <div className="flex h-14 items-center border-b px-3">
                          <Input type="search" placeholder="Search..." className="h-9" />
                        </div>
                        <nav className="flex-1 overflow-auto p-2">
                          <div className="grid gap-1">
                            <Button variant="ghost" className="flex items-center justify-start gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                              </svg>
                              <span>Dashboard</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center justify-start gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              <span>Users</span>
                            </Button>
                          </div>
                        </nav>
                      </div>
                    </aside>

                    {/* Center Content */}
                    <main className="flex-1 overflow-auto p-4">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold">Dashboard</h2>
                          <Button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4"
                            >
                              <path d="M5 12h14" />
                              <path d="M12 5v14" />
                            </svg>
                            New Project
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-muted-foreground"
                              >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                              </svg>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">$45,231.89</div>
                              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-muted-foreground"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">+2,350</div>
                              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your team's activity in the last 24 hours.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">John Doe</p>
                                  <p className="text-sm text-muted-foreground">Created a new project</p>
                                </div>
                                <Badge variant="outline">2h ago</Badge>
                              </div>
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Sarah Davis</p>
                                  <p className="text-sm text-muted-foreground">Completed task "Design homepage"</p>
                                </div>
                                <Badge variant="outline">5h ago</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="hidden w-[280px] flex-shrink-0 border-l bg-muted/40 lg:block">
                      <div className="flex h-full flex-col">
                        <div className="flex h-14 items-center border-b px-4">
                          <h3 className="font-medium">Notifications</h3>
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                          <div className="space-y-4">
                            <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-primary"
                                  >
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">New comment</p>
                                  <p className="text-xs text-muted-foreground">John commented on your task</p>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-primary"
                                  >
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">New document</p>
                                  <p className="text-xs text-muted-foreground">Sarah shared a document with you</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
