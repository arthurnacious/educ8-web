import PageContainer from "@/components/app/page-container";
import React from "react";

const breadcrumbs = [{ label: "Dashboard", href: "/" }, { label: "Subjects" }];
const Subjects = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>Subjects goes here</PageContainer>
  );
};

export default Subjects;
