import { Empty } from "components/core";
import { CreateExamCard, ExamCardSkeleton } from "components/teachers";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ExamSubjectType } from "types/examSubject";

type AllExamSubjectData = {
  data: ExamSubjectType[];
};

const AllExamSubject = () => {
  const { user } = useAuth();

  const { push, query } = useRouter();

  const { examId } = query;

  const { data: subjectExam, isValidating: subjectExamLoading } =
    useSWRFetch<AllExamSubjectData>(examId && `exam/subject/${examId}`);

  const examData = useMemo(() => {
    let filteredData = subjectExam?.data?.filter(
      (item) =>
        !(user?.role === "TEACHER" && item?.createdBy?._id === user?._id)
    );

    return filteredData;
  }, [subjectExam?.data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {!subjectExam || subjectExamLoading ? (
        Array(3)
          .fill(0)
          .map((item, index) => <ExamCardSkeleton key={index} />)
      ) : examData?.length ? (
        examData?.map((item) => (
          <CreateExamCard
            key={item?._id}
            button={false}
            createdBy={item?.createdBy?.displayName}
            duration={dayjs(item?.endTime).diff(
              dayjs(item?.startTime),
              "minutes"
            )}
            startTime={item?.startTime}
            title={item?.subject?.title}
            credit={item?.credit}
            type={item?.type}
          />
        ))
      ) : (
        <div className="w-full col-span-4 flex items-center justify-center">
          <Empty title="No Exam created" />
        </div>
      )}
    </div>
  );
};

export default AllExamSubject;
