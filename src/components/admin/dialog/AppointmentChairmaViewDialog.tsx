import { BookOnline, Info } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CustomDialog } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useState } from "react";
import AppointmentType from "types/appointment";

type dataType = {
  data: AppointmentType[];
};
const AppointmentChairmaViewDialog = ({ appointmentInfo }: any) => {
  const {
    data: appointment,
    mutate: mouMutate,
    isValidating,
  } = useSWRFetch<dataType>(
    appointmentInfo && `appointment?appointmentId=${appointmentInfo}`
  );
  const [openDialog, setOpenDialog] = useState(false);
  // console.log("appointmentInfo Id-->", appointmentInfo);
  // console.log("appointment All Data-->", appointment);

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
              <BookOnline className="h-8 w-8" />
              <h3 className="tracking-wide text-2xl">Appointment Details</h3>
            </div>
            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Name :</h2>
                {appointment?.data
                  ? appointment?.data?.[0]?.name
                  : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Phone :</h2>
                {appointment?.data
                  ? appointment?.data?.[0]?.phoneNumber
                  : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Whom To Meet :</h2>
                {appointment?.data
                  ? appointment?.data?.[0]?.whomToMeet
                  : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Date Of Appointment :</h2>
                {appointment?.data
                  ? dayjs(appointment?.data?.[0]?.timeOfAppointment).format(
                      "MMM D, YYYY "
                    )
                  : "Not Provided"}
              </div>
            </div>
            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Pass Type :</h2>
                {appointment?.data
                  ? appointment?.data?.[0]?.passType
                  : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full text-justify ">
                <h2 className="">Reason :</h2>
                {appointment?.data
                  ? appointment?.data?.[0]?.reason
                  : "Not Provided"}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>
      <span
        onClick={() => setOpenDialog(true)}
        className="cursor-pointer text-orange-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
      >
        <Tooltip title="View Appointment Info">
          <Info />
        </Tooltip>
      </span>
    </>
  );
};

export default AppointmentChairmaViewDialog;
