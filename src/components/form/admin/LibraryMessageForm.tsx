import { Button, CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const messageSchema = [
  {
    key: "1",
    name: "subject",
    label: "Enter Subject",
    initialValue: "",
    validationSchema: Yup.string().required("Subject is required."),
    type: "text",
  },
  {
    key: "2",
    name: "message",
    label: "Enter Message",
    initialValue: "",
    validationSchema: Yup.string().required("Message is required."),
    type: "text",
    multiline: true,
    row: 5,
  },
];

const initialValues = messageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = messageSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue.validationSchema;
  return accumulator;
}, {} as any);

const LibraryMessageForm = ({ open, closeFn }: any) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      // toast.success("User updates successfully");
    },
  });

  return (
    <CustomDialog open={open} onClose={() => closeFn()}>
      <div className="w-full">
        <h3 className="font-medium tracking-wide text-xl text-theme p-4 border-b">
          Send Messages
        </h3>
        <form
          onSubmit={formik?.handleSubmit}
          className="flex flex-col gap-4 p-4"
        >
          {messageSchema?.map((item) => (
            <InputField
              key={item?.key}
              label={item?.label}
              name={item?.name}
              type={item?.type as any}
              error={Boolean(
                formik?.touched[item?.name] && formik?.errors[item?.name]
              )}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              helperText={
                formik?.touched[item?.name] &&
                (formik?.errors[item?.name] as any)
              }
              multiline={item?.multiline}
              rows={item?.row}
            />
          ))}
          <div className="w-full flex  justify-end mt-4">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </div>
    </CustomDialog>
  );
};

export default LibraryMessageForm;
