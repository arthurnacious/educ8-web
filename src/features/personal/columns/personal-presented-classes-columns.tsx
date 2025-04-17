"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown, Link2 } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";

type Props = object;

interface PresentedClasses {
  id: string;
  subjectName: string;
  departmentName: string;
  createdAt: Date;
}

export const columns = ({}: Props): ColumnDef<PresentedClasses>[] => {
  return [
    {
      accessorKey: "subjectName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row: { original } }) => (
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">{original.subjectName}</div>
        </div>
      ),
    },
    {
      accessorKey: "departmentName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row: { original } }) => (
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-center">
            {original.departmentName} Department
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class Creation Date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row: { original } }) => (
        <span>{dayjs(original.createdAt).format("DD MMM YYYY @ HH:mm A")}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div>Actions</div>,
      cell: ({ row: { original } }) => (
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={`/classes/${original.id}`}
        >
          <Link2 className="mr-1 size-4" /> Go to Class
        </Link>
      ),
    },
  ];
};
