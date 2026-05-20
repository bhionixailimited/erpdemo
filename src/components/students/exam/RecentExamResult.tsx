import { Skeleton } from "@mui/material";
import { Button, Empty } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Fragment } from "react";
import ExamType from "types/exam";
import { ExamSubjectType } from "types/examSubject";
import { notify } from "utils";

type TodaysExamDataType = {
  data: {
    exam: ExamType;
    subjects: ExamSubjectType;
    _id: string;
  }[];
};

const RecentExamResult = () => {
  const { push } = useRouter();

  const { data, isValidating } = useSWRFetch<TodaysExamDataType>(
    `exam/student/todays-exam`
  );

  const handleSend = (url: string, startTime: string, endTime: string) => {
    try {
      if (
        dayjs(startTime).subtract(5, "minute").isBefore(dayjs()) &&
        dayjs(endTime).subtract(2, "minutes").isAfter(dayjs())
      ) {
        push(url);
        document.documentElement.requestFullscreen();
      } else {
        notify.success("Not allowed ");
      }
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! Something went wrong. ");
      }
    }
  };

  return (
    <div className="col-span-6 rounded-lg w-full bg-white p-5 flex flex-col gap-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <p className="text-themeSecondary/70 font-semibold text-lg">
        Todays Exam
      </p>
      <div className="grid grid-cols-6 md:grid-cols-12 w-full gap-5">
        {!data || isValidating ? (
          Array(4)
            .fill(0)
            .map((i, index) => (
              <div
                key={index}
                className="col-span-6 flex h-48 border items-center justify-center flex-col gap-2 rounded-lg"
              >
                <Skeleton
                  variant="circular"
                  height={80}
                  width={80}
                  animation="wave"
                />
                <Skeleton variant="text" width={150} animation="wave" />
                <Skeleton variant="text" width={100} animation="wave" />
                <Skeleton variant="text" width={150} animation="wave" />
                <Skeleton
                  variant="rounded"
                  height={30}
                  width={100}
                  animation="wave"
                />
              </div>
            ))
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <Fragment key={item?.subjects?._id}>
              <div className="relative overflow-hidden col-span-6 gap-3 rounded-lg border justify-center h-48 flex items-center flex-col">
                <div className="absolute top-0 text-white flex items-center justify-center font-semibold right-0 w-12 h-12 bg-themeSecondary rounded-bl-full rounded-tr-lg"></div>
                <div className="flex flex-col text-center">
                  <p className="text-lg font-semibold">
                    {item?.subjects?.subject?.title}
                  </p>
                  <p className="">Total Marks: {item?.subjects?.fullMark}</p>
                  <p>
                    Schedule Time :{" "}
                    {dayjs(item?.subjects?.startTime).format("hh:mm A")}
                  </p>
                  <p>
                    End Time :{" "}
                    {dayjs(item?.subjects?.endTime).format("hh:mm A")}
                  </p>
                  <p>
                    Duration :{" "}
                    {dayjs(item?.subjects?.endTime).diff(
                      dayjs(item?.subjects?.startTime),
                      "minutes"
                    ) + " min(s)"}
                  </p>
                </div>
                <Button
                  disabled={
                    !dayjs(item?.subjects?.endTime).isAfter(dayjs()) &&
                    dayjs(
                      dayjs(item?.subjects?.startTime).subtract(
                        1000 * 60 * 10,
                        "millisecond"
                      )
                    ).isBefore(dayjs())
                  }
                  className={` !text-white !text-sm !w-fit ${
                    dayjs(item?.subjects?.endTime).isAfter(dayjs()) &&
                    dayjs(
                      dayjs(item?.subjects?.startTime).subtract(
                        1000 * 60 * 10,
                        "millisecond"
                      )
                    ).isBefore(dayjs())
                      ? "!bg-theme"
                      : dayjs(item?.subjects?.endTime).isBefore(dayjs())
                      ? "!bg-themeSecondary"
                      : "!bg-gray-500"
                  } `}
                  onClick={() =>
                    handleSend(
                      `/panel/student/exam/${item?.exam?._id}/${item?.subjects?._id}`,
                      item?.subjects?.startTime,
                      item?.subjects?.endTime
                    )
                  }
                >
                  {dayjs(item?.subjects?.endTime).isAfter(dayjs()) &&
                  dayjs(
                    dayjs(item?.subjects?.startTime).subtract(
                      1000 * 60 * 10,
                      "millisecond"
                    )
                  ).isBefore(dayjs())
                    ? "Take Exam"
                    : dayjs(item?.subjects?.endTime).isBefore(dayjs())
                    ? "Exam Over"
                    : "Exam Not Started"}
                </Button>
              </div>
            </Fragment>
          ))
        ) : (
          <div className="w-full flex items-center justify-center col-span-12 ">
            <Empty title="No Exam Today" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentExamResult;
