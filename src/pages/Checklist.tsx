import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Users,
  CreditCard,
  Globe,
  Shield,
  Stethoscope,
  GraduationCap,
  Download,
  Printer,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending";
  isRequired: boolean;
  estimatedTime: string;
  icon: any;
  dependencies?: string[];
  resources?: string[];
}

const Checklist = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Complete Language Testing",
      description: "Take IELTS, CELPIP, or other approved language test",
      category: "Language Proficiency",
      priority: "high",
      status: "completed",
      isRequired: true,
      estimatedTime: "2-4 weeks",
      icon: Globe,
      resources: [
        "Official IELTS website",
        "CELPIP test centers",
        "Language preparation courses",
      ],
    },
    {
      id: "2",
      title: "Educational Credential Assessment (ECA)",
      description: "Get your foreign education credentials assessed",
      category: "Education",
      priority: "high",
      status: "completed",
      isRequired: true,
      estimatedTime: "6-8 weeks",
      icon: GraduationCap,
      resources: ["WES Canada", "ICAS", "IQAS"],
    },
    {
      id: "3",
      title: "Gather Work Experience Documentation",
      description:
        "Collect reference letters from current and previous employers",
      category: "Employment",
      priority: "high",
      status: "in-progress",
      isRequired: true,
      estimatedTime: "2-3 weeks",
      icon: FileText,
      dependencies: [
        "Contact HR departments",
        "Format according to IRCC requirements",
      ],
    },
    {
      id: "4",
      title: "Create Express Entry Profile",
      description: "Submit your Express Entry profile online",
      category: "Application",
      priority: "high",
      status: "pending",
      isRequired: true,
      estimatedTime: "1-2 hours",
      icon: Users,
      dependencies: ["1", "2", "3"],
    },
    {
      id: "5",
      title: "Obtain Police Clearance Certificates",
      description: "Get police certificates from all countries where you lived",
      category: "Background Check",
      priority: "medium",
      status: "pending",
      isRequired: true,
      estimatedTime: "4-12 weeks",
      icon: Shield,
      resources: ["Country-specific requirements", "Embassy contacts"],
    },
    {
      id: "6",
      title: "Medical Examination",
      description: "Complete medical exam with an approved panel physician",
      category: "Medical",
      priority: "medium",
      status: "pending",
      isRequired: true,
      estimatedTime: "1-2 weeks",
      icon: Stethoscope,
      dependencies: ["Receive Invitation to Apply (ITA)"],
    },
    {
      id: "7",
      title: "Proof of Funds",
      description: "Gather bank statements and financial documentation",
      category: "Financial",
      priority: "high",
      status: "in-progress",
      isRequired: true,
      estimatedTime: "1 week",
      icon: CreditCard,
      resources: [
        "Bank statements (6 months)",
        "Investment portfolio",
        "Gift deed (if applicable)",
      ],
    },
    {
      id: "8",
      title: "Passport and Photos",
      description: "Ensure passport is valid and obtain passport-sized photos",
      category: "Documentation",
      priority: "medium",
      status: "completed",
      isRequired: true,
      estimatedTime: "1-2 days",
      icon: FileText,
    },
    {
      id: "9",
      title: "Birth Certificate",
      description:
        "Obtain official birth certificate and translation if needed",
      category: "Documentation",
      priority: "medium",
      status: "completed",
      isRequired: true,
      estimatedTime: "1-2 weeks",
      icon: FileText,
    },
    {
      id: "10",
      title: "Marriage Certificate (if applicable)",
      description: "Provide marriage certificate and spouse documentation",
      category: "Family Documentation",
      priority: "medium",
      status: "completed",
      isRequired: false,
      estimatedTime: "1 week",
      icon: Users,
    },
    {
      id: "11",
      title: "Digital Photo Requirements",
      description: "Prepare digital photos meeting IRCC specifications",
      category: "Documentation",
      priority: "low",
      status: "pending",
      isRequired: true,
      estimatedTime: "1 day",
      icon: FileText,
    },
    {
      id: "12",
      title: "Travel History",
      description: "Compile complete travel history for the past 10 years",
      category: "Background Information",
      priority: "low",
      status: "in-progress",
      isRequired: true,
      estimatedTime: "2-3 hours",
      icon: Globe,
    },
  ]);

  const toggleItemStatus = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStatus =
            item.status === "completed" ? "pending" : "completed";
          toast.success(
            newStatus === "completed"
              ? `"${item.title}" marked as completed!`
              : `"${item.title}" marked as pending`,
          );
          return { ...item, status: newStatus };
        }
        return item;
      }),
    );
  };

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const getCompletionStats = () => {
    const completed = items.filter(
      (item) => item.status === "completed",
    ).length;
    const total = items.length;
    const percentage = (completed / total) * 100;
    return { completed, total, percentage };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-orange-500";
      default:
        return "border-l-blue-500";
    }
  };

  const stats = getCompletionStats();

  const isItemEnabled = (item: ChecklistItem) => {
    if (!item.dependencies) return true;
    return item.dependencies.every(
      (depId) => items.find((i) => i.id === depId)?.status === "completed",
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Immigration Checklist
            </h1>
            <p className="text-gray-600 mt-2">
              Track your progress through the immigration process
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Overall Progress</h3>
                <p className="text-gray-600">
                  {stats.completed} of {stats.total} items completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(stats.percentage)}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            <Progress value={stats.percentage} className="h-3" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {items.filter((i) => i.status === "completed").length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {items.filter((i) => i.status === "in-progress").length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {items.filter((i) => i.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist by Category */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryItems = items.filter(
              (item) => item.category === category,
            );
            const completedInCategory = categoryItems.filter(
              (item) => item.status === "completed",
            ).length;
            const categoryProgress =
              (completedInCategory / categoryItems.length) * 100;

            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{category}</CardTitle>
                      <CardDescription>
                        {completedInCategory} of {categoryItems.length} items
                        completed
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-blue-600">
                        {Math.round(categoryProgress)}%
                      </div>
                      <Progress value={categoryProgress} className="w-24 h-2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryItems.map((item) => {
                      const Icon = item.icon;
                      const isEnabled = isItemEnabled(item);

                      return (
                        <div
                          key={item.id}
                          className={`border-l-4 pl-4 py-3 ${getPriorityColor(item.priority)} ${
                            !isEnabled ? "opacity-50" : ""
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={item.status === "completed"}
                              onCheckedChange={() => toggleItemStatus(item.id)}
                              disabled={!isEnabled}
                              className="mt-1"
                            />

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-start gap-3">
                                  <div className="bg-gray-100 p-2 rounded-lg">
                                    <Icon className="h-4 w-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {item.title}
                                      {item.isRequired && (
                                        <span className="text-red-500 ml-1">
                                          *
                                        </span>
                                      )}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(item.status)}
                                  {getStatusBadge(item.status)}
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>Est. time: {item.estimatedTime}</span>
                                  <span className="capitalize">
                                    Priority: {item.priority}
                                  </span>
                                  {!isEnabled && item.dependencies && (
                                    <span className="text-orange-600">
                                      Waiting for dependencies
                                    </span>
                                  )}
                                </div>
                              </div>

                              {item.resources && (
                                <div className="mt-2">
                                  <Separator className="my-2" />
                                  <div className="text-xs text-gray-600">
                                    <span className="font-medium">
                                      Resources:{" "}
                                    </span>
                                    {item.resources.join(" • ")}
                                  </div>
                                </div>
                              )}

                              {item.dependencies && !isEnabled && (
                                <div className="mt-2 p-2 bg-orange-50 rounded text-xs text-orange-700">
                                  Complete required items first:{" "}
                                  {item.dependencies
                                    .map(
                                      (depId) =>
                                        items.find((i) => i.id === depId)
                                          ?.title,
                                    )
                                    .join(", ")}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                • Items marked with <span className="text-red-500">*</span> are
                required for your application
              </p>
              <p>
                • Some items may only be available after receiving an Invitation
                to Apply (ITA)
              </p>
              <p>
                • Processing times are estimates and may vary depending on your
                country of residence
              </p>
              <p>
                • Keep all original documents and certified copies for your
                records
              </p>
              <p>• Check for updates regularly as requirements may change</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checklist;
