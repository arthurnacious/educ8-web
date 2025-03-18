import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
  rows?: number;
}

const TableSkeleton: FC<Props> = ({ className, rows = 10 }) => {
  return (
    <div className={cn("w-full overflow-hidden border rounded-lg", className)}>
      {/* Table Header */}
      <div className="grid grid-cols-6 p-3 bg-muted text-sm font-semibold">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/6" />
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between p-3 bg-muted">
        <Skeleton className="h-6 w-12" />
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
};

export default TableSkeleton;
