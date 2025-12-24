"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import type { UserRole } from "@/lib/types";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast({
        title: "Account created!",
        description: "Welcome to Pathfinder.",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      
      toast({
        title: "Signup failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>Get started with Pathfinder today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label>I am a...</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="student" id="student" />
                  <Label
                    htmlFor="student"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                  </Label>
                </div>
                {/* <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="educator" id="educator" />
                  <Label
                    htmlFor="educator"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Users className="w-4 h-4" />
                    <span>Educator / Counselor</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label
                    htmlFor="admin"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin / Staff</span>
                  </Label>
                </div> */}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Last Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            {/* <div className="space-y-3">
              <Label>I am a...</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="student" id="student" />
                  <Label
                    htmlFor="student"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="educator" id="educator" />
                  <Label
                    htmlFor="educator"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Users className="w-4 h-4" />
                    <span>Educator / Counselor</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label
                    htmlFor="admin"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin / Staff</span>
                  </Label>
                </div>
              </RadioGroup>
            </div> */}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            {"Already have an account? "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
