"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { Metadata } from "next";

export default function SignupPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onSignupClick() {
    setError(null); // Reset error before attempting signup
    setLoading(true); // Set loading state

    try {
      const response = await authService.signup({
        firstName,
        lastName,
        email,
        password,
      });

      // Redirect to login page after successful signup
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="flex h-screen font-general-sans w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-xl">
        <CardContent className="w-full">
          <div className="grid gap-4">
            <div className="flex gap-2">
              <div className="grid w-1/2 gap-2">
                <Label htmlFor="FirstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-1/2 gap-2">
                <Label htmlFor="LastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="button"
              className="w-full"
              onClick={onSignupClick}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <Button variant="outline" className="w-full">
              Sign Up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
