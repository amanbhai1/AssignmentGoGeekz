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
      status: "uploaded",
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
    // Simulate file upload
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
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "uploaded":
        return <Badge className="bg-blue-100 text-blue-800">Uploaded</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return (
          <Badge className="bg-orange-100 text-orange-800">Required</Badge>
        );
    }
  };

  const filteredDocuments =
    selectedCategory === "all"
      ? documents
      : documents.filter((doc) => doc.category === selectedCategory);

  const uploadedCount = documents.filter(
    (doc) => doc.status === "uploaded" || doc.status === "verified",
  ).length;
  const totalCount = documents.length;
  const progressPercentage = (uploadedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Document Upload</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage your immigration documents
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Upload Progress</h3>
                <p className="text-gray-600">
                  {uploadedCount} of {totalCount} documents uploaded
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Important Information */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> All documents must be in PDF format,
            clear and legible. Maximum file size is 5MB per document.
            Translations must be certified if documents are not in English or
            French.
          </AlertDescription>
        </Alert>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
                {category !== "all" && (
                  <Badge variant="secondary" className="ml-2">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(document.status)}
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {document.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {document.description}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(document.status)}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {document.status === "required" ? (
                  <div className="space-y-3">
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                      onClick={() => handleFileUpload(document.id)}
                    >
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF files only, max 5MB
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleFileUpload(document.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">
                          {document.fileName}
                        </p>
                        <span className="text-xs text-gray-500">
                          {document.fileSize}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Uploaded on {document.uploadedDate}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(document.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {document.status === "rejected" && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Document rejected. Please review requirements and
                          reupload.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t">
                  <Badge variant="outline" className="text-xs">
                    {document.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Requirements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Document Requirements</CardTitle>
            <CardDescription>
              General guidelines for document submission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Format Requirements</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• PDF format only</li>
                  <li>• Maximum file size: 5MB</li>
                  <li>• Clear and legible scans</li>
                  <li>• Color or high-quality black and white</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Translation Requirements</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • Certified translations for non-English/French documents
                  </li>
                  <li>• Include both original and translated versions</li>
                  <li>• Translator's certification required</li>
                  <li>• Official letterhead preferred</li>
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
