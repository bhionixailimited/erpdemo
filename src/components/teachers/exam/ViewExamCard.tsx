import { Avatar } from "@mui/material";
import { AssignmentIconNew } from "assets/static-icon";
import dayjs from "dayjs";

type Props = {
  title: string;
  onClick?: (event: any) => void;
  batch?: any;
  startDate?: string;
  endDate?: string;
};

const ViewExamCard = ({ onClick, title, batch, startDate, endDate }: Props) => {
  return (
    <div className="w-full shadow-lg border-b-8 border-t-8 border-theme bg-theme/10 p-4 flex flex-col gap-4 items-center rounded-xl ">
      <Avatar
        src={AssignmentIconNew.src}
        className="!p-4 !h-20 !bg-gray-100 !w-20  !border !border-theme"
      />

      <h3 className="font-semibold tracking-wide text-xl">{title}</h3>
      <div className="flex flex-col gap-1 ">
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">Batch-</h3>
          <small className="tracking-wide text-theme font-medium">
            {batch
              ? `${batch?.course?.title} ${batch?.branch?.title} (
            ${batch?.session?.title})`
              : "Not Provided"}
          </small>
        </span>
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">Start Date-</h3>
          <small className="tracking-wide text-theme font-medium">
            {dayjs(startDate).format("LL")}
          </small>
        </span>
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">End Date-</h3>
          <small className="tracking-wide text-theme font-medium">
            {dayjs(endDate).format("LL")}
          </small>
        </span>
      </div>

      <button className="btn-primary" onClick={onClick}>
        View Details
      </button>
    </div>
  );
};

export default ViewExamCard;
