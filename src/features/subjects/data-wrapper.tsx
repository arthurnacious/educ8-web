"use client";
import { DataTable } from "@/components/data-table";
import React, { FC, useState } from "react";
import { columns } from "./columns/all-subjects-columns";
import { useGetAllSubjects } from "@/features/subjects/queries";
import EmptyData from "@/components/empty-data";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";
import { useDeleteSubjects } from "./mutations";

type Props = object;

const DataWrapper: FC<Props> = ({}) => {
  const [editDepartmentSlug, setEditDepartmentSlug] = useState<
    string | undefined
  >();
  const {
    data: departments,
    isLoading,
    isError,
    refetch,
  } = useGetAllSubjects();
  const { mutate: deleteSelctedDepartments } = useDeleteSubjects({});

  return (
    <div>
      {/* <div>
        <CreateDepartmentModal />
      </div>

      <EditDepartmentModal
        slug={editDepartmentSlug}
        close={() => setEditDepartmentSlug(undefined)}
      /> */}

      {isLoading || !departments?.data ? (
        <TableSkeleton className="mt-5" />
      ) : isError ? (
        <TableError className="mt-5" onRetry={() => refetch()} />
      ) : departments?.data && departments.data.length === 0 ? (
        <EmptyData>
          <h2 className="text-lg font-semibold text-gray-300">
            No Departments in the System
          </h2>
        </EmptyData>
      ) : departments?.data ? (
        <DataTable
          columns={columns({
            onEditClick: setEditDepartmentSlug,
          })}
          delete={{
            onDelete: (rows) => {
              const ids = rows.map(({ original }) => original.id);
              deleteSelctedDepartments({ ids });
            },
          }}
          data={departments.data}
          defaultSortingColumn="name"
        />
      ) : null}
    </div>
  );
};

export default DataWrapper;
