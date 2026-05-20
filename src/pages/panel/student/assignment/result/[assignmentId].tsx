import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { AssignmentType } from "types/assignment";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Pagination,
} from "@mui/material";
import { PdfIcon } from "assets/static-icon";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type dataType = {
  data: AssignmentType;
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

const StudentAssignmentDetails = () => {
  const [pageNo, setPageNo] = useState(1);

  const { push, query } = useRouter();
  const { assignmentId } = query;
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    assignmentId && `assignment/stat/${assignmentId}`
  );

  const { user } = useAuth();

  const { data: questionAnswer, isValidating: questionLoading } =
    useSWRFetch<QuestionAnswerData>(
      assignmentId &&
        user?._id &&
        `assignment/answer/${assignmentId}/${user?._id}?perPage=5&pageNo=${pageNo}`
    );
  return (
    <PrivateLayout title=" Assignment | Details">
      <section className="flex w-full flex-col gap-1 container mx-auto  items-center justify-center">
        <div className="flex w-full md:px-5 flex-col gap-2  items-center justify-center ">
          <div className="w-full relative flex flex-col gap-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-2 md:p-5 border-t-8 border-theme rounded-xl">
            <h1 className="text-center w-full font-semibold text-2xl">
              {data?.data?.subject?.title}
            </h1>
            <p className="text-center w-full font-semibold text-xl text-theme border-b pb-2 border-theme">
              {data?.data?.title}
            </p>
            <div className="absolute right-5 top-10  md:flex hidden flex-col gap-1">
              <p className="text-sm">
                Due Date:{" "}
                <span className="text-themeSecondary font-semibold">
                  {dayjs(data?.data?.dueDate).format("LLL")}{" "}
                </span>
              </p>
              <p className="text-sm ">
                Total Points:{" "}
                <span className="text-theme font-semibold">
                  {data?.data?.fullMark}
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
                            <span
                              className="flex items-center gap-4"
                              key={index}
                            >
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
                          <RadioGroup
                            value={item?.studentAnswer?.studentAnswer}
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
                                Your answer -{" "}
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
                            <h3 className="font-medium text-sm mb-2 tracking-wide">
                              Your Answer-{" "}
                            </h3>
                            <ReactQuill
                              value={item?.studentAnswer?.studentAnswer}
                              placeholder="Write your answer here....."
                              theme="snow"
                            />
                          </>
                        ) : (
                          <h3 className="font-medium text-xs text-red-800 tracking-wide">
                            Your answer - (Student not answered)
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
                    <span className="text-sm flex items-start gap-2">
                      Mark awarded -
                      <span className="text-green-500 font-semibold">
                        {item?.studentAnswer?.markAwarded || 0}{" "}
                      </span>
                    </span>
                  </div>
                </Fragment>
              ))
            ) : (
              <div className="w-Fullscreen flex items-center justify-center py-8">
                <Empty title="No data found" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(
              Number(questionAnswer?.totalCount || 1) /
                Number(questionAnswer?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(StudentAssignmentDetails);
