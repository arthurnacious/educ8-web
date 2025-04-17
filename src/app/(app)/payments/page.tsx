import PageContainer from "@/components/app/page-container";
import React from "react";

const breadcrumbs = [{ label: "Dashboard", href: "/" }, { label: "Payments" }];
const Payments = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      Outstanding Pyaments goes here
    </PageContainer>
  );
};

export default Payments;
