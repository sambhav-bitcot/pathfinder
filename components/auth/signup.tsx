"use client";

import type React from "react";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SimpleReactValidator from "simple-react-validator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { signUp } from "@/store/actions/auth-action";
export default function SignupPage() {
  const defaultForm = {
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
    password: "",
    platform: "WEB",
    active_status: true,
    timezone: "EST",
  };

  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        strongPassword: {
          rule: (value: string) => {
            return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value);
          },
          message: "Password must contain at least 1 alphabet and 1 number",
        },
      },
      autoForceUpdate: { forceUpdate: () => setForce((pre) => pre + 1) },
    })
  );

  const [formData, setFormData] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(false);
  const [, setForce] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return;
    }

    setIsLoading(true);

    try {
      let res = await signUp(formData);
      if (res?.success) {
        toast({
          title: "Account created!",
          description: res.message || "Welcome to Pathfinder.",
        });
      } else {
        toast({
          title: "Signup failed",
          description: res.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description:
          (error?.message as string) ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validator.current.showMessageFor(name);
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
                value={"STUDENT"}
                // onValueChange={(value) =>
                //   setFormData((prev) => ({ ...prev, role: value }))
                // }
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="STUDENT" id="student" />
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
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "firstName",
                  formData.firstName,
                  "required|min:3"
                )}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "lastName",
                  formData.lastName,
                  "required|min:3"
                )}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="you@example.com"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message(
                  "email",
                  formData.email,
                  "required|email"
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                minLength={8}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message(
                  "password",
                  formData.password,
                  "required|strongPassword"
                )}
              </div>
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
