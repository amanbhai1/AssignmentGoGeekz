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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Save,
  Edit,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  FileText,
} from "lucide-react";

const ImmigrationFile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-05-15",
    nationality: "Indian",
    passportNumber: "A12345678",
    maritalStatus: "Married",

    // Contact Information
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    address: "123 Main Street",
    city: "Toronto",
    province: "Ontario",
    postalCode: "M5V 3A1",
    country: "Canada",

    // Education
    highestEducation: "Bachelor's Degree",
    fieldOfStudy: "Computer Science",
    institution: "University of Toronto",
    graduationYear: "2012",

    // Work Experience
    currentJob: "Software Developer",
    employer: "Tech Company Inc.",
    workExperience: "8",

    // Language Proficiency
    englishListening: "8.5",
    englishReading: "8.0",
    englishWriting: "7.5",
    englishSpeaking: "8.0",
    frenchListening: "",
    frenchReading: "",
    frenchWriting: "",
    frenchSpeaking: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    toast.success("Immigration file updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Immigration File
            </h1>
            <p className="text-lg text-gray-600">
              Manage your personal information and application details
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Information
              </Button>
            )}
          </div>
        </div>

        {/* File Status */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">
                    File Status: Active
                  </h3>
                  <p className="text-gray-600">
                    Last updated: December 15, 2023
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium">
                Profile Complete
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-blue-50">
            <TabsTrigger
              value="personal"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger
              value="work"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Work</span>
            </TabsTrigger>
            <TabsTrigger
              value="language"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Language</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Basic personal details and identification
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="font-medium text-gray-700"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="font-medium text-gray-700"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="dateOfBirth"
                      className="font-medium text-gray-700"
                    >
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="nationality"
                      className="font-medium text-gray-700"
                    >
                      Nationality
                    </Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) =>
                        handleInputChange("nationality", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="passportNumber"
                      className="font-medium text-gray-700"
                    >
                      Passport Number
                    </Label>
                    <Input
                      id="passportNumber"
                      value={formData.passportNumber}
                      onChange={(e) =>
                        handleInputChange("passportNumber", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="maritalStatus"
                      className="font-medium text-gray-700"
                    >
                      Marital Status
                    </Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) =>
                        handleInputChange("maritalStatus", value)
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription className="text-green-100">
                  Address and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="email"
                      className="font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="font-medium text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">
                    Address Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="address"
                        className="font-medium text-gray-700"
                      >
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        disabled={!isEditing}
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label
                          htmlFor="city"
                          className="font-medium text-gray-700"
                        >
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="province"
                          className="font-medium text-gray-700"
                        >
                          Province/State
                        </Label>
                        <Input
                          id="province"
                          value={formData.province}
                          onChange={(e) =>
                            handleInputChange("province", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="postalCode"
                          className="font-medium text-gray-700"
                        >
                          Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) =>
                            handleInputChange("postalCode", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education Background
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Educational qualifications and credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="highestEducation"
                      className="font-medium text-gray-700"
                    >
                      Highest Level of Education
                    </Label>
                    <Select
                      value={formData.highestEducation}
                      onValueChange={(value) =>
                        handleInputChange("highestEducation", value)
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Bachelor's Degree">
                          Bachelor's Degree
                        </SelectItem>
                        <SelectItem value="Master's Degree">
                          Master's Degree
                        </SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="fieldOfStudy"
                      className="font-medium text-gray-700"
                    >
                      Field of Study
                    </Label>
                    <Input
                      id="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={(e) =>
                        handleInputChange("fieldOfStudy", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="institution"
                      className="font-medium text-gray-700"
                    >
                      Institution
                    </Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) =>
                        handleInputChange("institution", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="graduationYear"
                      className="font-medium text-gray-700"
                    >
                      Graduation Year
                    </Label>
                    <Input
                      id="graduationYear"
                      value={formData.graduationYear}
                      onChange={(e) =>
                        handleInputChange("graduationYear", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Work Experience */}
          <TabsContent value="work">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Employment history and current position
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="currentJob"
                      className="font-medium text-gray-700"
                    >
                      Current Job Title
                    </Label>
                    <Input
                      id="currentJob"
                      value={formData.currentJob}
                      onChange={(e) =>
                        handleInputChange("currentJob", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="employer"
                      className="font-medium text-gray-700"
                    >
                      Current Employer
                    </Label>
                    <Input
                      id="employer"
                      value={formData.employer}
                      onChange={(e) =>
                        handleInputChange("employer", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="workExperience"
                      className="font-medium text-gray-700"
                    >
                      Years of Work Experience
                    </Label>
                    <Input
                      id="workExperience"
                      type="number"
                      value={formData.workExperience}
                      onChange={(e) =>
                        handleInputChange("workExperience", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language Proficiency */}
          <TabsContent value="language">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language Proficiency
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Official language test scores (IELTS, CELPIP, TEF, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">
                    English Proficiency
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label
                        htmlFor="englishListening"
                        className="font-medium text-gray-700"
                      >
                        Listening
                      </Label>
                      <Input
                        id="englishListening"
                        value={formData.englishListening}
                        onChange={(e) =>
                          handleInputChange("englishListening", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="englishReading"
                        className="font-medium text-gray-700"
                      >
                        Reading
                      </Label>
                      <Input
                        id="englishReading"
                        value={formData.englishReading}
                        onChange={(e) =>
                          handleInputChange("englishReading", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="englishWriting"
                        className="font-medium text-gray-700"
                      >
                        Writing
                      </Label>
                      <Input
                        id="englishWriting"
                        value={formData.englishWriting}
                        onChange={(e) =>
                          handleInputChange("englishWriting", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="englishSpeaking"
                        className="font-medium text-gray-700"
                      >
                        Speaking
                      </Label>
                      <Input
                        id="englishSpeaking"
                        value={formData.englishSpeaking}
                        onChange={(e) =>
                          handleInputChange("englishSpeaking", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">
                    French Proficiency (Optional)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label
                        htmlFor="frenchListening"
                        className="font-medium text-gray-700"
                      >
                        Listening
                      </Label>
                      <Input
                        id="frenchListening"
                        value={formData.frenchListening}
                        onChange={(e) =>
                          handleInputChange("frenchListening", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="frenchReading"
                        className="font-medium text-gray-700"
                      >
                        Reading
                      </Label>
                      <Input
                        id="frenchReading"
                        value={formData.frenchReading}
                        onChange={(e) =>
                          handleInputChange("frenchReading", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="frenchWriting"
                        className="font-medium text-gray-700"
                      >
                        Writing
                      </Label>
                      <Input
                        id="frenchWriting"
                        value={formData.frenchWriting}
                        onChange={(e) =>
                          handleInputChange("frenchWriting", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="frenchSpeaking"
                        className="font-medium text-gray-700"
                      >
                        Speaking
                      </Label>
                      <Input
                        id="frenchSpeaking"
                        value={formData.frenchSpeaking}
                        onChange={(e) =>
                          handleInputChange("frenchSpeaking", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImmigrationFile;
