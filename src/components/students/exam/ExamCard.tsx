import { AccessTime } from "@mui/icons-material";
import { Avatar, Grid } from "@mui/material";
import { StudentCardBg } from "assets/backgrounds";
import { AssignmentIconNew } from "assets/static-icon";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  _id: string;
  subjectExam: number;
}
const ExamCard = ({
  _id,
  title,
  type,
  startDate,
  endDate,
  subjectExam,
}: Props) => {
  return (
    <div className="w-full">
      <Link href={`/panel/student/exam/${_id}`}>
        <div className="flex items-center justify-center flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg hover:scale-105 common-transition cursor-pointer gap-6">
          <div
            className="h-28 2xl:h-32 w-full relative rounded-t-lg"
            style={{
              backgroundImage: `url(${StudentCardBg.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-[#000] rounded-t-lg bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter w-full h-full">
              <div className=" justify-center gap-4 absolute top-1/2 z-50 w-full flex h-full items-center p-2">
                <Avatar
                  className="bg-[#00000028] border object-contain p-2"
                  src={AssignmentIconNew.src}
                  sx={{
                    height: "5rem",
                    width: "5rem ",
                    objectFit: "contain",
                  }}
                ></Avatar>
              </div>
            </div>
          </div>
          <div className="py-5 w-full flex flex-col gap-1 text-center justify-center items-center">
            <p className="text-lg font-semibold ">{title}</p>
            <span className="text-sm tracking-tight flex gap-1 font-semibold">
              Start Date:{" "}
              <p className="font-semibold text-theme">
                {dayjs(startDate).format("LLL")}
              </p>
            </span>
            <span className="text-sm tracking-tight flex gap-1 font-semibold">
              End Date:{" "}
              <p className="font-semibold text-theme">
                {dayjs(endDate).format("LLL")}
              </p>
            </span>
            <span className="text-sm tracking-tight flex gap-1 font-semibold">
              Exam Type: <p className="font-semibold text-theme">{type}</p>
            </span>
            <div className="flex px-2 w-full text-end justify-between items-center pt-3">
              <p className="text-sm font-semibold">
                Total Exam : {subjectExam}
              </p>
              <p className="bg-themeSecondary/10 w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-theme rounded-full flex items-center gap-1">
                <AccessTime fontSize="small" />{" "}
                {dayjs(endDate).isBefore(dayjs())
                  ? "Finished"
                  : dayjs(startDate).isAfter(dayjs())
                  ? dayjs(startDate).diff(dayjs(), "days") === 0
                    ? dayjs(startDate).diff(dayjs(), "h") + " hr(s) to go"
                    : dayjs(startDate).diff(dayjs(), "days") + " day(s) to go"
                  : "In progress"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExamCard;
