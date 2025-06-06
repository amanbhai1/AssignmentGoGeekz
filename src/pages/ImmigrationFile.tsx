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
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Save,
  Edit,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
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
    // Simulate saving
    toast.success("Immigration file updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // In a real app, you'd reset to the original data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Immigration File
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your personal information and application details
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Information
              </Button>
            )}
          </div>
        </div>

        {/* File Status */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">File Status: Active</h3>
                  <p className="text-gray-600">
                    Last updated: December 15, 2023
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Complete
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="work" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Work
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <span className="text-xs">🗣️</span>
              Language
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Basic personal details and identification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) =>
                        handleInputChange("nationality", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passportNumber">Passport Number</Label>
                    <Input
                      id="passportNumber"
                      value={formData.passportNumber}
                      onChange={(e) =>
                        handleInputChange("passportNumber", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) =>
                        handleInputChange("maritalStatus", value)
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
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
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Address and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Address</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="province">Province/State</Label>
                        <Input
                          id="province"
                          value={formData.province}
                          onChange={(e) =>
                            handleInputChange("province", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) =>
                            handleInputChange("postalCode", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education Background</CardTitle>
                <CardDescription>
                  Educational qualifications and credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="highestEducation">
                      Highest Level of Education
                    </Label>
                    <Select
                      value={formData.highestEducation}
                      onValueChange={(value) =>
                        handleInputChange("highestEducation", value)
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
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
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={(e) =>
                        handleInputChange("fieldOfStudy", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) =>
                        handleInputChange("institution", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={formData.graduationYear}
                      onChange={(e) =>
                        handleInputChange("graduationYear", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Work Experience */}
          <TabsContent value="work">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Employment history and current position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentJob">Current Job Title</Label>
                    <Input
                      id="currentJob"
                      value={formData.currentJob}
                      onChange={(e) =>
                        handleInputChange("currentJob", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employer">Current Employer</Label>
                    <Input
                      id="employer"
                      value={formData.employer}
                      onChange={(e) =>
                        handleInputChange("employer", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workExperience">
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
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language Proficiency */}
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Language Proficiency</CardTitle>
                <CardDescription>
                  Official language test scores (IELTS, CELPIP, TEF, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">English Proficiency</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="englishListening">Listening</Label>
                      <Input
                        id="englishListening"
                        value={formData.englishListening}
                        onChange={(e) =>
                          handleInputChange("englishListening", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="englishReading">Reading</Label>
                      <Input
                        id="englishReading"
                        value={formData.englishReading}
                        onChange={(e) =>
                          handleInputChange("englishReading", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="englishWriting">Writing</Label>
                      <Input
                        id="englishWriting"
                        value={formData.englishWriting}
                        onChange={(e) =>
                          handleInputChange("englishWriting", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="englishSpeaking">Speaking</Label>
                      <Input
                        id="englishSpeaking"
                        value={formData.englishSpeaking}
                        onChange={(e) =>
                          handleInputChange("englishSpeaking", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">
                    French Proficiency (Optional)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="frenchListening">Listening</Label>
                      <Input
                        id="frenchListening"
                        value={formData.frenchListening}
                        onChange={(e) =>
                          handleInputChange("frenchListening", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frenchReading">Reading</Label>
                      <Input
                        id="frenchReading"
                        value={formData.frenchReading}
                        onChange={(e) =>
                          handleInputChange("frenchReading", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frenchWriting">Writing</Label>
                      <Input
                        id="frenchWriting"
                        value={formData.frenchWriting}
                        onChange={(e) =>
                          handleInputChange("frenchWriting", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frenchSpeaking">Speaking</Label>
                      <Input
                        id="frenchSpeaking"
                        value={formData.frenchSpeaking}
                        onChange={(e) =>
                          handleInputChange("frenchSpeaking", e.target.value)
                        }
                        disabled={!isEditing}
                        placeholder="0.0"
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
