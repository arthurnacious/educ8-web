import PageContainer from "@/components/app/page-container";
import EditSubjectForm from "@/features/subjects/forms/edit-subject-form";
import React, { FC } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Subjects", href: "/subjects" },
  { label: "Edit Subject" },
];
const Subjects: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <EditSubjectForm slug={slug} />
    </PageContainer>
  );
};

export default Subjects;
