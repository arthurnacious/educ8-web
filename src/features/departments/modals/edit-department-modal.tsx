import { FC } from "react";
import FlexDialog from "@/components/ui/flex-dialog";
import EditDepartmentForm from "../forms/edit-department-form";

interface Props {
  slug?: string;
  close: () => void;
}

const EditDepartmentModal: FC<Props> = ({ slug, close }) => {
  return (
    <FlexDialog
      open={!!slug}
      onOpenChange={close}
      title="Edit Department"
      description="Modify department details"
    >
      {slug && <EditDepartmentForm onSuccessCallback={close} slug={slug} />}
    </FlexDialog>
  );
};

export default EditDepartmentModal;
