"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { formatPhone } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import type { UserRole, AdminUserUpdate } from "@/lib/types";
import { GraduationCap, Users } from "lucide-react";

interface UserFormProps {
  state: "update" | "create";
  userData?: AdminUserUpdate;
  title?: string;
  className?: string;
}

export default function UserForm({
  state = "create",
  userData,
  title,
  className,
}: UserFormProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [, forceUpdate] = useState(false);

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

  const defaultForm: AdminUserUpdate = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  };

  const [formData, setFormData] = useState<AdminUserUpdate>(defaultForm);

  /* Load data for update */
  useEffect(() => {
    if (state === "update" && userData) {
      setFormData({
        firstName: userData.firstName ?? "",
        lastName: userData.lastName ?? "",
        email: userData.email ?? "",
        phone: userData.phone ?? "",
        password: "",
        role: userData.role,
      });
      setRole(userData.role as UserRole);
    }
  }, [state, userData]);

  /* Input handler  */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length > 10) return;
      setFormData((prev) => ({ ...prev, phone: digits }));
      validator.current.showMessageFor("phone");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    validator.current.showMessageFor(name);
  };

  /* Submit  */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return;
    }

    setIsLoading(true);

    const payload = {
      ...formData,
      role,
    };

    try {
      console.log(state === "create" ? "CREATE USER" : "UPDATE USER", payload);

      toast({
        title: "Success",
        description:
          state === "create"
            ? "User created successfully"
            : "User updated successfully",
      });

      setOpen(false);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={` min-w-fit ${className}`}> {title ?? "Add New User"}</div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create an User</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Get started with Pathfinder today
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {/* ROLE (UNCHANGED UI) */}
          <RadioGroup
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
            disabled={state === "update" && true}
            className="flex h-15 "
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer w-full">
              <RadioGroupItem value="student" id="student" />
              <Label
                htmlFor="student"
                className="flex items-center gap-2 flex-1"
              >
                <GraduationCap className="w-4 h-4" /> Student
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer w-full">
              <RadioGroupItem value="educator" id="educator" />
              <Label
                htmlFor="educator"
                className="flex items-center gap-2 flex-1"
              >
                <Users className="w-4 h-4" /> Educator
              </Label>
            </div>
          </RadioGroup>

          {/* FIRST NAME */}
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <div className="text-red-500 text-sm">
              {validator.current.message(
                "firstName",
                formData.firstName,
                "required|min:3"
              )}
            </div>
          </div>

          {/* LAST NAME */}
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <div className="text-red-500 text-sm">
              {validator.current.message(
                "lastName",
                formData.lastName,
                "required|min:3"
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
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

          {/* PASSWORD */}
          {state === "create" && (
            <div className="space-y-2">
              <Label>Password</Label>
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message(
                  "password",
                  formData.password,
                  "required|strongPassword"
                )}
              </div>
            </div>
          )}

          {/* PHONE */}
          {state === "update" && (
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                name="phone"
                value={formatPhone(formData.phone || "")}
                onChange={handleInputChange}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message(
                  "phone",
                  formData.phone,
                  "required|numeric|min:10|max:10"
                )}
              </div>
            </div>
          )}

          {state === "create" && (
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Loading..." : "Create account"}
            </Button>
          )}
          {state === "update" && (
            <div className="flex justify-end gap-5">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setOpen(false);
                }}
              >
                cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
