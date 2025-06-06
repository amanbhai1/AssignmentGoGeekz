import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Calculator,
  Upload,
  Folder,
  CheckSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  Settings,
  ArrowRight,
  Plus,
  Download,
  Star,
  Award,
  Target,
  BookOpen,
  Globe,
} from "lucide-react";

const Dashboard = () => {
  // Quick stats data
  const quickStats = [
    {
      title: "Application Progress",
      value: "75%",
      subtitle: "Almost there!",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      change: "+5% from last week",
      changeColor: "text-green-600",
    },
    {
      title: "Documents Uploaded",
      value: "8/12",
      subtitle: "4 remaining",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      change: "2 added this week",
      changeColor: "text-green-600",
    },
    {
      title: "CRS Score",
      value: "485",
      subtitle: "Competitive range",
      icon: Calculator,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      change: "+15 points improved",
      changeColor: "text-green-600",
    },
    {
      title: "Checklist Items",
      value: "15/20",
      subtitle: "5 pending",
      icon: CheckSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      change: "3 completed today",
      changeColor: "text-green-600",
    },
  ];

  // Quick actions for navigation
  const quickActions = [
    {
      title: "Immigration File",
      description: "Manage your personal information and documents",
      icon: FileText,
      href: "/immigration-file",
      color: "bg-blue-500 hover:bg-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "CRS Score Calculator",
      description: "Calculate and optimize your ranking score",
      icon: Calculator,
      href: "/crs-score",
      color: "bg-green-500 hover:bg-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Document Upload",
      description: "Upload and organize required documents",
      icon: Upload,
      href: "/document-upload",
      color: "bg-purple-500 hover:bg-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Application Categories",
      description: "Explore immigration programs and pathways",
      icon: Folder,
      href: "/application-category",
      color: "bg-orange-500 hover:bg-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Progress Checklist",
      description: "Track your application milestones",
      icon: CheckSquare,
      href: "/checklist",
      color: "bg-pink-500 hover:bg-pink-600",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      action: "Document uploaded",
      item: "Educational Credential Assessment",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      action: "CRS Score updated",
      item: "New score: 485 points (+15)",
      time: "1 day ago",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      action: "Profile completed",
      item: "Work experience section",
      time: "2 days ago",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      action: "Document reminder",
      item: "Police clearance certificate due",
      time: "3 days ago",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  // Upcoming deadlines
  const upcomingDeadlines = [
    {
      task: "Language test expiry",
      date: "March 15, 2024",
      priority: "high",
      daysLeft: 45,
    },
    {
      task: "Medical examination",
      date: "February 28, 2024",
      priority: "medium",
      daysLeft: 28,
    },
    {
      task: "Police clearance renewal",
      date: "April 10, 2024",
      priority: "low",
      daysLeft: 71,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, John!
              </h1>
              <p className="text-gray-600 mt-2">
                Here's an overview of your immigration journey progress.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
                <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-0 h-auto leading-none">
                  3
                </Badge>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${stat.borderColor} border-l-4`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${stat.changeColor}`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Navigate to key sections of your immigration portal
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Card
                        key={index}
                        className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-xl ${action.iconBg} group-hover:scale-110 transition-transform duration-300`}
                            >
                              <Icon className={`h-5 w-5 ${action.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {action.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                {action.description}
                              </p>
                              <Button
                                size="sm"
                                asChild
                                className={`${action.color} text-white shadow-md`}
                              >
                                <Link to={action.href} className="gap-2">
                                  Go to {action.title}
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Application Progress Details */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Application Progress
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of your immigration application status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">
                        Overall Completion
                      </span>
                      <span className="text-blue-600 font-semibold">75%</span>
                    </div>
                    <Progress value={75} className="h-3 bg-gray-200" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Profile Complete
                          </p>
                          <p className="text-xs text-gray-500">
                            Personal information verified
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            CRS Score Calculated
                          </p>
                          <p className="text-xs text-gray-500">
                            Competitive score achieved
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Document Collection
                          </p>
                          <p className="text-xs text-gray-500">
                            8 of 12 documents uploaded
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Application Submission
                          </p>
                          <p className="text-xs text-gray-500">
                            Waiting for document completion
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Medical Examination
                          </p>
                          <p className="text-xs text-gray-500">
                            Scheduled after ITA
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Final Decision
                          </p>
                          <p className="text-xs text-gray-500">
                            Pending application review
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest updates on your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                      >
                        <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                          <Icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.item}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>Important dates to remember</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${getPriorityColor(deadline.priority)}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{deadline.task}</p>
                        <Badge variant="outline" className="text-xs">
                          {deadline.daysLeft} days
                        </Badge>
                      </div>
                      <p className="text-xs opacity-80">{deadline.date}</p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  View Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">
                  Quick Resources
                </CardTitle>
                <CardDescription>Helpful tools and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-3"
                  >
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    Immigration Guide
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-3"
                  >
                    <Download className="h-4 w-4 text-green-600" />
                    Document Templates
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-3"
                  >
                    <Globe className="h-4 w-4 text-purple-600" />
                    Country Requirements
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-3"
                  >
                    <Award className="h-4 w-4 text-orange-600" />
                    Success Stories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
