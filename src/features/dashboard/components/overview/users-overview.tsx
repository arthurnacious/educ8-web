import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Edit, MoreHorizontal } from "lucide-react";
import { FC } from "react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  verifiedAt?: string | null;
}

interface Props {
  users?: UserItem[];
  className?: string;
}

const USERS: UserItem[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    verifiedAt: "2024-01-01T12:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    verifiedAt: null,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "moderator",
    verifiedAt: "2024-06-15T09:30:00Z",
  },
];

const UsersOverview: FC<Props> = ({ users = USERS, className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className
      )}
    >
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Users Overview
        </h1>
      </div>

      <div className="p-3 space-y-1">
        {users.map((user) => (
          <div
            key={user.id}
            className={cn(
              "group flex items-center justify-between p-2 rounded-lg",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
            )}
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {user.name}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {user.email}
              </p>
              <p className="text-xs font-medium capitalize text-zinc-700 dark:text-zinc-300">
                {user.role}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {user.verifiedAt ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <button
                type="button"
                className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <Edit className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <MoreHorizontal className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersOverview;
