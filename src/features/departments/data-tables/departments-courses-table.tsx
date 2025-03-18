"use client";

import React, { FC } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "../columns/departments-courses-columns";
import { useGetDepartmentBySlug } from "../queries";
import { cn } from "@/lib/utils";
import { useDeleteCourses } from "@/features/courses/mutations";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";

interface Props {
  slug: string;
}

const DepartmentsCoursesTable: FC<Props> = ({ slug }) => {
  const { data, isLoading, isError, refetch } = useGetDepartmentBySlug(slug);
  const { mutate: deleteCourses } = useDeleteCourses({ slug });

  if (isLoading || !data?.data)
    return <TableSkeleton className="mt-5" rows={11} />;
  if (isError) return <TableError className="mt-5" onRetry={() => refetch} />;

  const courses = data.data.courses;

  return (
    <div className="space-y-4 mt-5">
      <div className="h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground flex space-x-2 px-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className={cn("h-7 w-24 rounded-md", {
              "bg-background": idx === 0,
            })}
          />
        ))}
      </div>
      <DataTable
        defaultSortingColumn="name"
        columns={columns({})}
        onDelete={(rows) => {
          const idsArray = rows.map(({ original: { id } }) => id);
          deleteCourses({ idsArray });
        }}
        data={courses}
      />
    </div>
  );
};

export default DepartmentsCoursesTable;
