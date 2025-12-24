"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Reset Password failed",
        description: "Invalid email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-lg space-y-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Forgot password</CardTitle>
          <CardDescription>
            Enter the email associated with your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" p-2 pl-3 placeholder:text-md "
              />
            </div>

            <Button
              type="submit"
              className="w-full text-md"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
