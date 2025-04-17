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
    name: session?.user.name ?? "",
    email: session?.user.email ?? "",
    image: session?.user.image ?? "",
    role: session?.user.role ?? "",
  };

  return (
    <div className="flex h-[100dvh] bg-white dark:bg-[#0F0F12]">
      <Sidebar permissions={session?.user.permissions ?? []} />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16">
          <TopNav user={userDetails} />
        </header>
        <main className="flex-1 p-6 bg-neutral-100 dark:bg-neutral-950 rounded-t-xl overflow-auto shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.2)]">
          {children}
        </main>
      </div>
    </div>
  );
}
