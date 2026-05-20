import { FormControl, FormHelperText, Skeleton } from "@mui/material";
import { Button, CustomAutocomplete, InputField } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDeferredValue, useMemo, useState } from "react";
import BatchType from "types/batch";
import SubjectType from "types/subject";
import { notify } from "utils";
import { editorFormat, editorModules } from "utils/EditorToolbar";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type SubjectDataType = {
  data: SubjectType[];
};

type SubjectExamData = {
  data: {
    batch: BatchType;
    endTime: string;
    startTime: string;
    subject: SubjectType;
    type: string;
    _id: string;
    passMark: number;
    credit: number;
    fullMark: number;
    introduction: string;
  };
};

const TestExamCreate = () => {
  const { query, push } = useRouter();
  const { user } = useAuth();
  const { examId, edit, subjectExamId } = query;
  const [searchTitle, setSearchTitle] = useState("");

  const searchText = useDeferredValue(searchTitle);

  const { data, isValidating } = useSWRFetch<SubjectDataType>(
    `subject?perPage=10&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );

  const {
    data: subjectExamData,
    isValidating: subjectExamValidating,
    mutate: reloadExam,
  } = useSWRFetch<SubjectExamData>(
    edit && subjectExamId && `exam/subject/details/${subjectExamId}`
  );

  const { mutate, loading } = useFetch();

  const createTestSchema = useMemo(() => {
    return [
      {
        key: "2",
        label: "Introduction",
        name: "introduction",
        type: "text",
        multiline: true,
        rows: 5,
        initialValue: subjectExamData?.data?.introduction || "",
        validationSchema: Yup.string()
          .required("Exam introduction is required*")
          .min(3, "Exam introduction must be at least 10 characters"),
        className: "w-full col-span-2 rounded-md ",
        settingType: "BASIC",
      },

      {
        key: "5",
        label: "Choose Subject",
        initialValue: subjectExamData?.data?.subject?._id || "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.string().required("Subject is required"),
        type: "autocomplete",
        name: "subject",
        options: data?.data?.map((item) => {
          return {
            key: item?._id,
            label: item?.title,
            value: item?._id,
          };
        }),
        settingType: "BASIC",
      },
      {
        key: "2",
        label: "Full Mark",
        name: "fullMark",
        initialValue: subjectExamData?.data?.fullMark || "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.number().required("Total mark is required"),
        type: "number",
        settingType: "BASIC",
      },
      {
        key: "1",
        label: "Pass Mark",
        name: "passMark",
        type: "number",
        initialValue: subjectExamData?.data?.passMark || "",
        validationSchema: Yup.string().required("Pass mark is required*"),
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        settingType: "BASIC",
      },
      {
        key: "9",
        label: "Exam credit",
        initialValue: subjectExamData?.data?.credit || "",
        className: "w-full rounded-md ",
        validationSchema: Yup.string().required("Exam credit is required*"),
        type: "number",
        name: "credit",
        settingType: "BASIC",
      },
      {
        key: "6",
        label: "Start Time",
        initialValue:
          dayjs(subjectExamData?.data?.startTime).format("YYYY-MM-DDTHH:mm") ||
          "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.string(),
        type: "datetime-local",
        name: "startTime",
        settingType: "BASIC",
      },
      {
        key: "7",
        label: "End Time",
        initialValue:
          dayjs(subjectExamData?.data?.endTime).format("YYYY-MM-DDTHH:mm") ||
          "",
        className: "w-full rounded-md ",
        validationSchema: Yup.string(),
        type: "datetime-local",
        name: "endTime",
        settingType: "BASIC",
      },
      {
        key: "8",
        label: "Exam type",
        initialValue: subjectExamData?.data?.type || "",
        className: "w-full rounded-md ",
        validationSchema: Yup.string().required("Exam type is required"),
        type: "select",
        name: "type",
        options: [
          {
            key: "1",
            label: "MCQTYPE",
            value: "MCQTYPE",
          },
          {
            key: "2",
            label: "LONGTYPE",
            value: "LONGTYPE",
          },
        ],
        settingType: "BASIC",
      },
    ];
  }, [data?.data, subjectExamData]);

  const initialValues = useMemo(() => {
    let value = createTestSchema.reduce(
      (accumulator: any, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.initialValue;
        return accumulator;
      },
      {} as { [key: string]: string }
    );
    return value;
  }, [createTestSchema]);

  const validationSchema = useMemo(
    () =>
      createTestSchema?.reduce((accumulator: any, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      }, {} as { [key: string]: string }),
    [createTestSchema]
  );

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        let data = {
          exam: examId,
          type: values?.type,
          startTime: new Date(values?.startTime).toISOString(),
          endTime: new Date(values?.endTime).toISOString(),
          introduction: values?.introduction,
          subject: values?.subject,
          fullMark: values?.fullMark,
          passMark: values?.passMark,
          credit: values?.credit,
        };

        const response = await mutate({
          path:
            edit === "true" && subjectExamId
              ? `exam/subject/${subjectExamId}`
              : `exam/subject/create`,
          method: edit === "true" && subjectExamId ? "PUT" : "POST",
          body: JSON.stringify(data),
        });

        if (response?.status !== 200) throw new Error(response?.data?.error);
        formik.resetForm();
        notify.success(response?.data?.message);
        edit && subjectExamId && reloadExam?.();
        push(
          user?.role === "ADMIN"
            ? `/panel/admin/exam/schedule/${examId}`
            : `/panel/teacher/exam/view/${examId}`
        );
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Oops! Something went wrong.");
        }
      }
    },
  });

  return (
    <section className="w-full min-h-[90vh] bg-gray-50 ">
      {edit && subjectExamId && subjectExamValidating ? (
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
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-8 items-center w-full max-w-5xl mx-auto py-8 px-4 "
        >
          <div className="flex flex-col gap-4 bg-white p-4 shadow-xl w-full rounded-lg  ">
            <h3 className="font-semibold tracking-wide text-2xl text-theme border-b pb-2 ">
              {edit ? "Edit Exam" : "Create Exam"}
            </h3>

            <div className="   grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
              {createTestSchema?.map((item, index) => {
                return (
                  <div key={index} className={item?.className}>
                    {item?.name === "introduction" ? (
                      <div className="flex flex-col gap-4">
                        <span className="flex flex-col gap-2">
                          <h3 className="font-medium tracking-wide text-gray-900 text-base  ">
                            Introduction*
                          </h3>

                          <p className="tracking-wide text-sm text-gray-600 font-medium">
                            This text will be displayed at the top op the test.
                            You can use it to write your instruction or anything
                            else.
                          </p>
                        </span>
                        <FormControl>
                          <ReactQuill
                            formats={editorFormat}
                            modules={editorModules}
                            theme="snow"
                            value={formik?.values?.introduction}
                            onChange={(value) => {
                              formik?.setFieldValue("introduction", value);
                            }}
                            onBlur={() => {
                              formik.setFieldTouched("introduction", true);
                            }}
                          />
                          <FormHelperText className="!text-red-600">
                            {formik?.touched?.introduction &&
                              (formik?.errors?.introduction as any)}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    ) : item?.type === "autocomplete" ? (
                      <CustomAutocomplete
                        loading={isValidating}
                        key={item?.key}
                        label={item?.label}
                        options={item?.options}
                        isOptionEqualToValue={(option, value) =>
                          option?.value === value
                        }
                        onSearchTextChange={(e) =>
                          setSearchTitle(e?.target?.value)
                        }
                        value={
                          data?.data
                            ?.filter(
                              (i) => i?._id === formik?.values[item?.name]
                            )
                            ?.map((item) => {
                              return {
                                key: item?._id,
                                label: item?.title,
                                value: item?._id,
                              };
                            })?.[0] || {
                            key: " ",
                            label: " ",
                            value: " ",
                          }
                        }
                        error={Boolean(
                          formik?.touched[item?.name] &&
                            formik?.errors[item?.name]
                        )}
                        helperText={
                          formik?.touched[item?.name] &&
                          (formik?.errors[item?.name] as any)
                        }
                        onChange={(e, value) =>
                          formik?.setFieldValue(item?.name, value?.value)
                        }
                      />
                    ) : (
                      <InputField
                        type={item?.type as any}
                        variant="outlined"
                        className="rounded-md bg-gray-50 "
                        label={item?.label}
                        name={item?.name}
                        multiline={item?.multiline}
                        rows={item?.rows}
                        options={item?.options}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={formik?.values[item?.name]}
                        inputProps={
                          edit !== "true"
                            ? item?.name === "startTime"
                              ? {
                                  min: dayjs().format("YYYY-MM-DDThh:mm"),
                                }
                              : item?.name === "endTime"
                              ? {
                                  min: formik?.values?.startTime
                                    ? dayjs(formik?.values?.startTime).format(
                                        "YYYY-MM-DDThh:mm"
                                      )
                                    : dayjs().format("YYYY-MM-DDThh:mm"),
                                }
                              : {}
                            : undefined
                        }
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
                );
              })}
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button loading={loading} className="hover:ring-theme">
              Save & Create
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default TestExamCreate;
