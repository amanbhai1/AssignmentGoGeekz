import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  KeyRound,
  Shield,
} from "lucide-react";

type AuthMode = "login" | "signup" | "forgot" | "otp";

const Login = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Simulate API calls
    setTimeout(() => {
      if (authMode === "login") {
        if (email === "demo@example.com" && password === "password") {
          navigate("/dashboard");
        } else {
          setError(
            "Invalid email or password. Use demo@example.com / password",
          );
        }
      } else if (authMode === "signup") {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
        } else if (password.length < 6) {
          setError("Password must be at least 6 characters");
        } else {
          setSuccess("Account created successfully! Please verify your email.");
          setAuthMode("otp");
          setOtpSent(true);
          startResendTimer();
        }
      } else if (authMode === "forgot") {
        setSuccess("Password reset code sent to your email!");
        setAuthMode("otp");
        setOtpSent(true);
        startResendTimer();
      } else if (authMode === "otp") {
        if (otp === "123456") {
          setSuccess("Verification successful!");
          setTimeout(() => {
            if (otpSent) {
              navigate("/dashboard");
            }
          }, 1000);
        } else {
          setError("Invalid verification code. Use 123456 for demo");
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      setSuccess("New verification code sent!");
      startResendTimer();
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setOtp("");
    setError("");
    setSuccess("");
    setOtpSent(false);
    setResendTimer(0);
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    resetForm();
  };

  const getHeaderContent = () => {
    switch (authMode) {
      case "signup":
        return {
          icon: UserPlus,
          title: "Create Account",
          subtitle: "Join the Immigration Portal community",
        };
      case "forgot":
        return {
          icon: KeyRound,
          title: "Reset Password",
          subtitle: "Enter your email to receive a reset code",
        };
      case "otp":
        return {
          icon: Shield,
          title: "Verify Your Identity",
          subtitle: "Enter the verification code sent to your email",
        };
      default:
        return {
          icon: User,
          title: "Welcome Back",
          subtitle: "Sign in to your Immigration Portal account",
        };
    }
  };

  const headerContent = getHeaderContent();
  const HeaderIcon = headerContent.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
              <HeaderIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {headerContent.title}
          </h1>
          <p className="text-gray-600">{headerContent.subtitle}</p>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error/Success Messages */}
              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50"
                >
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* Login Form */}
              {authMode === "login" && (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                        className="border-gray-300"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                      >
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              {/* Sign Up Form */}
              {authMode === "signup" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-gray-700 font-medium"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-gray-700 font-medium"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-12 h-12 border-gray-200 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-gray-700 font-medium"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 pr-12 h-12 border-gray-200 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Forgot Password Form */}
              {authMode === "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    We'll send you a verification code to reset your password.
                  </p>
                </div>
              )}

              {/* OTP Verification Form */}
              {authMode === "otp" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Enter the 6-digit verification code sent to{" "}
                      <strong>{email}</strong>
                    </p>
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      className="justify-center"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="h-12 w-12 text-lg border-gray-200"
                        />
                        <InputOTPSlot
                          index={1}
                          className="h-12 w-12 text-lg border-gray-200"
                        />
                        <InputOTPSlot
                          index={2}
                          className="h-12 w-12 text-lg border-gray-200"
                        />
                        <InputOTPSlot
                          index={3}
                          className="h-12 w-12 text-lg border-gray-200"
                        />
                        <InputOTPSlot
                          index={4}
                          className="h-12 w-12 text-lg border-gray-200"
                        />
                        <InputOTPSlot
                          index={5}
                          className="h-12 w-12 text-lg border-gray-200"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Didn't receive the code?
                    </p>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendTimer > 0}
                      className={`text-sm font-medium ${
                        resendTimer > 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      {resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : "Resend Code"}
                    </button>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium mb-1">
                      Demo Code
                    </p>
                    <p className="text-sm text-blue-600">
                      Use <span className="font-mono font-bold">123456</span>{" "}
                      for demonstration
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {authMode === "login" && "Sign In"}
                    {authMode === "signup" && "Create Account"}
                    {authMode === "forgot" && "Send Reset Code"}
                    {authMode === "otp" && "Verify Code"}
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>

              {/* Back Button for non-login modes */}
              {authMode !== "login" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => switchMode("login")}
                  className="w-full h-12 border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Button>
              )}

              {/* Mode Toggle Links */}
              <div className="text-center space-y-4">
                {authMode === "login" && (
                  <>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-700 font-medium mb-2">
                        Demo Credentials
                      </p>
                      <p className="text-sm text-blue-600">
                        Email:{" "}
                        <span className="font-mono">demo@example.com</span>
                        <br />
                        Password: <span className="font-mono">password</span>
                      </p>
                    </div>

                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signup")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sign up here
                      </button>
                    </p>
                  </>
                )}

                {authMode === "signup" && (
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign in here
                    </button>
                  </p>
                )}

                <p className="text-sm text-gray-500">
                  Need help?{" "}
                  <Link
                    to="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2024 Immigration Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
