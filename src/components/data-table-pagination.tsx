import { Button } from "@/components/ui/button";
import { Table as Ttable } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Ttable<TData>;
}

const generatePageNumbers = (current: number, total: number) => {
  const pages: (number | "...")[] = [];
  const maxPagesToShow = 5; // Adjust as needed

  if (total <= maxPagesToShow + 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    pages.push(1, 2, 3, "...", total);
  } else if (current >= total - 2) {
    pages.push(1, "...", total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return pages;
};

const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pages = generatePageNumbers(pageIndex + 1, pageCount);

  return (
    <div className="flex items-center justify-between py-4">
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-sm">
              ...
            </span>
          ) : (
            <Button
              key={index}
              variant={pageIndex + 1 === page ? "default" : "outline"}
              size="sm"
              onClick={() => table.setPageIndex(page - 1)}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Row Selection Info */}
      <div className="flex-1 text-sm text-muted-foreground text-right">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
};

export default DataTablePagination;
