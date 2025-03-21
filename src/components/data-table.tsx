"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  Table as Ttable,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";
import DataTablePagination from "./data-table-pagination";

interface FilterColumn {
  label: string;
  value: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultSortingColumn: string;
  filterColumns?: FilterColumn[];
  onDelete?: (ROWS: Row<TData>[]) => void;
  deleteIsDisabled?: boolean;
}

function deleteRowsData<TData>(
  confirm: () => Promise<boolean>,
  onDelete: (ROWS: Row<TData>[]) => void,
  table: Ttable<TData>
) {
  return async () => {
    const continueDelete = await confirm();
    if (continueDelete) {
      onDelete(table.getFilteredSelectedRowModel().rows);
      table.resetRowSelection();
    }
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  defaultSortingColumn,
  filterColumns,
  onDelete,
  deleteIsDisabled = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [sortingColumn, setSortingColumn] = useState<string | undefined>(
    defaultSortingColumn
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [ConfirmActionDialog, confirm] = useConfirm({
    title: "Are You sure?",
    message: "Action cannot be undone",
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const toNormalCase = (text: string): string => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase
      .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
  };

  const channgeFilterColumn = (value: string) => {
    setSortingColumn(value);
    setColumnFilters([]);
  };

  return (
    <div>
      <ConfirmActionDialog />
      <div className="flex items-center justify-between py-4 gap-2">
        <div className="flex items-center gap-2">
          {filterColumns && (
            <Select onValueChange={channgeFilterColumn}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {filterColumns.map(({ label, value }) => (
                  <SelectItem key={label} value={value}>
                    {toNormalCase(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Input
            placeholder={`Filter ${toNormalCase(
              sortingColumn ?? defaultSortingColumn
            )}...`}
            value={
              (table
                .getColumn(sortingColumn ?? defaultSortingColumn)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(sortingColumn ?? defaultSortingColumn)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        {onDelete && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={
                table.getFilteredSelectedRowModel().rows.length === 0 &&
                !deleteIsDisabled
              }
              onClick={deleteRowsData<TData>(confirm, onDelete, table)}
            >
              Delete {table.getFilteredSelectedRowModel().rows.length}
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
