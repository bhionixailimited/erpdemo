import { Avatar } from "@mui/material";
import { AssignmentIconNew } from "assets/static-icon";
import { Button } from "components/core";
import dayjs from "dayjs";

type Props = {
  button?: boolean;
  onClick?: () => void;
  title?: string;
  startTime?: string;
  duration?: number;
  type?: string;
  createdBy?: string;
  credit?: number;
};

const CreateExamCard = ({
  button = true,
  onClick,
  title,
  startTime,
  duration,
  type,
  createdBy,
  credit,
}: Props) => {
  return (
    <div className="w-full shadow-lg border-b-8 border-t-8 border-theme bg-white p-4  gap-4 items-center rounded-xl ">
      <div className="flex items-center gap-4 w-full ">
        <Avatar
          src={AssignmentIconNew.src}
          className="!p-4 !h-20 !bg-theme/10 !border  !border-theme !w-20 "
        />
        <div className="flex flex-col">
          <h3 className="font-semibold tracking-wide text-base">{title}</h3>
          <small className="tracking-wide text-gray-500 font-medium">
            Scheduled {dayjs(startTime).format("DD-MM-YYYY")}
          </small>
          <small className="tracking-wide text-gray-500 font-medium">
            Time {dayjs(startTime).format("hh:mm A")}
          </small>
        </div>
      </div>
      <div className="flex flex-col py-4 gap-1">
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">Duration -</h3>
          <small className="tracking-wide text-theme font-semibold px-2 py-1 rounded-md ">
            {duration &&
              (duration > 60
                ? (duration / 60)?.toFixed(2) + " hr(s)"
                : duration + " min(s)")}
          </small>
        </span>
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">Type -</h3>
          <small className="tracking-wide text-theme font-semibold px-2 py-1 rounded-md ">
            {type}
          </small>
        </span>
        {createdBy && (
          <span className="flex items-center gap-4">
            <h3 className="font-medium text-sm tracking-wide">Created By -</h3>
            <small className="tracking-wide text-theme font-semibold px-2 py-1 rounded-md ">
              {createdBy}
            </small>
          </span>
        )}

        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">Credit -</h3>
          <small className="tracking-wide text-theme font-semibold px-2 py-1 rounded-md ">
            {credit || "Unavailable"}
          </small>
        </span>
      </div>
      {button && (
        <div className="w-full flex items-center justify-center">
          <Button onClick={onClick}>View Details </Button>
        </div>
      )}
    </div>
  );
};

export default CreateExamCard;
