"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown, Link2, UserCircle } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

type Props = object;

interface EnrolledClasses {
  id: string;
  courseName: string;
  departmentName: string;
  lecturer: { name: string; image?: string };
  createdAt: Date;
}

export const columns = ({}: Props): ColumnDef<EnrolledClasses>[] => {
  return [
    {
      accessorKey: "courseName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row: { original } }) => (
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-center">
            {original.courseName}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "lecturerName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lecturer Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({
        row: {
          original: { lecturer: { name, image } = {} },
        },
      }) => (
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium flex justify-center items-center gap-2">
            {name}
            {image ? (
              <Image
                src={image}
                width={10}
                height={10}
                alt="Lecturer"
                className="size-5 rounded-full"
              />
            ) : (
              <UserCircle className="size-5 text-green-800" />
            )}
          </div>
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
