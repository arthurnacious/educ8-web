import PageContainer from "@/components/app/page-container";
import React from "react";

const breadcrumbs = [{ label: "Dashboard", href: "/" }, { label: "Courses" }];
const Courses = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>Courses goes here</PageContainer>
  );
};

export default Courses;
