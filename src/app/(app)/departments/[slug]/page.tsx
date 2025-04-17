import PageContainer from "@/components/app/page-container";
import React, { FC } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "This class",
  },
];
const ShowDepartment: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h2>Class with slug {slug}</h2>
    </PageContainer>
  );
};

export default ShowDepartment;
