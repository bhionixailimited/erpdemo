import { Checkbox, Divider, FormControl, FormHelperText } from "@mui/material";
import { InputField, PhotoUpload } from "components/core";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useState } from "react";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const questionSchema = [
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
    validationSchema: Yup.array().required("Options are required*"),
  },
  {
    key: "3",
    label: "Upload Image",
    name: "image",
    type: "file",
    initialValue: "",
    validationSchema: Yup.string().when(["question"], {
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
    validationSchema: Yup.string().required(
      "Answer is required for creating a question*."
    ),
  },
  {
    key: "5",
    label: "Mark",
    name: "markAwarded",
    type: "number",
    initialValue: "",
    validationSchema: Yup.number(),
  },
  {
    key: "6",
    label: "Explanation",
    name: "explanation",
    type: "textarea",
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

const CreateMCQField = ({ onAdded }: { onAdded: (arg: any) => void }) => {
  const [option, setOption] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      onAdded(values);
      formik?.resetForm();
      setOption("");
    },
  });

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={formik?.handleSubmit}
    >
      <div className="w-full flex flex-col gap-4">
        <FormControl fullWidth>
          <ReactQuill
            theme="snow"
            value={formik?.values?.question}
            onChange={(value) => {
              formik?.setFieldValue("question", value);
            }}
            onBlur={() => {
              formik.setFieldTouched("question", true);
            }}
          />
          <FormHelperText className="!text-red-600">
            {formik?.touched?.question && (formik?.errors?.question as any)}
          </FormHelperText>
        </FormControl>
        <InputField
          label="Points"
          type="number"
          variant="outlined"
          className="w-full"
          fullWidth
          placeholder="Mark awarded"
          name="markAwarded"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values?.markAwarded}
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
          name="explanation"
          value={formik?.values?.explanation}
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
            <span className="w-full flex items-center gap-2 p-2 " key={index}>
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
                type="button"
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
            error={Boolean(formik?.touched?.options && formik?.errors?.options)}
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
      <div className="w-full flex items-center justify-end">
        <button className="btn-secondary" type="submit">
          Add Question
        </button>
      </div>
    </form>
  );
};

export default CreateMCQField;
