import { Add } from "@mui/icons-material";
import { Button, CustomDialog } from "components/core";
import { BulkUploadForm } from "components/form/admin";
import React, { useState } from "react";

const AddBulkUploadDialogSubject = (title: any) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
        >
          <section className=" ">
            <BulkUploadForm title={"Subjects"} />
          </section>
        </CustomDialog>
      </div>

      <Button
        startIcon={<Add />}
        className="!shadow-none"
        onClick={() => setOpenDialog(true)}
      >
        Subject Bulk Upload
      </Button>
    </>
  );
};

export default AddBulkUploadDialogSubject;
