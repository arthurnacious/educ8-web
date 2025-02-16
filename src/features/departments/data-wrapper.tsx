"use client";
import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./columns";
import { useGetAllDepartments } from "./queries/useGetAllDepartments";

type Props = object;

const filterColumns = [
  { label: "Name", value: "name" },
  { label: "Courses", value: "coursesCount" },
  { label: "Lecturers", value: "lecturersCount" },
  { label: "Leaders", value: "leadersCount" },
];

const DataWrapper: React.FC<Props> = ({}) => {
  const { data: departments } = useGetAllDepartments();
  console.log(departments);

  if (!departments) return <div>Loading...</div>;

  return (
    <div>
      <DataTable
        columns={columns}
        data={departments}
        defaultSortingColumn="name"
        // filterColumns={filterColumns}
      />
    </div>
  );
};

export default DataWrapper;
