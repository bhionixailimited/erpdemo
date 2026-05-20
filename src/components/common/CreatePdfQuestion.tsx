import { UploadFile } from "components/core";
import { useState } from "react";

const CreatePdfQuestion = ({}) => {
  const [question, setQuestion] = useState<any>();

  const handleAdded = (values: any) => {
    try {
      if (values?.target?.files && values?.target?.files.length) {
        setQuestion(values?.target?.files[0]);
      }
    } catch (error) {}
  };

  return (
    <div className="w-full p-4  ">
      <h3 className="font-semibold tracking-wide pb-4 text-center text-2xl text-theme   ">
        Upload Assignment
      </h3>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4 ">
          <h3 className="font-medium tracking-wide text-base">Upload File</h3>
          <UploadFile
            onChange={handleAdded}
            className="!bg-white !text-theme !border-2 !border-theme !border-dashed "
            url={question && URL.createObjectURL(question)}
          />
        </div>
        <div className="w-full flex items-center justify-end">
          <button className="btn-secondary">Upload Pdf</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePdfQuestion;
