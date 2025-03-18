import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({ children, breadcrumbs }) => {
  return (
    <div className="flex min-h-[100vdh - 4rem] flex-1 flex-col">
      <div className="flex items-center border-b gap-2 border-gray-200 dark:border-[#1F1F23] h-10 mb-10">
        {breadcrumbs?.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors capitalize"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 capitalize">
                {item.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default PageContainer;
