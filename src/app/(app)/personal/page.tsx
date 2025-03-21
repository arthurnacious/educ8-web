import PageContainer from "@/components/app/page-container";

const breadcrumbs = [{ label: "Dashboard", href: "/" }, { label: "Personal" }];
const PersonalClasses = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <h1 className="text-3xl font-bold mb-2">Personal Stuff</h1>
      <div className="border-t border-gray-500" />
      <div className="border-neutral-900 p-5 rounded-lg shadow-md shadow-black">
        Personal things goes here, maybe profile, maybe marks, maybe both
      </div>
    </PageContainer>
  );
};

export default PersonalClasses;
