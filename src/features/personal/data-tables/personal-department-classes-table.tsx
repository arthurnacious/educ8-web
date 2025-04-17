"use client";
import React, { FC } from "react";
import { DataTable } from "@/components/data-table";
import { useGetPersonalClasses } from "@/features/personal/queries";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";
import { columns } from "@/features/personal/columns/personal-department-classes-columns";

type Props = object;

const PersonalDepartmentClassesTable: FC<Props> = () => {
  const { data, isLoading, isError, refetch } = useGetPersonalClasses();

  if (isLoading || !data?.data)
    return <TableSkeleton className="mt-5" rows={11} />;
  if (isError) return <TableError className="mt-5" onRetry={() => refetch} />;

  const departmentClasses = data?.data.departmentClasses;

  return (
    <div className="space-y-4 mt-5">
      <DataTable
        defaultSortingColumn="subjectName"
        columns={columns({})}
        data={departmentClasses}
      />
    </div>
  );
};

export default PersonalDepartmentClassesTable;
