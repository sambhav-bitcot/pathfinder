import type React from "react";
import { Header } from "@/components/ui/header";
export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed top-0 w-full mb-20">
        <Header />
      </div>
      <div className="pt-20">{children}</div>
    </>
  );
}
