import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";

import { useRef } from "react";

export default function ChangeAvatar({
  className,
  previewURL,
  fallback,
  onChange,
}: {
  className?: string;
  previewURL?: string;
  fallback?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <Avatar className="size-16">
        <AvatarImage
          className="rounded-full"
          src={previewURL || ""}
          alt="Profile"
        />
        <AvatarFallback>{fallback || "U"}</AvatarFallback>

        {/* <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback> */}
      </Avatar>

      <div>
        <div className="font-medium mb-1">Profile Pic</div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="mr-2" />
          Change Profile Pic
        </Button>

        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept="image/*"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
