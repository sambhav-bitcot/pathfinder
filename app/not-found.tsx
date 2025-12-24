"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchX } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
export default function NotFound() {
  const { user } = useAuth();
  const homeRoute = user?.role ? `/${user.role}/dashboard` : "/";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Card className="p-7 flex flex-col items-center justify-center w-[400px]">
        <SearchX />
        <div className="flex flex-col items-center justify-center">
          <div className=" p-0 font-bold ">Page Not Found</div>
          <p className="text-muted-foreground ">
            The page you are looking for doesn’t exist.
          </p>
        </div>

        <Link href={homeRoute}>
          <Button>Go Home</Button>
        </Link>
      </Card>
    </div>
  );
}
