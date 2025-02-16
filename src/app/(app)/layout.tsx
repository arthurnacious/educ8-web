"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="w-full flex flex-1 flex-col">
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
