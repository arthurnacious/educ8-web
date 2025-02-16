"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Props {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem: FC<Props> = ({ href, icon: Icon, children, onClick }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]",
        {
          "bg-gray-50 dark:bg-[#1F1F23]": pathname === href,
        }
      )}
    >
      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
      {children}
    </Link>
  );
};

export default NavItem;
