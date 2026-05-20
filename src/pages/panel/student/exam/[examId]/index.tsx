import { Skeleton } from "@mui/material";
import { Empty } from "components/core";
import { SubjectWiseExamCard } from "components/students";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { ExamSubjectType } from "types/examSubject";
import { notify } from "utils";

type ExamSubjectDataType = {
  data: ExamSubjectType[];
};

const ViewExam = () => {
  const { push, query } = useRouter();

  const examId = query?.examId;

  const { data, isValidating } = useSWRFetch<ExamSubjectDataType>(
    examId && `exam/subject/${examId}`
  );

  const handleRouterClick = (
    url: string,
    startTime: string,
    endTime: string
  ) => {
    try {
      if (
        dayjs(startTime).subtract(5, "minute").isBefore(dayjs()) &&
        dayjs(endTime).subtract(2, "minutes").isAfter(dayjs())
      ) {
        push(url);
        document.documentElement.requestFullscreen();
      } else {
        notify.warning("Not allowed");
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
    <PrivateLayout title="View | Exam">
      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {!data || isValidating ? (
            Array(4)
              .fill(0)
              .map((item, index) => (
                <div
                  className="w-full flex flex-col shadow-xl max-w-[380px] rounded-xl overflow-hidden relative bg-white cursor-pointer select-none scale-100 duration-300 ease-in-out hover:scale-95 border-b-8 border-b-theme "
                  key={index}
                >
                  <div className="w-full px-4 py-2">
                    <Skeleton height={70} animation="wave" />
                  </div>

                  <div className="w-full  px-4 pb-4 flex flex-col gap-2 ">
                    {<Skeleton width={100} animation="wave" />}
                    <h3 className="font-semibold  tracking-wide text-xl">
                      {<Skeleton width={200} height={40} animation="wave" />}{" "}
                      <Skeleton animation="wave" />
                    </h3>
                    <div className="flex items-center gap-4">
                      <Skeleton width={80} animation="wave" />
                    </div>
                  </div>
                </div>
              ))
          ) : data?.data?.length ? (
            data?.data?.map((item) => (
              <SubjectWiseExamCard
                key={item?._id}
                scheduleAt={dayjs(item?.startTime).format("LLL")}
                title={item?.subject?.title}
                status={"SCHEDULE"}
                fullMark={item?.fullMark}
                type={item?.type}
                onClick={() =>
                  handleRouterClick(
                    `/panel/student/exam/${item?.exam?._id}/${item?._id}`,
                    item?.startTime,
                    item?.endTime
                  )
                }
              />
            ))
          ) : (
            <div className="col-span-12 flex items0center justify-center w-full">
              <Empty title="No exam scheduled" />
            </div>
          )}
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(ViewExam);
