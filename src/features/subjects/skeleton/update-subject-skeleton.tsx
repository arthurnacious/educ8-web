import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UpdateSubjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-5  w-24" />
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-16 w-full" />
      </div>

      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

export default UpdateSubjectSkeleton;
