import { Edit, Info, Person } from "@mui/icons-material";
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

const DriverDetailsDialog = ({ open }: any) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
      >
        <div className="w-full flex flex-col bg-red-100 border">
          <div className="px-4 py-4 text-theme">
            <div className="flex items-center text-theme  font-bold text-xl gap-1 ">
              <Person className="h-6 w-6" />
              <h3 className="tracking-wide text-xl">Driver Details</h3>
            </div>
            <div className="px-1.5">
              <ListItem sx={{ paddingLeft: "0px" }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={
                      open?.driver?.photoUrl ||
                      `https://cdn-icons-png.flaticon.com/128/4900/4900915.png`
                    }
                    alt={"img"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      className="!font-semibold !text-lg"
                      component="span"
                      variant="body2"
                    >
                      {open?.driver?.name || ""}
                    </Typography>
                  }
                  secondaryTypographyProps={{
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                  secondary={open?.driver?.phoneNumber || ""}
                  //   secondary={phoneNumber}
                ></ListItemText>
              </ListItem>
            </div>{" "}
            <div className="flex gap-10 px-2">
              <div className="font-semibold">
                <h2 className="">Driving License No</h2>
                {open?.driver?.drivingLicenseNumber || "Not Provided"}
              </div>
              <div className="font-semibold">
                <h2>Expiry Date</h2>
                {open?.driver?.licenseExpiryDate
                  ? dayjs(open?.driver?.licenseExpiryDate).format("ll")
                  : "Not Provided"}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>
      <Tooltip title="View More Info">
        <Avatar
          variant="rounded"
          onClick={() => setOpenDialog(true)}
          sx={{
            mr: ".4vw",
            padding: "0px !important",
            backgroundColor: "lawngreen",
            cursor: "pointer",
          }}
        >
          <Info sx={{ padding: "0px !important" }} />
        </Avatar>
      </Tooltip>
    </div>
  );
};

export default DriverDetailsDialog;
