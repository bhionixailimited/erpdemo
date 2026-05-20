import { AccessTime, Class, School, Timelapse } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { ProjectManageMentIcon } from "assets/static-icon";
import { CustomProgress } from "components/core";
import dayjs from "dayjs";
import BatchType from "types/batch";
import SubjectType from "types/subject";
import UserType from "types/user";

interface Props {
  data: {
    batch: BatchType;
    cancelled: boolean;
    credits: number;
    isHoliday: boolean;
    startTime: string;
    subject: SubjectType;
    endTime: string;
    _id: string;
    teacher: UserType;
    type: string;
  };
  onClick?: () => void;
  type: string;
}

const LmsCard = ({ data, onClick, type }: Props) => {
  const calculateTimeProgress = (startTime: string, endTime: string) => {
    return (
      100 -
      Math.round(
        ((dayjs(endTime).diff(dayjs(startTime)) -
          dayjs(new Date()).diff(dayjs(startTime))) /
          dayjs(endTime).diff(dayjs(startTime))) *
          100
      )
    );
  };

  return (
    <div
      className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out   "
      onClick={onClick}
    >
      <div className="relative bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl">
        <div className="flex items-center flex-col md:flex-row gap-4 justify-between w-full">
          <div className=" text-white flex items-center w-fit rounded-full py-2 px-2 shadow-xl bg-theme left-4 ">
            <Avatar
              className="object-contain p-1"
              src={ProjectManageMentIcon.src}
              sx={{
                height: "4rem",
                width: "4rem ",
                objectFit: "contain",
              }}
            ></Avatar>
          </div>
          <span className="w-fit">
            <p className="bg-themeSecondary/10 w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-theme rounded-full flex items-center gap-1">
              <AccessTime fontSize="small" />{" "}
              {dayjs(data?.startTime).format("h:mm A")}
            </p>
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xl font-semibold my-2">{data?.subject?.title}</p>
          <div className="flex space-x-2 text-gray-400 mb-2   text-xs items-center ">
            <School />
            {type?.toLowerCase() === "teacher" ? (
              <p>
                {data?.batch?.branch?.title} {data?.batch?.course?.title}{" "}
                {data?.batch?.session?.title}
              </p>
            ) : (
              <p>
                {data?.teacher?.displayName ? data?.teacher?.displayName : "NA"}
              </p>
            )}
          </div>
          <div className="flex space-x-2 text-gray-400  mb-2  text-xs items-center  ">
            <Timelapse />
            <p>
              Duration{" "}
              {dayjs(data?.endTime).diff(dayjs(data?.startTime), "minute")} min
            </p>
          </div>
          {data?.cancelled && (
            <div className="flex space-x-2 text-white w-fit    bg-themeSecondary rounded-md shadow-lg px-4 py-1 text-xs items-center  mb-3">
              <p>Cancelled</p>
            </div>
          )}

          {dayjs(data?.startTime).isBefore(new Date()) ? (
            dayjs(data?.endTime).isAfter(new Date()) ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between w-full">
                  <p className="text-sm text-theme font-semibold">
                    Class Progress
                  </p>
                  <p className="text-sm text-theme font-semibold">
                    {calculateTimeProgress(data?.startTime, data?.endTime)} %
                  </p>
                </div>
                <CustomProgress
                  ProgressValue={calculateTimeProgress(
                    data?.startTime,
                    data?.endTime
                  )}
                />
              </div>
            ) : (
              <div className="flex space-x-2 text-gray-400  mb-2  text-xs items-center">
                <Class />
                <p>Class Ended</p>
              </div>
            )
          ) : (
            <div className="flex space-x-2 text-gray-400  mb-2  text-xs items-center">
              <Class />
              <p>Not Started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LmsCard;
