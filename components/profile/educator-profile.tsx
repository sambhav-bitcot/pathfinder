"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { CardContent } from "../ui/card";
import { useAuth } from "@/contexts/auth-context";
import { type EducatorProfileUpdate } from "@/lib/types";
import ChangeAvatar from "./change-avatar";
import SimpleReactValidator from "simple-react-validator";
import { formatPhone } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

function EducatorProfileUpdate() {
  const { toast } = useToast();

  const [, forceUpdate] = useState(false);

  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate((v) => !v) },
    })
  );
  const defaultForm = {
    firstName: "",
    lastName: "",
    description: "",
    specialization: "",
    topic: "",
    phone: "",
    avatar: "",
  };
  const { user } = useAuth();

  const [formData, setFormData] = useState<EducatorProfileUpdate>(defaultForm);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatar: user.avatar,
        description: "",
        specialization: "",
        topic: "",
      });
      setPreviewURL(user.avatar || "");
    }
  }, [user]);

  // HANDLE INPUT CHANGE
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return;
    }
    //   setIsLoading(true);
    try {
      //handle api logic
      console.log("click");

      if (success)
        toast({
          variant: "default",
          title: "Profile Update",
          description: "Profile successfully updated",
        });
      if (!success)
        toast({
          variant: "destructive",
          title: "Profile Update",
          description: "Profile Updation Failed",
        });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Profile Update",
        description: "Profile Updation Failed",
      });
    }
    console.log("Final Submitted:", formData);
    return;
  };

  return (
    <div className="p-4 flex flex-col gap-10">
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
            {/* First NAME */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "firstName",
                  formData.firstName,
                  "required|min:3"
                )}
              </span>
            </div>
            {/*Last NAME */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Full Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "lastName",
                  formData.lastName,
                  "required|min:3"
                )}
              </span>
            </div>
            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                readOnly
              />
            </div>
            {/* PHONE */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formatPhone(formData.phone as string)}
                onChange={handleInputChange}
                placeholder="(123)-456-7890"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "phone",
                  formData.phone,
                  "required|numeric|min:10|max:10"
                )}
              </span>
            </div>
            {/* ROLE */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" type="text" value={user?.role || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                type="text"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="specialization"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "specialization",
                  formData.specialization,
                  "required"
                )}
              </span>
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="description"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "description",
                  formData.description,
                  "required"
                )}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                name="topic"
                type="text"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="topic"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message("topic", formData.topic, "required")}
              </span>
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

export default EducatorProfileUpdate;
