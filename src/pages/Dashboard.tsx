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
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Application Status",
      value: "In Progress",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "CRS Score",
      value: "485",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Documents",
      value: "8/12",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Checklist Items",
      value: "15/20",
      icon: CheckSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const quickActions = [
    {
      title: "Update CRS Score",
      description: "Calculate and update your latest CRS score",
      icon: Calculator,
      href: "/crs-score",
      color: "bg-green-500",
    },
    {
      title: "Upload Documents",
      description: "Upload required documents for your application",
      icon: Upload,
      href: "/document-upload",
      color: "bg-blue-500",
    },
    {
      title: "View Checklist",
      description: "Track your application progress",
      icon: CheckSquare,
      href: "/checklist",
      color: "bg-purple-500",
    },
    {
      title: "Immigration File",
      description: "Review and edit your personal information",
      icon: FileText,
      href: "/immigration-file",
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      action: "Document uploaded",
      item: "Educational Credential Assessment",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      action: "CRS Score updated",
      item: "New score: 485 points",
      time: "1 day ago",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      action: "Application category selected",
      item: "Express Entry - Federal Skilled Worker",
      time: "3 days ago",
      icon: Folder,
      color: "text-purple-600",
    },
    {
      action: "Document required",
      item: "Police clearance certificate",
      time: "1 week ago",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back, John!
          </h1>
          <p className="text-gray-600 mt-2">
            Track your immigration application progress and manage your
            documents.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to keep your application moving forward
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.title}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={action.href}>Go</Link>
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Application Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
              <CardDescription>
                Your current progress towards application completion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                  <span className="text-sm">Personal Information</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                  <span className="text-sm">CRS Score Calculation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                  <span className="text-sm">Document Upload</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-800"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                  <span className="text-sm">Final Review</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates on your immigration application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                  >
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
