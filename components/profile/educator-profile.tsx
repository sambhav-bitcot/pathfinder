"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { CardContent } from "../ui/card";
import ChangeAvatar from "./change-avatar";
import SimpleReactValidator from "simple-react-validator";
import { formatPhone } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/store/actions/auth-action";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { getPresignedUrl } from "@/utils/common-service";
function EducatorProfileUpdate() {
  const { toast } = useToast();

  const [, setForce] = useState(false);

  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => setForce((v) => !v) },
    })
  );
  const defaultForm = {
    first_name: "",
    last_name: "",

    phone: "",
    avatar_path: "",
    profile: {
      session_description: "",
      specialization: "",
      session_topic: "",
    },
  };

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState(defaultForm);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !selectedFile) {
      console.log(user);
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user?.phone || "",
        avatar_path: user.avatar_path || "",
        profile: {
          session_description: user.profile?.session_description || "",
          specialization: user.profile?.specialization || "",
          session_topic: user.profile?.session_topic || "",
        },
      });
      setPreviewURL(user.avatar_path || undefined);
    }
  }, [user]);

  // HANDLE INPUT CHANGE
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // PHONE LOGIC
    if (name === "phone") {
      const digitsOnly = value.replaceAll(/\D/g, "");

      if (digitsOnly.length > 10) return;

      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      validator.current.showMessageFor("phone");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    validator.current.showMessageFor(name);
  };

  const handleNestedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [name]: value },
    }));
    validator.current.showMessageFor(name);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  // SUBMIT
  // Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validator.current.allValid()) {
      console.log("Updated Values:", formData);
      validator.current.showMessages();
      return;
    }

    setIsLoading(true);
    let file_path: any;
    if (selectedFile) {
      file_path = await getPresignedUrl(selectedFile, toast);
      console.log(file_path);
    }

    let form = {
      updateUserId: user.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
    };
    let profile = {
      session_description: formData.profile?.session_description,
      specialization: formData.profile?.specialization,
      session_topic: formData.profile?.session_topic,
    };
    try {
      let res = await dispatch(updateUser(form, file_path, profile));
      console.log(res);

      if (res.success) {
        toast({
          title: "Profile Updation",
          description: res?.message || "Profile Successfully Updated",
        });
      } else {
        toast({
          title: "Profile Updation",
          description:
            res?.message || "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Profile Updation",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-10">
      <ChangeAvatar
        previewURL={previewURL}
        onChange={handleImageChange}
        fallback={`${formData.first_name?.charAt(0) || "U"}${
          formData.last_name?.charAt(0) || "N"
        }`}
      />

      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First NAME */}
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="John"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "first_name",
                  formData.first_name,
                  "required|min:3"
                )}
              </span>
            </div>
            {/*Last NAME */}
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Doe"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "last_name",
                  formData.last_name,
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
                value={formatPhone(formData.phone)}
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
                value={formData.profile.specialization}
                onChange={handleNestedInputChange}
                placeholder="specialization"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "specialization",
                  formData.profile.specialization,
                  "required"
                )}
              </span>
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="session_description">Description</Label>
              <Input
                id="session_description"
                name="session_description"
                type="text"
                value={formData.profile.session_description}
                onChange={handleNestedInputChange}
                placeholder="description"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "session_description",
                  formData.profile.session_description,
                  "required"
                )}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session_topic">Topic</Label>
              <Input
                id="session_topic"
                name="session_topic"
                type="text"
                value={formData.profile.session_topic}
                onChange={handleNestedInputChange}
                placeholder="session_topic"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "session_topic",
                  formData.profile.session_topic,
                  "required"
                )}
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
