import { Button, CustomAutocomplete, InputField } from "components/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const resultSchema = [
  {
    key: "1",
    label: "Choose a subject",
    name: "subject",
    validationSchema: Yup.string().required("Subject is required."),
    initialValue: "",
    type: "autocomplete",
    options: [
      {
        key: "1",
        label: "Mathematics",
        value: "math",
      },
      {
        key: "2",
        label: "Physics",
        value: "physics",
      },
    ],
  },
  {
    key: "2",
    label: "Choose Student",
    name: "student",
    validationSchema: Yup.string().required("Student is required."),
    initialValue: "",
    type: "autocomplete",
    options: [
      {
        key: "1",
        label: "John Doe",
        value: "math",
      },
      {
        key: "2",
        label: "Robert Hook",
        value: "physics",
      },
    ],
  },
  {
    key: "3",
    label: "Enter Mark",
    name: "mark",
    validationSchema: Yup.string().required("Mark is required."),
    initialValue: "",
    type: "number",
  },
  {
    key: "4",
    label: "Enter Grade",
    name: "grade",
    validationSchema: Yup.string().required("Grade is required."),
    initialValue: "",
    type: "text",
  },
];

const initialValues = resultSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = resultSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue.validationSchema;
  return accumulator;
}, {} as any);

const AddResultForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {},
  });

  return (
    <div className="w-full bg-white shadow-xl rounded-lg max-w-5xl mx-auto ">
      <h3 className="font-semibold tracking-wide p-4 text-theme border-b text-xl">
        Add Result
      </h3>
      <form onSubmit={formik?.handleSubmit} className="flex flex-col gap-4 p-4">
        {resultSchema?.map((item) => {
          if (item?.type === "autocomplete") {
            return (
              <CustomAutocomplete
                key={item?.key}
                label={item?.label}
                options={item?.options}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value
                }
                error={Boolean(
                  formik?.touched[item?.name] && formik?.errors[item?.name]
                )}
                helperText={
                  formik?.touched[item?.name] &&
                  (formik?.errors[item?.name] as any)
                }
                onChange={(e, value) => {
                  formik?.setFieldValue(item?.name, value?.value);
                }}
              />
            );
          } else {
            return (
              <InputField
                key={item?.key}
                type={item?.type as any}
                label={item?.label}
                name={item?.name}
                error={Boolean(
                  formik?.touched[item?.name] && formik?.errors[item?.name]
                )}
                helperText={
                  formik?.touched[item?.name] &&
                  (formik?.errors[item?.name] as any)
                }
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
              />
            );
          }
        })}
        <div className="flex items-center  justify-center">
          <Button type="submit">Add Mark</Button>
        </div>
      </form>
    </div>
  );
};

export default AddResultForm;
