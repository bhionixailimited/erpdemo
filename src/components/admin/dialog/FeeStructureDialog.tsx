import { Info } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Button, CustomDialog, InputField, UploadFile } from "components/core";
import { FeesStructure } from "components/students";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "departmentName",
    label: "Department Name",
    initialValue: "",
    validationSchema: Yup.string().required("Department name is required."),
    type: "text",
  },
  {
    key: "2",
    name: "description",
    label: "Description",
    initialValue: "",
    validationSchema: Yup.string().required("Description is required."),
    type: "text",
    multiline: true,
    rows: 5,
  },
];

const initialValues = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {}
);
const validationSchema = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  },
  {}
);

const FeeStructureDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col  ">
          {/* <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Create Department
          </h3> */}
          <FeesStructure />
        </div>
      </CustomDialog>
      <Tooltip title="View Fees Details">
        <IconButton onClick={() => setOpenDialog(true)}>
          <Info className="text-theme" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default FeeStructureDialog;
