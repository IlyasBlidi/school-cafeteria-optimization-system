import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <div className="flex h-screen font-general-sans w-full items-center justify-center px-4">
    <Card className="mx-auto max-w-xl">

      <CardContent className="w-full">

        <div className="grid gap-4 ">

          <div className="flex gap-2">

            <div className="grid w-1/2 gap-2">
              <Label htmlFor="FirstName">FirstName</Label>
              <Input
                id="name"

                placeholder="FirstName"
                required
              />
            </div>
            <div className="grid w-1/2 gap-2">
              <Label htmlFor="FirstName">LastName</Label>
              <Input
                id="name"

                placeholder="LastName"
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
              required
            />
          </div>


          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            SignUp
          </Button>
          <Button variant="outline" className="w-full">
            SignUp with Google
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
  )
}