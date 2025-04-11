"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, User, Lock, X } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form data submitted:", formData);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registration failed");

      setNotification({
        show: true,
        title: "Account created!",
        message: "You've successfully signed up.",
        type: "success",
      });

      // Uncomment to redirect after successful signup
      // router.push("/sign-in");
    } catch (error) {
      console.error("Registration error:", error);
      setNotification({
        show: true,
        title: "Registration failed",
        message: error.message || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4 py-8">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 w-80 p-4 rounded-lg shadow-lg border ${
            notification.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-500 text-red-800"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="mt-1 text-sm opacity-90">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification({ ...notification, show: false })}
              className="ml-4 p-1 rounded-full hover:bg-slate-200 transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center text-slate-500">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "name", label: "Full Name", icon: <User className="h-4 w-4" />, placeholder: "John Doe" },
              { id: "email", label: "Email Address", icon: <Mail className="h-4 w-4" />, placeholder: "john@example.com", type: "email" },
              { id: "username", label: "Username", icon: <User className="h-4 w-4" />, placeholder: "johndoe" },
            ].map(({ id, label, icon, placeholder, type }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                  </span>
                  <Input
                    id={id}
                    name={id}
                    type={type || "text"}
                    placeholder={placeholder}
                    className="pl-10 h-10 border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData[id]}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-10 border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  disabled={isLoading}
                >
                  {showPassword ? 
                    <EyeOff className="h-4 w-4 text-slate-500" /> : 
                    <Eye className="h-4 w-4 text-slate-500" />
                  }
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 mt-6 font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pt-2 pb-6 px-6 border-t border-slate-100">
          <div className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline transition-all"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}