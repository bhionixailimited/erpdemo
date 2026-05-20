import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { PdfIcon } from "assets/static-icon";
import { Empty, InputField, UploadFile } from "components/core";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { AssignmentType } from "types/assignment";
import { QuestionType } from "types/question";
import { notify } from "utils";
import CreateLongQuestionField from "./CreateLongQuestionField";
import CreateMCQField from "./CreateMCQField";

type AssignmentData = {
  data?: AssignmentType;
};
type AssignmentQuestionData = {
  data?: QuestionType[];
};

const AssignmentQuestion = () => {
  const [attachment, setAttachment] = useState<Blob>();
  const { assignmentId } = useRouter()?.query;

  //get assignment data

  const { data: assignment, isValidating } = useSWRFetch<AssignmentData>(
    assignmentId && `assignment/${assignmentId}`
  );

  const { mutate } = useFetch();

  const [questionType, setQuestionType] = useState(assignment?.data?.type);

  //get assignment question

  const {
    data: question,
    isValidating: questionLoading,
    mutate: reloadQuestion,
  } = useSWRFetch<AssignmentQuestionData>(
    assignmentId && `assignment/questions/${assignmentId}`
  );

  const handleAdded = async (data: any) => {
    try {
      const formData = new FormData();

      data?.question && formData.append("question", data?.question);
      data?.options?.forEach((item: string) => {
        formData.append("options", item);
      });
      data?.answer && formData.append("answer", data?.answer);
      formData.append("type", questionType || "MCQTYPE");
      data?.markAwarded && formData.append("markAwarded", data?.markAwarded);
      data?.explanation && formData.append("explanation", data?.explanation);
      data?.image && formData.append("attachment", data?.image);

      const response = await mutate({
        path: `assignment/question/create/${assignmentId}`,
        method: "POST",
        body: formData,
        isFormData: true,
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      notify.success(response?.data?.message);
      reloadQuestion?.();
      attachment && setAttachment(undefined);
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! something went wrong.");
      }
    }
  };

  return (
    <div className="w-full">
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
        <div className="p-4 shadow-xl rounded-xl flex flex-col gap-4 bg-white max-w-5xl mx-auto">
          {question?.data?.map((item, index) => (
            <div key={item._id} className="w-full flex flex-col gap-2 ">
              <span className="text-base font-semibold flex items-start gap-4 ">
                {index + 1}:{" "}
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.question,
                  }}
                  className="text-base font-semibold"
                ></p>
              </span>
              {item?.attachmentUrl && (
                <img
                  src={item?.attachmentUrl}
                  alt="icon"
                  className="h-full w-full object-contain shadow-xl  "
                />
              )}
              {item?.type === "MCQTYPE" && (
                <div className="flex flex-col gap-4">
                  <FormControl>
                    <RadioGroup value={item?.answer}>
                      {item?.options?.map((option) => (
                        <FormControlLabel
                          value={option}
                          key={option}
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
                  <span className="text-sm flex items-start gap-4 ">
                    Answer -
                    <span className="text-green-500 font-semibold">
                      {item?.answer || "Unavailable"}
                    </span>
                  </span>
                </div>
              )}
              {item?.type === "LONGTYPE" && (
                <div>
                  <InputField
                    type="text"
                    fullWidth
                    placeholder="Write your answer here....."
                    variant="outlined"
                    multiline
                    rows={5}
                  />
                </div>
              )}
              {item?.type === "ATTACHMENT" && (
                <>
                  <div className="flex flex-col  items-start gap-2">
                    <h3 className="font-medium tracking-wide">
                      Attachment Question -{" "}
                    </h3>
                    <div className="flex items-center flex-wrap gap-4 ">
                      <a
                        href={item?.attachmentUrl}
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <div className="h-20 w-20 p-4 bg-theme shadow-lg rounded-lg group ">
                          <img
                            src={PdfIcon.src}
                            alt="icon"
                            className="h-full w-full object-contain shadow-xl scale-100  group-hover:scale-110  transition-all ease-in-out duration-300 "
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </>
              )}

              <span className=" text-sm flex items-start gap-4">
                Mark Awarded -
                <p className="text-blue-500 font-medium">
                  {item?.markAwarded || "(Unavailable)"}
                </p>
              </span>

              {item?.explanation && (
                <span className=" text-sm flex items-start gap-4">
                  Explanation -
                  <p
                    className="text-gray-700 font-medium"
                    dangerouslySetInnerHTML={{
                      __html: item?.explanation,
                    }}
                  ></p>
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-Fullscreen flex items-center justify-center py-8">
          <Empty title="No question added" />
        </div>
      )}

      <div className="w-full shadow-xl rounded-xl  bg-white max-w-5xl p-4 mx-auto mt-4">
        <h3 className="font-semibold tracking-wide pb-4 text-center text-xl text-theme   ">
          Create Question
        </h3>
        <InputField
          type="select"
          className="mb-4"
          value={questionType}
          onChange={(e) => {
            setQuestionType(e?.target?.value);
          }}
          options={[
            {
              key: "1",
              label: "MCQ Type",
              value: "MCQTYPE",
            },
            {
              key: "2",
              label: "Long Answer Type",
              value: "LONGTYPE",
            },
            {
              key: "2",
              label: "Attachment Type",
              value: "ATTACHMENT",
            },
          ]}
        />

        {questionType === "LONGTYPE" ? (
          <CreateLongQuestionField onAdded={handleAdded} />
        ) : questionType === "ATTACHMENT" ? (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4 ">
              <h3 className="font-medium tracking-wide text-base">
                Upload File
              </h3>
              <UploadFile
                onChange={(e: any) => setAttachment(e?.target?.files[0])}
                className="!bg-white !text-theme !border-2 !border-theme !border-dashed "
                url={attachment && URL.createObjectURL(attachment)}
              />
            </div>
            <div className="w-full flex items-center justify-end">
              <button
                className="btn-secondary"
                onClick={() => handleAdded({ image: attachment })}
              >
                Upload Pdf
              </button>
            </div>
          </div>
        ) : (
          <CreateMCQField onAdded={handleAdded} />
        )}
      </div>
    </div>
  );
};

export default AssignmentQuestion;
