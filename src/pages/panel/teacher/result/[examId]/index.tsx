import { Empty } from "components/core";
import { CreateExamCard, ExamCardSkeleton } from "components/teachers";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { ExamSubjectType } from "types/examSubject";

type AllExamSubjectData = {
  data: ExamSubjectType[];
};

const ResultView = () => {
  const { user } = useAuth();

  const { push, query } = useRouter();

  const { examId } = query;

  const { data: subjectExam, isValidating: subjectExamLoading } =
    useSWRFetch<AllExamSubjectData>(examId && `exam/subject/${examId}`);

  return (
    <PrivateLayout title="Exam | Result ">
      <section className="w-full container mx-auto">
        <h3 className="font-semibold tracking-wide py-4 text-theme text-xl">
          All Subjects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {!subjectExam || subjectExamLoading ? (
            Array(3)
              .fill(0)
              .map((item, index) => <ExamCardSkeleton key={index} />)
          ) : subjectExam?.data?.length ? (
            subjectExam?.data?.map((item) => (
              <CreateExamCard
                key={item?._id}
                button={true}
                createdBy={item?.createdBy?.displayName}
                duration={dayjs(item?.endTime).diff(
                  dayjs(item?.startTime),
                  "minutes"
                )}
                startTime={item?.startTime}
                title={item?.subject?.title}
                credit={item?.credit}
                type={item?.type}
                onClick={() =>
                  push(`/panel/teacher/result/${examId}/${item?._id}`)
                }
              />
            ))
          ) : (
            <div className="w-full col-span-4 flex items-center justify-center">
              <Empty title="No Exam created" />
            </div>
          )}
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(ResultView);
