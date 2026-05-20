import { ExamDetails } from "components/admin";
import { Empty } from "components/core";
import { CreateExamCard, ExamCardSkeleton } from "components/teachers";
import dayjs from "dayjs";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { ExamSubjectType } from "types/examSubject";
type ExamSubjects = {
  data: ExamSubjectType[];
};
const ViewExam = () => {
  const { push, query } = useRouter();
  const { examId } = query;
  // const searchTitle = useDeferredValue(searchText);
  const { data: myExam, isValidating: myExamLoading } =
    useSWRFetch<ExamSubjects>(examId && `exam/subject/${examId}`);
  return (
    <PrivateLayout title="View | Exam">
      <section className="container mx-auto">
        <div className="w-full">
          <ExamDetails create={false} />
        </div>
        <h3 className="font-bold text-xl text-theme w-full ">All Subjects</h3>
        <div className="flex  flex-col">
          {/* <SearchBar searchText={searchText} setSearchText={setSearchText} /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <>
              {!myExam || myExamLoading ? (
                Array(3)
                  .fill(0)
                  .map((item, index) => <ExamCardSkeleton key={index} />)
              ) : myExam?.data?.length ? (
                myExam?.data?.map((item) => (
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
                      push(`/panel/admin/exam/schedule/${examId}/${item?._id}`)
                    }
                  />
                ))
              ) : (
                <div className="col-span-12">
                  <Empty title="No Subjects Found" />
                </div>
              )}
            </>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(ViewExam);
