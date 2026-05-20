import { Info } from "@mui/icons-material";
import { Tooltip, Avatar } from "@mui/material";
import { CustomDialog } from "components/core";
import dayjs from "dayjs";
import { useState } from "react";
import DepartmentType from "types/department";
import MouType from "types/mou";

// type dataType = {
//   data: MouType;
//   DepartmentType: DepartmentType;
// };
type MouViewDialogProps = {
  title: string;
  signUnderWhom: string;
  signBy: string;
  dateOfSigning: string;
  dateOfExpire: string;
  // includeDepartment: DepartmentType; // Use DepartmentType for includeDepartment
  includeDepartment: string; // Use DepartmentType for includeDepartment
  description: string;
};

const MouViewDialog = ({
  title,
  signUnderWhom,
  signBy,
  dateOfSigning,
  dateOfExpire,
  includeDepartment,
  description,
}: any) => {
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
              <div className="px-2">
                <Avatar
                  src={
                    // mouData?.data?.iconUrl ||
                    `https://cdn-icons-png.flaticon.com/512/1077/1077063.png`
                  }
                  variant="rounded"
                  sx={{
                    mt: 0,
                    height: 30,
                    width: 30,
                  }}
                />
              </div>
              <h3 className="tracking-wide text-2xl pl-3">MOU Details</h3>
            </div>
            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Title :</h2>
                {title ? title : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Department :</h2>
                {includeDepartment ? includeDepartment : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Signed By :</h2>
                {signBy ? signBy : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Signed Under :</h2>
                {signUnderWhom ? signUnderWhom : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full">
                <h2 className="">Signing Date :</h2>
                {dateOfSigning
                  ? dayjs(dateOfSigning).format("MMM D, YYYY")
                  : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2 className="">Expire Date :</h2>
                {dateOfExpire
                  ? dayjs(dateOfExpire).format("MMM D, YYYY")
                  : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full text-justify">
                <h2>Description :</h2>
                {description ? description : "Not Provided"}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>

      <span onClick={() => setOpenDialog(true)} className="cursor-pointer ">
        <Tooltip title="View MOU Info">
          <Info />
        </Tooltip>
      </span>
    </>
  );
};

export default MouViewDialog;
