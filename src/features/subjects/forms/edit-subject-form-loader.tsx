"use client";

import { FC } from "react";
import { useGetAllDepartments } from "@/features/departments/queries";
import { useGetSubjectBySlug } from "../queries";
import EditSubjectForm from "./edit-subject-form";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  slug: string;
  onSuccessCallback?: () => void;
};

const EditSubjectFormLoader: FC<Props> = ({ slug, onSuccessCallback }) => {
  const {
    data: subjectData,
    isLoading: isSubjectLoading,
    isError: subjectError,
  } = useGetSubjectBySlug(slug);

  const {
    data: departmentsData,
    isLoading: isDepartmentsLoading,
    isError: departmentsError,
  } = useGetAllDepartments();

  if (isSubjectLoading || isDepartmentsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  if (subjectError || departmentsError || !subjectData || !departmentsData) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <EditSubjectForm
      slug={slug}
      onSuccessCallback={onSuccessCallback}
      defaultValues={{
        name: subjectData.name,
        description: subjectData.description,
        departmentId: subjectData.departmentId,
      }}
      departments={departmentsData}
    />
  );
};

export default EditSubjectFormLoader;
