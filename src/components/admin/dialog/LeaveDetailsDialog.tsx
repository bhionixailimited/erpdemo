import { Info } from "@mui/icons-material";
import { Tooltip, Avatar } from "@mui/material";
import { CustomDialog } from "components/core";
import dayjs from "dayjs";
import { useState } from "react";

let additionalLeaveInfo: any = {
  firstHalf: "First Half",
  secondHalf: "Second Half",
};

const LeaveDetailsDialog = ({ leaveDetails }: any) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
      >
        <div className="w-full flex flex-col bg-indigo-50 border  ">
          <div className="px-4 py-4 text-theme">
            <div className="flex items-center text-theme  font-bold text-xl gap-1 uppercase mb-2">
              <Info className="h-6 w-6" />
              <h3 className="tracking-wide text-lg">More information</h3>
            </div>
            <div className="flex gap-10 px-2">
              <div className="font-semibold">
                <h2>From</h2>
                {leaveDetails?.leaveDate
                  ? dayjs(leaveDetails?.leaveDate).format("ll")
                  : "Not Provided"}
              </div>
              <div className="font-semibold">
                <h2>To</h2>
                {leaveDetails?.expectedJoiningDate
                  ? dayjs(leaveDetails?.expectedJoiningDate).format("ll")
                  : "Not Provided"}
              </div>
            </div>
            <div className="font-semibold mt-4 px-2">
              {/* <h2>No Of Day : 1 </h2> */}
              <h2>
                Additional Info :{" "}
                {leaveDetails?.additionalLeaveInfo
                  ? additionalLeaveInfo[leaveDetails?.additionalLeaveInfo]
                  : "Not Provided"}
              </h2>
              {/* <span>{dayjs().format("MMM D, YYYY h:mm A")}</span> */}
            </div>
            <div className="font-semibold mt-4 px-2">
              <h2>Reason :-</h2>
              <h2>
                {leaveDetails?.reason ? leaveDetails?.reason : "Not Provided"}
              </h2>
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

export default LeaveDetailsDialog;
