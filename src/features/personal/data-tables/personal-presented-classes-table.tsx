"use client";
import React, { FC } from "react";
import { DataTable } from "@/components/data-table";
import { useGetPersonalClasses } from "@/features/personal/queries";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";
import { columns } from "@/features/personal/columns/personal-presented-classes-columns";

type Props = object;

const PersonalPresentedClassesTable: FC<Props> = () => {
  const { data, isLoading, isError, refetch } = useGetPersonalClasses();

  if (isLoading || !data?.data)
    return <TableSkeleton className="mt-5" rows={11} />;
  if (isError) return <TableError className="mt-5" onRetry={() => refetch} />;

  const presentedClasses = data?.data.presentedClasses;

  console.log(presentedClasses);

  return (
    <div className="space-y-4 mt-5">
      <DataTable
        defaultSortingColumn="subjectName"
        columns={columns({})}
        data={presentedClasses}
      />
    </div>
  );
};

export default PersonalPresentedClassesTable;
