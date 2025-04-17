"use client";

import {
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Settings,
  HelpCircle,
  Menu,
  BookA,
  Logs,
  Presentation,
  LucideIcon,
} from "lucide-react";

import { Home } from "lucide-react";
import Link from "next/link";
import { FC, Fragment, useState } from "react";
import NavItem from "./nav-item";
import Logo from "@/components/logo";

interface Props {
  permissions: string[];
}
interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  permission?: string;
}

interface MenuSection {
  topic: string;
  items: MenuItem[];
}

const MenuItems: MenuSection[] = [
  {
    topic: "Overview",
    items: [
      { title: "Dashboard", href: "/", icon: Home },
      {
        title: "Departments",
        href: "/departments",
        icon: Building2,
        permission: "can_view_departments",
      },
      {
        title: "Subjects",
        href: "/subjects",
        icon: BookA,
        permission: "can_view_subjects",
      },
      {
        title: "Courses",
        href: "/courses",
        icon: Folder,
        permission: "can_view_courses",
      },
      {
        title: "Users",
        href: "/users",
        icon: Users2,
        permission: "can_view_users",
      },
      {
        title: "Audits",
        href: "/audits",
        icon: Logs,
        permission: "can_view_audits",
      },
    ],
  },
  {
    topic: "Finances",
    items: [
      {
        title: "All Payments",
        href: "/payments",
        icon: Wallet,
        permission: "can_view_payments",
      },
      {
        title: "Outstanding",
        href: "/payments/outstanding",
        icon: CreditCard,
        permission: "can_view_outstanding_payments",
      },
      {
        title: "Completed",
        href: "/payments/completed",
        icon: Receipt,
        permission: "can_view_completed_payments",
      },
    ],
  },
  {
    topic: "Personal",
    items: [
      {
        title: "Courses",
        href: "/personal/courses",
        icon: Presentation,
      },
      {
        title: "Departments",
        href: "/personal/departments",
        icon: Building2,
      },
      {
        title: "Dependants",
        href: "/personal/dependants",
        icon: Users2,
      },
    ],
  },
];

const Sidebar: FC<Props> = ({ permissions }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleNavigation() {
    if (isMobileMenuOpen) return;
    setIsMobileMenuOpen(false);
  }

  // Function to check if user has a specific permission
  const hasPermission = (permission?: string) => {
    if (!permission) return true; // Always show items without specific permission
    if (permissions.length === 0) return false;

    // Check if permission exists in the array
    return permissions.includes(permission);
  };

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-56 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-56
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link href="/" className="h-16 px-6 flex items-center">
            <div className="flex items-center gap-3">
              <Logo />
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4 ">
            <div className="space-y-6">
              {MenuItems.map(({ topic, items }, tp_index) => {
                // Filter items based on permissions
                const filteredItems = items.filter((item) =>
                  hasPermission(item.permission)
                );

                // Only render the section if there are visible items
                if (filteredItems.length === 0) return null;

                return (
                  <div key={`topic-${tp_index}`}>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {topic}
                    </div>
                    <div className="space-y-1">
                      {filteredItems.map(({ title, href, icon }, im_index) => (
                        <NavItem
                          href={href}
                          icon={icon}
                          onClick={handleNavigation}
                          key={`item-${im_index}`}
                        >
                          {title}
                        </NavItem>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-4 py-4 border-t border-r border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
