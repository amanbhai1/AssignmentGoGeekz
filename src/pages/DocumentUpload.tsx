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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  Plus,
  Info,
  Search,
  Filter,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  status: "required" | "uploaded" | "verified" | "rejected";
  description: string;
  uploadedDate?: string;
  fileName?: string;
  fileSize?: string;
  category: string;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Passport",
      type: "passport",
      status: "verified",
      description: "Valid passport with at least 6 months remaining validity",
      uploadedDate: "2023-12-10",
      fileName: "passport_john_doe.pdf",
      fileSize: "2.1 MB",
      category: "Identity",
    },
    {
      id: "2",
      name: "Educational Credential Assessment (ECA)",
      type: "eca",
      status: "verified",
      description:
        "Educational credentials evaluated by designated organization",
      uploadedDate: "2023-12-08",
      fileName: "eca_report_wes.pdf",
      fileSize: "1.8 MB",
      category: "Education",
    },
    {
      id: "3",
      name: "Language Test Results",
      type: "language",
      status: "uploaded",
      description: "IELTS, CELPIP, or other approved language test results",
      uploadedDate: "2023-12-12",
      fileName: "ielts_results.pdf",
      fileSize: "850 KB",
      category: "Language",
    },
    {
      id: "4",
      name: "Work Experience Letters",
      type: "work",
      status: "required",
      description: "Reference letters from current and previous employers",
      category: "Employment",
    },
    {
      id: "5",
      name: "Police Clearance Certificate",
      type: "police",
      status: "required",
      description: "Police clearance from country of residence and nationality",
      category: "Background",
    },
    {
      id: "6",
      name: "Medical Examination",
      type: "medical",
      status: "required",
      description: "Medical examination by panel physician",
      category: "Medical",
    },
    {
      id: "7",
      name: "Proof of Funds",
      type: "funds",
      status: "uploaded",
      description: "Bank statements showing settlement funds",
      uploadedDate: "2023-12-14",
      fileName: "bank_statement_6months.pdf",
      fileSize: "3.2 MB",
      category: "Financial",
    },
    {
      id: "8",
      name: "Birth Certificate",
      type: "birth",
      status: "uploaded",
      description: "Official birth certificate with translation if applicable",
      uploadedDate: "2023-12-09",
      fileName: "birth_certificate.pdf",
      fileSize: "1.1 MB",
      category: "Identity",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "all",
    "Identity",
    "Education",
    "Language",
    "Employment",
    "Background",
    "Medical",
    "Financial",
  ];

  const handleFileUpload = (documentId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: "uploaded",
              uploadedDate: new Date().toISOString().split("T")[0],
              fileName: `document_${Date.now()}.pdf`,
              fileSize: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
            }
          : doc,
      ),
    );
    toast.success("Document uploaded successfully!");
  };

  const handleDelete = (documentId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: "required",
              uploadedDate: undefined,
              fileName: undefined,
              fileSize: undefined,
            }
          : doc,
      ),
    );
    toast.success("Document deleted successfully!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "uploaded":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Verified
          </Badge>
        );
      case "uploaded":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Uploaded
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            Required
          </Badge>
        );
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const uploadedCount = documents.filter(
    (doc) => doc.status === "uploaded" || doc.status === "verified",
  ).length;
  const totalCount = documents.length;
  const progressPercentage = (uploadedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Document Upload Center
          </h1>
          <p className="text-lg text-gray-600">
            Upload and manage your immigration documents securely
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Upload Progress
                </h3>
                <p className="text-lg text-gray-600">
                  {uploadedCount} of {totalCount} documents completed
                </p>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {Math.round(progressPercentage)}%
                </div>
                <Progress
                  value={progressPercentage}
                  className="w-full lg:w-48 h-3 mb-2"
                />
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Important:</strong> All documents must be in PDF format,
            clear and legible. Maximum file size is 5MB per document.
            Translations must be certified if documents are not in English or
            French.
          </AlertDescription>
        </Alert>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter by:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`capitalize ${selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : "border-blue-200 hover:bg-blue-50"}`}
              >
                {category}
                {category !== "all" && (
                  <Badge variant="secondary" className="ml-2 bg-white/20">
                    {
                      documents.filter((doc) => doc.category === category)
                        .length
                    }
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card
              key={document.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(document.status)}
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight text-gray-900">
                        {document.name}
                      </CardTitle>
                      <CardDescription className="mt-1 text-gray-600">
                        {document.description}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(document.status)}
                </div>
                <Badge
                  variant="outline"
                  className="w-fit text-xs text-blue-600 border-blue-200"
                >
                  {document.category}
                </Badge>
              </CardHeader>

              <CardContent className="pt-0">
                {document.status === "required" ? (
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                      onClick={() => handleFileUpload(document.id)}
                    >
                      <Upload className="h-12 w-12 text-blue-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF files only, max 5MB
                      </p>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12"
                      onClick={() => handleFileUpload(document.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {document.fileName}
                        </p>
                        <span className="text-xs text-gray-500 ml-2">
                          {document.fileSize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">
                          Uploaded: {document.uploadedDate}
                        </p>
                        {document.status === "verified" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-200 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-green-200 hover:bg-green-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(document.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {document.status === "rejected" && (
                      <Alert
                        variant="destructive"
                        className="border-red-200 bg-red-50"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-700">
                          Document rejected. Please review requirements and
                          re-upload.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Requirements */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle>Document Requirements & Guidelines</CardTitle>
            <CardDescription className="text-indigo-100">
              Important information for document submission
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-4">
                  Format Requirements
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    PDF format only
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Maximum file size: 5MB
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Clear and legible scans
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Color or high-quality B&W
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-4">
                  Translation Requirements
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Certified translations required
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Include original + translation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Translator certification needed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Official letterhead preferred
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-4">
                  Security & Privacy
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Secure cloud storage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Privacy compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    24/7 monitoring
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUpload;
