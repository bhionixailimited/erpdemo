import { FormControl, FormHelperText, Skeleton } from "@mui/material";
import { Button, InputField } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import useAuth from "hooks/useAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import BranchType from "types/branch";
import CourseType from "types/course";
import SessionType from "types/session";
import SubjectType from "types/subject";
import { getHoursAndMinutes, notify } from "utils";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
type SessionDataType = {
  data: SessionType[];
};
type CourseDataType = {
  data: CourseType[];
};

type BatchBranchData = {
  data: {
    branch: BranchType;
    course: CourseType;
    _id: string;
    session: SessionType;
  }[];
};

type SubjectDataType = {
  data: SubjectType[];
};

const AssignmentCreate = ({ assignmentMutate, setOpenDialog }: any) => {
  const { assignmentId } = useRouter()?.query;
  const { data, isValidating } = useSWRFetch<any>(
    assignmentId && `assignment/${assignmentId}`
  );
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const { data: sessions } = useSWRFetch<SessionDataType>("session");
  const { data: course } = useSWRFetch<CourseDataType>("course");
  const { data: batch } = useSWRFetch<BatchBranchData>(
    selectedSession &&
      selectedCourse &&
      `get-batch/${selectedSession}/${selectedCourse}`
  );
  const { data: subject } = useSWRFetch<SubjectDataType>("subject");

  const { mutate } = useFetch();

  const createAssignmentSchema = useMemo(() => {
    return [
      {
        key: "1",
        label: "Title*",
        name: "title",
        type: "text",
        initialValue: "",
        validationSchema: Yup.string()
          .required("Assignment title is required*")
          .min(3, "Assignment title must be at least 3 characters")
          .max(50, "Assignment title must be at most 50 characters"),
        className: "w-full col-span-2  rounded-md",
      },
      {
        key: "2",
        label: "Description*",
        name: "description",
        type: "text",
        multiline: true,
        rows: 5,
        initialValue: "",
        validationSchema: Yup.string()
          .required("Assignment introduction is required*")
          .min(3, "Assignment introduction must be at least 10 characters"),
        className: "w-full col-span-2 rounded-md ",
      },
      {
        key: "1",
        label: "Choose Sessions",
        initialValue: "",
        validationSchema: Yup.string().required("Session is required*"),
        type: "select",
        name: "session",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        options: sessions?.data?.map((item) => {
          return {
            key: item?._id,
            label: item?.title,
            value: item?._id,
          };
        }) || [
          {
            key: "1",
            label: "No sessions",
            value: "",
          },
        ],
      },
      {
        key: "1dsfwrf",
        label: "Choose Course",
        initialValue: "",
        validationSchema: Yup.string().required("Course is required*"),
        type: "select",
        name: "course",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        options: course?.data?.map((item) => {
          return {
            key: item?._id,
            label: item?.title,
            value: item?._id,
          };
        }) || [
          {
            key: "1",
            label: "No course",
            value: "",
          },
        ],
      },
      {
        key: "1eefwefrwf",
        label: "Choose Branch",
        initialValue: "",
        validationSchema: Yup.string().required("Branch is required*"),
        type: "select",
        name: "batch",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        options: batch?.data?.map((item) => {
          return {
            key: item?._id,
            label: item?.branch?.title,
            value: item?._id,
          };
        }) || [
          {
            key: "1",
            label: "No branch",
            value: "",
          },
        ],
      },
      {
        key: "5",
        label: "Choose Subject",
        initialValue: "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.string().required("Subject is required*"),
        type: "select",
        name: "subject",
        disabled: assignmentId ? true : false,
        options: subject?.data?.map((item) => {
          return {
            key: item?._id,
            label: item?.title,
            value: item?._id,
          };
        }) || [
          {
            key: "1",
            label: "No subject",
            value: "",
          },
        ],
      },
      {
        key: "2",
        label: "Assignment Mark",
        name: "assignment",
        initialValue: "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.number(),
        type: "number",
      },
      {
        key: "6",
        label: "Assignment Start Date",
        initialValue: "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.string().required(
          "Assignment start date is required*."
        ),
        type: "datetime-local",
        name: "startTime",
      },
      {
        key: "7",
        label: "Assignment Due Time",
        initialValue: "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.string().required(
          "Assignment due date is required*."
        ),
        type: "datetime-local",
        name: "endTime",
      },
      {
        key: "7rgferg",
        label: "Assignment Type",
        initialValue: "MCQTYPE",
        className: "w-full col-span-2 rounded-md ",
        validationSchema: Yup.string().required(
          "Assignment type is required*."
        ),
        type: "select",
        name: "assignmentType",
        options: [
          {
            key: "1",
            label: "MCQ type",
            value: "MCQTYPE",
          },
          {
            key: "2",
            label: "Pdf upload type",
            value: "ATTACHMENT",
          },
          {
            key: "3",
            label: "Long question type",
            value: "LONGTYPE",
          },
        ],
      },
    ];
  }, [
    sessions?.data,
    course?.data,
    batch?.data,
    assignmentId,
    subject?.data,
    data?.data?._id,
  ]);

  const initialValues = useMemo(() => {
    return createAssignmentSchema.reduce(
      (accumulator: any, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.initialValue;
        return accumulator;
      },
      {} as { [key: string]: string }
    );
  }, [createAssignmentSchema]);

  const validationSchema = useMemo(() => {
    return createAssignmentSchema?.reduce(
      (accumulator: any, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      },
      {} as { [key: string]: string }
    );
  }, [createAssignmentSchema]);

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      assignment: data?.data?.fullMark,
      startTime:
        data?.data?.dateOfAssignment &&
        data?.data?.dateOfAssignment?.split("T")[0] +
          "T" +
          getHoursAndMinutes(new Date(data?.data?.dateOfAssignment)),
      endTime:
        data?.data?.dueDate &&
        data?.data?.dueDate?.split("T")[0] +
          "T" +
          getHoursAndMinutes(new Date(data?.data?.dueDate)),
      session: data?.data?.batch?.session?._id,
      course: data?.data?.batch?.course?._id,
      batch: data?.data?.batch?._id,
      subject: data?.data?.subject?._id,
      description: data?.data?.introduction,
      assignmentType: data?.data?.type,
      title: data?.data?.title,
    },
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("batch", values?.batch);
        formData.append(
          "dateOfAssignment",
          new Date(values?.startTime).toISOString()
        );
        formData.append("fullMark", values?.assignment);
        formData.append("dueDate", new Date(values?.endTime).toISOString());
        formData.append("type", values?.assignmentType);
        formData.append("introduction", values?.description);
        formData.append("title", values?.title);
        !assignmentId && formData.append("subject", values?.subject);

        const response = await mutate({
          path: assignmentId
            ? `assignment/update/${assignmentId}`
            : `assignment/create`,
          method: assignmentId ? "PUT" : "POST",
          body: formData,
          isFormData: true,
        });

        if (response?.status !== 200) throw new Error(response?.data);

        notify.success(response?.data?.message);
        formik.resetForm();
        assignmentId && assignmentMutate() && setOpenDialog(false);
        !assignmentId &&
          push(
            `/panel/${
              user?.role?.toLowerCase() === "teacher" ? "teacher" : "admin"
            }/assignment/${response?.data?.data?.data?._id}`
          );
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error.message);
        } else {
          notify.error("Unknown error occurred.");
        }
      }
    },
  });

  const { push } = useRouter();

  const { user } = useAuth();
  useEffect(() => {
    setSelectedSession(data?.data?.batch?.session?._id);
    setSelectedCourse(data?.data?.batch?.course?._id);
  }, [
    data,
    data?.data?.batch?.course?._id,
    data?.data?.batch?.session?._id,
    data?.data?.type,
  ]);

  return (
    <section className="w-full min-h-[90vh] bg-gray-50 ">
      <div className="w-full flex justify-between items-center p-4 border bg-white ">
        <h3 className="font-semibold tracking-wide text-xl text-theme">
          {assignmentId ? "Edit Assignment" : "Create Assignment"}
        </h3>
      </div>

      {assignmentId && isValidating ? (
        <div className="flex flex-col gap-4 max-w-5xl mx-auto py-8 px-4 bg-white shadow-xl">
          <Skeleton variant="text" height={30} width={100} animation="wave" />
          <Skeleton variant="text" width={100} animation="wave" />
          <Skeleton variant="text" width={400} animation="wave" />
          <Skeleton variant="rounded" height={300} animation="wave" />
          <div className="   grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
            {Array(7)
              .fill(0)
              ?.map((item, index) => (
                <span className="flex flex-col gap-4" key={index}>
                  <Skeleton variant="text" width={80} animation="wave" />
                  <Skeleton variant="rounded" height={50} animation="wave" />
                </span>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full py-4 md:py-8  px-2">
          <div className=" w-full flex-col gap-4 md:gap-8 h-fit flex items-center ">
            <form
              onSubmit={formik?.handleSubmit}
              className="flex flex-col gap-4  rounded-lg  md:p-4 w-full max-w-5xl  "
            >
              <div className="   grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
                {createAssignmentSchema?.map((item, index) => (
                  <div key={index} className={item?.className}>
                    {item?.name === "description" ? (
                      <div className="flex flex-col gap-2 md:gap-4">
                        <span className="flex flex-col gap-2">
                          <h3 className="font-medium tracking-wide text-gray-900 text-base  ">
                            Introduction*
                          </h3>
                        </span>
                        <FormControl>
                          <ReactQuill
                            theme="snow"
                            value={formik?.values?.description}
                            onChange={(value) => {
                              formik?.setFieldValue("description", value);
                            }}
                            onBlur={() => {
                              formik.setFieldTouched("description", true);
                            }}
                          />
                          <FormHelperText className="!text-red-600">
                            {formik?.touched?.description &&
                              (formik?.errors?.description as any)}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    ) : (
                      <InputField
                        disabled={item?.disabled}
                        type={item?.type as any}
                        variant="outlined"
                        className="rounded-md w-full bg-gray-50 "
                        label={item?.label}
                        name={item?.name}
                        multiline={item?.multiline}
                        rows={item?.rows}
                        options={item?.options}
                        inputProps={
                          item?.name === "startTime"
                            ? {
                                min: formik?.values?.startTime
                                  ? dayjs(formik?.values?.startTime).format(
                                      "YYYY-MM-DDThh:mm"
                                    )
                                  : dayjs().format("YYYY-MM-DDThh:mm"),
                              }
                            : item?.name === "endTime"
                            ? {
                                min:
                                  formik?.values?.startTime &&
                                  new Date(formik?.values?.startTime) >
                                    new Date()
                                    ? dayjs(formik?.values?.startTime).format(
                                        "YYYY-MM-DDThh:mm"
                                      )
                                    : dayjs().format("YYYY-MM-DDThh:mm"),
                              }
                            : {}
                        }
                        onChange={(e: any) => {
                          if (
                            item?.name === "course" ||
                            item?.name === "session"
                          ) {
                            formik?.handleChange(e);
                            item?.name === "course"
                              ? setSelectedCourse(e?.target?.value)
                              : setSelectedSession(e?.target?.value);
                          }
                          formik?.handleChange(e);
                        }}
                        onBlur={formik?.handleBlur}
                        value={formik?.values[item?.name]}
                        error={Boolean(
                          formik?.touched[item?.name] &&
                            formik?.errors[item?.name]
                        )}
                        helperText={
                          formik?.touched[item?.name] &&
                          (formik?.errors[item?.name] as any)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center w-full justify-center py-6">
                <Button
                  className="btn-secondary"
                  loading={formik?.isSubmitting}
                >
                  {assignmentId ? "Update" : "Create New"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AssignmentCreate;
