"use client";

import { Button } from "@/components/ui/button";

import { useState, useMemo, useEffect } from "react";
import { mockResources } from "@/lib/mock-data";
import ResourcesNotFound from "@/components/admin/resources/resources-not-found";
import ResourceCard from "./resource-card";
import SearchBar from "../ui/search-bar";
import { useRouter, notFound } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import PageHeader from "../ui/page-header";

const tabFilter = [
  { value: "all", title: "All" },
  { value: "essay writing", title: "Essay Writing" },
  { value: "test prep", title: "Test Prep" },
  { value: "financial aid", title: "Financial Aid" },
  { value: "admissions", title: "Admissions" },
];
export default function Resources() {
  const { user } = useAuth();

  const router = useRouter();

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  // filter handler
  const filterData = useMemo(() => {
    return mockResources.filter((res) => {
      if (tab === "all") {
        if (search == "") return res;
        if (res.title.toLowerCase().includes(search.toLowerCase())) return res;
      }
      if (
        tab === "essay writing" &&
        res.category.toLowerCase() === "essay writing"
      ) {
        if (search == "") return res;

        if (res.title.toLowerCase().includes(search.toLowerCase())) return res;
      }
      if (tab === "test prep" && res.category.toLowerCase() === "test prep") {
        if (search == "") return res;

        if (res.title.toLowerCase().includes(search.toLowerCase())) return res;
      }
      if (
        tab === "financial aid" &&
        res.category.toLowerCase() === "financial aid"
      ) {
        if (search == "") return res;

        if (res.title.toLowerCase().includes(search.toLowerCase())) return res;
      }
      if (tab === "admissions" && res.category.toLowerCase() === "admissions") {
        if (search == "") return res;

        if (res.title.toLowerCase().includes(search.toLowerCase())) return res;
      }
    });
  }, [search, tab]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Resource Library"
              desc=" Educational materials and guides to help your college journey"
            />

            {user && user.role === "admin" && (
              <Button
                onClick={() => {
                  router.push("/admin/resources/create-resource");
                }}
              >
                Add Resource
              </Button>
            )}
          </div>

          {/* Search and Filter */}
          <SearchBar setSearch={setSearch} search={search} />

          <div className="flex gap-3 items-center flex-wrap">
            {tabFilter.map((tabs, idx) => (
              <Button
                size="sm"
                variant={tab === tabs.value ? "default" : "outline"}
                onClick={() => setTab(tabs.value)}
                className={tab !== tabs.value ? "hover:text-accent" : ""}
                key={idx}
              >
                {tabs.title}
              </Button>
            ))}
          </div>

          {filterData.length > 0 ? (
            <div className="w-full grid  lg:grid-cols-[1fr_1fr] gap-5 grid-cols-1">
              {filterData.map((res,idx) => (
                <ResourceCard role={user?.role!} resource={res} key={idx} />
              ))}
            </div>
          ) : (
            <ResourcesNotFound />
          )}
        </div>
      </div>
    </div>
  );
}
