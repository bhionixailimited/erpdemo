import { Delete } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { InputField } from "components/core";
import { useFetch } from "hooks";
import { ExamSubjectType } from "types/examSubject";
import { notify } from "utils";

type Props = {
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
  reload?: () => void;
};

const TestMcqQuestion = ({ data, reload }: Props) => {
  const { mutate } = useFetch();

  const handleQuestionDelete = async (question: string) => {
    try {
      const response = await mutate({
        path: `exam/question/delete/${question}`,
        method: "DELETE",
      });

      if (response?.data?.error) throw new Error(response?.data?.error);
      notify.success(response?.data?.message);

      reload?.();
    } catch (error) {
      if (error instanceof Error) return notify.error(error?.message);
      notify.error("Something went wrong!");
    }
  };

  return (
    <section className="flex w-full flex-col gap-1 border-b bg-white  items-center justify-center">
      <h3 className="font-medium tracking-wide text-xl md:text-4xl py-2 border-b w-full text-center text-theme">
        Questions
      </h3>
      <div className="flex w-full md:px-5 flex-col gap-2  items-center justify-center ">
        <div className="w-full relative flex flex-col gap-2 p-2 md:p-5  rounded-xl">
          {data?.map((item, index) => (
            <div key={item._id} className="flex flex-col gap-5">
              <span className="text-base font-semibold flex items-start justify-between gap-4 ">
                <span className="flex items-start- gap-4">
                  {index + 1}:{" "}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.question,
                    }}
                    className="text-base font-semibold"
                  ></p>
                </span>
                <IconButton onClick={() => handleQuestionDelete(item?._id)}>
                  <Delete className="text-red-500" />
                </IconButton>
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
                  <span className="text-sm">
                    Answer -
                    <span className="text-green-500 font-semibold">
                      {item?.answer}
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
      </div>
    </section>
  );
};

export default TestMcqQuestion;
