"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import dayjs from "dayjs";

type Props = object;

interface AuditLogs {
  id: string;
  user: {
    id: string;
    name: string;
  };
  action: string;
  model: string;
  createdAt: Date;
}

export const columns = ({}: Props): ColumnDef<AuditLogs>[] => {
  return [
    {
      accessorKey: "user",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Actioned By
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row: { original } }) => <span>{original.user.name}</span>,
    },
    {
      accessorKey: "action",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Action
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row: { original } }) => {
        return (
          <span className="capitalize">
            {original.action} {original.model && "a"} {original.model} on{" "}
            {dayjs(original.createdAt).format("DD MMM YYYY")}
          </span>
        );
      },
    },
    {
      accessorKey: "leadersCount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            View Details
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row: { original } }) => {
        return (
          <span>
            <Button variant="outline" onClick={() => console.log(original.id)}>
              <Eye className="w-4 h-4 text-zinc-700 dark:text-zinc-300" /> View
            </Button>
          </span>
        );
      },
    },
  ];
};
