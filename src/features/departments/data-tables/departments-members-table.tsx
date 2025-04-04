"use client";

import React, { FC, useState } from "react";
import { departmentRole } from "@/types/roles";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { columns } from "../columns/departments-members-columns";
import { useGetDepartmentBySlug, useGetDepartmentRoles } from "../queries";
import EmptyData from "@/components/empty-data";
import { useUnassignedMembersWithIds } from "../mutations";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";

interface Props {
  slug: string;
}

const DepartmentsMembersTable: FC<Props> = ({ slug }) => {
  const [activeRole, setActiveRole] = useState<departmentRole>(
    departmentRole.LECTURER
  );

  const {
    data: department,
    isLoading,
    isError,
    refetch,
  } = useGetDepartmentBySlug(slug);
  const { data: roles, isLoading: isLoadingRoles } = useGetDepartmentRoles();
  const { mutate: unasignTheseIds } = useUnassignedMembersWithIds({ slug });

  if (isLoading || isLoadingRoles || !department?.data)
    return <TableSkeleton className="mt-5" rows={11} />;
  if (isError) return <TableError className="mt-5" onRetry={() => refetch()} />;

  // Find the matching roleId from roles using the name
  const activeRoleObject = roles?.data?.find(
    (role) => role.name === activeRole
  );

  const filteredMembers = department?.data.members.filter(
    (member) => member.departmentRoleId === activeRoleObject?.id
  );

  console.log({ filteredMembers, members: department?.data.members });

  return (
    <div className="space-y-4 mt-5">
      <Tabs
        value={activeRole}
        onValueChange={(value) => setActiveRole(value as departmentRole)}
      >
        <TabsList className="flex space-x-2">
          {Object.values(departmentRole).map((role) => (
            <TabsTrigger key={role} value={role}>
              {role}s
            </TabsTrigger>
          ))}
        </TabsList>
        {filteredMembers && filteredMembers.length === 0 ? (
          <EmptyData size={150}>
            <h2 className="text-lg font-semibold text-gray-300">
              No {activeRole}s found for {department?.data.name}
            </h2>
          </EmptyData>
        ) : (
          Object.values(departmentRole).map((role) => (
            <TabsContent key={role} value={role}>
              <DataTable
                defaultSortingColumn="name"
                columns={columns({})}
                delete={{
                  onDelete: (rows) => {
                    const ids = rows.map(({ original }) => ({
                      userId: original.userId,
                      departmentId: original.departmentId,
                    }));
                    unasignTheseIds({ idObject: ids });
                  },
                }}
                data={filteredMembers}
              />
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  );
};

export default DepartmentsMembersTable;
