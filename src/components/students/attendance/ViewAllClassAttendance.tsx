import { Cancel } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CustomDialog } from "components/core";

const ViewAllClassAttendance = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose?: (arg: boolean) => void;
  data?: any[];
}) => {
  return (
    <CustomDialog
      open={open}
      onClose={() => onClose?.(false)}
      maxWidth="sm"
      onMouseOutCapture={() => onClose?.(false)}
    >
      <div className="w-full flex flex-col">
        <div className="flex items-center border-b justify-between p-4">
          <h3 className="font-medium tracking-wide text-xl  text-theme ">
            All Class
          </h3>

          <IconButton onClick={() => onClose?.(false)}>
            <Cancel className="text-theme text-4xl cursor-pointer " />
          </IconButton>
        </div>

        {data?.map((item, index) => (
          <div className="flex items-center" key={index}>
            <h3 className="font-medium tracking-wide p-4 text-theme">
              {item?.subject}
            </h3>
            -
            <h3
              className="font-medium tracking-wide p-4 text-whatsapp"
              key={index}
            >
              {item?.status}
            </h3>
          </div>
        ))}
      </div>
    </CustomDialog>
  );
};

export default ViewAllClassAttendance;
