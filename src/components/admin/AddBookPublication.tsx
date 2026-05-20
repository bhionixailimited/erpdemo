import { Button, CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  addNewItemTitle?: any;
  setAddNewItemTitle?: any;
};

const publicationSchema = [
  {
    key: "1",
    name: "name",
    label: "Publications's Name",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string().required("Publications's name is required."),
  },
  {
    key: "2",
    name: "bio",
    label: "Biography",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string(),
    multiline: true,
    rows: 4,
  },
];

const initialValues: { [key: string]: string } = publicationSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema: { [key: string]: Yup.StringSchema } =
  publicationSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });

const AddBookPublication = ({ addNewItemTitle, setAddNewItemTitle }: Props) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      // toast.success("User updates successfully");
    },
  });

  return (
    <CustomDialog
      open={addNewItemTitle === "publication"}
      onClose={() => setAddNewItemTitle("")}
      maxWidth="sm"
    >
      <h3 className="font-medium tracking-wide text-center text-2xl p-4 border-b text-theme">
        Add Publication
      </h3>

      <form
        onSubmit={formik?.handleSubmit}
        className="p-4 flex flex-col gap-4 "
      >
        {publicationSchema?.map((item) => (
          <InputField
            key={item?.key}
            name={item?.name}
            type={item?.type as any}
            label={item?.label}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            multiline={item?.multiline}
            rows={item?.rows}
            error={Boolean(
              formik?.touched[item?.name] && formik?.errors[item?.name]
            )}
            helperText={
              formik?.touched[item?.name] && (formik?.errors[item?.name] as any)
            }
          />
        ))}

        <div className="w-full flex items-center justify-center">
          <Button>Add Publication</Button>
        </div>
      </form>
    </CustomDialog>
  );
};

export default AddBookPublication;
