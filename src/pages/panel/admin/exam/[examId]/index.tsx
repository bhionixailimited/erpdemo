import { ExamDetails } from "components/admin";
import { Empty } from "components/core";
import { CreateExamCard, ExamCardSkeleton } from "components/teachers";
import dayjs from "dayjs";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { ExamSubjectType } from "types/examSubject";
type AllExamSubjectData = {
  data: ExamSubjectType[];
};
const ExamPage = () => {
  const { push, query } = useRouter();
  const { examId } = query;
  const { data: subjectExam, isValidating: subjectExamLoading } =
    useSWRFetch<AllExamSubjectData>(examId && `exam/subject/${examId}`);
  return (
    <PrivateLayout title="View | Exam">
      <section className="w-full p-4 container mx-auto ">
        <ExamDetails />
        {/* <ExamTabs /> */}
        <h3 className="font-bold text-xl text-theme w-full ">All Subjects</h3>
        <div className="flex flex-col">
          {/* <SearchBar /> */}
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
                    push(`/panel/admin/exam/${examId}/${item?._id}`)
                  }
                />
              ))
            ) : (
              <div className="w-full col-span-4 flex items-center justify-center">
                <Empty title="No Exam created" />
              </div>
            )}
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(ExamPage);
