"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative size-10 rounded-full flex items-center justify-center
                  hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out"
      aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={`absolute size-6 text-yellow-500 transition-all duration-300 ease-in-out
                     ${
                       theme === "light"
                         ? "opacity-100 rotate-0 scale-100"
                         : "opacity-0 -rotate-90 scale-75"
                     }`}
      />

      <Moon
        className={`absolute size-6 text-blue-400 transition-all duration-300 ease-in-out
                     ${
                       theme === "dark"
                         ? "opacity-100 rotate-0 scale-100"
                         : "opacity-0 rotate-90 scale-75"
                     }`}
      />
    </button>
  );
}
