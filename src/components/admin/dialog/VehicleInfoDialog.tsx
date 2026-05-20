import { DirectionsBus, Edit, Info, Person } from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Button, CustomDialog, InputField, UploadFile } from "components/core";
import { FeesStructure } from "components/students";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

// const timetableSchema = [
//   {
//     key: "1",
//     name: "departmentName",
//     label: "Department Name",
//     initialValue: "",
//     validationSchema: Yup.string().required("Department name is required."),
//     type: "text",
//   },
//   {
//     key: "2",
//     name: "description",
//     label: "Description",
//     initialValue: "",
//     validationSchema: Yup.string().required("Description is required."),
//     type: "text",
//     multiline: true,
//     rows: 5,
//   },
// ];

// const initialValues = timetableSchema?.reduce(
//   (accumulator: any, currentValue) => {
//     accumulator[currentValue?.name] = currentValue.initialValue;
//     return accumulator;
//   },
//   {}
// );
// const validationSchema = timetableSchema?.reduce(
//   (accumulator: any, currentValue) => {
//     accumulator[currentValue?.name] = currentValue.validationSchema;
//     return accumulator;
//   },
//   {}
// );

const VehicleInfoDialog = ({ vehicle }: any) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
      >
        <div className="w-full flex flex-col bg-red-100 border">
          <div className="px-4 py-4 text-theme">
            <div className="flex items-center text-theme  font-bold text-xl gap-1 mb-2">
              <DirectionsBus className="h-8 w-8" />
              <h3 className="tracking-wide text-2xl">Vehicle Details</h3>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Fitness No</h2>
                {vehicle?.fitnessNumber
                  ? vehicle?.fitnessNumber
                  : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Expiry</h2>
                {vehicle?.fitnessNumberExpiryDate
                  ? dayjs(vehicle?.fitnessNumberExpiryDate).format("ll")
                  : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Permit No</h2>
                {vehicle?.permitNumber ? vehicle?.permitNumber : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Expiry</h2>
                {vehicle?.permitNumberExpiryDate
                  ? dayjs(vehicle?.permitNumberExpiryDate).format("ll")
                  : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">RC No</h2>
                {vehicle?.rcNumber ? vehicle?.rcNumber : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Expiry</h2>
                {vehicle?.rcExpiryDate
                  ? dayjs(vehicle?.rcExpiryDate).format("ll")
                  : "Not Provided"}
              </div>
            </div>
            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Insurance No</h2>
                {vehicle?.insuranceNumber
                  ? vehicle?.insuranceNumber
                  : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Expiry</h2>
                {vehicle?.insuranceExpiryDate
                  ? dayjs(vehicle?.insuranceExpiryDate).format("ll")
                  : "Not Provided"}
              </div>
            </div>
            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">PUC No</h2>
                {vehicle?.pucNumber ? vehicle?.pucNumber : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Expiry</h2>
                {vehicle?.pucExpiryDate
                  ? dayjs(vehicle?.pucExpiryDate).format("ll")
                  : "Not Provided"}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>

      <span
        onClick={() => setOpenDialog(true)}
        className="bg-gradient-to-r from-transparent cursor-pointer text-white to-orange-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
      >
        <Tooltip title="View More Info">
          <Info />
        </Tooltip>
      </span>
    </>
  );
};

export default VehicleInfoDialog;
