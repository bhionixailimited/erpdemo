import {
  AccessTime,
  Cancel,
  CheckCircle,
  DoNotDisturb,
  EmojiEvents,
  Person,
  TextSnippet,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ExamType from "types/exam";
import SubjectType from "types/subject";
import UserType from "types/user";

type SubjectExamType = {
  data: {
    _id: string;
    absentStudent: number;
    batch: any;
    createdBy: UserType;
    endTime: string;
    exam: ExamType;
    failStudent: number;
    fullMark: number;
    notPublished: number;
    passMark: number;
    passStudent: number;
    startTime: number;
    subject: SubjectType;
    totalQuestion: number;
    totalStudents: number;
    type: string;
  };
};

const SubjectDetails = () => {
  const { query } = useRouter();
  const { user } = useAuth();
  const { subjectExam, subjectExamId } = query;

  const { data: subjectDetails, isValidating } = useSWRFetch<SubjectExamType>(
    ["ADMIN", "SUPER_ADMIN", "MANAGER", "STAFF", "TEACHER"]?.includes(
      String(user?.role?.toUpperCase())
    )
      ? subjectExamId && `exam/subject/details/${subjectExamId}`
      : subjectExam && `exam/subject/details/${subjectExam}`
  );

  const data = useMemo(() => {
    return [
      {
        key: "1",
        title: "Total Students",
        icon: <Person className="text-5xl text-blue-500 " />,
        className: "bg-blue-500/10    ",
        content: subjectDetails?.data?.totalStudents ?? "Unavailable",
      },
      {
        key: "2",
        title: "Absent Students",
        icon: <DoNotDisturb className="text-4xl text-gray-500 " />,
        className: "bg-gray-500/10   ",
        content: subjectDetails?.data?.absentStudent ?? "Unavailable",
      },
      {
        key: "3",
        title: "Total Finished Students",
        icon: <CheckCircle className="text-4xl text-teal-500 " />,
        className: "bg-teal-500/10   ",
        content:
          Number(
            Number(subjectDetails?.data?.totalStudents || 0) -
              Number(subjectDetails?.data?.absentStudent || 0)
          ) ?? "Unavailable",
      },
      {
        key: "4",
        title: "Total Passed Students",
        icon: <EmojiEvents className="text-4xl text-green-500 " />,
        className: "bg-green-500/10   ",
        content: subjectDetails?.data?.passStudent ?? "Unavailable",
      },
      {
        key: "5",
        title: "Total Failed Students",
        icon: <Cancel className="text-4xl text-red-600" />,
        className: "bg-red-500/10   ",
        content: subjectDetails?.data?.failStudent ?? "Unavailable",
      },
    ];
  }, [subjectDetails?.data]);

  return (
    <>
      <div className="w-full flex flex-wrap md:block  bg-white shadow-xl mt-4 rounded-lg p-4 ">
        <div className="flex items-center flex-wrap md:flex-nowrap justify-between">
          {isValidating ? (
            <Skeleton
              animation="wave"
              variant="rounded"
              height={25}
              width={150}
            />
          ) : (
            <h3 className="font-medium tracking-wide text-2xl">
              Exam - {subjectDetails?.data?.exam?.title}
            </h3>
          )}
          {isValidating ? (
            <Skeleton animation="wave" variant="text" width={100} />
          ) : (
            <h3 className="font-medium text-sm text-gray-600 tracking-wide">
              {dayjs(subjectDetails?.data?.startTime).format("LLL")} -{" "}
              {dayjs(subjectDetails?.data?.endTime).format("hh:mm A")}
            </h3>
          )}
        </div>
        <div className="flex items-center flex-wrap md:flex-nowrap gap-2  justify-between">
          {isValidating ? (
            <Skeleton animation="wave" variant="text" width={50} />
          ) : (
            <h3 className="font-medium text-sm text-gray-600 tracking-wide">
              Subject: {subjectDetails?.data?.subject?.title}
            </h3>
          )}

          <div className="flex items-center gap-4 font-medium text-sm text-gray-600 tracking-wide ">
            {isValidating ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                height={25}
                width={50}
              />
            ) : (
              <span className="flex gap-2 px-2 py-1 border rounded-md border-gray-300 ">
                <AccessTime />{" "}
                {dayjs(subjectDetails?.data?.endTime).diff(
                  dayjs(subjectDetails?.data?.startTime),
                  "hour"
                )}{" "}
                hr
              </span>
            )}

            {isValidating ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                height={25}
                width={200}
              />
            ) : (
              <span className="flex gap-2 px-2 py-1 border rounded-md border-gray-300 ">
                <TextSnippet />{" "}
                {subjectDetails?.data?.fullMark || "(Unavailable)"} Marks (Pass
                marks :{subjectDetails?.data?.passMark || "(Unavailable)"})
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 py-4 gap-4 ">
          {data?.map((item) => (
            <div
              className="flex border border-gray-200 rounded-lg p-4 items-center gap-4 w-full "
              key={item?.key}
            >
              <div
                className={
                  "flex items-center justify-center h-20 w-20 rounded-full " +
                  item?.className
                }
              >
                {isValidating ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    height={80}
                    width={80}
                  />
                ) : (
                  item?.icon
                )}
              </div>
              <div className="flex flex-col gap-2">
                {isValidating ? (
                  <Skeleton animation="wave" variant="text" width={100} />
                ) : (
                  <small className="font-medium tracking-wide text-gray-600">
                    {item?.title}
                  </small>
                )}

                {isValidating ? (
                  <Skeleton animation="wave" variant="text" width={40} />
                ) : (
                  <h3 className="font-medium tracking-wide text-2xl">
                    {item?.content}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubjectDetails;
