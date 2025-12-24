"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { CardContent } from "../ui/card";
import { useAuth } from "@/contexts/auth-context";
import { type StudentProfileUpdate } from "@/lib/types";
import ChangeAvatar from "./change-avatar";
import SimpleReactValidator from "simple-react-validator";
import { formatPhone } from "@/lib/utils";

function UserProfileUpdate() {
  const [, forceUpdate] = useState(false);

  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate((v) => !v) },
    })
  );
  const defaultForm = {
    firstName: "",
    lastName: "",
    phone: "",
    avatar: "",
  };
  const { user } = useAuth();

  const [formData, setFormData] = useState<StudentProfileUpdate>(defaultForm);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  // Load user profile data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatar: user.avatar,
      });
      setPreviewURL(user.avatar || "");
    }
  }, [user]);

  // Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      setIsLoading(true);
      console.log("Updated Values:", formData);
      return;
    }

    validator.current.showMessages();
  };

  // Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // PHONE LOGIC
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");

      if (digitsOnly.length > 10) return;

      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      validator.current.showMessageFor("phone");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    validator.current.showMessageFor(name);
  };
  // Handle avatar/image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  return (
    <div className="p-4 flex flex-col gap-10">
      {/* Avatar Section */}
      <ChangeAvatar
        previewURL={previewURL}
        onChange={handleImageChange}
        fallback={`${formData.firstName?.charAt(0) || "U"}${
          formData.lastName?.charAt(0) || "N"
        }`}
      />

      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/*First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "firstName",
                  formData.firstName,
                  "required|min:3"
                )}
              </span>
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "lastName",
                  formData.lastName,
                  "required|min:3"
                )}
              </span>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                readOnly
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formatPhone(formData?.phone || "")}
                onChange={handleInputChange}
                placeholder="1234567890"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "phone",
                  formData.phone,
                  "required|numeric|min:10|max:10"
                )}
              </span>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" type="text" value={user?.role || ""} readOnly />
            </div>
          </div>

          <Button type="submit" className="w-fit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Save & Update"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}

export default UserProfileUpdate;
