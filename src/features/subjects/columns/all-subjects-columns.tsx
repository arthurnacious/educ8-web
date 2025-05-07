"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "@/features/subjects/actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Subject } from "@/types/subjects";

interface Props {
  onEditClick?: (slug: string) => void;
}

interface SubjectWithDepartment extends Subject {
  department: {
    id: string;
    name: string;
    slug: string;
  };
}

export const columns = ({
  onEditClick,
}: Props): ColumnDef<SubjectWithDepartment>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row: { original } }) => (
        <span className="text-nowrap">{original.name}</span>
      ),
    },
    {
      accessorKey: "Department",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Department
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row: { original } }) => (
        <span className="text-nowrap">{original.department.name}</span>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-left">Actions</div>,
      cell: ({ row: { original } }) => (
        <Actions slug={original.slug} onEditClick={onEditClick} />
      ),
    },
  ];
};
