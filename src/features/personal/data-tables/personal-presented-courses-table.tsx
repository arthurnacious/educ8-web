"use client";
import React, { FC } from "react";
import { DataTable } from "@/components/data-table";
import { useGetPersonalCourses } from "@/features/personal/queries";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";
import { columns } from "@/features/personal/columns/personal-presented-courses-columns";

type Props = object;

const PersonalPresentedCoursesTable: FC<Props> = () => {
  const { data, isLoading, isError, refetch } = useGetPersonalCourses();

  if (isLoading || !data?.data)
    return <TableSkeleton className="mt-5" rows={11} />;
  if (isError) return <TableError className="mt-5" onRetry={() => refetch} />;

  const presentedCourses = data?.data.presentedCourses;

  console.log(presentedCourses);

  return (
    <div className="space-y-4 mt-5">
      <DataTable
        defaultSortingColumn="subjectName"
        columns={columns({})}
        data={presentedCourses}
      />
    </div>
  );
};

export default PersonalPresentedCoursesTable;
