import React, { FC } from "react";
import { useGetClassById } from "@/features/courses/queries";
import { useRemoveStudentsFromClass } from "@/features/courses/mutations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import MarksDataTable from "./data-tables/marks";
import AttendanceDataTable from "./data-tables/attendance";

interface Props {
  classId: string;
}

const LessonRoster: FC<Props> = ({ classId }) => {
  const { data, isLoading, isError, refetch } = useGetClassById({ classId });
  const { isPending, mutate: removeStudents } = useRemoveStudentsFromClass({
    classId,
  });

  const classData = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <p className="text-red-500">Failed to load class data</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </Card>
    );
  }

  if (!classData) return null;

  return (
    <Tabs defaultValue="attendance" className="">
      <TabsList className="">
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="marks">Marks</TabsTrigger>
      </TabsList>
      <TabsContent value="attendance">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              View and manage student attendance for this class
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AttendanceDataTable
              isPending={isPending}
              removeStudents={(studentIds: string[]) =>
                removeStudents({ studentIds })
              }
              sessions={classData.sessions}
              enrollments={classData?.enrollments}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="marks">
        <Card>
          <CardHeader>
            <CardTitle>Student Marks</CardTitle>
            <CardDescription>
              Manage grades and assessments for this class
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <MarksDataTable
              isPending={isPending}
              removeStudents={(studentIds: string[]) =>
                removeStudents({ studentIds })
              }
              data={classData}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LessonRoster;
