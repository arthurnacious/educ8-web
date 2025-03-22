import PageContainer from "@/components/app/page-container";
import React from "react";

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Classes",
  },
];
const Dashboard = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h2>List of clases goes here</h2>
    </PageContainer>
  );
};

export default Dashboard;
