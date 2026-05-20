import { Skeleton } from "@mui/material";
import { Empty } from "components/core";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { ExamSubjectType } from "types/examSubject";
import TeacherExamCreate from "./TeacherExamCreate";
import TestMcqQuestion from "./TestMcqQuestion";

type QuestionDataType = {
  data: {
    answer: string;
    attachmentUrl: string;
    explanation: string;
    markAwarded: number;
    options: string[];
    question: string;
    subject: string;
    subjectExam: ExamSubjectType;
    type: string;
    _id: string;
  }[];
};

const TestQuestions = ({ create = true }: { create?: boolean }) => {
  const { query } = useRouter();

  const { subjectExam } = query;

  const {
    data: question,
    isValidating: questionLoading,
    mutate,
  } = useSWRFetch<QuestionDataType>(
    subjectExam && `exam/questions/${subjectExam}`
  );

  return (
    <div className="w-full flex items-start justify-center gap-4 ">
      <div className="w-full max-w-5xl ">
        {questionLoading ? (
          <div className="w-full flex flex-col gap-2 p-4 shadow-xl rounded-xl bg-white max-w-5xl mx-auto">
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <div className="flex flex-col gap-4" key={index}>
                  <p className="text-base font-semibold">
                    <Skeleton width={350} variant="text" />
                  </p>
                  <div className="flex flex-col gap-4">
                    {Array(4)
                      .fill(0)
                      .map((inner, index) => (
                        <span className="flex items-center gap-4" key={index}>
                          <Skeleton width={20} variant="text" />
                          <Skeleton width={350} variant="text" />
                        </span>
                      ))}
                  </div>
                  <span className="text-sm">
                    <Skeleton width={50} variant="text" />
                    <span className="text-green-500 font-semibold">
                      <Skeleton width={100} variant="text" />
                    </span>
                  </span>
                </div>
              ))}
          </div>
        ) : question?.data?.length ? (
          <div className="flex flex-col">
            <TestMcqQuestion data={question?.data} reload={mutate} />
          </div>
        ) : (
          <div className="w-Fullscreen flex items-center justify-center py-8">
            <Empty title="No question added" />
          </div>
        )}

        {create && (
          <TeacherExamCreate
            subjectExam={String(subjectExam)}
            reload={mutate}
          />
        )}
      </div>
    </div>
  );
};

export default TestQuestions;
