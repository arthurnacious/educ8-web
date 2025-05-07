"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative size-10 rounded-full flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        "hover:bg-gray-200 dark:hover:bg-gray-700"
      )}
      aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "absolute size-6 text-yellow-500 transition-all duration-300 ease-in-out",
          {
            "opacity-100 rotate-0 scale-100": theme === "light",
            "opacity-0 -rotate-90 scale-75": theme !== "light",
          }
        )}
      />
      <Moon
        className={cn(
          "absolute size-6 text-blue-400 transition-all duration-300 ease-in-out",
          {
            "opacity-100 rotate-0 scale-100": theme === "dark",
            "opacity-0 rotate-90 scale-75": theme !== "dark",
          }
        )}
      />
    </button>
  );
}
