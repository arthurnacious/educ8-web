"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import ClientProvider from "@/components/client-provider";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ClientProvider>{children}</ClientProvider>
    </NextThemesProvider>
  );
}
