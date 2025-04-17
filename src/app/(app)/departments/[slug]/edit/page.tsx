import PageContainer from "@/components/app/page-container";
import DepartmentsSubjectsTable from "@/features/departments/data-tables/departments-subjects-table";
import DepartmentsMembersTable from "@/features/departments/data-tables/departments-members-table";
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
      <h1 className="text-3xl font-bold mb-2 px-5">Advanced Department Edit</h1>
      <div className="border-t border-gray-500" />
      <AdvancedEditModals slug={slug} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border border-neutral-900 p-5 rounded-lg shadow-md shadow-black">
        <div>
          <h2 className="text-2xl"> Department Members</h2>
          <DepartmentsMembersTable slug={slug} />
        </div>
        <div>
          <h2 className="text-2xl"> Departments Subjects</h2>
          <DepartmentsSubjectsTable slug={slug} />
        </div>
      </div>
    </PageContainer>
  );
};

export default EditDepartment;
