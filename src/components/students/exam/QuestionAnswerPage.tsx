import { SingleMcq } from "components/common";
import ExamSidebar from "./ExamSidebar";
import { useState } from "react";
import { Button } from "components/core";
import { useExamData, useQuestionData } from "hooks";

const QuestionAnswerPage = () => {
  const [submitExam, setSubmitExam] = useState(false);

  const { handleExamSubmit } = useExamData();
  const { questionData, totalQuestion } = useQuestionData();

  return (
    <>
      {submitExam ? (
        <div className="w-full ">
          <div className="w-full container max-w-5xl bg-white rounded-lg shadow-xl mx-auto ">
            <div className="w-full flex items-center justify-center bg-theme text-white ">
              <h1 className="font-bold text-2xl p-4">Exam Summery</h1>
            </div>

            <div className="flex flex-col gap-4 p-4">
              <p className="font-medium tracking-wide text-base">
                &#10145; Total number of question the exam {totalQuestion}.
              </p>
              <p className="font-medium tracking-wide text-base">
                &#10145; Total number of question attempted{" "}
                {
                  questionData?.filter((item) => !item?.answer?.notAnswered)
                    ?.length
                }
                .
              </p>
              <p className="font-medium tracking-wide text-base">
                &#10145; Total number of long question attempted{" "}
                {
                  questionData?.filter(
                    (item) =>
                      item?.question?.type === "LONGTYPE" &&
                      !item?.answer?.notAnswered
                  )?.length
                }
                .
              </p>
              <p className="font-medium tracking-wide text-base">
                &#10145; Total number of mcq question attempted{" "}
                {
                  questionData?.filter(
                    (item) =>
                      item?.question?.type === "MCQTYPE" &&
                      !item?.answer?.notAnswered
                  )?.length
                }
                .
              </p>
              <p className="font-medium tracking-wide text-base">
                &#10145; Total mark as review{" "}
                {
                  questionData?.filter((item) => item?.answer?.markAsReview)
                    ?.length
                }
                .
              </p>
              <p className="font-medium tracking-wide text-base">
                &#10145; Total question not answered{" "}
                {
                  questionData?.filter((item) => item?.answer?.notAnswered)
                    ?.length
                }
                .
              </p>
              <p className="font-medium tracking-wide text-base">
                &#10145; Total question visited{" "}
                {
                  questionData?.filter((item) => item?.answer?.isVisited)
                    ?.length
                }
                .
              </p>
            </div>

            <div className="w-full flex gap-4 items-center justify-center p-4">
              <Button
                className={"!bg-themeSecondary hover:ring-themeSecondary "}
                onClick={() => setSubmitExam(false)}
              >
                Cancel
              </Button>
              <Button
                className={"!bg-theme"}
                onClick={() => handleExamSubmit()}
              >
                Submit Exam
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-12">
          <div className="col-span-8 2xl:col-span-9">
            <div className="w-full p-5">
              <SingleMcq handleSubmit={setSubmitExam} />
            </div>
          </div>
          <ExamSidebar />
        </div>
      )}
    </>
  );
};

export default QuestionAnswerPage;
