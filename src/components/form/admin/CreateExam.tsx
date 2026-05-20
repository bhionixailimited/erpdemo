import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { AdminAutocomplete, Button, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import BatchType from "types/batch";
import { useDeferredValue, useMemo, useState } from "react";
import * as Yup from "yup";
import { getHoursAndMinutes, handleMyBatch, notify } from "utils";
import ExamType from "types/exam";
import dayjs from "dayjs";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
type batchType = {
  data: BatchType[];
};
type examType = {
  data: ExamType;
};
const CreateExam = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const { edit, examId } = useRouter().query;
  const {
    data: exam,
    mutate: examMutate,
    isValidating,
  } = useSWRFetch<examType>(examId && `exam/${examId}`);
  const { mutate } = useFetch();
  const { data: batch } = useSWRFetch<batchType>(
    `batch?course=true&branch=true&session=true&perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );

  const valueSet = [
    "randomizeQuestionOrder",
    "allowBlankSubmit",
    "negativeMarking",
  ];
  const BrowserFunctionality = [
    "disableRightClick",
    "disableCopyPaste",
    "disableDisplayTranslate",
    "disableAutocomplete",
    "disableSpellcheck",
    "disablePrinting",
  ];
  const TestEnd = [
    "showExamScoreAfterEnd",
    "showExamResponseAfterEnd",
    "showExamCorrectAnswerAfterEnd",
    "showExamExplanationAfterEnd",
  ];
  const createTestSchema = useMemo(() => {
    return [
      {
        key: "0",
        label: "Exam Type*",
        name: "examType",
        type: "select",
        initialValue: "",
        validationSchema: Yup.string().required("Exam type is required*"),
        className: "w-full col-span-2  rounded-md",
        settingType: "BASIC",
        options: [
          {
            key: "1",
            label: "Online",
            value: "ONLINE",
          },
          {
            key: "2",
            label: "Offline",
            value: "OFFLINE",
          },
        ],
      },
      {
        key: "1",
        label: "Exam Name*",
        name: "title",
        type: "text",
        initialValue: "",
        validationSchema: Yup.string()
          .required("Exam name is required*")
          .min(3, "Exam name must be at least 3 characters")
          .max(50, "Exam name must be at most 50 characters"),
        className: "w-full col-span-2  rounded-md",
        settingType: "BASIC",
      },
      {
        key: "1k",
        label: "Description",
        name: "description",
        type: "text",
        initialValue: "",
        validationSchema: Yup.string(),
        multiline: true,
        rows: 5,
        className: "w-full col-span-2  rounded-md",
        settingType: "BASIC",
      },
      // {
      //   key: "1c",
      //   label: "Choose Course",
      //   initialValue: "",
      //   validationSchema: Yup.string().required("Course is required"),
      //   type: "select",
      //   name: "course",
      //   className: "w-full col-span-2 lg:col-span-1 rounded-md ",
      //   options: [
      //     {
      //       key: "1",
      //       label: "BTech",
      //       value: "btech",
      //     },
      //     {
      //       key: "2",
      //       label: "BSc",
      //       value: "bsc",
      //     },
      //   ],
      //   settingType: "BASIC",
      // },
      // {
      //   key: "1b",
      //   label: "Choose Session",
      //   initialValue: "",
      //   validationSchema: Yup.string().required("Session is required"),
      //   type: "select",
      //   name: "session",
      //   className: "w-full col-span-2 lg:col-span-1 rounded-md ",
      //   options: [
      //     {
      //       key: "1",
      //       label: "2021-2025",
      //       value: "2021",
      //     },
      //     {
      //       key: "2",
      //       label: "2020-2024",
      //       value: "2020",
      //     },
      //     {
      //       key: "3",
      //       label: "2019-2023",
      //       value: "2019",
      //     },
      //   ],
      //   settingType: "BASIC",
      // },
      // {
      //   key: "1a",
      //   label: "Choose Class",
      //   initialValue: "",
      //   validationSchema: Yup.string().required("Class is required"),
      //   type: "select",
      //   name: "class",
      //   className: "w-full col-span-2 lg:col-span-1 rounded-md ",
      //   options: [
      //     {
      //       key: "1",
      //       label: "Civil",
      //       value: "civil",
      //     },
      //     {
      //       key: "2",
      //       label: "Mechanical",
      //       value: "mechanical",
      //     },
      //     {
      //       key: "3",
      //       label: "Electrical",
      //       value: "electrical",
      //     },
      //   ],
      //   settingType: "BASIC",
      // },
      // {
      //   key: "3",
      //   label: "Choose Section",
      //   initialValue: "",
      //   className: "w-full col-span-2 lg:col-span-1 rounded-md ",
      //   validationSchema: Yup.string().required("Section is required"),
      //   type: "select",
      //   name: "section",
      //   options: [
      //     {
      //       key: "1",
      //       label: "Section A",
      //       value: "sectiona",
      //     },
      //     {
      //       key: "2",
      //       label: "Section B",
      //       value: "sectionb",
      //     },
      //   ],
      //   settingType: "BASIC",
      // },
      {
        key: "2",
        name: "batch",
        label: "Batch *",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        initialValue: { key: "", lable: "", value: "" },
        type: "autocomplete",
        options: batch?.data?.map((data: any) => ({
          label: `${data?.course?.title} ${data?.branch?.title} (${data?.session?.title})`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
        settingType: "BASIC",
        validationSchema: Yup.string().required("Batch is required"),
      },
      {
        key: "6",
        label: "Start Date*",
        initialValue: "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.string().required("Start date is required"),
        type: "datetime-local",
        name: "startDate",
        settingType: "BASIC",
      },
      {
        key: "7",
        label: "End Date*",
        initialValue: "",
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
        validationSchema: Yup.string().required("End date is required"),
        type: "datetime-local",
        name: "endDate",
        settingType: "BASIC",
      },
      // {
      //   key: "8",
      //   label: "Pagination",
      //   initialValue: false,
      //   className: "w-full rounded-md ",
      //   validationSchema: Yup.string().when("examType", {
      //     is: "ONLINE",
      //     then: Yup.string().required("Pagination type is required."),
      //   }),
      //   type: "radio",
      //   name: "showOneItemPerPage",
      //   settingType: "PAGINATION",
      //   options: [
      //     {
      //       key: "1",
      //       label: "Show all the test question on one page.",
      //       value: "false",
      //     },
      //     {
      //       key: "2",
      //       label: "Show one item per page.",
      //       value: "true",
      //     },
      //   ],
      // },
      {
        key: "9",
        label: "Navigation Settings",
        initialValue: false,
        className: "w-full rounded-md ",
        validationSchema: Yup.string().when("examType", {
          is: "ONLINE",
          then: Yup.string().required("Navigation setting is required"),
        }),
        type: "radio",
        name: "allowStudentToMoveFreely",
        settingType: "PAGINATION",
        options: [
          {
            key: "1",
            label:
              "Allow the student to jump around to different questions in the test.",
            value: "true",
          },
          {
            key: "2",
            label:
              "Only allow the student to move forward after answering a question.",
            value: "false",
          },
        ],
      },
      {
        key: "10",
        label: "Other Settings",
        initialValue: "",
        className: "w-full rounded-md ",
        validationSchema: Yup.array(),
        type: "checkbox",
        name: "otherSettings",
        settingType: "PAGINATION",
        options: [
          {
            key: "1",
            label: "Randomize the order of the questions during the test.",
            value: "randomizeQuestionOrder",
          },
          {
            key: "2",
            label: "Allow students to submit blank/empty answers.",
            value: "allowBlankSubmit",
          },
          // {
          //   key: "3",
          //   label: "Penalize incorrect answers (negative marking).",
          //   value: "negativeMarking",
          // },
        ],
      },
      // {
      //   key: "11",
      //   label: "Negative mark",
      //   initialValue: "",
      //   className: "w-full rounded-md ",
      //   validationSchema: Yup.string(),
      //   type: "text",
      //   name: "negativeMark",
      //   settingType: "PAGINATION",
      // },
      {
        key: "12",
        label: "Conclusion Text",
        initialValue: "",
        className: "w-full rounded-md ",
        validationSchema: Yup.string().when("examType", {
          is: "ONLINE",
          then: Yup.string().required("Message after test end is required."),
        }),
        type: "text",
        name: "conclusionText",
        settingType: "REVIEW",
      },
      // {
      //   key: "13",
      //   label: "At the End of the test, display user's",
      //   initialValue: "",
      //   className: "w-full rounded-md ",
      //   validationSchema: Yup.array(),
      //   type: "checkbox",
      //   name: "testEnd",
      //   settingType: "REVIEW",
      //   options: [
      //     {
      //       key: "1",
      //       label: "Score",
      //       value: "showExamScoreAfterEnd",
      //     },
      //     {
      //       key: "2",
      //       label: "Indicate if their response was correct or incorrect",
      //       value: "showExamResponseAfterEnd",
      //     },
      //     {
      //       key: "3",
      //       label: "Display the correct answer ",
      //       value: "showExamCorrectAnswerAfterEnd",
      //     },
      //     {
      //       key: "4",
      //       label: "Display  the explanation",
      //       value: "showExamExplanationAfterEnd",
      //     },
      //   ],
      // },
      {
        key: "14",
        label: "Browser Functionality",
        initialValue: "",
        className: "w-full rounded-md ",
        validationSchema: Yup.array(),
        type: "checkbox",
        name: "browserFunctionality",
        settingType: "FUNCTIONALITY",
        options: [
          {
            key: "1",
            label: "Disable right-click context menu",
            value: "disableRightClick",
          },
          {
            key: "2",
            label: "Disable copy/paste",
            value: "disableCopyPaste",
          },
          {
            key: "3",
            label: "Display translate",
            value: "disableDisplayTranslate",
          },
          {
            key: "4",
            label: "Disable Autocomplete",
            value: "disableAutocomplete",
          },
          {
            key: "5",
            label: "Disable Spellcheck",
            value: "disableSpellCheck",
          },
          {
            key: "6",
            label: "Disable Printing",
            value: "disablePrinting",
          },
        ],
      },
    ];
  }, [batch?.data]);
  const initialValues = createTestSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const validationSchema = createTestSchema?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const handleCreate = () => {
    push(`/panel/admin/exam`);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      ...exam?.data,
      batch: exam?.data?.batch?._id || "",
      examType: exam?.data?.type,
      // startDate: exam?.data?.startDate.split("T")[0],
      // endDate: exam?.data?.endDate.split("T")[0],
      startDate:
        exam?.data?.startDate &&
        exam?.data?.startDate?.split("T")[0] +
          "T" +
          getHoursAndMinutes(new Date(exam?.data?.startDate)),
      endDate:
        exam?.data?.endDate &&
        exam?.data?.endDate?.split("T")[0] +
          "T" +
          getHoursAndMinutes(new Date(exam?.data?.endDate)),
      otherSettings: [
        exam?.data?.allowBlankSubmit && "allowBlankSubmit",
        exam?.data?.randomizeQuestionOrder && "randomizeQuestionOrder",
        exam?.data?.negativeMarking && "negativeMarking",
      ],
      browserFunctionality: [
        exam?.data?.disablePrinting && "disablePrinting",
        exam?.data?.disableDisplayTranslate && "disableDisplayTranslate",
        exam?.data?.disableCopyPaste && "disableCopyPaste",
        exam?.data?.disableRightClick && "disableRightClick",
        exam?.data?.disableSpellCheck && "disableSpellCheck",
        exam?.data?.disableAutocomplete && "disableAutocomplete",
      ],
      testEnd: [
        exam?.data?.showExamScoreAfterEnd && "showExamScoreAfterEnd",
        exam?.data?.showExamResponseAfterEnd && "showExamResponseAfterEnd",
        exam?.data?.showExamCorrectAnswerAfterEnd &&
          "showExamCorrectAnswerAfterEnd",
        exam?.data?.showExamExplanationAfterEnd &&
          "showExamExplanationAfterEnd",
      ],
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("title", values?.title);
      formdata.append("type", values?.examType);
      formdata.append("description", values?.description);
      formdata.append("batch", values?.batch);

      formdata.append("startDate", new Date(values?.startDate).toISOString());
      formdata.append("endDate", new Date(values?.endDate).toISOString());
      if (values?.examType === "ONLINE") {
        // formdata.append("showOneItemPerPage", values?.showOneItemPerPage);
        formdata.append(
          "allowStudentToMoveFreely",
          values?.allowStudentToMoveFreely
        );
        formik.values?.otherSettings &&
          valueSet?.map((item: string) =>
            formdata.append(item, formik.values?.otherSettings.includes(item))
          );
        formik.values.browserFunctionality &&
          BrowserFunctionality?.map((item: string) =>
            formdata.append(
              item,
              formik.values?.browserFunctionality.includes(item)
            )
          );
        values?.negativeMarking &&
          formdata.append("negativeMark", values?.negativeMark || 0);
        values.conclusionText &&
          formdata.append("conclusionText", values?.conclusionText);
        formik.values.testEnd &&
          TestEnd?.map((item: string) =>
            formdata.append(item, formik.values?.testEnd.includes(item))
          );
      }
      try {
        const response = await mutate({
          path: edit ? `exam/${examId}` : `exam/create`,
          method: edit ? "PUT" : "POST",
          body: formdata,
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }

        notify.success(response?.data?.message);
        examMutate();
        formik?.resetForm();
        examId
          ? push(`/panel/admin/exam/schedule/${examId}`)
          : push(`/panel/admin/exam/schedule`);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { push } = useRouter();

  const handleCheckboxSelect = (name: string, value: string) => {
    try {
      if (formik?.values[name]?.includes(value)) {
        formik.setFieldValue(
          name,
          formik?.values[name].filter((item: string) => item !== value)
        );
      } else if (formik?.values[name]?.length > 0) {
        formik?.setFieldValue(
          name,
          Array.from(
            new Set([
              ...formik?.values[name]?.map((item: string) => item),
              value,
            ])
          )
        );
      } else {
        formik?.setFieldValue(name, [value]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full min-h-[90vh] bg-gray-50 ">
      {edit && examId && isValidating ? (
        <div className="flex flex-col gap-4 max-w-5xl mx-auto py-8 px-4 bg-white shadow-xl">
          <Skeleton variant="text" height={30} width={100} animation="wave" />
          <Skeleton variant="text" width={100} animation="wave" />
          <Skeleton variant="text" width={400} animation="wave" />
          <Skeleton variant="rounded" height={300} animation="wave" />
          <div className="grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
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
              Basic Settings
            </h3>

            <div className="   grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
              {createTestSchema?.map((item, index) => {
                if (item?.settingType === "BASIC") {
                  return (
                    <div key={index} className={item?.className}>
                      {item?.type === "autocomplete" ? (
                        <AdminAutocomplete
                          onSearchTextChange={(e) =>
                            setSearchTitle(e.target.value)
                          }
                          className="!text-black !mb-2 "
                          textClassName="!bg-gray-50"
                          size={"medium"}
                          loading={isValidating}
                          label={item?.label}
                          isOptionEqualToValue={(option, value) =>
                            option?.value === value?.value
                          }
                          onChange={(e, value) =>
                            formik?.setFieldValue("batch", value?.value)
                          }
                          error={Boolean(
                            formik?.touched[item?.name] &&
                              formik?.errors[item?.name]
                          )}
                          helperText={
                            formik?.touched[item?.name] &&
                            (formik?.errors[item?.name] as any)
                          }
                          value={
                            item?.name === "batch" &&
                            edit &&
                            formik.values?.batch &&
                            handleMyBatch(
                              batch?.data?.find(
                                (value: any) =>
                                  value?._id === formik.values?.batch
                              ),
                              "key",
                              "label",
                              "value"
                            )
                          }
                          noOptionText={
                            <div className="w-full flex flex-col gap-2">
                              <small className="tracking-wide">
                                No options found
                              </small>
                              {/* <div
                                className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                                onClick={() =>
                                  router.push("/panel/admin/batch/create")
                                }
                              >
                                Add New {item?.label.slice(0, -1)}
                              </div> */}
                            </div>
                          }
                          options={item?.options}
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
                          error={Boolean(
                            formik?.touched[item?.name] &&
                              formik?.errors[item?.name]
                          )}
                          helperText={
                            formik?.touched[item?.name] &&
                            (formik?.errors[item?.name] as any)
                          }
                          inputProps={
                            edit !== "true"
                              ? item?.name === "startDate"
                                ? {
                                    min: dayjs().format("YYYY-MM-DDThh:mm"),
                                  }
                                : item?.name === "endDate"
                                ? {
                                    min: formik?.values?.startDate
                                      ? dayjs(formik?.values?.startDate).format(
                                          "YYYY-MM-DDThh:mm"
                                        )
                                      : dayjs().format("YYYY-MM-DDThh:mm"),
                                  }
                                : {}
                              : undefined
                          }
                        />
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {formik?.values?.examType === "ONLINE" && (
            <>
              <div className="flex flex-col gap-4 bg-white p-4 shadow-xl w-full rounded-lg  ">
                <h3 className="font-semibold tracking-wide text-2xl text-theme border-b pb-2 ">
                  Question Settings
                </h3>

                <div className="   grid grid-cols-1 gap-4 md:gap-8 h-fit w-full  ">
                  {createTestSchema?.map((item, index) => {
                    if (item?.settingType === "PAGINATION") {
                      return (
                        <div
                          key={index}
                          className={item?.className + "flex flex-col gap-4"}
                        >
                          {item?.type === "radio" ? (
                            <>
                              <h3 className="font-medium tracking-wide text-lg">
                                {item?.label}
                              </h3>
                              <FormControl>
                                <RadioGroup value={formik?.values[item?.name]}>
                                  {item?.options?.map((option, index) => (
                                    <FormControlLabel
                                      name={item?.name}
                                      onChange={formik?.handleChange}
                                      onBlur={formik?.handleBlur}
                                      value={option?.value}
                                      key={option?.key}
                                      control={<Radio />}
                                      label={option?.label}
                                    />
                                  ))}
                                </RadioGroup>
                                <FormHelperText className="!text-red-500">
                                  {formik?.touched[item?.name] &&
                                    (formik?.errors[item?.name] as any)}
                                </FormHelperText>
                              </FormControl>
                            </>
                          ) : item?.type === "text" ? (
                            <InputField
                              type="number"
                              label={item?.label}
                              name={item?.name}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                              value={formik?.values[item?.name]}
                              placeholder="Negative marking for each wrong answer.."
                              error={Boolean(
                                formik?.touched[item?.name] &&
                                  formik?.errors[item?.name]
                              )}
                              helperText={
                                formik?.touched[item?.name] &&
                                (formik?.errors[item?.name] as any)
                              }
                            />
                          ) : (
                            <div className="flex flex-col gap-4">
                              <h3 className="font-medium tracking-wide text-base">
                                {item?.label}
                              </h3>
                              <FormGroup>
                                {item?.options?.map((option) => (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={formik?.values[
                                          item?.name
                                        ]?.includes(option?.value)}
                                        onClick={() => {
                                          handleCheckboxSelect(
                                            item?.name,
                                            option?.value
                                          );
                                        }}
                                      />
                                    }
                                    label={option?.label}
                                    key={option?.value}
                                  />
                                ))}
                                <FormHelperText className="!text-red-500">
                                  {formik?.touched[item?.name] &&
                                    (formik?.errors[item?.name] as any)}
                                </FormHelperText>
                              </FormGroup>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-white p-4 shadow-xl w-full rounded-lg  ">
                <h3 className="font-semibold tracking-wide text-2xl text-theme border-b pb-2 ">
                  Browser Functionality
                </h3>

                <div className="   grid grid-cols-1 gap-4 md:gap-8 h-fit w-full  ">
                  {createTestSchema?.map((item, index) => {
                    if (item?.settingType === "FUNCTIONALITY") {
                      return (
                        <div
                          key={index}
                          className={item?.className + "flex flex-col gap-4"}
                        >
                          {item?.type === "checkbox" && (
                            <div className="flex flex-col gap-4">
                              <h3 className="font-medium tracking-wide text-base">
                                {item?.label}
                              </h3>
                              <FormGroup>
                                {item?.options?.map((option) => (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={formik?.values[
                                          item?.name
                                        ]?.includes(option?.value)}
                                        onClick={() => {
                                          handleCheckboxSelect(
                                            item?.name,
                                            option?.value
                                          );
                                        }}
                                      />
                                    }
                                    label={option?.label}
                                    key={option?.value}
                                  />
                                ))}
                                <FormHelperText className="!text-red-500">
                                  {formik?.touched[item?.name] &&
                                    (formik?.errors[item?.name] as any)}
                                </FormHelperText>
                              </FormGroup>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-white p-4 shadow-xl w-full rounded-lg  ">
                <h3 className="font-semibold tracking-wide text-2xl text-theme border-b pb-2 ">
                  Review Settings
                </h3>

                <div className="   grid grid-cols-1 gap-4 md:gap-8 h-fit w-full  ">
                  {createTestSchema?.map((item, index) => {
                    if (item?.settingType === "REVIEW") {
                      return (
                        <div
                          key={index}
                          className={item?.className + "flex flex-col gap-4"}
                        >
                          {item?.type === "radio" ? (
                            <>
                              <h3 className="font-medium tracking-wide text-lg">
                                {item?.label}
                              </h3>
                              <FormControl>
                                <RadioGroup value={formik?.values[item?.name]}>
                                  {item?.options?.map((option, index) => (
                                    <FormControlLabel
                                      value={option?.value}
                                      key={option?.key}
                                      control={<Radio />}
                                      label={option?.label}
                                    />
                                  ))}
                                </RadioGroup>
                                <FormHelperText className="!text-red-500">
                                  {formik?.touched[item?.name] &&
                                    (formik?.errors[item?.name] as any)}
                                </FormHelperText>
                              </FormControl>
                            </>
                          ) : item?.type === "text" ? (
                            <InputField
                              type="text"
                              label={item?.label}
                              name={item?.name}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                              value={formik?.values[item?.name]}
                              placeholder="Enter something user will view when exam finishes..."
                              error={Boolean(
                                formik?.touched[item?.name] &&
                                  formik?.errors[item?.name]
                              )}
                              helperText={
                                formik?.touched[item?.name] &&
                                (formik?.errors[item?.name] as any)
                              }
                            />
                          ) : (
                            <div className="flex flex-col gap-4">
                              <h3 className="font-medium tracking-wide text-base">
                                {item?.label}
                              </h3>
                              <FormGroup>
                                {item?.options?.map((option) => (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={formik?.values[
                                          item?.name
                                        ]?.includes(option?.value)}
                                        onClick={(e) => {
                                          handleCheckboxSelect(
                                            item?.name,
                                            option?.value
                                          );
                                        }}
                                      />
                                    }
                                    label={option?.label}
                                    key={option?.value}
                                  />
                                ))}
                                <FormHelperText className="!text-red-500">
                                  {formik?.touched[item?.name] &&
                                    (formik?.errors[item?.name] as any)}
                                </FormHelperText>
                              </FormGroup>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          )}

          <div className="w-full flex items-center justify-center">
            <Button className="hover:ring-theme" loading={formik.isSubmitting}>
              Save & Create
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default CreateExam;
