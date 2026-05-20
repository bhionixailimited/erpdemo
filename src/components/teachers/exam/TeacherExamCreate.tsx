import { Checkbox, Divider } from "@mui/material";
import { Button, InputField, PhotoUpload } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import dynamic from "next/dynamic";
import { useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const questionSchema = [
  {
    key: "0",
    label: "QuestionType",
    name: "questionType",
    type: "select",
    initialValue: "MCQTYPE",
    validationSchema: Yup.string().required("Question type is required*"),
  },
  {
    key: "1",
    label: "Enter Question",
    name: "question",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string().min(
      10,
      "Question  must be at least 10 characters*"
    ),
  },
  {
    key: "2",
    label: "Options",
    name: "options",
    type: "text",
    initialValue: "",
    validationSchema: Yup.array().when("questionType", {
      is: "MCQTYPE",
      then: Yup.array().required("Options are required*"),
    }),
  },
  {
    key: "3",
    label: "Upload Image",
    name: "image",
    type: "file",
    initialValue: "",
    validationSchema: Yup.string().when("question", {
      is: (question: any) => {
        return !question;
      },
      then: Yup.string().required(
        "Type  or upload an image to create a question."
      ),
    }),
  },
  {
    key: "4",
    label: "Answer",
    name: "answer",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string().when("questionType", {
      is: "MCQTYPE",
      then: Yup.string().required(
        "Answer is required for creating a question*."
      ),
    }),
  },
  {
    key: "5",
    label: "Points",
    name: "markAwarded",
    type: "number",
    initialValue: "",
    validationSchema: Yup.number(),
  },
  {
    key: "6",
    label: "Explanation",
    name: "explanation",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string(),
  },
];

const initialValues = questionSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = questionSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);

type Props = {
  subjectExam?: string;
  reload?: () => void;
};

const TeacherExamCreate = ({ subjectExam, reload }: Props) => {
  const [option, setOption] = useState("");

  const { mutate, loading } = useFetch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        subjectExam && formData.append("subjectExam", subjectExam);

        values?.options &&
          values?.options?.forEach((item: string) => {
            formData.append("options", item);
          });

        values?.question && formData.append("question", values?.question);
        values?.answer && formData.append("answer", values?.answer);
        formData.append("type", values?.questionType);
        values?.markAwarded &&
          formData.append("markAwarded", values?.markAwarded);
        values?.explanation &&
          formData.append("explanation", values?.explanation);
        values?.image && formData.append("attachment", values?.image);

        const response = await mutate({
          path: `exam/question/add`,
          method: "POST",
          body: formData,
          isFormData: true,
        });

        if (response?.data?.error) throw new Error(response?.data?.error);

        notify.success(response?.data?.message);

        reload?.();
        formik?.resetForm();
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Oops! something went wrong.");
        }
      }
    },
  });

  return (
    <form
      onSubmit={formik?.handleSubmit}
      className="w-full bg-white shadow-xl p-4 rounded-lg "
    >
      <h3 className="font-medium tracking-wide text-theme border-b mb-4 text-lg pb-4 ">
        Create Question
      </h3>

      <InputField
        type="select"
        label="Type"
        value={formik?.values?.questionType}
        name="questionType"
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        error={Boolean(
          formik?.touched?.questionType && formik?.errors?.questionType
        )}
        helperText={
          formik?.touched?.questionType && formik?.errors?.questionType
            ? `${formik?.errors?.questionType}`
            : ""
        }
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
        ]}
      />

      {formik?.values?.questionType === "MCQTYPE" ? (
        <div className="flex flex-col gap-4 mt-4 w-full">
          <div className="w-full flex flex-col gap-4 ">
            <h3 className="font-medium tracking-wide text-gray-900 text-base  ">
              Question*
            </h3>
            <ReactQuill
              theme="snow"
              onChange={(value) => formik?.setFieldValue("question", value)}
              value={formik?.values?.question}
            />
            <InputField
              label="Points"
              value={formik?.values?.markAwarded}
              type="number"
              variant="outlined"
              className="w-full"
              fullWidth
              placeholder="Mark awarded"
              name="markAwarded"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              error={Boolean(
                formik?.touched?.markAwarded && formik?.errors?.markAwarded
              )}
              helperText={
                formik?.touched?.markAwarded && formik?.errors?.markAwarded
                  ? `${formik?.errors?.markAwarded}`
                  : ""
              }
            />
            <InputField
              label="Explanation"
              type="text"
              multiline
              rows={4}
              placeholder="Optional explanation..."
              value={formik?.values?.explanation}
              name="explanation"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              error={Boolean(
                formik?.touched?.explanation && formik?.errors?.explanation
              )}
              helperText={
                formik?.touched?.explanation && formik?.errors?.explanation
                  ? `${formik?.errors?.explanation}`
                  : ""
              }
            />
          </div>

          <div className="w-full flex gap-4 items-start flex-col ">
            <PhotoUpload
              className="!rounded-md w-full "
              onChange={(e: any) =>
                formik?.setFieldValue("image", e?.target?.files[0])
              }
            />
            <div className="w-full ">
              {formik?.values?.image && (
                <>
                  <img
                    src={
                      formik?.values?.image &&
                      typeof formik?.values?.image === "string"
                        ? formik?.values?.image
                        : URL.createObjectURL(formik?.values?.image)
                    }
                    alt="Question"
                    className="h-full w-full object-contain border-2 "
                  />
                  <div className="flex w-full flex-row gap-4 justify-between pt-4 ">
                    <small className="w-full text-left text-blue-500 font-medium">
                      Please choose a image of appropriate size and clear
                      visibility.
                    </small>
                    <button
                      className="btn-secondary !h-8 !bg-gradient-to-r !from-red-500 !to-red-600 hover:!from-red-600 hover:!to-red-600 hover:!ring-red-500 !py-0 !px-2 !text-sm "
                      type="button"
                      onClick={() => {
                        formik?.setFieldValue("image", "");
                        formik?.setFieldTouched("image", false);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {formik?.touched?.image && formik?.errors?.image && (
            <small className="text-red-600 text-xs tracking-wide">
              {formik?.errors?.image as any}
            </small>
          )}

          <Divider />

          <div className="w-full grid grid-cols-1 xl:grid-cols-2 items-center  ">
            {Array?.isArray(formik?.values?.options) &&
              formik?.values?.options?.map((item: string, index: number) => (
                <span
                  className="w-full flex items-center gap-2 p-2 "
                  key={index}
                >
                  <Checkbox
                    checked={Boolean(item === formik?.values?.answer)}
                    sx={{
                      color: "GrayText",
                      "&.Mui-checked": {
                        color: "#00FF00 !important",
                        padding: 0,
                      },
                      "&.MuiCheckbox-root": {
                        padding: 0,
                        color: "#dadada",
                      },
                      "& .MuiSvgIcon-root": { fontSize: 34 },
                    }}
                    onClick={() => formik?.setFieldValue("answer", item)}
                  />
                  <InputField
                    type="text"
                    variant="outlined"
                    className="!h-9"
                    placeholder="Options..."
                    value={item}
                    inputProps={{
                      readonly: true,
                    }}
                  />
                  <button
                    className="btn-secondary hover:bg-gradient-to-r hover:!from-red-600 hover:!to-red-600  !bg-red-500   hover:!ring-red-500 !min-w-[6rem] !py-2 !px-1 !text-sm "
                    onClick={() => {
                      formik?.setFieldValue(
                        "options",
                        Array.from(
                          new Set(
                            formik?.values?.options?.filter(
                              (inner: string) => inner !== item
                            )
                          )
                        )
                      );
                    }}
                  >
                    Remove
                  </button>
                </span>
              ))}
            <span className="w-full  flex items-start gap-2 p-2 ">
              <Checkbox
                sx={{
                  color: "GrayText",
                  "&.Mui-checked": {
                    color: "#00FF00 !important",
                    padding: 0,
                  },
                  "&.MuiCheckbox-root": {
                    padding: 0,
                    color: "#dadada",
                  },
                  "& .MuiSvgIcon-root": { fontSize: 34 },
                }}
              />
              <InputField
                type="text"
                variant="outlined"
                className="!h-9"
                placeholder="Options..."
                value={option}
                name="options"
                onChange={(e) => {
                  setOption(e?.target?.value);
                }}
                error={Boolean(
                  formik?.touched?.options && formik?.errors?.options
                )}
                helperText={
                  formik?.touched?.options && formik?.errors?.options
                    ? `${formik?.errors?.options}`
                    : ""
                }
              />
              <button
                className="btn-secondary !py-2 !px-1 !text-sm !min-w-[6rem] "
                onClick={() => {
                  formik?.setFieldValue(
                    "options",
                    Array.from(new Set([...formik?.values?.options, option]))
                  );
                  setOption("");
                }}
                type="button"
              >
                Add
              </button>
            </span>
          </div>
          {formik?.touched?.answer && formik?.errors?.answer && (
            <small className="text-red-600 text-xs tracking-wide">
              {formik?.errors?.answer as any} Please select one option to be the
              answer.
            </small>
          )}
          <Divider />
          <div className="w-full flex items-center justify-center">
            <button className="btn-secondary" type="submit">
              Add Question
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-8 w-full">
          <h3 className="font-medium tracking-wide text-gray-900 text-base  ">
            Question*
          </h3>
          <ReactQuill
            theme="snow"
            onChange={(value) => formik?.setFieldValue("question", value)}
            value={formik?.values?.question}
          />

          <InputField
            label="Points"
            value={formik?.values?.markAwarded}
            type="number"
            variant="outlined"
            className="w-full"
            fullWidth
            placeholder="Mark awarded"
            name="markAwarded"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={Boolean(
              formik?.touched?.markAwarded && formik?.errors?.markAwarded
            )}
            helperText={
              formik?.touched?.markAwarded && formik?.errors?.markAwarded
                ? `${formik?.errors?.markAwarded}`
                : ""
            }
          />
          <div className="w-full flex gap-4 items-start flex-col ">
            <PhotoUpload
              className="!rounded-md w-full "
              onChange={(e: any) =>
                formik?.setFieldValue("image", e?.target?.files[0])
              }
            />
            <div className="w-full ">
              {formik?.values?.image && (
                <>
                  <img
                    src={
                      formik?.values?.image &&
                      typeof formik?.values?.image === "string"
                        ? formik?.values?.image
                        : URL.createObjectURL(formik?.values?.image)
                    }
                    alt="Question"
                    className="h-full w-full object-contain border-2 "
                  />
                  <div className="flex w-full flex-row gap-4 justify-between pt-4 ">
                    <small className="w-full text-left text-blue-500 font-medium">
                      Please choose a image of appropriate size and clear
                      visibility.
                    </small>
                    <button
                      className="btn-secondary !h-8 !bg-gradient-to-r !from-red-500 !to-red-600 hover:!from-red-600 hover:!to-red-600 hover:!ring-red-500 !py-0 !px-2 !text-sm "
                      type="button"
                      onClick={() => {
                        formik?.setFieldValue("image", "");
                        formik?.setFieldTouched("image", false);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {formik?.touched?.image && formik?.errors?.image && (
            <small className="text-red-600 text-xs tracking-wide">
              {formik?.errors?.image as any}
            </small>
          )}
          <InputField
            label="Explanation"
            type="text"
            multiline
            rows={4}
            placeholder="Optional explanation..."
            value={formik?.values?.explanation}
            name="explanation"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={Boolean(
              formik?.touched?.explanation && formik?.errors?.explanation
            )}
            helperText={
              formik?.touched?.explanation && formik?.errors?.explanation
                ? `${formik?.errors?.explanation}`
                : ""
            }
          />
          <div className="w-full flex items-center justify-center">
            <Button
              loading={loading}
              disabled={loading}
              className="btn-secondary"
              type="submit"
            >
              Add Question
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default TeacherExamCreate;
