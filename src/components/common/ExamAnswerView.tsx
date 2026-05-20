import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { ICONS } from "assets";
import { Empty, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
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
  student?: string;
  subjectExam?: string;
};

type QuestionAnswerData = {
  data: {
    answer?: any;
    explanation?: string;
    markAwarded?: string;
    options: string[];
    question: any;
    type: string;
    _id: string;
    studentAnswered: {
      _id: string;
      markAwarded: number;
      reviewed: boolean;
      studentAnswer?: any;
      attachmentUrl?: string;
      correctAnswer?: string;
    };
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

const ExamAnswerView = ({ student, subjectExam }: Props) => {
  const [pageNo, setPageNo] = useState(1);

  const { loading, mutate } = useFetch();

  const handlePublishExam = async () => {
    try {
      const response = await mutate({
        path: `exam/generate/${subjectExam}`,
        method: "POST",
      });

      if (response?.data?.error) throw new Error();
    } catch (error) {
      notify.error("Oops! Exam syncing failed.");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: `exam/remark/${subjectExam}/${student}`,
          method: "PUT",
          body: JSON.stringify(values),
        });

        if (response?.data?.error) throw new Error(response?.data?.error);

        setPageNo((prev) => (!questionAnswer?.isLastChunk ? prev + 1 : prev));

        notify.success("Review updated");
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Oops!something went wrong.");
        }
      } finally {
        await handlePublishExam();
      }
    },
  });

  //get student question

  const { data: questionAnswer, isValidating: questionAnswerFetching } =
    useSWRFetch<QuestionAnswerData>(
      subjectExam &&
        student &&
        `exam/${subjectExam}/answer/${student}?perPage=10&pageNo=${pageNo}`
    );

  useEffect(() => {
    (() => {
      if (!questionAnswer?.data) return;

      formik?.setFieldValue(
        "marks",
        questionAnswer?.data?.map((item: any) => {
          return {
            _id: item?._id,
            mark: item?.studentAnswered?.markAwarded || 0,
            answer: item?.studentAnswered?._id,
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
          {!questionAnswer || questionAnswerFetching ? (
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
            questionAnswer?.data?.map((item: any, index: any) => (
              <Fragment key={item._id}>
                <div className="flex flex-col gap-4">
                  <span className="text-base flex items-start gap-4 font-semibold">
                    {index + 1 + (pageNo - 1) * 10} :{" "}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.question,
                      }}
                    ></p>
                  </span>

                  {item?.attachmentUrl && (
                    <img
                      src={item?.attachmentUrl}
                      alt="attachment"
                      className="h-full w-full object-contain shadow-xl  "
                    />
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
                        <RadioGroup value={item?.answer}>
                          {item?.options?.map((option: any) => (
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
                        {item?.studentAnswered?._id ? (
                          <>
                            <h3 className="font-medium text-xs tracking-wide">
                              Student answer -{" "}
                              {item?.studentAnswered?.studentAnswer}
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
                      {item?.studentAnswered?._id ? (
                        <>
                          <h3 className="font-medium tracking-wide">
                            Student Answer-{" "}
                          </h3>

                          <ReactQuill
                            value={item?.studentAnswered?.studentAnswer}
                            theme="snow"
                            placeholder="no answers..."
                          />
                        </>
                      ) : (
                        <h3 className="font-medium text-xs text-red-800 tracking-wide">
                          Student answer - (Student not answered)
                        </h3>
                      )}
                    </div>
                  )}

                  {item?.studentAnswered?._id && (
                    <div className="flex flex-col w-fit items-start gap-2">
                      <h3 className="font-medium tracking-wide">
                        Mark for answer -
                      </h3>
                      <InputField
                        className="!h-10 "
                        defaultValue={item?.studentAnswer?.markAwarded || 0}
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
                  )}
                </div>
              </Fragment>
            ))
          ) : (
            <div className="w-Fullscreen flex items-center justify-center py-8">
              <Empty title="No data found" />
            </div>
          )}
        </div>

        {questionAnswer?.isLastChunk && (
          <div className="w-full">
            <InputField
              type="text"
              multiline
              value={formik?.values?.remark}
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
      </div>
    </section>
  );
};

export default ExamAnswerView;
