import {
  Add,
  Close,
  CloudUpload,
  FileUpload,
  RotateLeft,
} from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { Button, InputField, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { Fragment, useState } from "react";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

const materialFormSchema = [
  {
    key: "1",
    name: "quantity",
    type: "number",
    initialValue: "",
    label: "Quantity*",
    validationSchema: Yup.string().required("Quantity is required*"),
  },
  {
    key: "3xxx",
    name: "challanNumber",
    type: "text",
    label: "Challan Number",
    initialValue: "",
    validationSchema: Yup.string().optional(),
  },
  {
    key: "2",
    type: "file",
    name: "file",
    initialValue: "",
    label: "Upload File*",
    validationSchema: Yup.string().optional().nullable(),
  },
  {
    key: "3xxxsd",
    name: "remark",
    type: "text",
    label: "Remark ",
    initialValue: "",
    validationSchema: Yup.string().optional(),

    // disabled: editId ? true : false,
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

const AddStockDrawer = ({ _id, mutate }: { _id: string; mutate: any }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: inventoryAdd } = useFetch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      console.log("Values-->", values);

      try {
        try {
          const response = await inventoryAdd({
            path: `inventory/update/${_id}`,
            method: "PUT",
            body: autoAddFormdata({
              challanNumber: values?.challanNumber,
              invoice: values?.file,
              addQuantity: values?.quantity,
              remark: values?.remark,
            }),
            isFormData: true,
          });
          if (response?.data?.error) {
            notify.error(response?.data?.error);
            return;
          }

          notify.success(response?.data?.message);

          formik?.resetForm();
          mutate.current && mutate.current.onQueryChange();
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        if (err instanceof Error) {
          //   notify.error(err?.message);
        } else {
          notify.error("Oops! Something went wrong ");
        }
      }
    },
  });
  return (
    <>
      {" "}
      <div className="w-full">
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <form onSubmit={formik?.handleSubmit} className="w-full  ">
            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 ">
              <DialogTitle className="!font-semibold tracking-wide  !text-theme border-b !text-2xl text-center">
                Add New Stocks{" "}
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
                  <div key={item?.key}>
                    {item?.type !== "file" ? (
                      <InputField
                        //   className={
                        //     item?.name === "link" && formik?.values?.type !== "LINK"
                        //       ? "hidden"
                        //       : "flex"
                        //   }
                        //   labelClass={
                        //     item?.name === "link" && formik?.values?.type !== "LINK"
                        //       ? "hidden"
                        //       : "flex"
                        //   }
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
                          </>
                        )}
                      </div>
                    )}
                  </div>
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
                    //   setDocuments([]);
                  }}
                  className={"bg-red-400 shadow-none"}
                  startIcon={<RotateLeft />}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Dialog>
      </div>
      <span
        className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 "
        onClick={() => setOpenDialog(true)}
      >
        <Tooltip title="Add Stock">
          <Add className="text-green-500 " />
        </Tooltip>
      </span>
    </>
  );
};

export default AddStockDrawer;
