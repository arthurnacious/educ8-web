"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, X } from "lucide-react";
import { Enrollment, Session } from "../../types";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  sessions: Session[];
}

export const sessionsColumns = ({
  sessions,
}: Props): ColumnDef<Enrollment>[] => {
  const sessionsColumns: ColumnDef<Enrollment>[] = sessions.map((session) => ({
    accessorKey: `attendance.${session.id}`,
    header: session.name,
    cell: ({ row }) => {
      const attendance = row.original.user.attendance.find(
        (a) => a.sessionId === session.id
      );

      return attendance?.status === "present" ? (
        <span className="text-green-500">
          <Check className="w-4 h-4" />
        </span>
      ) : (
        <span className="text-red-500">
          <X className="w-4 h-4" />
        </span>
      );
    },
  }));

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
      accessorKey: "user",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.user.name}</span>,
    },
    ...sessionsColumns,
  ];
};
