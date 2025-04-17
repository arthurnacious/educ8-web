"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Enrollment, Field } from "../../types";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  marks: Field[];
}

const getMarkColorClass = (markValue: number): string => {
  if (markValue === 100) return "text-green-500 font-bold"; // Full marks → Green
  if (markValue >= 75) return "text-blue-500 font-semibold"; // 75%+ → Blue
  if (markValue >= 50) return "text-yellow-500"; // 50%+ → Yellow
  if (markValue >= 25) return "text-orange-500"; // 25%+ → Orange
  return "text-red-500"; // Below 25% → Red
};

export const marksColumns = ({ marks }: Props): ColumnDef<Enrollment>[] => {
  // Create a map where studentId is the key and their marks are grouped
  const marksMap: Record<string, Record<string, number>> = {};

  marks.forEach(({ studentId, id, amount }) => {
    if (!marksMap[studentId]) marksMap[studentId] = {};
    marksMap[studentId][id] = amount;
  });

  // Get distinct mark names to create columns
  const distinctMarks = Array.from(new Set(marks.map((mark) => mark.name)))
    .map((name) => {
      const mark = marks.find((m) => m.name === name);
      return mark ? { id: mark.id, name: mark.name } : null;
    })
    .filter(Boolean) as { id: string; name: string }[];

  const marksColumns: ColumnDef<Enrollment>[] = distinctMarks.map(
    ({ id, name }) => ({
      accessorKey: `mark.${id}`,
      header: name,
      cell: ({
        row: {
          original: { studentId },
        },
      }) => {
        const markValue = marksMap[studentId]?.[id] ?? 0; // Default to 0 if no mark
        return (
          <span className={getMarkColorClass(markValue)}>{markValue}</span>
        );
      },
    })
  );

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
          Student
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.user.name}</span>,
    },
    ...marksColumns,
  ];
};
