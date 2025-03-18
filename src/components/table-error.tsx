import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button";
import TableSkeleton from "./table-skeleton";

interface Props {
  rows?: number;
  cols?: number;
  className?: string;
  onRetry?: () => void;
  message?: string;
}

const TableError: FC<Props> = ({
  rows = 10,
  cols = 6,
  className,
  onRetry,
  message = "An error occurred while loading data.",
}) => {
  return (
    <div className={cn("relative", className)}>
      {/* Error Modal */}
      <div className="absolute top-1/4 left-1/2 shrink-0 -translate-x-1/2 bg-orange-100 border border-orange-300 text-orange-800 rounded-lg p-4 shadow-md w-[90%] max-w-md z-10 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium">{message}</span>
          </div>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="text-orange-700 border-orange-500"
            >
              Retry
            </Button>
          )}
        </div>
      </div>

      {/* Skeleton Table */}
      <TableSkeleton rows={rows} cols={cols} className="mt-2" />
    </div>
  );
};

export default TableError;
