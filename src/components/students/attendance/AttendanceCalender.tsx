import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { ClassType } from "types/class";
import ViewAllClassAttendance from "./ViewAllClassAttendance";

type AttendanceDataType = {
  _id: string;
  class: ClassType;
  createdAt: string;
  isAbsent: boolean;
  isOnLeave: boolean;
  isPresent: boolean;
  month: number;
  updatedAt: number;
  year: number;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AttendanceCalender = ({
  loading,
  date,
  setDate,
  attendanceData,
}: {
  date?: number;
  loading?: boolean;
  setDate?: (arg: number) => void;
  attendanceData?: AttendanceDataType[];
}) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState<any[]>([]);

  const handlePreviousClick = () => {
    //day of the month
    let dayOfTheMonth = dayjs()
      .month(month <= 0 ? 11 : month - 1)
      .year(month === 0 ? year - 1 : year);

    //set date to previous month in timestamp format

    setDate?.(+dayjs(dayOfTheMonth).valueOf());

    //set the month to previous month

    setMonth((prev: number) => (prev === 0 ? 11 : prev - 1));

    setYear((prev) => (month === 0 ? prev - 1 : prev));
  };
  const handleNextClick = () => {
    //day of the month
    let dayOfTheMonth = dayjs()
      .month(month >= 11 ? 0 : month + 1)
      .year(month === 11 ? year + 1 : year);

    //set date to next month in timestamp format

    setDate?.(+dayjs(dayOfTheMonth).valueOf());

    //set the month to next month

    setMonth((prev: number) => (prev === 11 ? 0 : prev + 1));

    setYear((prev) => (month === 11 ? prev + 1 : prev));
  };

  const handleEnterCalender = (dayOfTheMonth: number) => {
    setOpenDialog(true);

    let todaysData = attendanceData
      ?.filter((item) => dayjs(item?.class?.startTime).date() === dayOfTheMonth)
      ?.map((item) => {
        return {
          subject: item?.class?.subject?.title,
          status: item?.isPresent
            ? "Present"
            : item?.isAbsent
            ? "Absent"
            : "Leave",
        };
      });

    setDialogData(todaysData || []);
  };

  return (
    <div className="w-full  shadow-xl bg-white rounded-lg p-4 mt-8 border my-8 ">
      <ViewAllClassAttendance
        open={openDialog}
        onClose={setOpenDialog}
        data={dialogData}
      />
      <div className="flex w-full flex-col md:flex-row items-center justify-between">
        <span className="flex items-center gap-4 text-gray-700">
          <h3 className="font-semibold tracking-wide text-themeSecondary text-lg">
            Attendance of {dayjs(date).format("MMMM , YYYY")}{" "}
          </h3>
          {loading && "Loading..."}
        </span>
        <span className="flex items-center gap-4">
          <IconButton
            className="!bg-theme !rounded-xl hover:!scale-90 scale-100 transition-all ease-in-out duration-300 !text-white"
            onClick={handlePreviousClick}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            className="!bg-theme !rounded-xl hover:!scale-90 scale-100 transition-all ease-in-out duration-300 !text-white"
            onClick={handleNextClick}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
        </span>
      </div>
      <div className="flex flex-col overflow-hidden overflow-x-auto ">
        <div className="w-full grid min-w-[786px] grid-cols-7 gap-4 px-4 mt-4 ">
          {days?.map((item) => (
            <h3
              className="font-semibold tracking-wide text-theme text-base text-center "
              key={item}
            >
              {item}
            </h3>
          ))}
        </div>
        <div className="grid grid-cols-7  min-w-[786px] mt-3 w-full gap-2 xl:gap-4">
          {Array(
            dayjs(date).daysInMonth() +
              dayjs(date).set("date", 1).set("month", dayjs(date).month()).day()
          )
            .fill(0)
            .map((item, innerIndex) => (
              <Fragment key={innerIndex}>
                {days.indexOf(
                  dayjs(date)
                    .set("date", 1)
                    .set("month", dayjs(date).month())
                    .format("dddd")
                ) > innerIndex ? (
                  <div
                    key={innerIndex}
                    className={`flex-col p-2 2xl:p-4 grid-cols-1 grid h-30 xl:h-32 cursor-pointer 2xl:h-40  rounded-lg shadow-md border bg-gray-100/50`}
                  ></div>
                ) : attendanceData?.find(
                    (elem) =>
                      dayjs(elem?.class?.startTime).date() ===
                      innerIndex +
                        1 -
                        days.indexOf(
                          dayjs(date)
                            .set("date", 1)
                            .set("month", dayjs(date).month())
                            .format("dddd")
                        )
                  )?.isPresent ? (
                  <div
                    key={innerIndex}
                    className={`flex-col p-2 2xl:p-4 grid-cols-1 grid h-30 xl:h-32 cursor-pointer 2xl:h-40 bg-theme rounded-lg shadow-md border`}
                    onMouseEnter={() =>
                      handleEnterCalender(
                        innerIndex +
                          1 -
                          days.indexOf(
                            dayjs(date)
                              .set("date", 1)
                              .set("month", dayjs(date).month())
                              .format("dddd")
                          )
                      )
                    }
                  >
                    <div className="w-full flex items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-white flex flex-col items-center">
                        <span className="text-white text-lg">Day</span>
                        {innerIndex +
                          1 -
                          days.indexOf(
                            dayjs(date)
                              .set("date", 1)
                              .set("month", dayjs(date).month())
                              .format("dddd")
                          )}
                      </p>
                      <div className="font-semibold text-white">Present</div>
                    </div>
                  </div>
                ) : attendanceData?.find(
                    (elem) =>
                      dayjs(elem?.class?.startTime).date() ===
                      innerIndex +
                        1 -
                        days.indexOf(
                          dayjs(date)
                            .set("date", 1)
                            .set("month", dayjs(date).month())
                            .format("dddd")
                        )
                  )?.isAbsent ? (
                  <div
                    key={innerIndex}
                    className={`flex-col p-2 2xl:p-4 grid-cols-1 grid h-30 xl:h-32 cursor-pointer 2xl:h-40 bg-themeSecondary rounded-lg shadow-md border  `}
                    onMouseEnter={() =>
                      handleEnterCalender(
                        innerIndex +
                          1 -
                          days.indexOf(
                            dayjs(date)
                              .set("date", 1)
                              .set("month", dayjs(date).month())
                              .format("dddd")
                          )
                      )
                    }
                  >
                    <div className="w-full flex items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-white flex flex-col items-center">
                        <span className="text-white text-lg">Day</span>
                        {innerIndex +
                          1 -
                          days.indexOf(
                            dayjs(date)
                              .set("date", 1)
                              .set("month", dayjs(date).month())
                              .format("dddd")
                          )}
                      </p>
                      <div className="font-semibold text-white">Absent</div>
                    </div>
                  </div>
                ) : attendanceData?.find(
                    (elem) =>
                      dayjs(elem?.class?.startTime).date() ===
                      innerIndex +
                        1 -
                        days.indexOf(
                          dayjs(date)
                            .set("date", 1)
                            .set("month", dayjs(date).month())
                            .format("dddd")
                        )
                  )?.isOnLeave ? (
                  <div
                    key={innerIndex}
                    className={`flex-col p-2 2xl:p-4 grid-cols-1 grid h-30 xl:h-32 cursor-pointer 2xl:h-40  rounded-lg shadow-md border bg-instagram`}
                    onMouseEnter={() =>
                      handleEnterCalender(
                        innerIndex +
                          1 -
                          days.indexOf(
                            dayjs(date)
                              .set("date", 1)
                              .set("month", dayjs(date).month())
                              .format("dddd")
                          )
                      )
                    }
                  >
                    <div className="w-full flex items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-white flex flex-col items-center">
                        <span className="text-white text-lg">Day</span>
                        {innerIndex +
                          1 -
                          days.indexOf(
                            dayjs(date)
                              .set("date", 1)
                              .set("month", dayjs(date).month())
                              .format("dddd")
                          )}
                      </p>
                      <div className="font-semibold text-white">Leave</div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={innerIndex}
                    className={`flex-col p-2 2xl:p-4 grid-cols-1 grid h-30 xl:h-32 cursor-pointer 2xl:h-40  rounded-lg shadow-md border bg-gray-800/50`}
                  >
                    <div className="w-full flex items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-white flex flex-col items-center">
                        <span className="text-white text-lg">Day</span>
                        {innerIndex +
                          1 -
                          days.indexOf(
                            dayjs(date)
                              .set("date", 1)
                              .set("month", dayjs(date).month())
                              .format("dddd")
                          )}
                      </p>
                      <div className="font-semibold text-white">
                        {" "}
                        Not Available{" "}
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalender;
