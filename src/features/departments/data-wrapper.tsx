"use client";
import { DataTable } from "@/components/data-table";
import React, { FC, useState } from "react";
import { columns } from "./columns/all-departments-columns";
import { useGetAllDepartments } from "./queries";
import CreateDepartmentModal from "./modals/creare-department-modal";
import EditDepartmentModal from "./modals/edit-department-modal";
import EmptyData from "@/components/empty-data";
import { useDeleteDepartments } from "./mutations";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";

type Props = object;

// const filterColumns = [
//   { label: "Name", value: "name" },
//   { label: "Courses", value: "coursesCount" },
//   { label: "Lecturers", value: "lecturersCount" },
//   { label: "Leaders", value: "leadersCount" },
// ];

const DataWrapper: FC<Props> = ({}) => {
  const [editDepartmentSlug, setEditDepartmentSlug] = useState<
    string | undefined
  >();
  const {
    data: departments,
    isLoading,
    isError,
    refetch,
  } = useGetAllDepartments();
  const { mutate: deleteSelctedDepartments } = useDeleteDepartments({});
  return (
    <div>
      <div>
        <CreateDepartmentModal />
      </div>

      <EditDepartmentModal
        slug={editDepartmentSlug}
        close={() => setEditDepartmentSlug(undefined)}
      />

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
          onDelete={(rows) => {
            const ids = rows.map(({ original }) => original.id);
            deleteSelctedDepartments({ ids });
          }}
          data={departments.data}
          defaultSortingColumn="name"
        />
      ) : null}
    </div>
  );
};

export default DataWrapper;
