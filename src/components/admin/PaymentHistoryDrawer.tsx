import {
  Add,
  Done,
  Edit,
  History,
  ManageAccounts,
  MonetizationOn,
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
} from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  CustomDrawer,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";

import STATES from "configs/state";
import { useFormik } from "formik";
import { useSWRFetch } from "hooks";
import { useState } from "react";
import * as Yup from "yup";
import PaymentTransactions from "./PaymentTransactions";
import { Transactions } from "./studentdetails";

const timetableSchema = [
  {
    key: "1",
    name: "employeeName",
    label: "Employee Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Vehicle name is required."),
    type: "autocomplete",
    options: [
      {
        key: "1",
        label: "Alexa Smith",
        value: "alexaSmith",
        optionName: "4358794578",
      },
      {
        key: "2",
        label: "Alexa Smith",
        value: "alexaSmith",
        optionName: "4358794578",
      },
    ],
  },
  {
    key: "2",
    name: "employeeId",
    label: "Employee Id *",
    initialValue: "",
    validationSchema: Yup.string().required("Vehicle number is required."),
    type: "autocomplete",
    options: [
      {
        key: "1",
        label: "XYZ44554456",
        value: "XYZ44554456",
      },
      {
        key: "2",
        label: "XYZ44554456",
        value: "XYZ44554456",
      },
    ],
  },

  {
    key: "5",
    name: "paymentMethod",
    label: "Payment Method *",
    initialValue: "",
    validationSchema: Yup.string().required("Payment method is required."),
    type: "select",
    options: [
      {
        key: 1,
        label: "Online",
        value: "online",
      },
      {
        key: 2,
        label: "Cash",
        value: "cash",
      },
    ],
  },
  {
    key: "3435",
    name: "paymentAmount",
    label: "Payment Amount *",
    initialValue: "",
    validationSchema: Yup.string().required("Payment amount is required."),
    type: "number",
  },
  {
    key: "5",
    name: "paymentDate",
    label: "Payment Date *",
    initialValue: "",
    validationSchema: Yup.string().required("Payment date is required."),
    type: "date",
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
const PaymentDrawer = ({ open, onClose, user }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      formik?.resetForm();

      setOpenDrawer(false);
    },
  });
  return (
    <>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        maxWidth="md"
        width="40vw"
      >
        <div className="w-full relative">
          <div className="flex items-center justify-between p-4 border-b mt-14 md:mt-0 ">
            <div className="flex items-center text-slate-700 font-semibold text-sm md:text-xl gap-1 uppercase ">
              <Money className="h-8 w-8" />
              <h3 className="tracking-wide text-center ">{`Payment History Of ${
                user?.displayName ? user?.displayName : ""
              }`}</h3>
            </div>
          </div>
          <div>
            <PaymentTransactions _id={user?._id} />
          </div>
        </div>
      </CustomDrawer>
      <Tooltip title="Payment History">
        <Avatar
          variant="rounded"
          onClick={() => setOpenDrawer(true)}
          className=" !mr-1 !cursor-pointer !bg-sky-700 text-white"
        >
          <History className="!p-0" />
        </Avatar>
      </Tooltip>
    </>
  );
};

export default PaymentDrawer;
