"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordResetPage from "./password-reset";
import { Card } from "../ui/card";
import EducatorProfileUpdate from "./educator-profile";
import UserProfileUpdate from "./user-profile";
import { useAuth } from "@/contexts/auth-context";
import PageHeader from "../ui/page-header";
function Profile() {
  const { user } = useAuth();

  const isUser = ["admin", "student"].includes(user?.role || "");
  const isEducator = user?.role === "educator";
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader
            title="My Profile"
            desc="  Update your personal information"
          />

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value={"profile"}>User Profile Detail</TabsTrigger>
              <TabsTrigger value={"password"}>Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value={"profile"} className="space-y-4">
              {isUser && (
                <Card>
                  <UserProfileUpdate />
                </Card>
              )}
              {isEducator && (
                <Card>
                  <EducatorProfileUpdate />
                </Card>
              )}
            </TabsContent>
            <TabsContent value={"password"} className="space-y-4">
              <Card>
                <PasswordResetPage />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
