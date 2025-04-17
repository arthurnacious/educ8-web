import PageContainer from "@/components/app/page-container";
import React from "react";

const breadcrumbs = [{ label: "Dashboard", href: "/" }, { label: "Users" }];
const Users = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>Users goes here</PageContainer>
  );
};

export default Users;
