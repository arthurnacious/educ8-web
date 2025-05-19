"use client";

import React, { FC } from "react";
import { DataTable } from "@/components/data-table";
import { useGetAuditLogs } from "@/features/dashboard/queries";
import TableSkeleton from "@/components/table-skeleton";
import TableError from "@/components/table-error";
import { columns } from "@/features/dashboard/columns/audit-logs-columns";

type Props = object;

const AuditLogsTable: FC<Props> = ({}) => {
  const { data, isLoading, isError, refetch } = useGetAuditLogs();

  if (isLoading || !data?.data)
    return <TableSkeleton className="mt-5" rows={11} />;
  if (isError) return <TableError className="mt-5" onRetry={() => refetch} />;

  return (
    <div className="space-y-4 mt-5">
      <DataTable
        defaultSortingColumn="user"
        columns={columns({})}
        data={data.data}
      />
    </div>
  );
};

export default AuditLogsTable;
