import { Add, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, CustomDialog } from "components/core";
import { CreateClassForm } from "components/form/teacher";
import { useState } from "react";
const CreateClass = ({ reload }: { reload?: () => void }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button startIcon={<Add />} onClick={() => setOpenDialog(true)}>
        Create Class
      </Button>

      <CustomDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-4 justify-between">
            <h3 className="font-medium tracking-wide  text-theme text-2xl border-b p-4">
              Create New Class
            </h3>
            <IconButton onClick={() => setOpenDialog(false)}>
              <Close />
            </IconButton>
          </div>
          <CreateClassForm reload={reload} />
        </div>
      </CustomDialog>
    </>
  );
};

export default CreateClass;
