import PageContainer from "@/components/app/page-container";
import React from "react";

const breadcrumbs = [{ label: "Dashboard" }];
const Dashboard = () => {
  return <PageContainer breadcrumbs={breadcrumbs}>Dashboard</PageContainer>;
};

export default Dashboard;
