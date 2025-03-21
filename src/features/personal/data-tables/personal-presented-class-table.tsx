"use client";

import React, { FC, useState } from "react";
import { departmentRole } from "@/types/roles";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGetPersonalClasses } from "@/features/personal/queries";
import EmptyData from "@/components/empty-data";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";
import { columns } from "../columns/personal-presented-classes-columns";

type Props = object;

const PersonalPresentedClassesTable: FC<Props> = () => {
  const [activeRole, setActiveRole] = useState<departmentRole>(
    departmentRole.LECTURER
  );

  const { data, isLoading, isError, refetch } = useGetPersonalClasses();

  if (isLoading || !data?.data)
    return <TableSkeleton className="mt-5" rows={11} />;
  if (isError) return <TableError className="mt-5" onRetry={() => refetch} />;

  const presentedClasses = data?.data.presentedClasses;

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
        {presentedClasses.length === 0 ? (
          <EmptyData size={150}>
            <h2 className="text-lg font-semibold text-gray-300">
              Nothing here
            </h2>
          </EmptyData>
        ) : (
          Object.values(departmentRole).map((role) => (
            <TabsContent key={role} value={role}>
              <DataTable
                defaultSortingColumn="courseName"
                columns={columns({})}
                data={presentedClasses}
              />
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  );
};

export default PersonalPresentedClassesTable;
