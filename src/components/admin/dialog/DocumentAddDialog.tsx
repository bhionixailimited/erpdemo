import {
  Add,
  CloudUpload,
  DesignServices,
  Done,
  FileUpload,
  PictureAsPdf,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  Button,
  CustomDialog,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { KeyedMutator } from "swr";
import DesignationType from "types/designation";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

const materialFormSchema = [
  {
    key: "1",
    name: "title",
    type: "text",
    initialValue: "",
    label: "Title",
    validationSchema: Yup.string()
      .required("Title is required*")
      .matches(/\S/, "Title must not be empty or contain only whitespace"),
  },
  {
    key: "4",
    type: "file",
    name: "file",
    initialValue: "",
    label: "Upload File",
    validationSchema: Yup.string().required("Upload file required*"),
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
type Props = {
  documentId: string;
  setDocumentId: Dispatch<SetStateAction<string>>;
  setAccrecationId: Dispatch<SetStateAction<string>>;
  accrecationId: string;
  accreditationMutate: any;
};
const DocumentAddDialog = ({
  setDocumentId,
  documentId,
  setAccrecationId,
  accrecationId,
  accreditationMutate,
}: Props) => {
  const { mutate: material, loading } = useFetch();
  console.log({
    documentId,
    accrecationId,
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        values?.title && formData.append("title", values?.title);
        values?.file && formData.append("document", values?.file);
        accrecationId && formData.append("accreditationId", accrecationId);
        const response = await material({
          path: documentId
            ? `certificate-document/${documentId}`
            : `certificate-document`,

          method: documentId ? "PUT" : "POST",
          body: formData,
          isFormData: true,
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        formik?.resetForm();
        // Dmutate();
        accreditationMutate?.();
        setAccrecationId("");
        setDocumentId("");
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
    <>
      <div className="w-fit">
        <CustomDialog
          open={Boolean(accrecationId)}
          onClose={() => {
            setAccrecationId("");
            setDocumentId("");
            formik?.resetForm();
          }}
          maxWidth="sm"
        >
          <form onSubmit={formik?.handleSubmit} className="w-full  ">
            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 ">
              <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
                {documentId ? "Update" : "Add"} Document
              </h3>
              {materialFormSchema?.map((item) => {
                return (
                  <Fragment key={item?.key}>
                    {item?.type !== "file" ? (
                      <InputField
                        className={
                          item?.name === "link" &&
                          formik?.values?.type !== "LINK"
                            ? "hidden"
                            : "flex"
                        }
                        labelClass={
                          item?.name === "link" &&
                          formik?.values?.type !== "LINK"
                            ? "hidden"
                            : "flex"
                        }
                        label={item?.label}
                        // options={item?.options}
                        key={item?.key}
                        name={item?.name}
                        type={item?.type as any}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        error={Boolean(
                          formik?.touched[item?.name] &&
                            formik?.errors[item?.name]
                        )}
                        helperText={
                          formik?.touched[item?.name] &&
                          (formik?.errors[item?.name] as any)
                        }
                        value={formik?.values[item?.name]}
                      />
                    ) : (
                      <div className="flex flex-col gap-4">
                        <h3 className="font-medium tracking-wide text-base">
                          Upload File
                        </h3>

                        {formik.values?.file ? (
                          <div className="w-full bg-theme p-5 text-center rounded  ">
                            <FileUpload className="text-white text-5xl" />
                            <h3 className="text-white  text-xl">
                              File Uploaded
                            </h3>
                          </div>
                        ) : (
                          <>
                            {" "}
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
                            <p className="mt-1 text-xs text-red-600">
                              {formik.touched.file &&
                              typeof formik.errors.file === "string"
                                ? formik.errors.file
                                : ""}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </Fragment>
                );
              })}

              <div className="flex items-center justify-end my-4 gap-3 ">
                <Button
                  loading={formik.isSubmitting}
                  startIcon={<CloudUpload />}
                  className="hover:ring-theme"
                >
                  Upload
                </Button>
                <Button
                  type="reset"
                  // onClick={() => formik.resetForm()}
                  onClick={() => formik.resetForm()}
                  className={"bg-red-400 shadow-none"}
                  startIcon={<RotateLeft />}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </CustomDialog>
        {/* <IconButton
          onClick={() => {
            setAccrecationId("");
            setDocumentId("");
            formik?.resetForm();
          }}
        >
          <Add className="text-7xl text-theme " />
        </IconButton> */}
      </div>
    </>
  );
};

export default DocumentAddDialog;
