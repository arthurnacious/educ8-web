import PageContainer from "@/components/app/page-container";

const breadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Personal", href: "/personal" },
  { label: "Dependants" },
];
const PersonalDependants = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h1 className="text-3xl font-bold mb-2 px-5">Personal Dependants</h1>
      <div className="border-t border-gray-500" />
      <div className="border-neutral-900 p-5 rounded-lg shadow-md shadow-black">
        Table goes here
      </div>
    </PageContainer>
  );
};

export default PersonalDependants;
