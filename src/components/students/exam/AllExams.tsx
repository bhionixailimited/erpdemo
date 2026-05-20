import { ExamCard } from "..";
import { useSWRFetch } from "hooks";
import { Empty } from "components/core";
import ExamType from "types/exam";
import { ExamSubjectType } from "types/examSubject";
import { AssignmentSkeleton } from "components/teachers/assignment/ViewAssignment";
import { useState } from "react";
import { Pagination } from "@mui/material";

type UpcomingExamDataType = {
  data: {
    exam: ExamType;
    subjects: ExamSubjectType[];
    _id: string;
  }[];
  totalCount: number;
  perPage: number;
};
const AllExams = ({ searchTitle }: { searchTitle: string }) => {
  const [pageNo, setPageNo] = useState(1);

  const { data, isValidating } = useSWRFetch<UpcomingExamDataType>(
    `exam/student/upcoming-exam?perPage=12&pageNo=${pageNo}` +
      (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );

  return (
    <section className="w-full flex flex-col container mx-auto p-4 ">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {!data || isValidating ? (
          Array(5)
            .fill(0)
            .map((item, index) => (
              <div key={index}>
                <AssignmentSkeleton />
              </div>
            ))
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <ExamCard
              key={item.exam?._id}
              title={item?.exam.title}
              startDate={item?.exam?.startDate}
              endDate={item?.exam?.endDate}
              type={item?.exam?.type}
              _id={item?.exam?._id}
              subjectExam={item?.subjects?.length}
            />
          ))
        ) : (
          <div className="w-full flex items-center col-span-12">
            <Empty title="No scheduled exam found" />
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-center py-4">
        <Pagination
          count={Math.ceil(
            Number(data?.totalCount || 1) / Number(data?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div>
    </section>
  );
};

export default AllExams;
