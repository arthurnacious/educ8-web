import type { ReactNode } from "react";
import TopNav from "@/components/app/top-nav";
import Sidebar from "@/components/app/sidebar";
import { auth } from "@/lib/auth";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  const userDetails = {
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image,
    role: session?.user.role,
  };

  return (
    <div className="flex h-[100dvh]">
      <Sidebar permissions={session?.user.permissions ?? []} />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav user={userDetails} />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
