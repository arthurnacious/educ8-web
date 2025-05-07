import PageContainer from "@/components/app/page-container";
import DataWrapper from "@/features/subjects/data-wrapper";
import React from "react";

const breadcrumbs = [{ label: "Dashboard", href: "/" }, { label: "Subjects" }];
const Subjects = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <DataWrapper />
    </PageContainer>
  );
};

export default Subjects;
