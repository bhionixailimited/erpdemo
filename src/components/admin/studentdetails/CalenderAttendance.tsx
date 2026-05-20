import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";

const CalenderAttendance = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // const day = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return (
    <div className="w-full   rounded-lg p-4 mt-2 my-8 ">
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center">
          <h3 className="font-semibold tracking-wide text-themeSecondary text-lg">
            Attendance of August
          </h3>
        </span>
        <span className="flex items-center gap-4">
          <IconButton className="!bg-theme !rounded-xl hover:!scale-90 scale-100 transition-all ease-in-out duration-300 !text-white">
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton className="!bg-theme !rounded-xl hover:!scale-90 scale-100 transition-all ease-in-out duration-300 !text-white">
            <KeyboardDoubleArrowRight />
          </IconButton>
        </span>
      </div>
      <div className="w-full grid  grid-cols-7 gap-4 px-4 mt-4 ">
        {days?.map((item) => (
          <h3
            className="font-semibold tracking-wide text-theme text-base text-center "
            key={item}
          >
            {item}
          </h3>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-3 w-full gap-2 xl:gap-4">
        {Array(31)
          .fill(0)
          .map((item, innerIndex) => (
            <div
              key={innerIndex}
              className={`flex-col p-2 2xl:p-4 grid-cols-1 grid h-30 xl:h-32 2xl:h-40 bg-theme rounded-lg shadow-md border  ${
                innerIndex === 1 ||
                innerIndex === 0 ||
                innerIndex === 10 ||
                innerIndex === 11 ||
                innerIndex === 3 ||
                innerIndex % 4 === 0
                  ? "!bg-themeSecondary/40"
                  : ""
              } `}
            >
              <div className="w-full flex items-center justify-center flex-col">
                <p className="text-3xl font-bold text-white flex flex-col items-center">
                  <span className="text-white text-lg">Day</span>
                  {innerIndex + 1}
                </p>
                <div className="font-semibold text-white">
                  {innerIndex === 1 ||
                  innerIndex === 0 ||
                  innerIndex === 10 ||
                  innerIndex === 11 ||
                  innerIndex === 3 ||
                  innerIndex % 4 === 0
                    ? "Absent"
                    : "Attend"}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalenderAttendance;
