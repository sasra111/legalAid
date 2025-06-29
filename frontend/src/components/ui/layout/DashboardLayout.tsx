import React, { useState } from "react";
import {
  Search,
  FileText,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  User,
  Menu,
  X,
  Scale,
  Briefcase,
  Clock,
  DollarSign,
  Plus,
} from "lucide-react";

// Mock shadcn/ui components for demonstration
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

const Avatar = ({ children, className = "" }) => (
  <div
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
  >
    {children}
  </div>
);

const AvatarFallback = ({ children, className = "" }) => (
  <div
    className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
  >
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "cases", label: "Cases", icon: Briefcase },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "search", label: "Legal Search", icon: Search },
    { id: "clients", label: "Clients", icon: Users },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const recentCases = [
    {
      id: 1,
      title: "Property Dispute - Silva vs. Fernando",
      status: "Active",
      priority: "High",
      date: "2025-06-28",
    },
    {
      id: 2,
      title: "Contract Breach - ABC Company",
      status: "Review",
      priority: "Medium",
      date: "2025-06-27",
    },
    {
      id: 3,
      title: "Family Law - Custody Case",
      status: "Pending",
      priority: "High",
      date: "2025-06-26",
    },
    {
      id: 4,
      title: "Criminal Defense - Traffic Violation",
      status: "Closed",
      priority: "Low",
      date: "2025-06-25",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "File motion for summary judgment",
      due: "2025-06-30",
      case: "Silva vs. Fernando",
    },
    {
      id: 2,
      task: "Client consultation - ABC Company",
      due: "2025-07-01",
      case: "Contract Breach",
    },
    {
      id: 3,
      task: "Court hearing preparation",
      due: "2025-07-02",
      case: "Custody Case",
    },
    {
      id: 4,
      task: "Document review and analysis",
      due: "2025-07-03",
      case: "Property Dispute",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Review":
        return "default";
      case "Pending":
        return "secondary";
      case "Closed":
        return "outline";
      default:
        return "outline";
    }
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Cases
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Documents
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    This Month's Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">LKR 450,000</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Tasks
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Cases and Tasks */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCases.map((case_) => (
                      <div
                        key={case_.id}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {case_.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {case_.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getPriorityColor(case_.priority)}>
                            {case_.priority}
                          </Badge>
                          <Badge variant={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="space-y-1 border-b pb-2">
                        <p className="text-sm font-medium leading-none">
                          {task.task}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {task.case}
                        </p>
                        <p className="text-xs text-blue-600">Due: {task.due}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "cases":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Case
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Case management interface will be implemented here.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "search":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">
                Legal Search
              </h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Legal Document Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Search legal documents, cases, and precedents..." />
                  <p className="text-sm text-muted-foreground">
                    Use semantic search to find relevant legal documents based
                    on meaning, not just keywords.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  This section is under development.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Legal Aid</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="space-y-2 p-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">Legal Aid</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeSection === item.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Search bar */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground pl-3" />
              <Input
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
                placeholder="Search cases, documents, clients..."
                type="search"
              />
            </div>
          </div>

          {/* Profile dropdown */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>

            {/* Profile dropdown */}
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-medium">Sasith Bandara</p>
                <p className="text-xs text-muted-foreground">
                  Legal Practitioner
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{renderDashboardContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
