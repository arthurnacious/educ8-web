import PageContainer from "@/components/app/page-container";
import DataWrapper from "@/features/classes/data-wrapper";
import React, { FC } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Classes",
    href: "/classes",
  },
  {
    label: "This class",
  },
];
const ShowClass: FC<Props> = async ({ params }) => {
  const { id } = await params;
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <DataWrapper classId={id} />
    </PageContainer>
  );
};

export default ShowClass;
