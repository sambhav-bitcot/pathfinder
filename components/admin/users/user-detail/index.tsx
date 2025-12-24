"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { UserRole, type AdminUserDetail } from "@/lib/types";
import { formatPhone } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { mockAdminUsers } from "@/lib/mock-data";
import PageHeader from "@/components/ui/page-header";

function UserDetail() {
  const { userId } = useParams();

  let user = useMemo(() => {
    return mockAdminUsers.find((user) => user.id === userId);
  }, [userId]);

  const { toast } = useToast();

  const defaultForm = {
    firstName: "",
    lastName: "",
    status: "",
    email: "",
    role: "" as UserRole,
    phone: "",
    avatar: "",
    specialization: "",
    platform: "WEB",
  };

  const [formData, setFormData] = useState<AdminUserDetail>(defaultForm);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    console.log("user id-", userId);
    console.log(user);

    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role as UserRole,
        specialization: user.specialization,
        status: user.status,
        platform: "WEB",
      });
    }
  }, [user, userId]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <PageHeader
              title={"User Details"}
              desc={"View all information for this user."}
            />

            <Card className="p-5">
              <div className=" flex flex-col gap-10">
                <div className="flex  items-center gap-4 font-semibold">
                  <Avatar className="size-20">
                    <AvatarImage src={formData.avatar || ""} />
                  </Avatar>
                  <p>Profile</p>
                </div>

                <CardContent className="space-y-4 p-0">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* First NAME */}
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input value={formData?.firstName || "N/A"} readOnly />
                      </div>
                      {/*Last NAME */}
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input value={formData?.lastName || "N/A"} readOnly />
                      </div>
                      {/* EMAIL */}
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={formData?.email || "N/A"} readOnly />
                      </div>
                      {/* PHONE */}
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={formatPhone(formData.phone as string) || "N/A"}
                          readOnly
                        />
                      </div>
                      {/* ROLE */}
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Input value={formData?.role || "N/A"} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Specialization</Label>
                        <Input
                          value={formData?.specialization || "N/A"}
                          readOnly
                        />
                      </div>{" "}
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Input value={formData?.status || "N/A"} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <Input value={formData?.platform || "N/A"} readOnly />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
