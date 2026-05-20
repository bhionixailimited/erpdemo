import { CloudUpload, PictureAsPdf } from "@mui/icons-material";
import { Button, InputField, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
const materialFormSchema = [
  {
    key: "1",
    name: "title",
    type: "text",
    initialValue: "",
    label: "Title",
    validationSchema: Yup.string().required("Title is required*"),
  },
  {
    key: "2",
    name: "type",
    type: "select",
    initialValue: "",
    label: "Select Type",
    options: [
      {
        key: "1",
        label: "PDF",
        value: "PDF",
      },
      {
        key: "2",
        label: "Word",
        value: "WORD",
      },
      {
        key: "3",
        label: "Link",
        value: "LINK",
      },
    ],
    validationSchema: Yup.string(),
  },
  {
    key: "3",
    type: "text",
    name: "link",
    initialValue: "",
    label: "Video Link",
    validationSchema: Yup.string(),
  },
  {
    key: "4",
    type: "file",
    name: "file",
    initialValue: "",
    label: "Upload File",
    validationSchema: Yup.string(),
  },
];

const initialValues = materialFormSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = materialFormSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const CreateMaterialForm = () => {
  const { batchId } = useRouter()?.query;
  const { mutate: material } = useFetch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await material({
          path: `batch/${batchId}/material-create`,
          method: "POST",
          body: autoAddFormdata(values),
          isFormData: true,
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        formik?.resetForm();
        notify.success(response?.data?.message);
      } catch (err) {
        if (err instanceof Error) {
          notify.error(err?.message);
        } else {
          notify.error("Oops! Something went wrong ");
        }
      }
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik?.handleSubmit} className="w-full  ">
        <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 ">
          <h3 className="font-medium tracking-wide text-2xl border-b mb-4 text-theme p-4 ">
            Upload Material
          </h3>

          {materialFormSchema?.map((item) => {
            return (
              <Fragment key={item?.key}>
                {item?.type !== "file" && item?.name !== "link" ? (
                  <InputField
                    label={item?.label}
                    options={item?.options}
                    key={item?.key}
                    name={item?.name}
                    type={item?.type as any}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    error={Boolean(
                      formik?.touched[item?.name] && formik?.errors[item?.name]
                    )}
                    helperText={
                      formik?.touched[item?.name] &&
                      (formik?.errors[item?.name] as any)
                    }
                    value={formik?.values[item?.name]}
                  />
                ) : item?.name === "link" && formik?.values?.type === "LINK" ? (
                  <InputField
                    label={item?.label}
                    options={item?.options}
                    key={item?.key}
                    name={item?.name}
                    type={item?.type as any}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    error={Boolean(
                      formik?.touched[item?.name] && formik?.errors[item?.name]
                    )}
                    helperText={
                      formik?.touched[item?.name] &&
                      (formik?.errors[item?.name] as any)
                    }
                    value={formik?.values[item?.name]}
                  />
                ) : item?.type === "file" ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium tracking-wide text-base">
                      Upload File
                    </h3>

                    {(formik.values?.type === "PDF" ||
                      formik.values?.type === "WORD") &&
                    formik.values?.file ? (
                      <div className="w-full bg-theme p-5 text-center rounded  ">
                        <PictureAsPdf className="text-white text-5xl" />
                        <h3 className="text-white  text-xl">
                          Material Uploaded
                        </h3>
                      </div>
                    ) : (
                      <UploadFile
                        url={
                          formik.values.file &&
                          (typeof formik.values.file === "string"
                            ? formik.values.file
                            : URL.createObjectURL(formik?.values?.file))
                        }
                        onChange={(e: any) =>
                          formik?.setFieldValue("file", e.target.files[0])
                        }
                      />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </Fragment>
            );
          })}

          <div className="flex items-center justify-center my-4 ">
            <Button
              startIcon={<CloudUpload />}
              className="hover:ring-theme"
              loading={formik?.isSubmitting}
            >
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMaterialForm;
