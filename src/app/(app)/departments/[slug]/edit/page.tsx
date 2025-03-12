import PageContainer from "@/components/app/page-container";
import AdvancedEditDepartment from "@/features/departments/advanced-edit-department";
import AdvancedEditModals from "@/features/departments/modals/advanced-edit-modals";
import { FC } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const EditDepartment: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Departments", href: "/departments" },
    { label: slug },
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h1 className="text-3xl font-bold mb-2">Advanced Department Edit</h1>
      <div className="border-t border-gray-500" />
      <AdvancedEditModals slug={slug} />
      <AdvancedEditDepartment slug={slug} />
    </PageContainer>
  );
};

export default EditDepartment;
