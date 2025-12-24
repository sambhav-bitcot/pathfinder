import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
// @ts-ignore: global CSS side-effect import has no type declarations
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import Layout from "@/components/hoc/main-layout";
import { AuthProvider } from "@/contexts/auth-context";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pathfinder - College Counseling Platform",
  description: "Connect with expert educators for college admissions guidance",
  icons: {
    icon: "/pathfinder.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <NextTopLoader />
          <Layout>
            <>
              {children}
              <Toaster />
            </>
          </Layout>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
