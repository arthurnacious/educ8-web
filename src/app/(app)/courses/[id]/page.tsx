import PageContainer from "@/components/app/page-container";
import DataWrapper from "@/features/courses/data-wrapper";
import React, { FC } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Courses",
    href: "/Courses",
  },
  {
    label: "This Course",
  },
];
const ShowClass: FC<Props> = async ({ params }) => {
  const { id } = await params;
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <DataWrapper courseId={id} />
    </PageContainer>
  );
};

export default ShowClass;
