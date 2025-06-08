"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts"
import { CustomTooltip } from "@/components/design-system/custom-tooltip"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const salesData = [
  { month: "Jan", sales: 4000, target: 2400 },
  { month: "Feb", sales: 3000, target: 2500 },
  { month: "Mar", sales: 2000, target: 2600 },
  { month: "Apr", sales: 2780, target: 2700 },
  { month: "May", sales: 1890, target: 2800 },
  { month: "Jun", sales: 2390, target: 2900 },
  { month: "Jul", sales: 3490, target: 3000 },
]

const pieData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const invoicesData = [
  {
    id: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    customer: "John Doe",
    email: "john@example.com",
    date: "2023-01-15",
  },
  {
    id: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    customer: "Sarah Davis",
    email: "sarah@example.com",
    date: "2023-01-20",
  },
  {
    id: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    customer: "Robert Johnson",
    email: "robert@example.com",
    date: "2023-01-25",
  },
  {
    id: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    customer: "Emily Wilson",
    email: "emily@example.com",
    date: "2023-01-30",
  },
  {
    id: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    customer: "Michael Brown",
    email: "michael@example.com",
    date: "2023-02-05",
  },
]

export function DataVisualizationPatterns() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortColumn, setSortColumn] = useState("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])

  const filteredInvoices = invoicesData
    .filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || invoice.paymentStatus.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([])
    } else {
      setSelectedInvoices(filteredInvoices.map((invoice) => invoice.id))
    }
  }

  const handleSelectInvoice = (id: string) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter((invoiceId) => invoiceId !== id))
    } else {
      setSelectedInvoices([...selectedInvoices, id])
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Data Visualization Patterns</h3>
        <p className="text-muted-foreground">Common patterns for visualizing and managing data.</p>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">Charts & Graphs</TabsTrigger>
          <TabsTrigger value="tables">Data Tables</TabsTrigger>
          <TabsTrigger value="dashboards">Interactive Dashboards</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bar Chart</CardTitle>
                <CardDescription>Monthly sales performance compared to targets.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "hsl(var(--chart-1))",
                    },
                    target: {
                      label: "Target",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="sales" fill="var(--color-sales)" name="Sales" />
                      <Bar dataKey="target" fill="var(--color-target)" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Line Chart</CardTitle>
                <CardDescription>Sales trend over time with monthly targets.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "hsl(var(--chart-1))",
                    },
                    target: {
                      label: "Target",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" name="Sales" />
                      <Line type="monotone" dataKey="target" stroke="var(--color-target)" name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pie Chart</CardTitle>
                <CardDescription>Product sales distribution by category.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stacked Bar Chart</CardTitle>
                <CardDescription>Sales breakdown by product category and month.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    productA: {
                      label: "Product A",
                      color: "hsl(var(--chart-1))",
                    },
                    productB: {
                      label: "Product B",
                      color: "hsl(var(--chart-2))",
                    },
                    productC: {
                      label: "Product C",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: "Jan", productA: 400, productB: 300, productC: 200 },
                        { month: "Feb", productA: 300, productB: 400, productC: 300 },
                        { month: "Mar", productA: 200, productB: 300, productC: 400 },
                        { month: "Apr", productA: 278, productB: 398, productC: 304 },
                        { month: "May", productA: 189, productB: 480, productC: 281 },
                        { month: "Jun", productA: 239, productB: 380, productC: 291 },
                      ]}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="productA" stackId="a" fill="var(--color-productA)" name="Product A" />
                      <Bar dataKey="productB" stackId="a" fill="var(--color-productB)" name="Product B" />
                      <Bar dataKey="productC" stackId="a" fill="var(--color-productC)" name="Product C" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle>Data Table with Sorting, Filtering, and Selection</CardTitle>
              <CardDescription>A data table with advanced features for managing invoice data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-center space-x-2">
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-8 w-[150px] lg:w-[250px]"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-8 w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CustomTooltip content="Export selected invoices">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedInvoices.length === 0}
                        onClick={() => alert(`Exporting ${selectedInvoices.length} invoices`)}
                      >
                        Export
                      </Button>
                    </CustomTooltip>
                    <CustomTooltip content="Delete selected invoices">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedInvoices.length === 0}
                        onClick={() => alert(`Deleting ${selectedInvoices.length} invoices`)}
                      >
                        Delete
                      </Button>
                    </CustomTooltip>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={filteredInvoices.length > 0 && selectedInvoices.length === filteredInvoices.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                          <div className="flex items-center space-x-1">
                            <span>Invoice</span>
                            {sortColumn === "id" && <span>{sortDirection === "asc" ? "↑" : "↓"}</span>}
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("paymentStatus")}>
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            {sortColumn === "paymentStatus" && <span>{sortDirection === "asc" ? "↑" : "↓"}</span>}
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                          <div className="flex items-center space-x-1">
                            <span>Customer</span>
                            {sortColumn === "customer" && <span>{sortDirection === "asc" ? "↑" : "↓"}</span>}
                          </div>
                        </TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No results found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedInvoices.includes(invoice.id)}
                                onCheckedChange={() => handleSelectInvoice(invoice.id)}
                                aria-label={`Select invoice ${invoice.id}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  invoice.paymentStatus === "Paid"
                                    ? "default"
                                    : invoice.paymentStatus === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {invoice.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{invoice.customer}</p>
                                <p className="text-sm text-muted-foreground">{invoice.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{invoice.totalAmount}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>{filteredInvoices.length}</strong> of <strong>{invoicesData.length}</strong>{" "}
                    invoices
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboards">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Sales Dashboard</CardTitle>
              <CardDescription>A comprehensive view of sales performance with interactive filters.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <Label htmlFor="date-range">Date Range:</Label>
                    <Select defaultValue="last30">
                      <SelectTrigger id="date-range" className="w-[180px]">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last7">Last 7 days</SelectItem>
                        <SelectItem value="last30">Last 30 days</SelectItem>
                        <SelectItem value="last90">Last 90 days</SelectItem>
                        <SelectItem value="year">This year</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label htmlFor="product-filter">Product:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="product-filter" className="w-[180px]">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        <SelectItem value="productA">Product A</SelectItem>
                        <SelectItem value="productB">Product B</SelectItem>
                        <SelectItem value="productC">Product C</SelectItem>
                        <SelectItem value="productD">Product D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Export Report
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
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
                      <p className="text-xs text-muted-foreground">+20.1% from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sales Count</CardTitle>
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
                      <p className="text-xs text-muted-foreground">+19% from last period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
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
                      <div className="text-2xl font-bold">$32.19</div>
                      <p className="text-xs text-muted-foreground">+7% from last period</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                      <CardTitle>Sales Trend</CardTitle>
                      <CardDescription>Monthly sales performance over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          sales: {
                            label: "Sales",
                            color: "hsl(var(--chart-1))",
                          },
                          target: {
                            label: "Target",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={salesData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" name="Sales" />
                            <Line type="monotone" dataKey="target" stroke="var(--color-target)" name="Target" />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                      <CardTitle>Product Distribution</CardTitle>
                      <CardDescription>Sales breakdown by product category.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Products</CardTitle>
                    <CardDescription>Products with the highest sales volume.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Sales</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Growth</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Product A</TableCell>
                          <TableCell>Electronics</TableCell>
                          <TableCell>1,245</TableCell>
                          <TableCell>$12,450</TableCell>
                          <TableCell className="text-green-600">+12%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Product B</TableCell>
                          <TableCell>Clothing</TableCell>
                          <TableCell>1,050</TableCell>
                          <TableCell>$8,400</TableCell>
                          <TableCell className="text-green-600">+5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Product C</TableCell>
                          <TableCell>Home & Garden</TableCell>
                          <TableCell>940</TableCell>
                          <TableCell>$7,520</TableCell>
                          <TableCell className="text-red-600">-2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Product D</TableCell>
                          <TableCell>Electronics</TableCell>
                          <TableCell>875</TableCell>
                          <TableCell>$6,125</TableCell>
                          <TableCell className="text-green-600">+8%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
