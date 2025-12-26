"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "./spinner";
import type { UserRole } from "@/lib/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { appLogout, getTokenAction } from "@/store/actions/auth-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Coins } from "lucide-react";
import Link from "next/link";
import { NotificationTrigger } from "../notification/notification-trigger";
import {
  ADMIN_NAV_ITEMS,
  STUDENT_NAV_ITEMS,
  EDUCATOR_NAV_ITEMS,
  PUBLIC_ROUTE,
  PRIVATE_PATH,
} from "@/utils/constant";
import { useState, useEffect } from "react";
function getProfilePath(role: UserRole) {
  if (role === "admin") {
    return PRIVATE_PATH.ADMIN_PROFILE;
  }
  if (role === "student") {
    return PRIVATE_PATH.STUDENT_PROFILE;
  }
  if (role === "educator") {
    return PRIVATE_PATH.EDUCATOR_PROFILE;
  }

  return "";
}

export function Header() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const userRole = user?.role?.toLowerCase();
  const [navItems, setNavItems] = useState<typeof ADMIN_NAV_ITEMS | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (userRole) {
      if (userRole === "admin") setNavItems(ADMIN_NAV_ITEMS);
      if (userRole === "educator") setNavItems(EDUCATOR_NAV_ITEMS);
      if (userRole === "student") setNavItems(STUDENT_NAV_ITEMS);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.replace(PUBLIC_ROUTE.LOGIN);
    }
  }, [pathname]);

  useEffect(() => {
    if (!token) {
      dispatch(getTokenAction());
      console.log(token);
    }
  }, [user, token]);
  const handleLogout = async () => {
    await dispatch(appLogout);

    router.replace(PUBLIC_ROUTE.HOME);
  };

  return (
    <nav className="border-b bg-card">
      {userRole && (
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link
                href={`/${userRole}/dashboard`}
                className="text-xl font-bold"
              >
                Pathfinder
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navItems?.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      asChild
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-7">
              {/* notification trigger */}
              {userRole !== "admin" && <NotificationTrigger />}
              {user?.role === "student" && (
                <Button
                  variant={"outline"}
                  className="flex gap-2 p-2 text-xs hover:text-white cursor-pointer"
                  onClick={() => {
                    router.push(PRIVATE_PATH.STUDENT_WALLET);
                  }}
                >
                  <Coins className="text-primary size-4" />
                  <span>{token || <Spinner />}</span>
                  <span className="text-muted-foreground">token</span>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user?.avatar_path || undefined}
                        alt={user?.first_name}
                      />
                      <AvatarFallback className="text-primary text-lg border border-muted-foreground/20">
                        {user?.first_name?.charAt(0) +
                          user?.last_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.first_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {userRole && (
                      <Link
                        href={getProfilePath(userRole as UserRole)}
                        className="flex gap-2"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
