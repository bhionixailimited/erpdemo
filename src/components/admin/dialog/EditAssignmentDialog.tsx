import { DesignServices } from "@mui/icons-material";
import { Button, CustomDialog } from "components/core";
import { AssignmentCreateForm } from "components/form/teacher";
import { useState } from "react";
import { KeyedMutator } from "swr";

type Props = {
  Dmutate: KeyedMutator<any>;
};
const EditAssignmentDialog = ({ Dmutate }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="w-fit">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
        >
          <AssignmentCreateForm
            assignmentMutate={Dmutate}
            setOpenDialog={setOpenDialog}
          />
        </CustomDialog>
      </div>
      <Button
        className="hover:!ring-theme"
        startIcon={<DesignServices />}
        onClick={() => setOpenDialog(true)}
      >
        Edit
      </Button>
    </>
  );
};

export default EditAssignmentDialog;
