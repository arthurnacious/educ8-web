import PageContainer from "@/components/app/page-container";
import React from "react";
import ClientWrapper from "@/features/personal/client-wrapper";

const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Personal", href: "/personal" },
  { label: "Classes" },
];
const PersonalClasses = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h1 className="text-3xl font-bold mb-2">Personal Classes</h1>
      <div className="border-t border-gray-500" />
      {/* <PersonalClassesModal /> */}
      <div className="border-neutral-900 p-5 rounded-lg shadow-md shadow-black">
        <ClientWrapper />
      </div>
    </PageContainer>
  );
};

export default PersonalClasses;
