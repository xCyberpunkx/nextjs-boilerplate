/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
type BadgeProps = {
  variant?: "default" | "destructive" | "outline" | "secondary" | "success" | "warning" | null | undefined;
  // other props...
};
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/componentss/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/componentss/ui/card"
import { Input } from "@/app/componentss/ui/input"
import { Button } from "@/app/componentss/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/componentss/ui/avatar"
import { Badge } from "@/app/componentss/ui/badge"
import { ScrollArea } from "@/app/componentss/ui/scroll-area"
import { Switch } from "@/app/componentss/ui/switch"
import { Label } from "@/app/componentss/ui/label"
import { Calendar as CalendarIcon, Users, MessageSquare, Package, Plus, Clock, Moon, Sun, Settings, Stethoscope, FileText, AlertTriangle, DollarSign, Clipboard, Menu, LogOut, User, Bell, ChevronDown, X } from "lucide-react"
import { Calendar } from "@/app/componentss/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/componentss/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/componentss/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/componentss/ui/table"
import { Progress } from "@/app/componentss/ui/progress"
import { Textarea } from "@/app/componentss/ui/textarea"
import { Checkbox } from "@/app/componentss/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/componentss/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/componentss/ui/dialog"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function DashboardComponent() {
  const [activeTab, setActiveTab] = useState("appointments")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [date, setDate] = useState<Date>()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [notes, setNotes] = useState("")
  const [todos, setTodos] = useState([
    { id: 1, text: "Review patient files", completed: false },
    { id: 2, text: "Order new supplies", completed: true },
    { id: 3, text: "Schedule team meeting", completed: false },
  ])

  // Mock data (expanded)
  const appointments = [
    { id: 1, patient: "John Doe", time: "9:00 AM", type: "Check-up", status: "Upcoming", procedure: "Cleaning" },
    { id: 2, patient: "Jane Smith", time: "10:30 AM", type: "Cleaning", status: "In Progress", procedure: "Deep Cleaning" },
    { id: 3, patient: "Mike Johnson", time: "2:00 PM", type: "Consultation", status: "Upcoming", procedure: "X-Ray" },
    { id: 4, patient: "Emily Brown", time: "3:30 PM", type: "Treatment", status: "Upcoming", procedure: "Filling" },
    { id: 5, patient: "David Wilson", time: "4:45 PM", type: "Follow-up", status: "Upcoming", procedure: "Root Canal Check" },
  ]

  const inventory = [
    { id: 1, name: "Dental Floss", quantity: 45, status: "Good" },
    { id: 2, name: "Latex Gloves", quantity: 12, status: "Low" },
    { id: 3, name: "Face Masks", quantity: 30, status: "Good" },
    { id: 4, name: "Dental Mirrors", quantity: 20, status: "Good" },
    { id: 5, name: "Anesthetic", quantity: 5, status: "Low" },
  ]

  const patients = [
    { id: 1, name: "John Doe", lastVisit: "2023-05-15", nextAppointment: "2023-11-20", contactNumber: "123-456-7890" },
    { id: 2, name: "Jane Smith", lastVisit: "2023-06-22", nextAppointment: "2023-12-05", contactNumber: "234-567-8901" },
    { id: 3, name: "Mike Johnson", lastVisit: "2023-07-10", nextAppointment: "2023-11-25", contactNumber: "345-678-9012" },
    { id: 4, name: "Emily Brown", lastVisit: "2023-08-05", nextAppointment: "2023-12-10", contactNumber: "456-789-0123" },
    { id: 5, name: "David Wilson", lastVisit: "2023-09-18", nextAppointment: "2023-11-30", contactNumber: "567-890-1234" },
  ]

  const treatmentPlans = [
    { id: 1, patient: "David Brown", treatment: "Root Canal", progress: 60, startDate: "2023-10-01", endDate: "2023-12-15" },
    { id: 2, patient: "Eva Green", treatment: "Orthodontics", progress: 30, startDate: "2023-09-15", endDate: "2024-09-15" },
    { id: 3, patient: "Frank White", treatment: "Dental Implants", progress: 80, startDate: "2023-08-01", endDate: "2023-11-30" },
    { id: 4, patient: "Grace Lee", treatment: "Teeth Whitening", progress: 100, startDate: "2023-11-01", endDate: "2023-11-15" },
    { id: 5, patient: "Henry Davis", treatment: "Gum Surgery", progress: 40, startDate: "2023-10-15", endDate: "2024-01-15" },
  ]

  const billingRecords = [
    { id: 1, patient: "George Gray", treatment: "Teeth Whitening", amount: 250, status: "Paid", date: "2023-11-05" },
    { id: 2, patient: "Helen Black", treatment: "Dental Crown", amount: 800, status: "Pending", date: "2023-11-10" },
    { id: 3, patient: "Ian Red", treatment: "Cavity Filling", amount: 150, status: "Overdue", date: "2023-10-25" },
    { id: 4, patient: "Julia Green", treatment: "Root Canal", amount: 1000, status: "Paid", date: "2023-11-15" },
    { id: 5, patient: "Kevin White", treatment: "Dental Cleaning", amount: 100, status: "Pending", date: "2023-11-20" },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const addTodo = (text: string) => {
    setTodos([...todos, { id: todos.length + 1, text, completed: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const workHours = [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""} bg-white text-black dark:bg-gray-900 dark:text-white`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Stethoscope className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="outline" className="inline-flex items-center whitespace-nowrap" onClick={toggleSidebar}>
                <Menu className="mr-2 h-4 w-4" />
                Menu
              </Button>
            </div>
            <nav className="flex items-center space-x-2">
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              <Label htmlFor="dark-mode" className="sr-only">Dark mode</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Dr. Smith" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Dr. Smith</p>
                      <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                        dr.smith@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r bg-white transition-transform duration-300 ease-in-out dark:bg-gray-800 md:translate-x-0`}>
          <div className="flex h-full flex-col overflow-y-auto">
            <nav className="flex-1 space-y-2 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Appointments
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => setActiveTab("view-appointments")}>View Appointments</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setActiveTab("add-appointment")}>Add Appointment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Patients
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => setActiveTab("view-patients")}>View Patients</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setActiveTab("add-patient")}>Add Patient</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("treatments")}>
                <Clipboard className="mr-2 h-4 w-4" />
                Treatments
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("inventory")}>
                <Package className="mr-2 h-4 w-4" />
                Inventory
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Billing
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => setActiveTab("view-invoices")}>View Invoices</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setActiveTab("create-invoice")}>Create Invoice</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => setActiveTab("view-messages")}>View Messages</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setActiveTab("send-message")}>Send  Message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:ml-64">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dental Dashboard</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="hidden">
                <TabsTrigger value="view-appointments">View Appointments</TabsTrigger>
                <TabsTrigger value="add-appointment">Add Appointment</TabsTrigger>
                <TabsTrigger value="view-patients">View Patients</TabsTrigger>
                <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="view-invoices">View Invoices</TabsTrigger>
                <TabsTrigger value="create-invoice">Create Invoice</TabsTrigger>
                <TabsTrigger value="view-messages">View Messages</TabsTrigger>
                <TabsTrigger value="send-message">Send Message</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="view-appointments">
                <Card>
                  <CardHeader>
                    <CardTitle>Appointments</CardTitle>
                    <CardDescription>View and manage appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Procedure</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((apt) => (
                          <TableRow key={apt.id}>
                            <TableCell>{apt.patient}</TableCell>
                            <TableCell>{apt.time}</TableCell>
                            <TableCell>{apt.type}</TableCell>
                            <TableCell>
                              <Badge variant={apt.status === "In Progress" ? "default" : "secondary"}>
                                {apt.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{apt.procedure}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="ml-2">
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-appointment">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Appointment</CardTitle>
                    <CardDescription>Schedule a new appointment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="patient-name">Patient Name</Label>
                          <Input id="patient-name" placeholder="Enter patient name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appointment-date">Date</Label>
                          <Input id="appointment-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appointment-time">Time</Label>
                          <Input id="appointment-time" type="time" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appointment-type">Type</Label>
                          <Select>
                            <SelectTrigger id="appointment-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="check-up">Check-up</SelectItem>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                              <SelectItem value="treatment">Treatment</SelectItem>
                              <SelectItem value="follow-up">Follow-up</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appointment-procedure">Procedure</Label>
                          <Select>
                            <SelectTrigger id="appointment-procedure">
                              <SelectValue placeholder="Select procedure" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                              <SelectItem value="deep-cleaning">Deep Cleaning</SelectItem>
                              <SelectItem value="x-ray">X-Ray</SelectItem>
                              <SelectItem value="filling">Filling</SelectItem>
                              <SelectItem value="root-canal">Root Canal</SelectItem>
                              <SelectItem value="extraction">Extraction</SelectItem>
                              <SelectItem value="crown">Crown</SelectItem>
                              <SelectItem value="bridge">Bridge</SelectItem>
                              <SelectItem value="implant">Implant</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appointment-notes">Notes</Label>
                          <Textarea id="appointment-notes" placeholder="Any additional notes" />
                        </div>
                      </div>
                      <Button type="submit">Schedule Appointment</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="view-patients">
                <Card>
                  <CardHeader>
                    <CardTitle>Patients</CardTitle>
                    <CardDescription>View and manage patient records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Last Visit</TableHead>
                          <TableHead>Next Appointment</TableHead>
                          <TableHead>Contact Number</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>{patient.nextAppointment}</TableCell>
                            <TableCell>{patient.contactNumber}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Details</Button>
                              <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-patient">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Patient</CardTitle>
                    <CardDescription>Register a new patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Enter last name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-of-birth">Date of Birth</Label>
                          <Input id="date-of-birth" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select>
                            <SelectTrigger id="gender">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" placeholder="Enter phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter email address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="Enter address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-contact">Emergency Contact</Label>
                          <Input id="emergency-contact" placeholder="Name and phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="medical-history">Medical History</Label>
                          <Textarea id="medical-history" placeholder="Any relevant medical information" />
                        </div>
                      </div>
                      <Button type="submit">Register Patient</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="treatments">
                <Card>
                  <CardHeader>
                    <CardTitle>Treatment Plans</CardTitle>
                    <CardDescription>Ongoing treatments and their progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      {treatmentPlans.map((plan) => (
                        <motion.div
                          key={plan.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <p className="font-medium">{plan.patient}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{plan.treatment}</p>
                            </div>
                            <Badge variant="outline">{plan.progress}%</Badge>
                          </div>
                          <Progress value={plan.progress} className="w-full" />
                          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>Start: {plan.startDate}</span>
                            <span className="mx-2">|</span>
                            <span>End: {plan.endDate}</span>
                          </div>
                        </motion.div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
                    <Input
                      placeholder="Search inventory..."
                      className="max-w-xs"
                    />
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      {inventory.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mb-4 flex items-center justify-between rounded-lg border border-neutral-200 border-gray-200 p-4 dark:border-gray-700 dark:border-neutral-800"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                          </div>
                          <Badge variant={item.status === "Low" ? "destructive" : "secondary"}>
                            {item.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="view-invoices">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Records</CardTitle>
                    <CardDescription>Recent transactions and payment status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Treatment</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {billingRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{record.patient}</TableCell>
                            <TableCell>{record.treatment}</TableCell>
                            <TableCell>${record.amount}</TableCell>
                            <TableCell>
                            <Badge variant={record.status === "Paid" ? "secondary" : record.status === "Pending" ? "outline" : "destructive"}>
  {record.status}
</Badge>
                            </TableCell>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create-invoice">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Invoice</CardTitle>
                    <CardDescription>Generate a new invoice for a patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="invoice-patient">Patient</Label>
                          <Select>
                            <SelectTrigger id="invoice-patient">
                              <SelectValue placeholder="Select patient" />
                            </SelectTrigger>
                            <SelectContent>
                              {patients.map((patient) => (
                                <SelectItem key={patient.id} value={patient.name.toLowerCase().replace("'", "'-'")}>
                                  {patient.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invoice-treatment">Treatment</Label>
                          <Select>
                            <SelectTrigger id="invoice-treatment">
                              <SelectValue placeholder="Select treatment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                              <SelectItem value="filling">Filling</SelectItem>
                              <SelectItem value="root-canal">Root Canal</SelectItem>
                              <SelectItem value="extraction">Extraction</SelectItem>
                              <SelectItem value="crown">Crown</SelectItem>
                              <SelectItem value="bridge">Bridge</SelectItem>
                              <SelectItem value="implant">Implant</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invoice-amount">Amount</Label>
                          <Input id="invoice-amount" type="number" placeholder="Enter amount" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invoice-date">Date</Label>
                          <Input id="invoice-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invoice-due-date">Due Date</Label>
                          <Input id="invoice-due-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invoice-status">Status</Label>
                          <Select>
                            <SelectTrigger id="invoice-status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoice-notes">Notes</Label>
                        <Textarea id="invoice-notes" placeholder="Any additional notes" />
                      </div>
                      <Button type="submit">Generate Invoice</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="view-messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>View and manage messages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-gray-500 p-8 dark:text-gray-400">
                      No new messages
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="send-message">
                <Card>
                  <CardHeader>
                    <CardTitle>Send Message</CardTitle>
                    <CardDescription>Compose and send a new message</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="message-recipient">Recipient</Label>
                        <Select>
                          <SelectTrigger id="message-recipient">
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            {patients.map((patient) => (
                              <SelectItem                                 key={patient.id} value={patient.name.toLowerCase().replace("'", "'-'")}>
                                {patient.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message-subject">Subject</Label>
                        <Input id="message-subject" placeholder="Enter message subject" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message-content">Message</Label>
                        <Textarea id="message-content" placeholder="Type your message here" rows={5} />
                      </div>
                      <Button type="submit">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Work Hours</CardTitle>
                      <CardDescription>Manage clinic operating hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {workHours.map((day) => (
                          <div key={day.day} className="p-4 rounded-lg border border-neutral-200 border-gray-200 dark:border-gray-700 dark:border-neutral-800">
                            <p className="font-medium">{day.day}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{day.hours}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage your notification settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                          <Switch id="appointment-reminders" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="treatment-updates">Treatment Updates</Label>
                          <Switch id="treatment-updates" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="billing-alerts">Billing Alerts</Label>
                          <Switch id="billing-alerts" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                          <Switch id="inventory-alerts" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="staff-messages">Staff Messages</Label>
                          <Switch id="staff-messages" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="w-full" onClick={() => setActiveTab("add-appointment")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("add-patient")}>
                  <Users className="mr-2 h-4 w-4" />
                  Add Patient
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("create-invoice")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("send-message")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>

            {/* Notes and Todos */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Type your notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[200px]"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Todos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] mb-4">
                    {todos.map((todo) => (
                      <div key={todo.id} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`todo-${todo.id}`}
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                        />
                        <label
                          htmlFor={`todo-${todo.id}`}
                          className={`text-sm ${todo.completed ? "line-through text-gray-500 dark:text-gray-400" : ""}`}
                        >
                          {todo.text}
                        </label>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add new todo..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addTodo(e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button onClick={() => {
                      const input = document.querySelector("input[placeholder='Add new todo...']") as HTMLInputElement
                      if (input.value) {
                        addTodo(input.value)
                        input.value = ""
                      }
                    }}>Add</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-left">
              Built by Dental Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}