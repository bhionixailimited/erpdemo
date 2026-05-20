import {
  Add,
  Close,
  Delete,
  FileUpload,
  RotateLeft,
} from "@mui/icons-material";
import { Avatar, DialogTitle, IconButton } from "@mui/material";
import { Button, CustomDialog, InputField, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { KeyedMutator } from "swr";
import DesignationType from "types/designation";
import { GuestType } from "types/event";
import { notify } from "utils";
import * as Yup from "yup";

const materialFormSchema = [
  {
    key: "1",
    name: "name",
    type: "text",
    initialValue: "",
    label: "Guest Name",
    validationSchema: Yup.string().required("Title is required*"),
  },
  {
    key: "1sas",
    name: "phoneNumber",
    type: "number",
    initialValue: "",
    label: "PhoneNumber",
    validationSchema: Yup.string().optional(),
  },
  {
    key: "1x",
    name: "position",
    type: "text",
    initialValue: "",
    label: "Position",
    validationSchema: Yup.string().optional(),
  },
  // {
  //   key: "2",
  //   name: "type",
  //   type: "select",
  //   initialValue: "",
  //   label: "Select Type",
  //   options: [
  //     {
  //       key: "2",
  //       label: "IMAGE",
  //       value: "IMAGE",
  //     },
  //     {
  //       key: "1",
  //       label: "PDF",
  //       value: "PDF",
  //     },

  //     //   {
  //     //     key: "3",
  //     //     label: "Link",
  //     //     value: "LINK",
  //     //   },
  //   ],
  //   validationSchema: Yup.string(),
  // },
  //   {
  //     key: "3",
  //     type: "text",
  //     name: "link",
  //     initialValue: "",
  //     label: "Video Link",
  //     validationSchema: Yup.string(),
  //   },
  //   {
  //     key: "4",
  //     type: "file",
  //     name: "file",
  //     initialValue: "",
  //     label: "Upload File",
  //     validationSchema: Yup.string().required("Upload file required*"),
  //   },
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
const AddGuestDialog = ({
  feeName,
  designation,
  Dmutate,
  documents,
  setDocuments,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        setDocuments((prevState: any) => [
          ...prevState,
          {
            ...values,
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
                Add Guest{" "}
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

              <div className="mb-4">
                {documents?.map((item: GuestType, index: number) => (
                  <div
                    key={index}
                    className="bg-indigo-100 my-2 p-2 text-md font-semibold rounded-md justify-between flex flex-wrap"
                  >
                    <div className="flex items-center">
                      <Avatar
                        variant="rounded"
                        className="!h-16 !w-16"
                        src={
                          "https://cdn-icons-png.flaticon.com/128/3417/3417894.png"
                        }
                      />
                      <div className="ml-5">
                        <p className="text-theme">
                          {item.name} {/* Display the name */}
                        </p>
                        <p className="text-gray-600">
                          {item.phoneNumber} {/* Display the phoneNumber */}
                        </p>
                        <p className="text-gray-600">
                          {item.position} {/* Display the position */}
                        </p>
                      </div>
                    </div>
                    <IconButton
                      className="hover:!bg-indigo-100"
                      onClick={() => {
                        setDocuments((prevState: any) =>
                          prevState.filter(
                            (_: GuestType, idx: number) => idx !== index
                          )
                        );
                      }}
                    >
                      <Delete className="text-red-500" />
                    </IconButton>
                  </div>
                ))}
              </div>

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

              <div className="flex items-center justify-end my-4 gap-3 ">
                <Button
                  loading={formik.isSubmitting}
                  startIcon={<Add />}
                  className="hover:ring-theme"
                >
                  Add
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
          type="button"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Guests
        </Button>
      </div>
    </>
  );
};

export default AddGuestDialog;
