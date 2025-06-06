import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Shield,
  FileText,
  Calculator,
  Upload,
  Folder,
  CheckSquare,
  LogIn,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Immigration File Management",
      description:
        "Organize and manage all your personal information and documents in one secure place.",
      color: "bg-blue-500",
    },
    {
      icon: Calculator,
      title: "CRS Score Calculator",
      description:
        "Calculate your Comprehensive Ranking System score and understand your Express Entry eligibility.",
      color: "bg-green-500",
    },
    {
      icon: Upload,
      title: "Document Upload System",
      description:
        "Securely upload and manage all required documents with progress tracking.",
      color: "bg-purple-500",
    },
    {
      icon: Folder,
      title: "Application Categories",
      description:
        "Explore different immigration programs and find the best path for your situation.",
      color: "bg-orange-500",
    },
    {
      icon: CheckSquare,
      title: "Interactive Checklist",
      description:
        "Track your progress with our comprehensive immigration checklist and timeline.",
      color: "bg-pink-500",
    },
  ];

  const stats = [
    { label: "Success Rate", value: "95%", icon: CheckCircle },
    { label: "Average Processing", value: "6 months", icon: Clock },
    { label: "Clients Served", value: "10,000+", icon: Users },
    { label: "Countries Supported", value: "50+", icon: Globe },
  ];

  const benefits = [
    "Complete application management in one place",
    "Real-time progress tracking and updates",
    "Secure document storage and management",
    "Expert guidance throughout the process",
    "Mobile-friendly interface for access anywhere",
    "Automated reminders and deadline tracking",
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Immigration Portal</span>
            </div>
            <Button asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              Trusted by thousands of immigrants
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Journey to <span className="text-blue-600">Canada</span>{" "}
              Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your Canadian immigration process with our
              comprehensive digital platform. From application management to
              document tracking, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Link to="/login" className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/application-category">Explore Programs</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-3 inline-block">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you navigate the complex
              immigration process with confidence and ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Immigration Portal?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We understand that immigration can be overwhelming. Our platform
                simplifies the process and provides the tools and guidance you
                need to succeed.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="mt-8" asChild>
                <Link to="/login" className="flex items-center gap-2">
                  Start Your Application
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Begin?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <span>Create your account and complete your profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <span>Calculate your CRS score and explore programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <span>Upload documents and track your progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">4</span>
                  </div>
                  <span>Submit your application with confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Take the First Step Towards Your Canadian Dream
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful applicants who have used our platform
            to navigate their immigration journey. Your new life in Canada is
            just a click away.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/login" className="flex items-center gap-2">
              Sign In to Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Immigration Portal</span>
            </div>
            <p className="text-gray-400">
              Empowering your journey to Canada with secure, comprehensive
              immigration management tools.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
