"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { Role } from "@/api/enums";

export default function AuthenticationPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onLoginClick() {
    setError(null); // Reset error before attempting login
    try {
      const authResponse = await authService.login({ email, password });

      // Redirect based on user role
      const { role } = authResponse;
      if (role === Role.MANAGER) {
        router.push("/admin");
      } else if (role === Role.USER) {
        router.push("/user");
      } else {
        setError("Unknown role. Please contact support.");
      }
    } catch (error: any) {
      console.error("Login failed:", error);

      // Handle error
      if (error.response?.status === 403) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("Please fill the form with the correct info.");
      }
    }
  }

  return (
    <div className="flex h-screen font-general-sans w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-xl">
        <CardContent className="w-full">
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full" onClick={onLoginClick}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
