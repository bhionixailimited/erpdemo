import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { ExamSubjectType } from "types/examSubject";
import CreateExamCard from "./CreateExamCard";
import ExamCardSkeleton from "./ExamCardSkeleton";

type TeacherCreatedExam = {
  data: ExamSubjectType[];
};

const TeacherCreatedExam = () => {
  const { push, query } = useRouter();

  const { examId } = query;
  const { data: myExam, isValidating: myExamLoading } =
    useSWRFetch<TeacherCreatedExam>(
      examId && `exam/subject/created-by-user/${examId}`
    );
  return (
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
              push(`/panel/teacher/exam/${item?.exam?._id}/${item?._id}`)
            }
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default TeacherCreatedExam;
