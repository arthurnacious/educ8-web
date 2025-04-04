import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

interface Subject {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

type Props = object;

export const columns = ({}: Props): ColumnDef<Subject>[] => [
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
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      return row.original.name;
    },
  },
  {
    id: "created_at",
    header: "Created Date",
    cell: ({ row: { original } }) => {
      return dayjs(original.createdAt).format("MMM D, YYYY h:mm A");
    },
  },
];
