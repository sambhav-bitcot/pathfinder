"use client";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef, useState } from "react";
import { CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { UpdatePassword } from "@/lib/types";
import SimpleReactValidator from "simple-react-validator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

import { passwordResetAPI } from "@/lib/utils";

function PasswordResetPage() {
  const [api, setApi] = useState("");

  const { toast } = useToast();
  const { user } = useAuth();
  const [, forceUpdate] = useState(false);

  useEffect(() => {
    if (user) setApi(passwordResetAPI[user.role]);
    console.log(passwordResetAPI[user?.role!]);
    
  }, [user?.role]);

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
      autoForceUpdate: { forceUpdate: () => forceUpdate((v) => !v) },
    })
  );

  const [formData, setFormData] = useState<UpdatePassword>({
    password: "",
    newPassword: "",
    retypePassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.retypePassword) {
      validator.current.showMessageFor("retypePassword");
      return;
    }

    if (!validator.current.allValid()) {
      validator.current.showMessages();

      console.log("Updated Values:", formData);
      return;
    }
    try {
      //handle api logic
      console.log("click");

      if (success)
        toast({
          variant: "default",
          title: "Password Update",
          description: "Password successfully changed",
        });
      if (!success)
        toast({
          variant: "destructive",
          title: "Password Update",
          description: "Password Updation Failed",
        });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password Update",
        description: "Password Updation Failed",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validator.current.showMessageFor(name);
  };

  return (
    <div className="p-4 flex flex-col gap-10">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Set a new password to keep your account secure
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Current Password</Label>
              <PasswordInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "password",
                  formData.password,
                  "required|min:8"
                )}
              </span>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <PasswordInput
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Minimum 8 characters"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "newPassword",
                  formData.newPassword,
                  "required|min:8|strongPassword"
                )}
              </span>
            </div>

            {/* Retype New Password */}
            <div className="space-y-2">
              <Label htmlFor="retypePassword">Retype New Password</Label>
              <PasswordInput
                id="retypePassword"
                name="retypePassword"
                type="password"
                value={formData.retypePassword}
                onChange={handleInputChange}
                placeholder="Minimum 8 characters"
              />
              <span className="text-red-500 text-sm">
                {formData.newPassword !== formData.retypePassword
                  ? "Passwords do not match"
                  : validator.current.message(
                      "retypePassword",
                      formData.retypePassword,
                      "required|min:8|strongPassword"
                    )}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-fit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}

export default PasswordResetPage;
