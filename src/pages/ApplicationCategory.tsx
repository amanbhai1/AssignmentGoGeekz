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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Info,
  ArrowRight,
  Star,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  program: string;
  description: string;
  eligibility: string[];
  requirements: string[];
  processingTime: string;
  minCRS: number;
  status: "available" | "selected" | "not-eligible";
  popularity: "high" | "medium" | "low";
  icon: any;
}

const ApplicationCategory = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("express-entry-fsw");

  const categories: Category[] = [
    {
      id: "express-entry-fsw",
      name: "Federal Skilled Worker",
      program: "Express Entry",
      description:
        "For skilled workers with foreign work experience who want to immigrate to Canada permanently.",
      eligibility: [
        "At least 1 year of continuous full-time skilled work experience",
        "Language proficiency in English and/or French",
        "Education equivalent to Canadian high school",
        "Meet minimum requirements in all six factors",
      ],
      requirements: [
        "Minimum CLB 7 in all language abilities",
        "Educational Credential Assessment (ECA)",
        "Proof of work experience",
        "Proof of funds",
      ],
      processingTime: "6 months",
      minCRS: 470,
      status: "selected",
      popularity: "high",
      icon: Briefcase,
    },
    {
      id: "express-entry-cec",
      name: "Canadian Experience Class",
      program: "Express Entry",
      description:
        "For skilled workers who have Canadian work experience and want to become permanent residents.",
      eligibility: [
        "At least 1 year of skilled work experience in Canada",
        "Language proficiency requirements",
        "Plan to live outside Quebec",
      ],
      requirements: [
        "Minimum CLB 7 for NOC TEER 0 or 1",
        "Minimum CLB 5 for NOC TEER 2 or 3",
        "Canadian work experience letters",
        "Language test results",
      ],
      processingTime: "6 months",
      minCRS: 450,
      status: "available",
      popularity: "high",
      icon: MapPin,
    },
    {
      id: "express-entry-pnp",
      name: "Provincial Nominee Program",
      program: "Express Entry",
      description:
        "For workers who have the skills, education and work experience to contribute to a specific province.",
      eligibility: [
        "Meet provincial nominee requirements",
        "Meet federal requirements",
        "Intent to live in nominating province",
      ],
      requirements: [
        "Provincial nomination certificate",
        "Meet Express Entry requirements",
        "Language test results",
        "Educational credentials",
      ],
      processingTime: "6 months + provincial processing",
      minCRS: 600,
      status: "available",
      popularity: "medium",
      icon: Star,
    },
    {
      id: "family-sponsorship",
      name: "Family Class Sponsorship",
      program: "Family Class",
      description:
        "For Canadian citizens and permanent residents to sponsor eligible relatives.",
      eligibility: [
        "Canadian citizen or permanent resident",
        "Meet financial requirements",
        "Eligible relationship to sponsored person",
      ],
      requirements: [
        "Sponsorship agreement",
        "Financial evaluation",
        "Relationship proof",
        "Background checks",
      ],
      processingTime: "12-24 months",
      minCRS: 0,
      status: "available",
      popularity: "medium",
      icon: Users,
    },
    {
      id: "start-up-visa",
      name: "Start-up Visa Program",
      program: "Economic Class",
      description:
        "For entrepreneurs with innovative business ideas and support from designated organizations.",
      eligibility: [
        "Qualifying business and commitment",
        "Letter of support from designated organization",
        "Language requirements",
        "Sufficient funds",
      ],
      requirements: [
        "Business plan and commitment certificate",
        "Letter of support",
        "CLB 5 minimum language proficiency",
        "Proof of funds",
      ],
      processingTime: "12-16 months",
      minCRS: 0,
      status: "not-eligible",
      popularity: "low",
      icon: GraduationCap,
    },
    {
      id: "caregiver-program",
      name: "Home Child Care Provider",
      program: "Caregiver Program",
      description:
        "For qualified caregivers who want to work in Canada and eventually become permanent residents.",
      eligibility: [
        "Education equivalent to Canadian high school",
        "Language proficiency",
        "Recent relevant work experience or training",
      ],
      requirements: [
        "Educational credential assessment",
        "CLB 5 language proficiency",
        "Work experience or training certificates",
        "Job offer (if applicable)",
      ],
      processingTime: "12-24 months",
      minCRS: 0,
      status: "available",
      popularity: "low",
      icon: Users,
    },
  ];

  const selectedCat = categories.find((cat) => cat.id === selectedCategory);

  const handleSelectCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category?.status === "not-eligible") {
      toast.error(
        "You may not be eligible for this program based on your profile.",
      );
      return;
    }

    setSelectedCategory(categoryId);
    toast.success(`${category?.name} program selected!`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selected":
        return (
          <Badge className="bg-green-100 text-green-800">
            Currently Selected
          </Badge>
        );
      case "available":
        return <Badge className="bg-blue-100 text-blue-800">Available</Badge>;
      case "not-eligible":
        return <Badge className="bg-red-100 text-red-800">Not Eligible</Badge>;
      default:
        return null;
    }
  };

  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case "high":
        return (
          <div className="flex">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          </div>
        );
      case "medium":
        return (
          <div className="flex">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 text-gray-300" />
          </div>
        );
      case "low":
        return (
          <div className="flex">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 text-gray-300" />
            <Star className="h-3 w-3 text-gray-300" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Application Categories
          </h1>
          <p className="text-gray-600 mt-2">
            Choose the immigration program that best fits your profile and goals
          </p>
        </div>

        {/* Current Selection Alert */}
        {selectedCat && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Currently Selected:</strong> {selectedCat.name} under the{" "}
              {selectedCat.program} program. You can change your selection at
              any time before submitting your application.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;

                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    } ${category.status === "not-eligible" ? "opacity-60" : ""}`}
                    onClick={() => handleSelectCategory(category.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              isSelected ? "bg-blue-500" : "bg-gray-100"
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 ${
                                isSelected ? "text-white" : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-xl">
                                {category.name}
                              </CardTitle>
                              {getPopularityIcon(category.popularity)}
                            </div>
                            <p className="text-sm text-blue-600 font-medium mb-2">
                              {category.program}
                            </p>
                            <CardDescription className="text-base">
                              {category.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(category.status)}
                          {isSelected && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Processing: {category.processingTime}
                          </span>
                        </div>
                        {category.minCRS > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-blue-100 rounded text-blue-600 text-xs flex items-center justify-center font-bold">
                              C
                            </div>
                            <span className="text-sm text-gray-600">
                              Min CRS: {category.minCRS}+
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <div className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {category.popularity === "high"
                              ? "Most Popular"
                              : category.popularity === "medium"
                                ? "Popular"
                                : "Specialized"}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Key Eligibility Criteria:
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {category.eligibility
                              .slice(0, 2)
                              .map((item, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCategory(category.id);
                          }}
                          disabled={category.status === "not-eligible"}
                        >
                          {isSelected ? "Selected" : "Select Program"}
                          {!isSelected && (
                            <ArrowRight className="h-4 w-4 ml-2" />
                          )}
                        </Button>

                        {category.status === "not-eligible" && (
                          <span className="text-xs text-red-600">
                            Profile mismatch
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Selected Category Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {selectedCat && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <selectedCat.icon className="h-5 w-5" />
                      {selectedCat.name}
                    </CardTitle>
                    <CardDescription>{selectedCat.program}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">
                        Eligibility Requirements
                      </h4>
                      <ul className="space-y-2">
                        {selectedCat.eligibility.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-3">Required Documents</h4>
                      <ul className="space-y-2">
                        {selectedCat.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Processing Time
                        </span>
                        <span className="text-sm text-gray-600">
                          {selectedCat.processingTime}
                        </span>
                      </div>
                      {selectedCat.minCRS > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Minimum CRS Score
                          </span>
                          <span className="text-sm text-gray-600">
                            {selectedCat.minCRS}+
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Popularity</span>
                        <div>{getPopularityIcon(selectedCat.popularity)}</div>
                      </div>
                    </div>

                    <Button className="w-full">
                      View Detailed Requirements
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Help Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Not sure which program is right for you? Our eligibility
                    assessment can help you find the best path to Canadian
                    immigration.
                  </p>
                  <Button variant="outline" className="w-full">
                    Take Eligibility Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCategory;
