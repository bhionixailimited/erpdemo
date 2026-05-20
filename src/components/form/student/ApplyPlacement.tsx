import { FormControl, FormHelperText } from "@mui/material";
import { Button, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { notify } from "utils";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const placementSchema = [
  {
    key: "0",
    label: "Description",
    name: "description",
    initialValue: "",
    validationSchema: Yup.string().required("Required"),
    type: "text",
  },
  {
    key: "1",
    label: "Resume",
    name: "resume",
    initialValue: "",
    validationSchema: Yup.string().required("Required"),
    type: "file",
  },
];

const initialValues = placementSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {}
);
const validationSchema = placementSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  },
  {}
);

const ApplyPlacement = () => {
  const { mutate, loading } = useFetch();

  const { placementId } = useRouter().query;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let formData = new FormData();

        formData.append("description", values?.description);
        formData.append("resume", values?.resume);

        const response = await mutate({
          path: `placement/notice/${placementId}/apply`,
          method: "POST",
          body: formData,
          isFormData: true,
        });

        if (response?.status !== 200) throw new Error(response?.data);

        notify.success(response?.data?.message);
        formik.resetForm();
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Oops! Something went wrong. ");
        }
      }
    },
  });

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-4 rounded-lg shadow-xl ">
      <h3 className="font-medium tracking-wide w-full text-theme text-2xl pb-4 text-center">
        Apply for Placement
      </h3>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={formik?.handleSubmit}
      >
        <div className="w-full flex flex-col gap-4">
          <h3 className="font-medium tracking-wide text-base">Description*</h3>
          <FormControl className="!w-full">
            <ReactQuill
              theme="snow"
              value={formik?.values?.description}
              onChange={(value) => {
                formik?.setFieldValue("description", value);
              }}
              onBlur={() => {
                formik.setFieldTouched("description", true);
              }}
            />
            <FormHelperText className="!text-red-600">
              {formik?.touched?.description &&
                (formik?.errors?.description as any)}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="w-full flex flex-col gap-4">
          <h3 className="font-medium tracking-wide text-base">
            Upload Resume*
          </h3>
          <FormControl className="!w-full">
            <UploadFile
              url={
                formik?.values?.resume &&
                typeof formik?.values?.resume === "object" &&
                URL.createObjectURL(formik?.values?.resume)
              }
              onChange={(e: any) =>
                formik?.setFieldValue("resume", e?.target?.files?.[0] as any)
              }
            />
            <FormHelperText className="!text-red-600">
              {formik?.touched?.resume && (formik?.errors?.resume as any)}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="flex items-center justify-center">
          <Button loading={loading} type="submit">
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplyPlacement;
