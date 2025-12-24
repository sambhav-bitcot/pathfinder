"use client";

import { useState } from "react";

import UserForm from "@/components/admin/users/user-form";
import PageHeader from "@/components/ui/page-header";
import FilterSection from "./search-section";
import UserSection from "./user-section";

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <PageHeader
              title={"User Management"}
              desc={" Manage all platform users"}
            />

            <UserForm
              state={"create"}
              title="Add New User"
              className="border p-2 rounded-lg bg-primary text-primary-foreground text-sm cursor-pointer w-[120px]"
            />
          </div>
          {/* Search and Filter */}
          <FilterSection setSearch={setSearch} />

          {/* user section */}

          <UserSection tab={tab} search={search} setTab={setTab} />
        </div>
      </div>
    </div>
  );
}
