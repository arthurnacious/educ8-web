"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import PersonalPresentedClassesTable from "@/features/personal/data-tables/personal-presented-class-table";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";

const PersonalClassesTabs = [
  {
    tab: "presentedClasses",
    tag: "Presented",
    content: <PersonalPresentedClassesTable />,
  },
  {
    tab: "enrolledClasses",
    tag: "Enrolled",
    content: <div>Enrolled Classes Here</div>,
  },
  {
    tab: "departmentClasses",
    tag: "Department Classes",
    content: <div>Department Classes Here</div>,
  },
];

const ClientWrapper = () => {
  return (
    <Tabs value={"presentedClasses"}>
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
