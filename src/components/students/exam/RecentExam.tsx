import { Avatar, Skeleton } from "@mui/material";
import { AssignmentIconNew } from "assets/static-icon";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Fragment } from "react";
import ExamType from "types/exam";

type UpcomingExamDataType = {
  data: {
    _id: string;
    totalSGPA: number;
    totalMarkSecured: number;
    totalGradePoint: number;
    totalCreditPoint: number;
    totalCredit: number;
    fullMark: number;
    exam: ExamType;
    subjectWise: {
      credit: number;
      creditPoint: number;
      grade: string;
      gradePoint: number | "Unavailable";
      mark: number | "Unavailable";
      passMark: number;
      remark: string;
      subject: string;
      subjectCode: string;
      fullMark: string;
    }[];
  }[];
};

const RecentExam = () => {
  const { user } = useAuth();

  const { push } = useRouter();

  const { data, isValidating } = useSWRFetch<UpcomingExamDataType>(
    user?._id && `exam/result/all/${user?._id}?perPage=1&pageNo=1`
  );

  return (
    <div className="col-span-6 rounded-lg w-full bg-white p-5 flex flex-col gap-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-themeSecondary/70 font-semibold text-lg">
          Recent Exams
        </p>
        <div
          className="text-themeSecondary/70 hover:underline cursor-pointer  font-semibold text-lg"
          onClick={() => push(`/panel/student/results`)}
        >
          See All
        </div>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-12 w-full gap-3">
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
                  height={70}
                  width={70}
                  animation="wave"
                />
                <Skeleton variant="text" width={150} animation="wave" />
                <Skeleton variant="text" width={250} animation="wave" />
                <Skeleton variant="text" width={100} animation="wave" />
              </div>
            ))
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <Fragment key={item?.exam?._id}>
              {item?.subjectWise?.slice(0, 4)?.map((inner, index) => (
                <div
                  key={inner?.subject + index}
                  className="col-span-6 flex p-4  items-center justify-center flex-col gap-2 rounded-lg bg-white border "
                  draggable={true}
                >
                  <Avatar
                    className="bg-[#0000000e] border object-contain p-2"
                    src={AssignmentIconNew.src}
                    sx={{
                      height: "4rem",
                      width: "4rem",
                      objectFit: "contain",
                    }}
                  ></Avatar>
                  <p className="text-lg font-semibold">
                    {inner?.subject} / {item?.exam?.title}
                  </p>
                  <p className="text-xs font-medium text-blue-500">
                    Mark Secured - {inner?.mark}/{inner?.fullMark}
                  </p>
                  <p className="text-xs font-medium">Grade - {inner?.grade}</p>
                  <p className="text-xs font-medium">
                    Credit - {inner?.credit}
                  </p>
                </div>
              ))}
            </Fragment>
          ))
        ) : (
          <div className="w-full flex items-center justify-center col-span-12">
            <Empty title="No Exam Found" className="!h-50 !w-50" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentExam;
