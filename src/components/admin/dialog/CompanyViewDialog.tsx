import {
  BookOnline,
  Business,
  DirectionsBus,
  Edit,
  Info,
  Person,
} from "@mui/icons-material";
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
import { useSWRFetch } from "hooks";
import { useState } from "react";
import AppointmentType from "types/appointment";
import CompanyType from "types/company";
import * as Yup from "yup";

type dataType = {
  data: CompanyType[];
};
const CompanyViewDialog = ({ companyInfo }: any) => {
  const {
    data: company,
    mutate: mouMutate,
    isValidating,
  } = useSWRFetch<dataType>(
    companyInfo && `placement/company?companyId=${companyInfo}`
  );
  const [openDialog, setOpenDialog] = useState(false);
  // console.log(companyInfo);
  // console.log(comapny?.data?.[0]);

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
              {/* <Business className="h-8 w-8" /> */}
              <div className="px-2">
                <Avatar
                  src={
                    company?.data?.[0]?.iconUrl ||
                    `https://cdn-icons-png.flaticon.com/128/11794/11794931.png`
                  }
                  variant="rounded"
                  sx={{
                    mt: 0,
                    height: 50,
                    width: 50,
                  }}
                />
              </div>
              <h3 className="tracking-wide text-2xl pl-3">Company Details</h3>
            </div>
            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Company Name :</h2>
                {company?.data ? company?.data?.[0]?.name : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Phone :</h2>
                {company?.data
                  ? company?.data?.[0]?.phoneNumber
                  : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Industry :</h2>
                {company?.data ? company?.data?.[0]?.industry : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Branch :</h2>
                {company?.data ? company?.data?.[0]?.branch : "Not Provided"}
              </div>
            </div>
            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full text-justify">
                <h2>Address :</h2>
                {company?.data ? company?.data?.[0]?.address : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full text-justify">
                <h2>Description :</h2>
                {company?.data
                  ? company?.data?.[0]?.description
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
        <Tooltip title="View Company Info">
          <Info />
        </Tooltip>
      </span>
    </>
  );
};

export default CompanyViewDialog;
