"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { CardContent } from "../ui/card";
import ChangeAvatar from "./change-avatar";
import SimpleReactValidator from "simple-react-validator";
import { formatPhone } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/actions/auth-action";
import { useToast } from "@/hooks/use-toast";

import { getPresignedUrl } from "@/utils/common-service";

function UserProfileUpdate() {
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const [, forceUpdate] = useState(0);
  const { user } = useAppSelector((state) => state.auth);
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate((v) => v + 1) },
    })
  );
  const defaultForm = {
    first_name: "",
    last_name: "",
    phone: "",
    avatar_path: "",
  };

  const [formData, setFormData] = useState(defaultForm);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  // Load user profile data
  useEffect(() => {
    if (user && !selectedFile) {
      console.log(user);

      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone || "",
        avatar_path: user.avatar_path || "",
      });
      setPreviewURL(user.avatar_path || undefined);
    }
  }, [user]);

  // Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validator.current.allValid()) {
      console.log("Updated Values:", formData);
      validator.current.showMessages();

      return;
    }
    let file_path: any;
    if (selectedFile) {
      file_path = await getPresignedUrl(selectedFile, toast);
      console.log(file_path);
    }
    setIsLoading(true);
    let form = {
      updateUserId: user.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
    };
    try {
      let res = await dispatch(updateUser(form, file_path));
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

  // Input Change Handler
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
        fallback={`${formData.first_name?.charAt(0).toUpperCase() || "U"}${
          formData.last_name?.charAt(0).toUpperCase() || "N"
        }`}
      />

      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/*First Name */}
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "first_name",
                  formData.first_name,
                  "required|min:3"
                )}
              </span>
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
              <span className="text-red-500 text-sm">
                {validator.current.message(
                  "last_name",
                  formData.last_name,
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
