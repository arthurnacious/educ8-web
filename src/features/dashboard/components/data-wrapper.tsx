"use client";
import React from "react";
import FinancialOverview from "@/features/dashboard/components/overview/financial-overview";
import { Calendar, CreditCard, Users, Wallet } from "lucide-react";
import ClassesOverview from "@/features/dashboard/components/overview/classes-overview";
import UsersOverview from "@/features/dashboard/components/overview/users-overview";
import AuditLogsTable from "../data-tables/audit-logs";

const DataWrapper = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2 ">
            <Wallet className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Accounts
          </h2>
          <div className="flex-1">
            <FinancialOverview className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Recent Transactions
          </h2>
          <div className="flex-1">
            <ClassesOverview className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Users Overview
          </h2>
          <div className="flex-1">
            <UsersOverview className="h-full" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6  border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
          Audit
        </h2>

        <div>
          <AuditLogsTable />
        </div>
      </div>
    </div>
  );
};

export default DataWrapper;
