import {
  CalendarToday,
  Delete,
  DesignServices,
  MenuBookRounded,
  Numbers,
  People,
  Subject,
  ViewStreamOutlined,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { ICONS } from "assets";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import ExamType from "types/exam";
import SubjectType from "types/subject";
import UserType from "types/user";
import { notify } from "utils";

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

const ExamSummery = () => {
  const { query, push } = useRouter();

  const { subjectExamId, examId } = query;

  const { data, isValidating } = useSWRFetch<SubjectExamType>(
    subjectExamId && `exam/subject/details/${subjectExamId}`
  );

  const { mutate, loading } = useFetch();

  const handleDeleteSubject = async () => {
    try {
      const response = await mutate({
        path: `exam/subject/delete/${subjectExamId}`,
        method: "DELETE",
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      notify.success(response?.data?.message);
      push("/panel/admin/exam");
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! something went wrong.");
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-8 bg-white shadow-lg rounded-lg p-4  ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <h3 className="font-semibold tracking-wide text-theme  text-3xl w-fit  py-2 ">
            {isValidating ? (
              <Skeleton
                width={150}
                height={30}
                animation="wave"
                variant="rounded"
              />
            ) : (
              "Exam Subject Details"
            )}
          </h3>

          <div className="w-fit flex items-center gap-2">
            {isValidating ? (
              <Skeleton
                width={100}
                height={40}
                animation="wave"
                variant="rounded"
              />
            ) : (
              <Button
                className="hover:!ring-theme"
                startIcon={<DesignServices />}
                onClick={() =>
                  push(
                    `/panel/admin/exam/schedule/${examId}/create?edit=true&subjectExamId=${subjectExamId}`
                  )
                }
              >
                Edit
              </Button>
            )}
            {isValidating ? (
              <Skeleton
                width={100}
                height={40}
                animation="wave"
                variant="rounded"
              />
            ) : (
              <Button
                className="hover:!ring-themeSecondary !bg-themeSecondary"
                startIcon={
                  loading ? (
                    <ICONS.Loading className="animate-spin min-h-[1.5rem] " />
                  ) : (
                    <Delete />
                  )
                }
                onClick={() => handleDeleteSubject()}
              >
                {loading ? "loading..." : "Delete"}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12  gap-4">
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  width={50}
                  height={50}
                  variant="rounded"
                />
              ) : (
                <ViewStreamOutlined className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Exam Title"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${data?.data?.exam?.title || "Not Provided"}`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <CalendarToday className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Exam Dates"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${dayjs(data?.data?.startTime).format("LLL")} -
        ${dayjs(data?.data?.endTime).format("hh:mm A")}`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <Numbers className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Total Question"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${data?.data?.totalQuestion ?? "Not Provided"}`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <People className="text-gray-500 " />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Total Attendee"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${
                    Number(data?.data?.totalStudents || 0) -
                      Number(data?.data?.absentStudent || 0) ?? "Not Provided"
                  }`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <Numbers className="text-gray-500 " />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Total Mark"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${data?.data?.fullMark ?? "Unavailable"}`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <MenuBookRounded className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Batch"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${
                    data?.data?.batch
                      ? `${data?.data?.batch?.course?.title} ${data?.data?.batch?.branch?.title} (${data?.data?.batch?.session?.title})`
                      : ""
                  }`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <Subject className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Subject"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${data?.data?.subject?.title}`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <People className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Total Pass"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${data?.data?.passStudent ?? "Unavailable"}`
                )}
              </h3>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamSummery;
