"use client";
import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import TopNav from "@/components/app/top-nav";
import Sidebar from "@/components/app/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
