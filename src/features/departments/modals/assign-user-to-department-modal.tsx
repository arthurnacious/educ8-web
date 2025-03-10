import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import FlexDialog from "@/components/ui/flex-dialog";
import AssignUserToDepartmentForm from "../forms/assign-user-to-department-form";

interface Props {
  slug: string;
}

const AssignUserToDepartmentModal: FC<Props> = ({ slug }) => {
  const [open, setOpen] = useState(false);

  return (
    <FlexDialog
      trigger={<Button variant="outline">Attach Member</Button>}
      onOpenChange={setOpen}
      open={open}
      title="Attach Member to Department"
    >
      <AssignUserToDepartmentForm
        onSuccess={() => setOpen(false)}
        slug={slug}
      />
    </FlexDialog>
  );
};

export default AssignUserToDepartmentModal;
