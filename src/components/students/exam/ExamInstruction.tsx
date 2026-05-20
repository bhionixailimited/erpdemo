import { Button } from "components/core";
import dayjs from "dayjs";
import { useExamData } from "hooks";
import React, { useState, useEffect } from "react";

const ExamInstruction = () => {
  const [disabledButton, setDisabledButton] = useState(true);

  const { exam, subjectExam, handleNextExamPage, examDuration } = useExamData();

  const handleReadInstruction = () => {
    if (disabledButton) return;
    handleNextExamPage();
  };

  useEffect(() => {
    if (!subjectExam) return;

    if (!subjectExam?.startTime || !subjectExam?.endTime) return;

    if (dayjs(subjectExam?.startTime).isAfter(dayjs())) {
      setDisabledButton(true);
      return;
    } else if (dayjs(subjectExam?.endTime).isBefore(dayjs())) {
      setDisabledButton(true);
      return;
    } else {
      setDisabledButton(false);
      return;
    }
  }, [subjectExam?.startTime, subjectExam?.endTime, examDuration]);

  return (
    <div className="w-full container max-w-5xl bg-white rounded-lg shadow-xl mx-auto ">
      <div className="w-full flex items-center justify-center bg-theme text-white ">
        <h1 className="font-bold text-2xl p-4">
          Instruction for {subjectExam?.subject?.title} | {exam?.title}
        </h1>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: subjectExam?.introduction || "",
          }}
        ></div>
      </div>
      <div className="flex flex-col w-full p-4 gap-2">
        <span className="font-medium tracking-wide text-sm ">
          Total mark : {subjectExam?.fullMark}
        </span>
        <span className="font-medium tracking-wide text-sm ">
          Pass mark : {subjectExam?.passMark}
        </span>
        <span className="font-medium tracking-wide text-sm ">
          Exam Type : {subjectExam?.type}
        </span>
      </div>
      <div className="w-full flex items-center justify-center p-4">
        <Button
          disabled={disabledButton}
          className={disabledButton ? "!bg-gray-300" : "!bg-theme"}
          onClick={handleReadInstruction}
        >
          Continue And Next
        </Button>
      </div>
    </div>
  );
};

export default ExamInstruction;
