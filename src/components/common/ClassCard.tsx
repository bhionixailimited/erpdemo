import { Person, School } from "@mui/icons-material";
import { ICONS } from "assets";
import dayjs from "dayjs";
import UserType from "types/user";

type Props = {
  batch?: any;
  cancelled?: boolean;
  classRoom: string;
  endTime: string;
  isHoliday: boolean;
  startTime: string;
  subject: {
    subjectCode: string;
    title: string;
  };
  type: string;
  teacher?: UserType;

  onClick?: () => void;
};

const ClassCard = ({
  batch,
  cancelled,
  classRoom,
  endTime,
  isHoliday,
  startTime,
  subject,
  type,
  onClick,
  teacher,
}: Props) => {
  return (
    <div
      className="w-full flex flex-col shadow-xl max-w-[380px] rounded-xl overflow-hidden relative bg-white cursor-pointer select-none scale-100 duration-300 ease-in-out hover:scale-95 border-b-8 border-b-theme "
      onClick={onClick}
    >
      <h3 className="font-medium text-sm tracking-wide text-white absolute top-2 left-4">
        Class
      </h3>
      <ICONS.WaveBackground className="!text-theme " />
      <div className="w-full  px-4 pb-4 flex flex-col gap-2 ">
        <small className="tracking-wide font-medium">
          {dayjs().isAfter(dayjs(startTime)) && dayjs().isBefore(dayjs(endTime))
            ? "In Progress"
            : `Schedule At ${dayjs(startTime).format("h:mm A")}`}
        </small>
        <h3 className="font-semibold  tracking-wide text-xl">
          {subject?.title}
        </h3>
        <div className="flex items-center gap-4">
          {batch?._id && (
            <h3 className="font-medium text-sm tracking-wide">
              Batch - {batch?.course?.title} {batch?.branch?.title}{" "}
              {batch?.session?.title}
            </h3>
          )}

          {type && (
            <h3 className="font-medium text-sm tracking-wide bg-theme text-white shadow-lg rounded-md px-1 ">
              {type}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm ">
          <Person className="text-theme text-2xl" />
          {teacher
            ? `${teacher?.displayName} Sir`
            : `${batch?.totalStudent} Students`}
        </div>
        <div className="flex items-center gap-4 text-sm ">
          <School className="text-theme text-2xl" />
          Class room - {classRoom || "(Unavailable)"}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
