"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
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
import { User, Lock, Eye, EyeOff, X } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

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
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error.message || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center text-slate-500">
            Enter your credentials to access the medical dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-slate-700">
                Username
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="h-4 w-4" />
                </span>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  className="pl-10 h-10 border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-700">
                Password
              </Label>
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
                  autoComplete="current-password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  disabled={isLoading}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 mt-6 font-medium bg-black hover:bg-gray-800 text-white"
              disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center pt-2 pb-6 px-6 border-t border-slate-100 space-y-4">
          <div className="text-sm text-slate-600 w-full text-center">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline transition-all">
              Create account
            </Link>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-slate-600 hover:text-primary hover:underline transition-all">
            Forgot your password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
