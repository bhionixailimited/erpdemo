import { Button } from "components/core";
import { useExamData } from "hooks";
import React from "react";

const basicExamRule = [
  {
    key: "1",
    description:
      "Do not press any function button key sequence or any special kind of key binding this might result in the system being locked. and the exam will be suspended. ",
  },
  {
    key: "2",
    description:
      "Do not use devtool or any other third party software while in the exam otherwise your exam might get suspended ",
  },
  {
    key: "5",
    description: `Do not hard refresh the website or you might lose your data and may not be able to join the exam again.`,
  },
];

const ExamBasicInstruction = () => {
  const { exam, handleNextExamPage } = useExamData();

  return (
    <div className="w-full container mx-auto  max-w-5xl shadow-xl bg-white overflow-hidden rounded-lg  flex flex-col gap-4 min-h-screen justify-between ">
      <div className="w-full flex items-center justify-center bg-theme text-white ">
        <h1 className="font-bold text-2xl p-4">Instruction for Online Exam</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {!exam?.allowBlankSubmit && (
          <p className="font-medium tracking-wide text-base">
            &#10145; You are not allowed to submit blank. You must submit an
            answer to all the question.
          </p>
        )}
        {exam?.disableCopyPaste && (
          <p className="font-medium tracking-wide text-base">
            &#10145; Copy and paste is not allowed in the exam.
          </p>
        )}
        {exam?.disableNewTab && (
          <p className="font-medium tracking-wide text-base">
            &#10145; You are not allowed to open new tab in the exam.
          </p>
        )}
        {exam?.disableNewWindow && (
          <p className="font-medium tracking-wide text-base">
            &#10145; You are not allowed to open new window in the exam.
          </p>
        )}
        {exam?.disablePrinting && (
          <p className="font-medium tracking-wide text-base">
            &#10145; You are not allowed to print the question or answer in the
            exam.
          </p>
        )}
        {exam?.disableRightClick && (
          <p className="font-medium tracking-wide text-base">
            &#10145; You are not allowed open the devtool or the console of the
            browser while in the exam.
          </p>
        )}
        {exam?.disableRightClick && (
          <p className="font-medium tracking-wide text-base">
            &#10145; You are not allowed open the devtool or the console of the
            browser while in the exam.
          </p>
        )}
        {basicExamRule?.map((item, index) => (
          <p className="font-medium tracking-wide text-base" key={item?.key}>
            &#10145; {item?.description}
          </p>
        ))}
      </div>
      <div className="w-full flex items-center justify-center p-4">
        <Button onClick={handleNextExamPage}>Continue And Next</Button>
      </div>
    </div>
  );
};

export default ExamBasicInstruction;
