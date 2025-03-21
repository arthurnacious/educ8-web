"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import PersonalPresentedClassesTable from "@/features/personal/data-tables/personal-presented-classes-table";
import PersonalEnrolledClassesTable from "@/features/personal/data-tables/personal-enrolled-classes-table";
import PersonalDepartmentClassesTable from "@/features/personal/data-tables/personal-department-classes-table";

const PersonalClassesTabs = [
  {
    tab: "presentedClasses",
    tag: "Presented",
    content: <PersonalPresentedClassesTable />,
  },
  {
    tab: "enrolledClasses",
    tag: "Enrolled",
    content: <PersonalEnrolledClassesTable />,
  },
  {
    tab: "departmentClasses",
    tag: "Department",
    content: <PersonalDepartmentClassesTable />,
  },
];

const ClientWrapper = () => {
  return (
    <Tabs defaultValue={PersonalClassesTabs.at(0)?.tab || "presentedClasses"}>
      <TabsList className="flex space-x-2">
        {PersonalClassesTabs.map(({ tab, tag }) => (
          <TabsTrigger key={`trigger-${tab}`} value={tab}>
            {tag}
          </TabsTrigger>
        ))}
      </TabsList>
      {PersonalClassesTabs.map(({ tab, content }) => (
        <TabsContent key={`content-${tab}`} value={tab}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ClientWrapper;
