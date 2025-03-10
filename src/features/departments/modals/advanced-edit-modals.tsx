"use client";
import React, { FC } from "react";
import EditDepartmentModal from "./edit-department-modal";
import { Button } from "@/components/ui/button";
import AssignUserToDepartmentModal from "./assign-user-to-department-modal";

interface Props {
  slug: string;
}

const AdvancedEditModals: FC<Props> = ({ slug }) => {
  const [editSlug, setEditSlug] = React.useState<string | undefined>();

  return (
    <div className="mt-4">
      <h2 className="text-xl">Quick Modals</h2>
      <div className="my-4 flex items-center gap-2">
        <Button onClick={() => setEditSlug(slug)} variant="outline">
          Edit Name
        </Button>
        <EditDepartmentModal
          slug={editSlug}
          close={() => setEditSlug(undefined)}
        />
        <AssignUserToDepartmentModal slug={slug} />
      </div>
    </div>
  );
};

export default AdvancedEditModals;
