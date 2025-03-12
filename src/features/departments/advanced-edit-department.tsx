"use client";

import React, { FC, useState } from "react";
import { departmentUserRole } from "@/types/roles";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { columns } from "./columns/advanced-edit-department-columns";
import { useGetDepartmentBySlug } from "./queries";
import EmptyData from "@/components/empty-data";

interface Props {
  slug: string;
}

const AdvancedEditDepartment: FC<Props> = ({ slug }) => {
  const { data, isLoading, isError } = useGetDepartmentBySlug(slug);
  const [activeRole, setActiveRole] = useState<departmentUserRole>(
    departmentUserRole.LECTURER
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An error occurred.</p>;
  if (!data?.data) return <p>No data found.</p>;

  const filteredMembers = data?.data.members.filter(
    (member) => member.role === activeRole
  );

  console.log(filteredMembers);

  return (
    <div className="space-y-4">
      <Tabs
        value={activeRole}
        onValueChange={(value) => setActiveRole(value as departmentUserRole)}
      >
        <TabsList className="flex space-x-2">
          {Object.values(departmentUserRole).map((role) => (
            <TabsTrigger key={role} value={role}>
              {role}s
            </TabsTrigger>
          ))}
        </TabsList>
        {filteredMembers.length === 0 ? (
          <EmptyData size={150}>
            <h2 className="text-lg font-semibold text-gray-300">
              No {activeRole}s found for {data.data.name}
            </h2>
          </EmptyData>
        ) : (
          Object.values(departmentUserRole).map((role) => (
            <TabsContent key={role} value={role}>
              <DataTable
                defaultSortingColumn="name"
                columns={columns({})}
                data={filteredMembers}
              />
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  );
};

export default AdvancedEditDepartment;
