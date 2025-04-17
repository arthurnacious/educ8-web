"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import PersonalPresentedCoursesTable from "@/features/personal/data-tables/personal-presented-courses-table";
import PersonalEnrolledCoursesTable from "@/features/personal/data-tables/personal-enrolled-courses-table";
import PersonalDepartmentCoursesTable from "@/features/personal/data-tables/personal-department-courses-table";

const PersonalCoursesTabs = [
  {
    tab: "presentedCourses",
    tag: "Presented",
    content: <PersonalPresentedCoursesTable />,
  },
  {
    tab: "enrolledCourses",
    tag: "Enrolled",
    content: <PersonalEnrolledCoursesTable />,
  },
  {
    tab: "departmentCourses",
    tag: "Department",
    content: <PersonalDepartmentCoursesTable />,
  },
];

const ClientWrapper = () => {
  return (
    <Tabs defaultValue={PersonalCoursesTabs.at(0)?.tab || "presentedCourses"}>
      <TabsList className="flex space-x-2">
        {PersonalCoursesTabs.map(({ tab, tag }) => (
          <TabsTrigger key={`trigger-${tab}`} value={tab}>
            {tag}
          </TabsTrigger>
        ))}
      </TabsList>
      {PersonalCoursesTabs.map(({ tab, content }) => (
        <TabsContent key={`content-${tab}`} value={tab}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ClientWrapper;
