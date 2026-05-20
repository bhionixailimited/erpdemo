import { FormControl, FormHelperText } from "@mui/material";
import { Button, InputField } from "components/core";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const createNoticeSchema = [
  {
    key: "1",
    label: "Title*",
    name: "title",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string()
      .required("Notice title is required*")
      .min(3, "title name must be at least 3 characters")
      .max(50, "title name must be at most 50 characters"),
    className: "w-full col-span-2  rounded-md",
  },
  {
    key: "2",
    label: "Description",
    name: "description",
    type: "text",
    multiline: true,
    rows: 5,
    initialValue: "",
    validationSchema: Yup.string()
      .required("Test description is required*")
      .min(3, "Test description must be at least 10 characters"),
    className: "w-full col-span-2 rounded-md ",
  },

  {
    key: "1",
    label: "Choose Class/Batch",
    initialValue: "",
    validationSchema: Yup.string(),
    type: "select",
    name: "class",
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
  },
  {
    key: "3",
    label: "Choose Section",
    initialValue: "",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    validationSchema: Yup.string(),
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
  },
  {
    key: "5",
    label: "Choose Type",
    initialValue: "",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    validationSchema: Yup.string(),
    type: "select",
    name: "type",
    options: [
      {
        key: "1",
        label: "Notification",
        value: "notification",
      },
      {
        key: "2",
        label: "Exam Notice",
        value: "exam",
      },
    ],
  },
  {
    key: "6",
    label: "Start Time",
    initialValue: "",
    className: "w-full col-span-2 lg:col-span-1 rounded-md ",
    validationSchema: Yup.string(),
    type: "datetime-local",
    name: "startTime",
  },
  {
    key: "7",
    label: "End Time",
    initialValue: "",
    className: "w-full rounded-md ",
    validationSchema: Yup.string(),
    type: "datetime-local",
    name: "endTime",
  },
];
const initialValues = createNoticeSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = createNoticeSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const CreateNoticeForm = () => {
  const handleCreate = () => {
    push(`/panel/teacher/exam`);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      formik.resetForm();
      handleCreate();
    },
  });

  const { push } = useRouter();

  return (
    <section className="w-full min-h-[90vh] bg-gray-50 ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-8 items-center w-full max-w-5xl mx-auto py-2 md:py-8 px-4 "
      >
        <div className="flex flex-col gap-4 bg-white p-4 shadow-xl w-full rounded-lg  ">
          <h3 className="font-semibold tracking-wide text-2xl text-theme border-b pb-2 ">
            Create Notice
          </h3>

          <div className=" grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
            {createNoticeSchema?.map((item, index) => (
              <div key={index} className={item?.className}>
                {item?.name === "description" ? (
                  <div className="flex flex-col gap-4">
                    <span className="flex flex-col gap-2">
                      <h3 className="font-medium tracking-wide text-gray-900 text-base  ">
                        Description*
                      </h3>
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
                      formik?.touched[item?.name] && formik?.errors[item?.name]
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
        </div>

        <div className="w-full flex items-center justify-center">
          <Button className="hover:ring-theme">Save & Create</Button>
        </div>
      </form>
    </section>
  );
};

export default CreateNoticeForm;
