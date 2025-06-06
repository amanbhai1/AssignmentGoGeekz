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
import { Calculator, TrendingUp, Info, Save, RotateCcw } from "lucide-react";

const CRSScore = () => {
  const [scores, setScores] = useState({
    // Core Human Capital Factors
    age: 29,
    education: "bachelor",
    englishListening: 8.5,
    englishReading: 8.0,
    englishWriting: 7.5,
    englishSpeaking: 8.0,
    frenchListening: 0,
    frenchReading: 0,
    frenchWriting: 0,
    frenchSpeaking: 0,
    workExperience: 8,

    // Spouse Factors
    hasSpouse: "yes",
    spouseEducation: "bachelor",
    spouseEnglishListening: 7.0,
    spouseEnglishReading: 7.5,
    spouseEnglishWriting: 6.5,
    spouseEnglishSpeaking: 7.0,
    spouseFrenchListening: 0,
    spouseFrenchReading: 0,
    spouseFrenchWriting: 0,
    spouseFrenchSpeaking: 0,
    spouseWorkExperience: 5,

    // Skill Transferability
    canadianEducation: "no",
    canadianWorkExperience: 0,

    // Additional Points
    jobOffer: "no",
    canadianStudy: "no",
    relativesInCanada: "no",
    frenchProficiency: "no",
    provincialNomination: "no",
  });

  const [calculatedScore, setCalculatedScore] = useState(485);

  const calculateCRSScore = () => {
    let totalScore = 0;

    // Core Human Capital Factors (up to 500 points with spouse, 600 without)
    // Age (up to 110 points)
    if (scores.age >= 20 && scores.age <= 29) totalScore += 110;
    else if (scores.age >= 30 && scores.age <= 31) totalScore += 105;
    else if (scores.age >= 32 && scores.age <= 33) totalScore += 100;
    else if (scores.age >= 34 && scores.age <= 35) totalScore += 95;
    else if (scores.age >= 36 && scores.age <= 37) totalScore += 90;
    else if (scores.age >= 38 && scores.age <= 39) totalScore += 85;
    else if (scores.age >= 40 && scores.age <= 41) totalScore += 80;
    else if (scores.age >= 42 && scores.age <= 43) totalScore += 75;
    else if (scores.age >= 44 && scores.age <= 45) totalScore += 70;

    // Education (up to 150 points)
    const educationPoints: Record<string, number> = {
      "less-than-secondary": 0,
      secondary: 30,
      "one-year": 90,
      "two-year": 98,
      bachelor: 120,
      "two-or-more": 128,
      "three-year": 135,
      master: 135,
      phd: 150,
    };
    totalScore += educationPoints[scores.education] || 0;

    // Language (up to 136 points for first official language)
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
    else if (englishCLB >= 5) totalScore += 68;
    else if (englishCLB >= 4) totalScore += 32;

    // Work Experience (up to 80 points)
    if (scores.workExperience >= 6) totalScore += 80;
    else if (scores.workExperience >= 4) totalScore += 70;
    else if (scores.workExperience >= 2) totalScore += 60;
    else if (scores.workExperience >= 1) totalScore += 40;

    // Spouse factors (if applicable)
    if (scores.hasSpouse === "yes") {
      // Spouse education (up to 10 points)
      const spouseEducationPoints: Record<string, number> = {
        "less-than-secondary": 0,
        secondary: 2,
        "one-year": 6,
        "two-year": 7,
        bachelor: 8,
        "two-or-more": 9,
        "three-year": 9,
        master: 10,
        phd: 10,
      };
      totalScore += spouseEducationPoints[scores.spouseEducation] || 0;

      // Spouse language (up to 20 points)
      const spouseEnglishCLB = Math.min(
        Math.floor(scores.spouseEnglishListening),
        Math.floor(scores.spouseEnglishReading),
        Math.floor(scores.spouseEnglishWriting),
        Math.floor(scores.spouseEnglishSpeaking),
      );

      if (spouseEnglishCLB >= 9) totalScore += 20;
      else if (spouseEnglishCLB >= 7) totalScore += 16;
      else if (spouseEnglishCLB >= 5) totalScore += 8;
      else if (spouseEnglishCLB >= 4) totalScore += 0;

      // Spouse work experience (up to 10 points)
      if (scores.spouseWorkExperience >= 5) totalScore += 10;
      else if (scores.spouseWorkExperience >= 3) totalScore += 8;
      else if (scores.spouseWorkExperience >= 1) totalScore += 5;
    }

    // Additional points (up to 600 points)
    if (scores.jobOffer === "yes") totalScore += 50; // NOC TEER 0, 1 job offer
    if (scores.canadianStudy === "yes") totalScore += 15; // 1-2 year program
    if (scores.relativesInCanada === "yes") totalScore += 15;
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
      frenchListening: 0,
      frenchReading: 0,
      frenchWriting: 0,
      frenchSpeaking: 0,
      workExperience: 8,
      hasSpouse: "yes",
      spouseEducation: "bachelor",
      spouseEnglishListening: 7.0,
      spouseEnglishReading: 7.5,
      spouseEnglishWriting: 6.5,
      spouseEnglishSpeaking: 7.0,
      spouseFrenchListening: 0,
      spouseFrenchReading: 0,
      spouseFrenchWriting: 0,
      spouseFrenchSpeaking: 0,
      spouseWorkExperience: 5,
      canadianEducation: "no",
      canadianWorkExperience: 0,
      jobOffer: "no",
      canadianStudy: "no",
      relativesInCanada: "no",
      frenchProficiency: "no",
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            CRS Score Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Calculate your Comprehensive Ranking System score for Express Entry
          </p>
        </div>

        {/* Current Score Display */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {calculatedScore}
                  </h2>
                  <p className="text-gray-600">Current CRS Score</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Badge className={`${scoreCategory.color} text-white`}>
                  {scoreCategory.label}
                </Badge>
                <Progress
                  value={(calculatedScore / 1200) * 100}
                  className="w-64"
                />
                <span className="text-sm text-gray-600">
                  {calculatedScore}/1200
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="core" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="core">Core Factors</TabsTrigger>
            <TabsTrigger value="spouse">Spouse Factors</TabsTrigger>
            <TabsTrigger value="transferability">Skill Transfer</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          {/* Core Human Capital Factors */}
          <TabsContent value="core">
            <Card>
              <CardHeader>
                <CardTitle>Core Human Capital Factors</CardTitle>
                <CardDescription>
                  Age, education, language ability, and work experience (up to
                  600 points)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={scores.age}
                      onChange={(e) =>
                        handleInputChange("age", parseInt(e.target.value) || 0)
                      }
                      min="18"
                      max="45"
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Level of Education</Label>
                    <Select
                      value={scores.education}
                      onValueChange={(value) =>
                        handleInputChange("education", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-secondary">
                          Less than secondary school
                        </SelectItem>
                        <SelectItem value="secondary">
                          Secondary diploma
                        </SelectItem>
                        <SelectItem value="one-year">
                          One-year program
                        </SelectItem>
                        <SelectItem value="two-year">
                          Two-year program
                        </SelectItem>
                        <SelectItem value="bachelor">
                          Bachelor's degree
                        </SelectItem>
                        <SelectItem value="two-or-more">
                          Two or more certificates
                        </SelectItem>
                        <SelectItem value="three-year">
                          Three-year program
                        </SelectItem>
                        <SelectItem value="master">Master's degree</SelectItem>
                        <SelectItem value="phd">Doctoral degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="workExperience">
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
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">English Language Proficiency</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="englishListening">Listening</Label>
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="englishReading">Reading</Label>
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="englishWriting">Writing</Label>
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="englishSpeaking">Speaking</Label>
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
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">
                    French Language Proficiency (Optional)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="frenchListening">Listening</Label>
                      <Input
                        id="frenchListening"
                        type="number"
                        step="0.5"
                        value={scores.frenchListening}
                        onChange={(e) =>
                          handleInputChange(
                            "frenchListening",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frenchReading">Reading</Label>
                      <Input
                        id="frenchReading"
                        type="number"
                        step="0.5"
                        value={scores.frenchReading}
                        onChange={(e) =>
                          handleInputChange(
                            "frenchReading",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frenchWriting">Writing</Label>
                      <Input
                        id="frenchWriting"
                        type="number"
                        step="0.5"
                        value={scores.frenchWriting}
                        onChange={(e) =>
                          handleInputChange(
                            "frenchWriting",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frenchSpeaking">Speaking</Label>
                      <Input
                        id="frenchSpeaking"
                        type="number"
                        step="0.5"
                        value={scores.frenchSpeaking}
                        onChange={(e) =>
                          handleInputChange(
                            "frenchSpeaking",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        max="9"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spouse Factors */}
          <TabsContent value="spouse">
            <Card>
              <CardHeader>
                <CardTitle>Spouse or Common-law Partner Factors</CardTitle>
                <CardDescription>
                  If applicable, include your spouse's education, language, and
                  work experience (up to 40 points)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="hasSpouse">
                    Do you have a spouse or common-law partner?
                  </Label>
                  <Select
                    value={scores.hasSpouse}
                    onValueChange={(value) =>
                      handleInputChange("hasSpouse", value)
                    }
                  >
                    <SelectTrigger className="w-full">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="spouseEducation">
                          Spouse's Education Level
                        </Label>
                        <Select
                          value={scores.spouseEducation}
                          onValueChange={(value) =>
                            handleInputChange("spouseEducation", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-than-secondary">
                              Less than secondary school
                            </SelectItem>
                            <SelectItem value="secondary">
                              Secondary diploma
                            </SelectItem>
                            <SelectItem value="one-year">
                              One-year program
                            </SelectItem>
                            <SelectItem value="two-year">
                              Two-year program
                            </SelectItem>
                            <SelectItem value="bachelor">
                              Bachelor's degree
                            </SelectItem>
                            <SelectItem value="two-or-more">
                              Two or more certificates
                            </SelectItem>
                            <SelectItem value="three-year">
                              Three-year program
                            </SelectItem>
                            <SelectItem value="master">
                              Master's degree
                            </SelectItem>
                            <SelectItem value="phd">Doctoral degree</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="spouseWorkExperience">
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
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">
                        Spouse's English Language Proficiency
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor="spouseEnglishListening">
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
                          />
                        </div>
                        <div>
                          <Label htmlFor="spouseEnglishReading">Reading</Label>
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
                          />
                        </div>
                        <div>
                          <Label htmlFor="spouseEnglishWriting">Writing</Label>
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
                          />
                        </div>
                        <div>
                          <Label htmlFor="spouseEnglishSpeaking">
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
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skill Transferability */}
          <TabsContent value="transferability">
            <Card>
              <CardHeader>
                <CardTitle>Skill Transferability Factors</CardTitle>
                <CardDescription>
                  Combinations of education, language, and work experience (up
                  to 100 points)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="canadianEducation">
                      Canadian Education Credential?
                    </Label>
                    <Select
                      value={scores.canadianEducation}
                      onValueChange={(value) =>
                        handleInputChange("canadianEducation", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="canadianWorkExperience">
                      Canadian Work Experience (years)
                    </Label>
                    <Input
                      id="canadianWorkExperience"
                      type="number"
                      value={scores.canadianWorkExperience}
                      onChange={(e) =>
                        handleInputChange(
                          "canadianWorkExperience",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      min="0"
                      max="10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional Points */}
          <TabsContent value="additional">
            <Card>
              <CardHeader>
                <CardTitle>Additional Points</CardTitle>
                <CardDescription>
                  Job offer, Canadian study/work experience, and other factors
                  (up to 600 points)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobOffer">Valid Job Offer?</Label>
                    <Select
                      value={scores.jobOffer}
                      onValueChange={(value) =>
                        handleInputChange("jobOffer", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes (NOC TEER 0, 1)</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="canadianStudy">
                      Canadian Study Experience?
                    </Label>
                    <Select
                      value={scores.canadianStudy}
                      onValueChange={(value) =>
                        handleInputChange("canadianStudy", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="relativesInCanada">
                      Relatives in Canada?
                    </Label>
                    <Select
                      value={scores.relativesInCanada}
                      onValueChange={(value) =>
                        handleInputChange("relativesInCanada", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="provincialNomination">
                      Provincial Nomination?
                    </Label>
                    <Select
                      value={scores.provincialNomination}
                      onValueChange={(value) =>
                        handleInputChange("provincialNomination", value)
                      }
                    >
                      <SelectTrigger>
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
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={resetForm}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Form
          </Button>
          <Button onClick={calculateCRSScore}>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Score
          </Button>
        </div>

        {/* Information Panel */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              CRS Score Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                • <strong>Maximum possible score:</strong> 1,200 points
              </p>
              <p>
                • <strong>Recent cut-off scores:</strong> Typically range from
                470-500 points
              </p>
              <p>
                • <strong>Core factors:</strong> Age, education, language, work
                experience (up to 600 points)
              </p>
              <p>
                • <strong>Spouse factors:</strong> If applicable (up to 40
                points)
              </p>
              <p>
                • <strong>Skill transferability:</strong> Combinations of
                factors (up to 100 points)
              </p>
              <p>
                • <strong>Additional points:</strong> Job offer, Canadian
                experience, PNP (up to 600 points)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CRSScore;
