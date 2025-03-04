"use client";
import { DataTable } from "@/components/data-table";
import React, { FC, useState } from "react";
import { columns } from "./columns";
import { useGetAllDepartments } from "./queries";
import CreateDepartmentModal from "./modals/creare-department-modal";
import EditDepartmentModal from "./modals/edit-department-modal";

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
  const { data: departments, isLoading, isError } = useGetAllDepartments();

  return (
    <div>
      <div className="flex justify-between">
        <div />
        <CreateDepartmentModal />
      </div>

      <EditDepartmentModal
        slug={editDepartmentSlug}
        close={() => setEditDepartmentSlug(undefined)}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred.</p>}
      {departments.length > 0 && (
        <DataTable
          columns={columns({
            onEditClick: setEditDepartmentSlug,
          })}
          data={departments}
          defaultSortingColumn="name"
        />
      )}
    </div>
  );
};

export default DataWrapper;
