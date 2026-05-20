import { ChevronRight, School } from "@mui/icons-material";
import { Button, Divider, Skeleton } from "@mui/material";
import { UpcomingExam, UpcomingNewIcon } from "assets/static-icon";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import SubjectType from "types/subject";
import UserType from "types/user";

type UpcomingExamDataType = {
  data: {
    createdBy: UserType;
    credit: number;
    endTime: string;
    fullMark: number;
    passMark: number;
    startTime: string;
    subject: SubjectType;
    type: string;
    _id: string;
  }[];
};

const UpcomingExamsStudent = () => {
  const router = useRouter();

  const { data, isValidating } = useSWRFetch<UpcomingExamDataType>(
    `dashboard/student/upcoming-exam?perPage=4&pageNo=1`
  );

  const { user } = useAuth();

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-white shadow-xl rounded-xl border">
      <h3 className="font-semibold w-full text-left tracking-wide text-black text-lg">
        Upcoming Exams
      </h3>
      <div className="flex flex-col min-h-[250px] gap-4">
        {isValidating || !data ? (
          Array(3)
            .fill(0)
            .map((item, index) => (
              <div className="flex gap-4 h-20 items-center" key={index}>
                <Skeleton height={100} width={100} animation="wave" />
                <div className="flex flex-col  gap-1">
                  <Skeleton width={250} animation="wave" />
                  <Skeleton width={350} animation="wave" />
                  <Skeleton width={150} animation="wave" />
                </div>
              </div>
            ))
        ) : data?.data && data?.data?.length ? (
          data?.data?.slice(0, 3)?.map((item) => (
            <div
              key={item?._id}
              className="flex flex-row gap-4 items-center  border p-2 rounded-md"
            >
              <div className="w-1/4 rounded-lg flex items-center justify-center">
                <img
                  src={UpcomingExam.src}
                  alt="upcoming class"
                  className="w-16 h-16"
                />
              </div>
              <div className="flex flex-col items-start w-3/4">
                <h3 className="font-medium tracking-wide text-sm">
                  {item?.subject?.title}
                </h3>
                <small className="text-gray-400 tracking-wide">
                  Start At {dayjs(item?.startTime).format("LLL")}
                </small>
                <small className="text-gray-400 tracking-wide">
                  Duration{" "}
                  {dayjs(item?.endTime).diff(
                    dayjs(item?.startTime),
                    "minutes"
                  ) + " min"}
                </small>
              </div>
            </div>
          ))
        ) : (
          <Empty title="No upcoming exam" />
        )}
      </div>
      <Divider />
      {user?.role !== "PARENT" && (
        <div className="!text-right p-1">
          <Button
            onClick={() => router.push("/panel/student/exam")}
            size="small"
            className="!font-bold !text-slate-600 !ml-0!text-xs normal-case"
            endIcon={<ChevronRight className=" !text-2xl " />}
          >
            View All
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingExamsStudent;
