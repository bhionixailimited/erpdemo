import { ICONS } from "assets";
import { Button, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { notify } from "utils";
import * as Yup from "yup";

const supportSchema = [
  {
    key: "1",
    name: "subject",
    initialValue: "",
    validationSchema: Yup.string().required("Subject is required in support"),
    label: "Subject",
    type: "text",
  },
  {
    key: "2",
    name: "description",
    initialValue: "",
    validationSchema: Yup.string().required(
      "Description is required in support"
    ),
    label: "Description",
    multiline: true,
    rows: 5,
    type: "text",
  },
];

const initialValues = supportSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = supportSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const CreateSupportForm = ({ reload }: { reload?: () => void }) => {
  const { loading, mutate } = useFetch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: "enquiry/create",
          method: "POST",
          body: JSON.stringify({
            subject: values?.subject?.trim(),
            message: values?.description.trim(),
          }),
        });

        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        formik.resetForm();
        reload?.();
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Oops, Something went wrong.");
        }
      }
    },
  });

  return (
    <div className="w-full ">
      <h3 className="font-semibold tracking-wide text-3xl border-b mb-4 text-theme py-4 ">
        Chat With Admin
      </h3>
      <form className="flex flex-col gap-2" onSubmit={formik?.handleSubmit}>
        {supportSchema?.map((item) => (
          <InputField
            key={item?.key}
            type={item?.type as any}
            fullWidth
            name={item?.name}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values[item?.name]}
            label={item?.label}
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
        <div className="w-full py-4 flex items-start justify-start">
          <Button
            type="submit"
            className="hover:ring-theme"
            startIcon={
              loading ? (
                <ICONS.Loading className="animate-spin !h-6 !w-6 !text-xl " />
              ) : (
                <></>
              )
            }
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSupportForm;
