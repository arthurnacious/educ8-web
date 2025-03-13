"use client";

import React, { FC } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "../columns/departments-courses-columns";
import { useGetDepartmentBySlug } from "../queries";
import { cn } from "@/lib/utils";
import { useDeleteCourses } from "@/features/courses/mutations";

interface Props {
  slug: string;
}

const DepartmentsCoursesTable: FC<Props> = ({ slug }) => {
  const { data, isLoading, isError } = useGetDepartmentBySlug(slug);
  const { mutate: deleteCourses } = useDeleteCourses({ slug });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An error occurred.</p>;
  if (!data?.data) return <p>No data found.</p>;

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
