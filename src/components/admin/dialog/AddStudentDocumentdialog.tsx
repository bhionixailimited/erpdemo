import {
  Add,
  Close,
  CloudUpload,
  FileUpload,
  RotateLeft,
} from "@mui/icons-material";
import { DialogTitle, IconButton } from "@mui/material";
import { Button, CustomDialog, InputField, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { KeyedMutator } from "swr";
import DesignationType from "types/designation";
import { notify } from "utils";
import * as Yup from "yup";

const materialFormSchema = [
  {
    key: "1",
    name: "title",
    type: "text",
    initialValue: "",
    label: "Title*",
    validationSchema: Yup.string().required("Title is required*"),
  },
  {
    key: "2",
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
  feeName?: string;
  designation?: DesignationType;
  Dmutate?: KeyedMutator<any>;
  documents?: any;
  setDocuments?: any;
};
const AddStudentDocumentDialog = ({
  feeName,
  designation,
  Dmutate,
  documents,
  setDocuments,
}: Props) => {
  const { studentId, studentID } = useRouter()?.query;

  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: material, loading } = useFetch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        setDocuments((prevState: any) => [
          ...prevState,
          {
            [values?.title]: values?.file,
          },
        ]);
        formik?.resetForm();
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
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
        >
          <form onSubmit={formik?.handleSubmit} className="w-full  ">
            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 ">
              <DialogTitle className="!font-semibold tracking-wide  !text-theme border-b !text-2xl text-center">
                Add Documents{" "}
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenDialog(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <Close />
                </IconButton>
              </DialogTitle>

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
                          <div className="w-full bg-theme p-5 py-12 text-center rounded  ">
                            <FileUpload className="text-white text-5xl" />
                            <h3 className="text-white  text-xl">
                              File Uploaded
                            </h3>
                          </div>
                        ) : (
                          <>
                            <UploadFile
                              //   uploadText={
                              //     formik.values.type && formik.values.type === "PDF"
                              //       ? "PDF Uploaded"
                              //       : "Click to upload"
                              //   }
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
                            <p className="mt-1 text-red-600">
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

              <div className="flex items-center w-full justify-end my-4 gap-3 ">
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
                  onClick={() => {
                    formik.resetForm();
                    setDocuments([]);
                  }}
                  className={"bg-red-400 shadow-none"}
                  startIcon={<RotateLeft />}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </CustomDialog>

        <Button
          className="w-full mt-3 "
          type="button"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Documents
        </Button>
      </div>
    </>
  );
};

export default AddStudentDocumentDialog;
