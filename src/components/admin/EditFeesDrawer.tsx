import {
  Add,
  Done,
  Edit,
  ManageAccounts,
  Money,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import {
  Button,
  CustomDrawer,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";

import STATES from "configs/state";
import { SetStudentFeesForm } from "components/form/admin";
import { useState } from "react";
const EditFeesDrawer = ({ open, onClose, mutate }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        maxWidth="md"
        width="40vw"
      >
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b ">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Money className="h-8 w-8" />
              <h3 className="tracking-wide text-center">Edit Student Fees</h3>
            </div>
          </div>
          <SetStudentFeesForm open={open} mutate={mutate} />
        </div>
      </CustomDrawer>
      {/* <Button
        className="px-2 py-1 text-xs bg-slate-500 shadow-none hover:!ring-transparent"
        onClick={() => setOpenDrawer(true)}
      >
        Edit
      </Button> */}
    </div>
  );
};

export default EditFeesDrawer;
