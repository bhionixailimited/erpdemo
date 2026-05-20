import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { useExamData, useQuestionData } from "hooks";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { notify } from "utils";
import { editorFormat, editorModules } from "utils/EditorToolbar";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const SingleMcq = ({
  handleSubmit,
}: {
  handleSubmit: Dispatch<SetStateAction<boolean>>;
}) => {
  const [longAnswer, setLongAnswer] = useState("");
  const [mcqAnswer, setMcqAnswer] = useState("");

  const {
    currentQuestionData,
    questionPageNo,
    isLoading,
    handleSubmitAnswer,
    setMarkAsReview,
    setRemoveMarkAsReview,
    setNextPage,
    setPrevPage,
    handleClearResponse,
    totalQuestion,
  } = useQuestionData();

  const { exam } = useExamData();

  useEffect(() => {
    if (!questionPageNo && !currentQuestionData?.question?._id) return;

    setLongAnswer(currentQuestionData?.answer?.studentAnswer || "");
    setMcqAnswer(currentQuestionData?.answer?.studentAnswer || "");
  }, [questionPageNo, currentQuestionData?.question?._id]);

  const handlePrevPage = () => {
    currentQuestionData?.question?._id &&
      handleSubmitAnswer(
        currentQuestionData?.question?._id,
        currentQuestionData?.question?.type === "MCQTYPE"
          ? mcqAnswer
          : longAnswer
      );
    setPrevPage();
  };

  const handleNextPage = () => {
    if (!exam?.allowBlankSubmit) {
      if (
        currentQuestionData?.question?.type === "MCQTYPE" &&
        !mcqAnswer?.trim()
      ) {
        return notify.error("Please select an option to move forward");
      }
      if (
        currentQuestionData?.question?.type !== "MCQTYPE" &&
        !longAnswer?.trim()
      ) {
        return notify.error("Please write something to move forward");
      }
    }
    currentQuestionData?.question?._id &&
      handleSubmitAnswer(
        currentQuestionData?.question?._id,
        currentQuestionData?.question?.type === "MCQTYPE"
          ? mcqAnswer
          : longAnswer
      );
    setNextPage();
  };

  const handleResponseClear = () => {
    setMcqAnswer("");
    setLongAnswer("");
    currentQuestionData?.question?._id &&
      handleClearResponse?.(currentQuestionData?.question?._id);
  };

  return (
    <div className="flex w-full flex-col py-5 gap-1 min-h-[70vh]">
      {isLoading ? (
        <>
          <Skeleton variant="text" width={150} />
          <div className="flex flex-col mt-4 gap-8">
            <Skeleton variant="rounded" height={50} />
            <Skeleton variant="rounded" height={100} />
          </div>
          <div className="flex w-full items-center justify-between mt-12 gap-4">
            <div className="flex items-center gap-4">
              <Skeleton variant="rounded" width={100} height={35} />
              <Skeleton variant="rounded" width={150} height={35} />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton variant="rounded" width={100} height={35} />
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg font-semibold">Question No: {questionPageNo}</p>
          <div className="flex flex-col ">
            <div className="flex flex-col gap-4">
              <p
                className="font-semibold"
                dangerouslySetInnerHTML={{
                  __html: currentQuestionData?.question?.question || "",
                }}
              ></p>
              {currentQuestionData?.question?.attachmentUrl && (
                <img
                  src={currentQuestionData?.question?.attachmentUrl}
                  alt="question"
                  className="w-full h-full object-contain"
                />
              )}

              {currentQuestionData?.question?.type === "MCQTYPE" ? (
                <FormControl>
                  <RadioGroup
                    value={mcqAnswer}
                    onChange={(e) => setMcqAnswer(e.target.value)}
                  >
                    {currentQuestionData?.question?.options?.map((option) => (
                      <FormControlLabel
                        value={option}
                        key={option}
                        onClick={() => {}}
                        control={
                          <Radio
                            sx={{
                              color: "#5B50A1",
                              "&.Mui-checked": {
                                color: "#5B50A1",
                              },
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : (
                <div className="py-4 w-full student-exam">
                  <ReactQuill
                    value={longAnswer}
                    modules={editorModules}
                    formats={editorFormat}
                    onChange={setLongAnswer}
                    placeholder="Write your answer here....."
                    theme="snow"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="sticky top-full  flex w-full justify-between items-center">
            <div className="flex gap-2">
              <Button
                disabled={questionPageNo === 1}
                className="text-sm !bg-themeSecondary !text-white hover:!text-black rounded-lg !font-normal !capitalize !border p-2 hover:!bg-gray-100"
                onClick={handlePrevPage}
              >
                {questionPageNo === 1 ? "---" : "Submit & Prev"}
              </Button>
              <Button
                // disabled={questionPageNo === 1}
                className="text-sm !bg-theme !text-white hover:!text-black rounded-lg !font-normal !capitalize !border p-2 hover:!bg-gray-100"
                onClick={() => setPrevPage()}
                startIcon={<ArrowBack />}
              >
                {questionPageNo === 1 ? "---" : "Prev"}
              </Button>
              {currentQuestionData?.answer?.markAsReview ? (
                <Button
                  className="text-sm !bg-facebook rounded-lg !font-normal !capitalize !border !text-white p-2 "
                  onClick={() =>
                    currentQuestionData?.question?._id &&
                    setRemoveMarkAsReview(
                      currentQuestionData?.question?._id,
                      currentQuestionData?.question?.type === "MCQTYPE"
                        ? mcqAnswer
                        : longAnswer
                    )
                  }
                >
                  Remove Mark as Review
                </Button>
              ) : (
                <Button
                  className="text-sm !bg-gray-100 rounded-lg !font-normal !capitalize !border !text-black p-2 "
                  onClick={() =>
                    currentQuestionData?.question?._id &&
                    setMarkAsReview(
                      currentQuestionData?.question?._id,
                      currentQuestionData?.question?.type === "MCQTYPE"
                        ? mcqAnswer
                        : longAnswer
                    )
                  }
                >
                  Mark as Review
                </Button>
              )}

              <Button
                className="text-sm !bg-gray-100 rounded-lg !font-normal !capitalize !border !text-black p-2"
                onClick={handleResponseClear}
              >
                Clear Response
              </Button>
            </div>
            <div className="flex items-center gap-4">
              {questionPageNo !== totalQuestion && (
                <Button
                  className="text-sm !bg-theme !text-white hover:!text-black rounded-lg !font-normal !capitalize !border p-2 hover:!bg-gray-100"
                  onClick={() => setNextPage()}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              )}

              <Button
                className="text-sm !bg-twitter !text-white hover:!text-black rounded-lg !font-normal !capitalize !border p-2 hover:!bg-gray-100"
                onClick={handleNextPage}
              >
                {questionPageNo === totalQuestion ? "Save" : "Save & Next"}
              </Button>
              {questionPageNo === totalQuestion && (
                <Button
                  className="text-sm !bg-twitter !text-white hover:!text-black rounded-lg !font-normal !capitalize !border p-2 hover:!bg-gray-100"
                  onClick={() => handleSubmit(true)}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMcq;
