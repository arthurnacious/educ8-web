import PageContainer from "@/components/app/page-container";
import DataWrapper from "@/features/departments/data-wrapper";
import React from "react";

const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Departments" },
];
const Departments = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <DataWrapper />
    </PageContainer>
  );
};

export default Departments;
