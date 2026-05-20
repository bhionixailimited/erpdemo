import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { ICONS } from "assets";
import { PdfIcon } from "assets/static-icon";
import { Empty, UploadFile } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AssignmentType } from "types/assignment";
import { notify } from "utils";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const mcq_question = [
  {
    id: 1,
    question: " Which of the following is correct about JavaScript?",
    option1: "JavaScript is an Object-Based language",
    option2: "JavaScript is Assembly-language",
    option3: " JavaScript is an Object-Oriented language",
    option4: " JavaScript is a High-level language",
  },
  {
    id: 2,
    question:
      "Arrays in JavaScript are defined by which of the following statements?",
    option1: "It is an ordered list of values",
    option2: "It is an ordered list of objects",
    option3: "It is an ordered list of string",
    option4: "It is an ordered list of functions",
  },
  {
    id: 3,
    question:
      "Where is Client-side JavaScript code is embedded within HTML documents?",
    option1: "A URL that uses the special javascript:code",
    option2: "A URL that uses the special javascript:protocol",
    option3: "A URL that uses the special javascript:encoding",
    option4: "A URL that uses the special javascript:stack",
  },
];
interface Props {
  assignmentId?: string;
}

type AssignmentQuestionType = {
  data: {
    _id: string;
    assignment: string;
    attachmentUrl: string;
    createdAt: string;
    options: string[];
    subject: string;
    type: "ATTACHMENT" | "LONGTYPE" | "MCQTYPE";
    question: string;
    explanation?: string;
    markAwarded?: number;
    studentAnswer: {
      _id: string;
      studentAnswer: string;
      attachmentUrl: string;
    };
    isStudentAnswered: boolean;
  }[];
  isLastChunk?: boolean;
};

type AssignmentDataDetailsType = {
  data: AssignmentType;
};

const McqType = ({ assignmentId }: Props) => {
  const [image, setImage] = useState<Blob | string>();
  const [mcqAnswer, setMcqAnswer] = useState("");
  const [longAnswer, setLongAnswer] = useState("");

  const router = useRouter();

  const [pageNo, setPageNo] = useState(1);

  const { loading, mutate } = useFetch();

  const { user } = useAuth();

  const { data: assignmentQuestion, isValidating: questionLoading } =
    useSWRFetch<AssignmentQuestionType>(
      assignmentId &&
        user?._id &&
        `assignment/answer/${assignmentId}/${user?._id}?perPage=1&pageNo=${pageNo}`
    );
  const { data: assignmentDetails, isValidating: assignmentLoading } =
    useSWRFetch<AssignmentDataDetailsType>(
      assignmentId && `assignment/${assignmentId}`
    );

  useEffect(() => {
    if (!assignmentQuestion?.data?.length) return;

    if (assignmentQuestion?.data[0]?.studentAnswer) {
      if (assignmentQuestion?.data[0]?.type === "MCQTYPE") {
        setMcqAnswer(
          assignmentQuestion?.data[0]?.studentAnswer?.studentAnswer || ""
        );
      } else if (assignmentQuestion?.data[0]?.type === "LONGTYPE") {
        setLongAnswer(
          assignmentQuestion?.data[0]?.studentAnswer?.studentAnswer || ""
        );
      } else if (assignmentQuestion?.data[0]?.type === "ATTACHMENT") {
        setLongAnswer(
          assignmentQuestion?.data[0]?.studentAnswer?.studentAnswer || ""
        );
        setImage(
          assignmentQuestion?.data[0]?.studentAnswer?.attachmentUrl || ""
        );
      }
    }
  }, [assignmentQuestion?.data]);

  const handleSubmitQuestion = async (
    questionId?: string,
    redirect?: boolean
  ) => {
    try {
      if (!questionId) return;

      if (assignmentQuestion?.isLastChunk && redirect) {
        Swal.fire({
          title: "Are you sure?",
          text: "Your exam response will be submitted!.",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Yes, submit it!",
          cancelButtonText: "No, cancel!",
        }).then((result) => {
          if (!result.isConfirmed) return;
        });
      }

      if (dayjs(assignmentDetails?.data?.dueDate).isBefore(dayjs())) return;

      const formData = new FormData();

      formData.append("question", questionId);
      if (assignmentQuestion?.data[0]?.type === "MCQTYPE") {
        formData.append("answer", mcqAnswer);
      } else {
        formData.append("answer", longAnswer);
      }
      image && formData.append("attachment", image);

      const response = await mutate({
        path: `assignment/answer/create`,
        method: "POST",
        body: formData,
        isFormData: true,
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      setPageNo((prev) => (!assignmentQuestion?.isLastChunk ? prev + 1 : prev));
      if (redirect) {
        setMcqAnswer("");
        setLongAnswer("");
      }
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops!something went wrong.");
      }
    } finally {
      if (assignmentQuestion?.isLastChunk && redirect) {
        notify.success("Assignment submitted successfully");
        router.push(`/panel/student/assignment`);
      }
    }
  };

  return (
    <section className="flex w-full flex-col gap-1  items-center justify-center">
      <div className="flex w-full   flex-col gap-2 my-3  p-2 md:p-5 items-center justify-center ">
        <div className=" w-full md:w-9/12 relative flex flex-col gap-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-2 md:p-5 border-t-8 border-theme rounded-xl">
          <div className="flex items-start border-b w-full justify-between border-theme pb-2 ">
            <div className="flex flex-col gap-2 justify-start ">
              <h3 className=" w-full font-semibold text-theme text-md md:text-2xl">
                {assignmentDetails?.data?.title}
              </h3>
              <p className=" w-full font-semibold text-xs md:text-md text-gray-800">
                {assignmentDetails?.data?.subject?.title}
              </p>
            </div>

            <div className=" flex flex-col gap-1">
              <p className=" text-xs md:text-sm">
                Due Date:{" "}
                <span className="text-themeSecondary font-semibold">
                  {dayjs(assignmentDetails?.data?.dueDate).format(
                    "DD MMM, YYYY"
                  )}
                </span>
              </p>
              {assignmentDetails?.data?.fullMark ? (
                <p className=" text-xs md:text-sm">
                  Total Points:{" "}
                  <span className="text-theme font-semibold">
                    {assignmentDetails?.data?.fullMark}
                  </span>
                </p>
              ) : (
                <p className=" text-xs md:text-sm">
                  Type:{" "}
                  <span className="text-theme font-semibold">
                    {assignmentDetails?.data?.type}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 py-4 min-h-[55vh]  mx-auto">
            {!assignmentQuestion && questionLoading ? (
              <div className="flex flex-col gap-4">
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
            ) : assignmentQuestion?.data?.length ? (
              assignmentQuestion?.data?.map((item, index) => (
                <div key={item._id} className="flex flex-col gap-5">
                  <span className="text-base flex items-start justify-between gap-4 font-semibold">
                    <span className="flex gap-4 items-start">
                      <p>{index + 1 * pageNo}.</p>

                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.question,
                        }}
                      ></p>
                    </span>
                    {item?.markAwarded && (
                      <p className="min-w-[3rem]">
                        {" "}
                        [{item?.markAwarded} Mark(s)]{" "}
                      </p>
                    )}
                  </span>
                  {item?.attachmentUrl && (
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
                  )}
                  {item?.explanation && (
                    <span className=" flex items-start gap-4 text-sm font-medium">
                      Explanation -
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.explanation,
                        }}
                      ></p>
                    </span>
                  )}
                  {item?.type === "MCQTYPE" && (
                    <div className="flex flex-col gap-4">
                      <FormControl>
                        <RadioGroup
                          value={mcqAnswer}
                          onChange={(e) => setMcqAnswer(e?.target?.value)}
                        >
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
                    </div>
                  )}
                  {item?.type === "LONGTYPE" && (
                    <ReactQuill
                      theme="snow"
                      value={longAnswer}
                      onChange={(value) => setLongAnswer(value)}
                    />
                  )}
                  {item?.type === "ATTACHMENT" && (
                    <div className="flex flex-col  items-start gap-2">
                      <h3 className="font-medium tracking-wide">
                        Upload Your Answer -
                      </h3>
                      <div className="w-full">
                        <UploadFile
                          onChange={(e: any) => setImage(e?.target?.files[0])}
                        />
                      </div>
                      {image && (
                        <div className="flex items-center flex-wrap gap-4 ">
                          <a
                            href={image as any}
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
                      )}
                      <h3 className="font-medium tracking-wide">Or -</h3>
                      <div className="w-full">
                        <ReactQuill
                          theme="snow"
                          value={longAnswer}
                          onChange={(value) => setLongAnswer(value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="w-Fullscreen flex items-CenterFocusStrong justify-center">
                <Empty title="No question added" />
              </div>
            )}
          </div>

          <div className="w-full flex items-center justify-between">
            <button
              className="btn-primary !border-themeSecondary hover:!bg-white hover:!text-themeSecondary !bg-themeSecondary "
              onClick={() => setPageNo((prev) => (prev > 2 ? prev - 1 : 1))}
            >
              Prev
            </button>
            <span className="border-theme border-[1px] text-center px-4 py-2 rounded-md">
              {pageNo}
            </span>
            <div className="flex items-center gap-4">
              {assignmentQuestion?.isLastChunk ? (
                <button
                  className="btn-primary  "
                  onClick={() =>
                    handleSubmitQuestion(
                      assignmentQuestion?.data[0]?._id,
                      false
                    )
                  }
                >
                  Submit
                </button>
              ) : null}
              <button
                className={` ${
                  assignmentQuestion?.isLastChunk
                    ? "!bg-whatsapp hover:!text-whatsapp !border-whatsapp hover:!bg-white btn-primary"
                    : "btn-primary"
                } `}
                onClick={() =>
                  handleSubmitQuestion(assignmentQuestion?.data[0]?._id, true)
                }
              >
                {loading ? (
                  <span className="flex items-center gap-4">
                    <ICONS.Loading className="animate-spin text-white !text-4xl min-h-[20px] min-w-[20px] " />
                    Loading...
                  </span>
                ) : assignmentQuestion?.isLastChunk ? (
                  `Complete`
                ) : (
                  `${
                    dayjs(assignmentDetails?.data?.dueDate).isBefore(dayjs())
                      ? "Next"
                      : "Submit & Next"
                  }`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default McqType;
