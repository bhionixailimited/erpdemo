import { CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const categorySchema = [
  {
    key: "1",
    name: "title",
    label: "Category Title",
    initialValue: "",
    validationSchema: Yup.string().required("Title is required*"),
    type: "text",
  },
  {
    key: "2",
    name: "description",
    label: "Description",
    initialValue: "",
    validationSchema: Yup.string(),
    type: "text",
    multiline: true,
    rows: 4,
  },
];

const initialValues = categorySchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = categorySchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue.validationSchema;
  return accumulator;
}, {} as any);

const CreateStockCategory = ({ open, closeFn }: any) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      // toast.success("User updates successfully");
    },
  });

  return (
    <CustomDialog open={open} onClose={closeFn} maxWidth="sm">
      <div className="w-full bg-white ">
        <h3 className="font-medium w-full p-4 text-center text-xl tracking-wide text-theme border-b">
          Create Category
        </h3>

        <div className="flex flex-col gap-4 p-4">
          {categorySchema?.map((item) => (
            <InputField
              key={item?.key}
              type={item?.type as any}
              name={item?.name}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              error={Boolean(
                formik?.touched[item?.name] && formik?.errors[item?.name]
              )}
              helperText={
                formik?.touched[item?.name] &&
                (formik?.errors[item?.name] as any)
              }
              multiline={item?.multiline}
              rows={item?.rows}
              label={item?.label}
            />
          ))}
          <div className="flex items-center justify-center">
            <button className="btn-primary !w-fit">Create Category</button>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default CreateStockCategory;
