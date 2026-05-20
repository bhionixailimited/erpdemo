import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Button, CustomDrawer, InputField } from "components/core";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const createTestSchema = [
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
    name: "name",
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
    key: "2",
    label: "Introduction",
    name: "introduction",
    type: "text",
    multiline: true,
    rows: 5,
    initialValue: "",
    validationSchema: Yup.string()
      .required("Exam introduction is required*")
      .min(3, "Exam introduction must be at least 10 characters"),
    className: "w-full col-span-2 rounded-md ",
    settingType: "BASIC",
  },

  {
    key: "1c",
    label: "Choose Course",
    initialValue: "",
    validationSchema: Yup.string().required("Course is required"),
    type: "select",
    name: "course",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    options: [
      {
        key: "1",
        label: "BTech",
        value: "btech",
      },
      {
        key: "2",
        label: "BSc",
        value: "bsc",
      },
    ],
    settingType: "BASIC",
  },
  {
    key: "1b",
    label: "Choose Session",
    initialValue: "",
    validationSchema: Yup.string().required("Session is required"),
    type: "select",
    name: "session",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    options: [
      {
        key: "1",
        label: "2021-2025",
        value: "2021",
      },
      {
        key: "2",
        label: "2020-2024",
        value: "2020",
      },
      {
        key: "3",
        label: "2019-2023",
        value: "2019",
      },
    ],
    settingType: "BASIC",
  },
  {
    key: "1a",
    label: "Choose Class",
    initialValue: "",
    validationSchema: Yup.string().required("Class is required"),
    type: "select",
    name: "class",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    options: [
      {
        key: "1",
        label: "Civil",
        value: "civil",
      },
      {
        key: "2",
        label: "Mechanical",
        value: "mechanical",
      },
      {
        key: "3",
        label: "Electrical",
        value: "electrical",
      },
    ],
    settingType: "BASIC",
  },
  {
    key: "3",
    label: "Choose Section",
    initialValue: "",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    validationSchema: Yup.string().required("Section is required"),
    type: "select",
    name: "section",
    options: [
      {
        key: "1",
        label: "Section A",
        value: "sectiona",
      },
      {
        key: "2",
        label: "Section B",
        value: "sectionb",
      },
    ],
    settingType: "BASIC",
  },
  {
    key: "5",
    label: "Choose Subject",
    initialValue: "",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    validationSchema: Yup.string().required("Subject is required"),
    type: "select",
    name: "subject",
    options: [
      {
        key: "1",
        label: "Mathematics",
        value: "math",
      },
      {
        key: "2",
        label: "Odia",
        value: "odia",
      },
    ],
    settingType: "BASIC",
  },
  {
    key: "2",
    label: "Test Mark",
    name: "Test",
    initialValue: "",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    validationSchema: Yup.number().required("Total mark is required"),
    type: "number",
    settingType: "BASIC",
  },

  {
    key: "6",
    label: "Start Time",
    initialValue: "",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    validationSchema: Yup.string(),
    type: "datetime-local",
    name: "startTime",
    settingType: "BASIC",
  },
  {
    key: "7",
    label: "End Time",
    initialValue: "",
    className: "w-full rounded-md ",
    validationSchema: Yup.string(),
    type: "datetime-local",
    name: "endTime",
    settingType: "BASIC",
  },
  {
    key: "8",
    label: "Pagination",
    initialValue: "",
    className: "w-full rounded-md ",
    validationSchema: Yup.string().when("examType", {
      is: "ONLINE",
      then: Yup.string().required("Pagination type is required."),
    }),
    type: "radio",
    name: "paginationType",
    settingType: "PAGINATION",
    options: [
      {
        key: "1",
        label: "Show all the test question on one page.",
        value: "showAll",
      },
      {
        key: "2",
        label: "Show one item per page.",
        value: "oneByOne",
      },
    ],
  },
  {
    key: "9",
    label: "Navigation Settings",
    initialValue: "",
    className: "w-full rounded-md ",
    validationSchema: Yup.string().when("examType", {
      is: "ONLINE",
      then: Yup.string().required("Navigation setting is required"),
    }),
    type: "radio",
    name: "navigationSetting",
    settingType: "PAGINATION",
    options: [
      {
        key: "1",
        label:
          "Allow the student to jump around to different questions in the test.",
        value: "noRestriction",
      },
      {
        key: "2",
        label:
          "Only allow the student to move forward after answering a question.",
        value: "restricted",
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
        value: "randomQuestion",
      },
      {
        key: "2",
        label: "Allow students to submit blank/empty answers.",
        value: "allowBlank",
      },
      {
        key: "3",
        label: "Penalize incorrect answers (negative marking).",
        value: "negativeMarking",
      },
    ],
  },
  {
    key: "11",
    label: "Negative marking",
    initialValue: "",
    className: "w-full rounded-md ",
    validationSchema: Yup.string(),
    type: "text",
    name: "negativeMark",
    settingType: "PAGINATION",
  },
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
  //       value: "score",
  //     },
  //     {
  //       key: "2",
  //       label: "Indicate if their response was correct or incorrect",
  //       value: "showAnswer",
  //     },
  //     {
  //       key: "3",
  //       label: "Display the correct answer ",
  //       value: "displayCorrect",
  //     },
  //     {
  //       key: "4",
  //       label: "Display  the explanation",
  //       value: "displayExplanation",
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
        value: "disableTranslate",
      },
      {
        key: "4",
        label: "Disable Autocomplete",
        value: "disableAutocomplete",
      },
      {
        key: "5",
        label: "Disable Spellcheck",
        value: "disableSpellcheck",
      },
      {
        key: "6",
        label: "Disable Printing",
        value: "disablePrinting",
      },
    ],
  },
];

const initialValues = createTestSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema: any = createTestSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const ScheduleExamDrawer = ({ open, closeFn }: any) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      formik.resetForm();
    },
  });

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
    <CustomDrawer
      open={open}
      onClose={() => closeFn()}
      maxWidth="md"
      anchor="right"
    >
      <div className="w-full">
        <h3 className="font-semibold tracking-wide text-xl text-theme border-b p-4 text-center">
          Edit Exam
        </h3>
        <form
          onSubmit={formik?.handleSubmit}
          className="flex flex-col gap-4 p-4 "
        >
          <div className="flex flex-col gap-4   ">
            <h3 className="font-semibold tracking-wide text-2xl text-theme border-b pb-2 ">
              Basic Settings
            </h3>

            <div className="   grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
              {createTestSchema?.map((item, index) => {
                if (item?.settingType === "BASIC") {
                  return (
                    <div key={index} className={item?.className}>
                      {item?.name === "introduction" ? (
                        <div className="flex flex-col gap-4">
                          <span className="flex flex-col gap-2">
                            <h3 className="font-medium tracking-wide text-gray-900 text-base  ">
                              Introduction*
                            </h3>

                            <p className="tracking-wide text-sm text-gray-600 font-medium">
                              This text will be displayed at the top op the
                              test. You can use it to write your instruction or
                              anything else.
                            </p>
                          </span>
                          <FormControl>
                            <ReactQuill
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
                        />
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4   ">
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
          <div className="flex flex-col gap-4   ">
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
          <div className="flex flex-col gap-4   ">
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
          <div className="w-full flex items-center justify-center">
            <Button type="submit" className="hover:ring-theme">
              Save & Update
            </Button>
          </div>
        </form>
      </div>
    </CustomDrawer>
  );
};

export default ScheduleExamDrawer;
