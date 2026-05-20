import { Divider } from "@mui/material";
import { McqQuestion } from "components/students";
import { Fragment, useState } from "react";
import CreateMCQField from "./CreateMCQField";

const CreateMCQ = () => {
  const [questionArray, setQuestionArray] = useState<any>([]);

  const handleAdded = (values: any) => {
    try {
      if (values?.question || values?.image) {
        setQuestionArray((prev: any) => [...prev, values]);
      }
    } catch (error) {}
  };

  return (
    <div className="w-full p-4  ">
      <h3 className="font-semibold tracking-wide pb-4 text-center text-2xl text-theme   ">
        MCQ Question
      </h3>

      <div className="w-full flex flex-col gap-4">
        {questionArray?.map((item: any, index: number) => (
          <Fragment key={index}>
            <McqQuestion
              examId={"1"}
              activeQuestion={{ ...item, id: index + 1 }}
            />
            <Divider />
          </Fragment>
        ))}

        <CreateMCQField onAdded={handleAdded} />
      </div>
    </div>
  );
};

export default CreateMCQ;
