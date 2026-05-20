import { Divider } from "@mui/material";
import { McqQuestion } from "components/students";
import { Fragment, useState } from "react";
import CreateLongQuestionField from "./CreateLongQuestionField";

const CreateLongQuestion = ({}) => {
  const [question, setQuestion] = useState<any[]>([]);

  const handleAdded = (values: any) => {
    try {
      if (values?.question || values?.image) {
        setQuestion((prev: any) => [...prev, values]);
      }
    } catch (error) {}
  };

  return (
    <div className="w-full p-4  ">
      <h3 className="font-semibold tracking-wide pb-4 text-center text-2xl text-theme   ">
        Long Question Type
      </h3>

      <div className="w-full flex flex-col gap-4">
        {question?.map((item: any, index: number) => (
          <Fragment key={index}>
            <McqQuestion
              examId={"2"}
              activeQuestion={{ ...item, id: index + 1 }}
            />
            <Divider />
          </Fragment>
        ))}
        <CreateLongQuestionField onAdded={handleAdded} />
      </div>
    </div>
  );
};

export default CreateLongQuestion;
