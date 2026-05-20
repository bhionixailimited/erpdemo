import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { ICONS } from "assets";
import { PdfIcon } from "assets/static-icon";
import { Empty, InputField } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const questionAnswerSchema = [
  {
    key: "1",
    name: "remark",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string(),
  },
  {
    key: "2",
    name: "marks",
    type: "array",
    initialValue: "",
    validationSchema: Yup.array(
      Yup.object({
        answer: Yup.string(),
        mark: Yup.number(),
      })
    ),
  },
];

type Props = {
  assignmentDetails?: any;
  studentId?: string;
  remark?: string;
};

type QuestionAnswerData = {
  data: {
    answer?: any;
    explanation?: string;
    isStudentAnswered?: boolean;
    markAwarded?: string;
    options: string[];
    question: any;
    type: string;
    _is: string;
    studentAnswer: {
      _id: string;
      markAwarded: number;
      reviewed: boolean;
      studentAnswer?: any;
      attachmentUrl?: string;
    };
    _id: string;
    attachmentUrl?: string;
  }[];
  pageNo?: number;
  perPage?: number;
  totalCount: number;
  isLastChunk: boolean;
};

const initialValues = questionAnswerSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = questionAnswerSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const CommonQuestionView = ({
  assignmentDetails,
  studentId,
  remark,
}: Props) => {
  const [pageNo, setPageNo] = useState(1);

  const { loading, mutate } = useFetch();

  const { user } = useAuth();

  const { push } = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: `assignment/remark/${assignmentDetails?._id}/${studentId}`,
          method: "POST",
          body: JSON.stringify(values),
        });

        if (response?.data?.error) throw new Error(response?.data?.error);

        setPageNo((prev) => (!questionAnswer?.isLastChunk ? prev + 1 : prev));

        notify.success(response?.data?.message);

        if (questionAnswer?.isLastChunk) {
          push(
            `/panel/${
              user?.role === "TEACHER" ? "teacher" : "admin"
            }/assignment/${assignmentDetails?._id}`
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Oops!something went wrong.");
        }
      }
    },
  });

  //get student question

  const { data: questionAnswer, isValidating: questionLoading } =
    useSWRFetch<QuestionAnswerData>(
      assignmentDetails?._id &&
        studentId &&
        `assignment/answer/${assignmentDetails?._id}/${studentId}?perPage=5&pageNo=${pageNo}`
    );

  useEffect(() => {
    (() => {
      if (!questionAnswer?.data) return;

      formik?.setFieldValue(
        "marks",
        questionAnswer?.data?.map((item) => {
          return {
            _id: item?._id,
            mark: item?.studentAnswer?.markAwarded || 0,
            answer: item?.studentAnswer?._id,
          };
        })
      );
    })();
  }, [questionAnswer?.data, pageNo]);

  const handleFormikValue = (id: string, value: number) => {
    formik?.setFieldValue(
      "marks",
      formik?.values?.marks?.map((item: any) => {
        if (item?._id === id) {
          return {
            ...item,
            mark: value,
          };
        }
        return item;
      })
    );
  };

  return (
    <section className="flex w-full flex-col gap-1  items-center justify-center">
      <div className="flex w-full md:px-5 flex-col gap-2  items-center justify-center ">
        <div className="w-full relative flex flex-col gap-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-2 md:p-5 border-t-8 border-theme rounded-xl">
          <h1 className="text-center w-full font-semibold text-2xl">
            {assignmentDetails?.chapter}
          </h1>
          <p className="text-center w-full font-semibold text-xl text-theme border-b pb-2 border-theme">
            {assignmentDetails?.assignmentName}
          </p>
          <div className="absolute right-5 top-10  md:flex hidden flex-col gap-1">
            <p className="text-sm">
              Due Date:{" "}
              <span className="text-themeSecondary font-semibold">
                {dayjs(assignmentDetails?.lastDate).format("LLL")}{" "}
              </span>
            </p>
            <p className="text-sm ">
              Total Points:{" "}
              <span className="text-theme font-semibold">
                {assignmentDetails?.totalMark}
              </span>
            </p>
          </div>
          {!questionAnswer || questionLoading ? (
            <div className="w-full flex flex-col gap-2 py-4   mx-auto">
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
          ) : questionAnswer?.data?.length ? (
            questionAnswer?.data?.map((item, index) => (
              <Fragment key={item._id}>
                <div className="flex flex-col gap-4">
                  <span className="text-base flex items-start gap-4 font-semibold">
                    {index + 1 + (pageNo - 1) * 5} :{" "}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.question,
                      }}
                    ></p>
                  </span>
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
                        <RadioGroup value={item?.studentAnswer?.studentAnswer}>
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
                      <span className="text-sm flex items-start gap-2">
                        Answer -
                        <span className="text-green-500 font-semibold">
                          {item?.answer}{" "}
                        </span>
                      </span>
                      <div>
                        {item?.isStudentAnswered ? (
                          <>
                            <h3 className="font-medium text-xs tracking-wide">
                              Student answer -{" "}
                              {item?.studentAnswer?.studentAnswer}
                            </h3>
                          </>
                        ) : (
                          <h3 className="font-medium text-xs text-red-800 tracking-wide">
                            Student answer - (Student not answered)
                          </h3>
                        )}
                      </div>
                    </div>
                  )}
                  {item?.type === "LONGTYPE" && (
                    <div>
                      {item?.isStudentAnswered ? (
                        <>
                          <h3 className="font-medium tracking-wide">
                            Student Answer-{" "}
                          </h3>
                          <ReactQuill
                            value={item?.studentAnswer?.studentAnswer}
                            placeholder="Write your answer here....."
                            theme="snow"
                          />
                        </>
                      ) : (
                        <h3 className="font-medium text-xs text-red-800 tracking-wide">
                          Student answer - (Student not answered)
                        </h3>
                      )}
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
                        {item?.isStudentAnswered ? (
                          <>
                            <h3 className="font-medium tracking-wide">
                              Student Answer-{" "}
                            </h3>
                            <div className="flex items-center flex-wrap gap-4 ">
                              <a
                                href={item?.studentAnswer?.attachmentUrl}
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
                          </>
                        ) : (
                          <h3 className="font-medium text-xs text-red-800 tracking-wide">
                            Student answer - (Student not answered)
                          </h3>
                        )}
                      </div>
                    </>
                  )}
                  <div className="flex flex-col w-fit items-start gap-2">
                    <h3 className="font-medium tracking-wide">
                      Mark for answer -
                    </h3>
                    <InputField
                      className="!h-10 "
                      defaultValue={item?.studentAnswer?.markAwarded}
                      value={
                        formik?.values?.marks &&
                        formik?.values?.marks?.find(
                          (inner: any) => inner?._id === item?._id
                        )?.mark
                      }
                      onChange={(e) =>
                        handleFormikValue(item?._id, Number(e?.target?.value))
                      }
                      type="number"
                    />
                  </div>
                </div>
              </Fragment>
            ))
          ) : (
            <div className="w-Fullscreen flex items-center justify-center py-8">
              <Empty title="No data found" />
            </div>
          )}
        </div>

        {pageNo === 1 && !questionAnswer?.data?.length ? (
          <></>
        ) : (
          <>
            {questionAnswer?.isLastChunk && (
              <div className="w-full">
                <InputField
                  type="text"
                  multiline
                  value={formik?.values?.remark || remark}
                  name="remark"
                  onChange={formik?.handleChange}
                  rows={5}
                  className="w-full"
                  label={"Remark"}
                />
              </div>
            )}

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
              <button
                className="btn-primary  "
                onClick={() => formik?.handleSubmit()}
              >
                {loading ? (
                  <span className="flex items-center gap-4">
                    <ICONS.Loading className="animate-spin text-white !text-4xl min-h-[20px] min-w-[20px] " />
                    Loading...
                  </span>
                ) : questionAnswer?.isLastChunk ? (
                  `Submit`
                ) : (
                  `Submit & Next`
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CommonQuestionView;
