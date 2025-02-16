import PageContainer from "@/components/app/page-container";
import React from "react";

const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Departments" },
];
const Departments = () => {
  return <PageContainer breadcrumbs={breadcrumbs}>Departments</PageContainer>;
};

export default Departments;
