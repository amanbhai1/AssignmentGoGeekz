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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Calculator,
  TrendingUp,
  Info,
  Save,
  RotateCcw,
  Target,
  Award,
} from "lucide-react";

const CRSScore = () => {
  const [scores, setScores] = useState({
    // Core Human Capital Factors
    age: 29,
    education: "bachelor",
    englishListening: 8.5,
    englishReading: 8.0,
    englishWriting: 7.5,
    englishSpeaking: 8.0,
    workExperience: 8,

    // Spouse Factors
    hasSpouse: "yes",
    spouseEducation: "bachelor",
    spouseEnglishListening: 7.0,
    spouseEnglishReading: 7.5,
    spouseEnglishWriting: 6.5,
    spouseEnglishSpeaking: 7.0,
    spouseWorkExperience: 5,

    // Additional Points
    jobOffer: "no",
    canadianStudy: "no",
    provincialNomination: "no",
  });

  const [calculatedScore, setCalculatedScore] = useState(485);

  const calculateCRSScore = () => {
    let totalScore = 0;

    // Age (up to 110 points)
    if (scores.age >= 20 && scores.age <= 29) totalScore += 110;
    else if (scores.age >= 30 && scores.age <= 31) totalScore += 105;
    else if (scores.age >= 32 && scores.age <= 35) totalScore += 100;
    else if (scores.age >= 36 && scores.age <= 39) totalScore += 90;
    else if (scores.age >= 40 && scores.age <= 45) totalScore += 80;

    // Education (up to 150 points)
    const educationPoints: Record<string, number> = {
      secondary: 30,
      certificate: 90,
      diploma: 98,
      bachelor: 120,
      master: 135,
      phd: 150,
    };
    totalScore += educationPoints[scores.education] || 0;

    // Language (up to 136 points for English)
    const englishCLB = Math.min(
      Math.floor(scores.englishListening),
      Math.floor(scores.englishReading),
      Math.floor(scores.englishWriting),
      Math.floor(scores.englishSpeaking),
    );

    if (englishCLB >= 9) totalScore += 136;
    else if (englishCLB >= 8) totalScore += 124;
    else if (englishCLB >= 7) totalScore += 110;
    else if (englishCLB >= 6) totalScore += 88;

    // Work Experience (up to 80 points)
    if (scores.workExperience >= 6) totalScore += 80;
    else if (scores.workExperience >= 4) totalScore += 70;
    else if (scores.workExperience >= 2) totalScore += 60;
    else if (scores.workExperience >= 1) totalScore += 40;

    // Spouse factors (if applicable)
    if (scores.hasSpouse === "yes") {
      const spouseEducationPoints: Record<string, number> = {
        secondary: 2,
        certificate: 6,
        diploma: 7,
        bachelor: 8,
        master: 10,
        phd: 10,
      };
      totalScore += spouseEducationPoints[scores.spouseEducation] || 0;

      const spouseEnglishCLB = Math.min(
        Math.floor(scores.spouseEnglishListening),
        Math.floor(scores.spouseEnglishReading),
        Math.floor(scores.spouseEnglishWriting),
        Math.floor(scores.spouseEnglishSpeaking),
      );

      if (spouseEnglishCLB >= 9) totalScore += 20;
      else if (spouseEnglishCLB >= 7) totalScore += 16;
      else if (spouseEnglishCLB >= 5) totalScore += 8;

      if (scores.spouseWorkExperience >= 5) totalScore += 10;
      else if (scores.spouseWorkExperience >= 3) totalScore += 8;
      else if (scores.spouseWorkExperience >= 1) totalScore += 5;
    }

    // Additional points
    if (scores.jobOffer === "yes") totalScore += 50;
    if (scores.canadianStudy === "yes") totalScore += 15;
    if (scores.provincialNomination === "yes") totalScore += 600;

    setCalculatedScore(totalScore);
    toast.success("CRS Score calculated successfully!");
  };

  const resetForm = () => {
    setScores({
      age: 29,
      education: "bachelor",
      englishListening: 8.5,
      englishReading: 8.0,
      englishWriting: 7.5,
      englishSpeaking: 8.0,
      workExperience: 8,
      hasSpouse: "yes",
      spouseEducation: "bachelor",
      spouseEnglishListening: 7.0,
      spouseEnglishReading: 7.5,
      spouseEnglishWriting: 6.5,
      spouseEnglishSpeaking: 7.0,
      spouseWorkExperience: 5,
      jobOffer: "no",
      canadianStudy: "no",
      provincialNomination: "no",
    });
    setCalculatedScore(485);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setScores((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getScoreCategory = (score: number) => {
    if (score >= 500)
      return {
        label: "Excellent",
        color: "bg-green-500",
        textColor: "text-green-700",
      };
    if (score >= 450)
      return {
        label: "Competitive",
        color: "bg-blue-500",
        textColor: "text-blue-700",
      };
    if (score >= 400)
      return {
        label: "Good",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
      };
    return {
      label: "Needs Improvement",
      color: "bg-red-500",
      textColor: "text-red-700",
    };
  };

  const scoreCategory = getScoreCategory(calculatedScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CRS Score Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your Comprehensive Ranking System score for Express Entry
          </p>
        </div>

        {/* Current Score Display */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 mb-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold text-gray-900">
                      {calculatedScore}
                    </h2>
                    <p className="text-lg text-gray-600">Current CRS Score</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Badge
                    className={`${scoreCategory.color} text-white px-6 py-2 text-base font-semibold`}
                  >
                    {scoreCategory.label}
                  </Badge>
                  <Progress
                    value={(calculatedScore / 1200) * 100}
                    className="w-64 h-3"
                  />
                  <span className="text-sm text-gray-600">
                    {calculatedScore}/1200 possible points
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="core" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-blue-50">
            <TabsTrigger
              value="core"
              className="py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              Core Factors
            </TabsTrigger>
            <TabsTrigger
              value="spouse"
              className="py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              Spouse Factors
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className="py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              Additional Points
            </TabsTrigger>
            <TabsTrigger
              value="breakdown"
              className="py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              Score Breakdown
            </TabsTrigger>
          </TabsList>

          {/* Core Human Capital Factors */}
          <TabsContent value="core">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Core Human Capital Factors
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Age, education, language ability, and work experience (up to
                  600 points)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="age" className="font-medium text-gray-700">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={scores.age}
                      onChange={(e) =>
                        handleInputChange("age", parseInt(e.target.value) || 0)
                      }
                      min="18"
                      max="45"
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="education"
                      className="font-medium text-gray-700"
                    >
                      Level of Education
                    </Label>
                    <Select
                      value={scores.education}
                      onValueChange={(value) =>
                        handleInputChange("education", value)
                      }
                    >
                      <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="secondary">
                          Secondary diploma
                        </SelectItem>
                        <SelectItem value="certificate">
                          One-year certificate
                        </SelectItem>
                        <SelectItem value="diploma">
                          Two-year diploma
                        </SelectItem>
                        <SelectItem value="bachelor">
                          Bachelor's degree
                        </SelectItem>
                        <SelectItem value="master">Master's degree</SelectItem>
                        <SelectItem value="phd">Doctoral degree</SelectItem>
                      </SelectContent>
                    </Select>
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
                      value={scores.workExperience}
                      onChange={(e) =>
                        handleInputChange(
                          "workExperience",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      min="0"
                      max="20"
                      className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-gray-900">
                    English Language Proficiency
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
                        type="number"
                        step="0.5"
                        value={scores.englishListening}
                        onChange={(e) =>
                          handleInputChange(
                            "englishListening",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
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
                        type="number"
                        step="0.5"
                        value={scores.englishReading}
                        onChange={(e) =>
                          handleInputChange(
                            "englishReading",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
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
                        type="number"
                        step="0.5"
                        value={scores.englishWriting}
                        onChange={(e) =>
                          handleInputChange(
                            "englishWriting",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
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
                        type="number"
                        step="0.5"
                        value={scores.englishSpeaking}
                        onChange={(e) =>
                          handleInputChange(
                            "englishSpeaking",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
                        className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spouse Factors */}
          <TabsContent value="spouse">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle>Spouse or Common-law Partner Factors</CardTitle>
                <CardDescription className="text-purple-100">
                  If applicable, include your spouse's qualifications (up to 40
                  points)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label
                    htmlFor="hasSpouse"
                    className="font-medium text-gray-700"
                  >
                    Do you have a spouse or common-law partner?
                  </Label>
                  <Select
                    value={scores.hasSpouse}
                    onValueChange={(value) =>
                      handleInputChange("hasSpouse", value)
                    }
                  >
                    <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {scores.hasSpouse === "yes" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="spouseEducation"
                          className="font-medium text-gray-700"
                        >
                          Spouse's Education Level
                        </Label>
                        <Select
                          value={scores.spouseEducation}
                          onValueChange={(value) =>
                            handleInputChange("spouseEducation", value)
                          }
                        >
                          <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="secondary">
                              Secondary diploma
                            </SelectItem>
                            <SelectItem value="certificate">
                              One-year certificate
                            </SelectItem>
                            <SelectItem value="diploma">
                              Two-year diploma
                            </SelectItem>
                            <SelectItem value="bachelor">
                              Bachelor's degree
                            </SelectItem>
                            <SelectItem value="master">
                              Master's degree
                            </SelectItem>
                            <SelectItem value="phd">Doctoral degree</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="spouseWorkExperience"
                          className="font-medium text-gray-700"
                        >
                          Spouse's Work Experience (years)
                        </Label>
                        <Input
                          id="spouseWorkExperience"
                          type="number"
                          value={scores.spouseWorkExperience}
                          onChange={(e) =>
                            handleInputChange(
                              "spouseWorkExperience",
                              parseInt(e.target.value) || 0,
                            )
                          }
                          min="0"
                          max="20"
                          className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-900">
                        Spouse's English Language Proficiency
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label
                            htmlFor="spouseEnglishListening"
                            className="font-medium text-gray-700"
                          >
                            Listening
                          </Label>
                          <Input
                            id="spouseEnglishListening"
                            type="number"
                            step="0.5"
                            value={scores.spouseEnglishListening}
                            onChange={(e) =>
                              handleInputChange(
                                "spouseEnglishListening",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            min="0"
                            max="9"
                            className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="spouseEnglishReading"
                            className="font-medium text-gray-700"
                          >
                            Reading
                          </Label>
                          <Input
                            id="spouseEnglishReading"
                            type="number"
                            step="0.5"
                            value={scores.spouseEnglishReading}
                            onChange={(e) =>
                              handleInputChange(
                                "spouseEnglishReading",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            min="0"
                            max="9"
                            className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="spouseEnglishWriting"
                            className="font-medium text-gray-700"
                          >
                            Writing
                          </Label>
                          <Input
                            id="spouseEnglishWriting"
                            type="number"
                            step="0.5"
                            value={scores.spouseEnglishWriting}
                            onChange={(e) =>
                              handleInputChange(
                                "spouseEnglishWriting",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            min="0"
                            max="9"
                            className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="spouseEnglishSpeaking"
                            className="font-medium text-gray-700"
                          >
                            Speaking
                          </Label>
                          <Input
                            id="spouseEnglishSpeaking"
                            type="number"
                            step="0.5"
                            value={scores.spouseEnglishSpeaking}
                            onChange={(e) =>
                              handleInputChange(
                                "spouseEnglishSpeaking",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            min="0"
                            max="9"
                            className="mt-1 h-12 border-gray-200 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional Points */}
          <TabsContent value="additional">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Additional Points
                </CardTitle>
                <CardDescription className="text-green-100">
                  Job offer, Canadian study/work experience, and other factors
                  (up to 600 points)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="jobOffer"
                      className="font-medium text-gray-700"
                    >
                      Valid Job Offer?
                    </Label>
                    <Select
                      value={scores.jobOffer}
                      onValueChange={(value) =>
                        handleInputChange("jobOffer", value)
                      }
                    >
                      <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes (+50 points)</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="canadianStudy"
                      className="font-medium text-gray-700"
                    >
                      Canadian Study Experience?
                    </Label>
                    <Select
                      value={scores.canadianStudy}
                      onValueChange={(value) =>
                        handleInputChange("canadianStudy", value)
                      }
                    >
                      <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes (+15 points)</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="provincialNomination"
                      className="font-medium text-gray-700"
                    >
                      Provincial Nomination?
                    </Label>
                    <Select
                      value={scores.provincialNomination}
                      onValueChange={(value) =>
                        handleInputChange("provincialNomination", value)
                      }
                    >
                      <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes (+600 points)</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Score Breakdown */}
          <TabsContent value="breakdown">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  CRS Score Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-4">
                      Score Breakdown
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>
                          Core factors (Age, Education, Language, Work)
                        </span>
                        <span className="font-semibold">Up to 600 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spouse factors</span>
                        <span className="font-semibold">Up to 40 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Skill transferability</span>
                        <span className="font-semibold">Up to 100 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional points</span>
                        <span className="font-semibold">Up to 600 pts</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Maximum total</span>
                        <span>1,200 pts</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-4">
                      Recent Cut-off Scores
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Recent draws: 470-500 points</p>
                      <p>
                        • Provincial Nominee Program: 600+ points guaranteed
                      </p>
                      <p>• French speakers: Often 450+ points</p>
                      <p>• Canadian experience: 400+ competitive</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
          <Button
            variant="outline"
            onClick={resetForm}
            className="border-gray-300"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Form
          </Button>
          <div className="flex gap-4">
            <Button
              onClick={calculateCRSScore}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Score
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRSScore;
