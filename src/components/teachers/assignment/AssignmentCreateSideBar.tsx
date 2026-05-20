import { InputField } from "components/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const assignmentSchema = [
  {
    key: "1",
    label: "Choose Class/Batch",
    initialValue: "",
    validationSchema: Yup.string().required("Class is required"),
    type: "select",
    name: "class",
    className: "w-full col-span-2 rounded-md h-12",
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
    className: "w-full col-span-2 rounded-md h-12",
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
  },
  {
    key: "5",
    label: "Choose Subject",
    initialValue: "",
    className: "w-full col-span-2 rounded-md h-12",
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
  },
  {
    key: "2",
    label: "Assignment Mark",
    name: "assignment",
    initialValue: "",
    className: "w-full col-span-2 rounded-md h-12",
    validationSchema: Yup.number().required("Class is required"),
    type: "number",
  },
  {
    key: "6",
    label: "Schedule Date",
    initialValue: "",
    className: "w-full col-span-2 rounded-md h-12",
    validationSchema: Yup.string(),
    type: "date",
    name: "startDate",
  },
  {
    key: "7",
    label: "Submission Date",
    initialValue: "",
    className: "w-full rounded-md h-12",
    validationSchema: Yup.string(),
    type: "date",
    name: "endDate",
  },
];
const AssignmentCreateSideBar = () => {
  const initialValues = assignmentSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const validationSchema = assignmentSchema?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {},
  });

  return (
    <div className=" w-full lg:border-l rounded-xl    gap-4 lg:shadow-xl bg-white lg:p-4 ">
      <h3 className="font-semibold tracking-wide col-span-2 text-xl text-theme  py-4">
        Create Options
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {assignmentSchema?.map((item) => (
          <InputField
            key={item?.name}
            type={item?.type as any}
            label={item?.label}
            className={item?.className}
            labelClass="text-sm font-medium tracking-wide "
            name={item?.name}
            variant="outlined"
            options={item?.options}
            value={formik?.values[item?.name]}
            error={Boolean(
              formik?.touched[item?.name] && formik?.errors[item?.name]
            )}
            helperText={
              formik?.touched[item?.name] ? `${formik?.errors[item?.name]}` : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AssignmentCreateSideBar;
