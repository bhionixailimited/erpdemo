import { School, Subject } from "@mui/icons-material";
import { ICONS } from "assets";

type Props = {
  title?: string;
  status?: "INPROGRESS" | "SCHEDULE";
  scheduleAt?: string;
  onClick?: () => void;
  fullMark?: number;
  type?: string;
};

const SubjectWiseExamCard = ({
  status,
  scheduleAt,
  onClick,
  title,
  fullMark,
  type,
}: Props) => {
  return (
    <div
      className="w-full flex flex-col shadow-xl rounded-xl overflow-hidden relative bg-white cursor-pointer select-none scale-100 duration-300 ease-in-out hover:scale-95 border-b-8 border-b-theme "
      onClick={onClick}
    >
      <h3 className="font-medium text-sm tracking-wide text-white absolute top-2 left-4">
        Exam
      </h3>
      <ICONS.WaveBackground className="!text-theme" />
      <div className="w-full  px-4 pb-4 flex flex-col gap-2 ">
        <small className="tracking-wide font-medium">
          {status === "INPROGRESS"
            ? "In Progress"
            : `Schedule At ${scheduleAt}`}
        </small>
        <h3 className="font-semibold  tracking-wide text-xl">{title}</h3>

        <div className="flex items-center gap-4 text-sm ">
          <Subject className="text-theme text-2xl" />
          Full Mark {fullMark}
        </div>
        <div className="flex items-center gap-4 text-xs font-medium ">
          <School className="text-theme text-2xl" /> {type}
        </div>
      </div>
    </div>
  );
};

export default SubjectWiseExamCard;
