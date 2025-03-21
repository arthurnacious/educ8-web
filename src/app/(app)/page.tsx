import PageContainer from "@/components/app/page-container";
import DataWrapper from "@/features/dashboard/components/data-wrapper";
import React from "react";

const breadcrumbs = [{ label: "Dashboard" }];
const Dashboard = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <DataWrapper />
    </PageContainer>
  );
};

export default Dashboard;
