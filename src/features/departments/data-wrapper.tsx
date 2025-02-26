"use client";
import { DataTable } from "@/components/data-table";
import React, { FC, useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import FlexDialog from "@/components/ui/flex-dialog";
import CreareDepartmentForm from "./forms/creare-department-form";
import { useGetAllDepartments } from "./queries";
import EditDepartmentForm from "./forms/edit-department-form";

type Props = object;

// const filterColumns = [
//   { label: "Name", value: "name" },
//   { label: "Courses", value: "coursesCount" },
//   { label: "Lecturers", value: "lecturersCount" },
//   { label: "Leaders", value: "leadersCount" },
// ];

const DataWrapper: FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  const [editDepartmentSlug, setEditDepartmentSlug] = useState<
    string | undefined
  >(undefined);
  const { data: departments, isLoading, isError } = useGetAllDepartments();

  return (
    <>
      <FlexDialog
        open={Boolean(editDepartmentSlug)}
        onOpenChange={() => setEditDepartmentSlug(undefined)}
        title="Create new department"
        description="Create a new department"
      >
        <EditDepartmentForm
          closeModal={() => setEditDepartmentSlug(undefined)}
          slug={editDepartmentSlug}
        />
      </FlexDialog>
      <div>
        <div className="flex justify-between">
          <div />
          <FlexDialog
            trigger={<Button variant="outline">Insert Department</Button>}
            onOpenChange={() => setOpen(!open)}
            open={open}
            title="Create new department"
            description="Create a new department"
          >
            <CreareDepartmentForm setOpen={setOpen} />
          </FlexDialog>
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>An error occurred: </p>}
        {departments && (
          <DataTable
            columns={columns({
              onEditClick: (id: string) => setEditDepartmentSlug(id),
            })}
            data={departments.data}
            defaultSortingColumn="name"
            // filterColumns={filterColumns}
          />
        )}
      </div>
    </>
  );
};

export default DataWrapper;
