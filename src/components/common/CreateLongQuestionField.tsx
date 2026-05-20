import { Divider, FormControl, FormHelperText } from "@mui/material";
import { PhotoUpload } from "components/core";
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

const CreateLongQuestionField = ({
  onAdded,
}: {
  onAdded: (arg: any) => void;
}) => {
  const [option, setOption] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      onAdded(values);
      formik?.resetForm();
    },
  });

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={formik?.handleSubmit}
    >
      <div className="w-full">
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
      <div className="w-full flex items-center justify-end">
        <button className="btn-secondary" type="submit">
          Create Question
        </button>
      </div>
    </form>
  );
};

export default CreateLongQuestionField;
