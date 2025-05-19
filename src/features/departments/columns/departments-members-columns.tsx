import { Checkbox } from "@/components/ui/checkbox";
import { departmentRole } from "@/types/roles";
import { ColumnDef } from "@tanstack/react-table";

interface Member {
  departmentId: string;
  userId: string;
  departmentRoleId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  role: {
    id: string;
    name: departmentRole;
  };
}

type Props = object;

export const columns = ({}: Props): ColumnDef<Member>[] => [
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
    accessorFn: ({ user }) => user.name,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => row.original.user.email,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => row.original.role.name,
  },
];
