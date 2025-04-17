"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, UserCircle } from "lucide-react";
import Image from "next/image";
import AuthUserProfile from "./auth-user-profile";
import { FC } from "react";
import { ThemeSwitcher } from "./theme-switcher";

interface Props {
  user: {
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  };
}

const TopNav: FC<Props> = ({ user }) => {
  return (
    <div className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] h-full">
      <div />
      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <ThemeSwitcher />
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors relative"
        >
          <Bell className="size-6 text-gray-600 dark:text-gray-300" />
          <div className="absolute top-[0.15rem] right-[0.15rem] bg-red-500 rounded-full min-size-5 flex items-center justify-center">
            <span className="text-xs text-white font-medium p-[0.15rem]">
              33
            </span>
          </div>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            {user.image ? (
              <Image
                src={user.image}
                alt="User avatar"
                width={28}
                height={28}
                className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
              />
            ) : (
              <UserCircle className="size-8 text-gray-600 dark:text-gray-300" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-fit bg-background border-border rounded-lg shadow-lg bg-neutral-900"
          >
            <AuthUserProfile
              name={user.name ?? ""}
              role={user.role ?? ""}
              avatar={user.image ?? ""}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNav;
