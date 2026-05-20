import {
  Add,
  AddBox,
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
  Avatar,
  Tooltip,
  Checkbox,
  Divider,
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
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "vehicleName",
    label: "Vehicle Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Vehicle name is required."),
    type: "text",
  },
  {
    key: "2",
    name: "vehicleNumber",
    label: "Vehicle Number *",
    initialValue: "",
    validationSchema: Yup.string().required("Vehicle number is required."),
    type: "text",
  },

  {
    key: "5",
    name: "rcNumber",
    label: "RC Number *",
    initialValue: "",
    validationSchema: Yup.string().required("RC Number is required."),
    type: "number",
  },
  {
    key: "5",
    name: "rcExpiryDate",
    label: "RC Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().required("RC Expiry Date is required."),
    type: "date",
  },
  {
    key: "3435",
    name: "insuranceNumber",
    label: "Insurance Number *",
    initialValue: "",
    validationSchema: Yup.string().required("RC Number is required."),
    type: "rcNumber",
  },
  {
    key: "5dd",
    name: "insuranceExpiryDate",
    label: "Insurance Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().required(
      "Insurance Expiry Date is required."
    ),
    type: "date",
  },
  {
    key: "5",
    name: "pucNumber",
    label: "PUC Number *",
    initialValue: "",
    validationSchema: Yup.string().required("PUC Number is required."),
    type: "number",
  },
  {
    key: "5",
    name: "pucExpiryDate",
    label: "PUC Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().required("PUC Expiry Date is required."),
    type: "date",
  },
  {
    key: "5sdsac",
    name: "vehicleStatus",
    label: "Vehicle Status *",
    initialValue: "",
    validationSchema: Yup.string().required("Vehicle status is required."),
    type: "select",
    options: [
      {
        key: 1,
        label: "Active",
        value: "active",
      },
      {
        key: 2,
        label: "In-Active",
        value: "in-active",
      },
    ],
  },
];

const EmployeeFilterDrawer = ({ open, onClose }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <CustomDrawer
        open={open}
        onClose={onClose}
        anchor="right"
        maxWidth="md"
        width="30vw"
      >
        <div className="w-full  p-4">
          <div className="flex items-center py-4 gap-4">
            <AddBox className="text-blue-500" />
            <h3 className="font-medium text-theme tracking-wide text-sm">
              Filter By Type
            </h3>
          </div>
          <Divider />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">Teaching</h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">
                Non Teaching
              </h3>
            </div>
          </div>
          <Divider />
          <div className="flex items-center py-4 gap-4">
            <AddBox className="text-blue-500" />
            <h3 className="font-medium text-theme tracking-wide text-sm">
              Filter By Department
            </h3>
          </div>
          <Divider />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">Finance</h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">HR</h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">Admission</h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">Library</h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">Inventory</h3>
            </div>
          </div>
          <Divider />
          <div className="flex items-center py-4 gap-4">
            <AddBox className="text-blue-500" />
            <h3 className="font-medium text-theme tracking-wide text-sm">
              Filter By Gender
            </h3>
          </div>
          <Divider />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">Male</h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">Female</h3>
            </div>
          </div>
          <Divider />
          <div className="flex items-center py-4 gap-4">
            <AddBox className="text-blue-500" />
            <h3 className="font-medium text-theme tracking-wide text-sm">
              Filter By Date
            </h3>
          </div>
          <Divider />
          <div className="flex flex-col gap-1">
            <InputField type="date" className="w-full !h-10 " />
          </div>
        </div>
      </CustomDrawer>
    </>
  );
};

export default EmployeeFilterDrawer;
