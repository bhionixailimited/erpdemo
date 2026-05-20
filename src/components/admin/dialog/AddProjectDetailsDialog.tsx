import { Add, Close, Done, RotateLeft } from "@mui/icons-material";
import { Avatar, FormHelperText, IconButton } from "@mui/material";
import { FileIcon } from "assets/static-icon";

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
import { useState } from "react";

import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "title",
    label: "Project Title *",
    initialValue: "",
    validationSchema: Yup.string().required("Project title is required."),
    type: "text",
  },
  {
    key: "2",
    name: "submittedTo",
    label: "Submitted To ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "10",
    name: "submittedUnder",
    label: "Submitted Under",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "11",
    name: "submittedBy",
    label: "Submitted By",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "string",
  },

  {
    key: "11",
    name: "date",
    label: "Date ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "3",
    name: "totalCostOfProject",
    label: "Total Cost",
    initialValue: "",
    validationSchema: Yup.number()
      .optional()
      .integer("Value must be an integer")
      .min(0, "Value must be non-negative"),
    type: "number",
  },

  {
    key: "5",
    name: "description",
    label: "Description ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },

  {
    key: "9",
    name: "status",
    label: "Sanctioned Status",
    initialValue: "YES",
    validationSchema: Yup.string().optional(),
    type: "select",
    options: [
      {
        key: 1,
        label: "Yes",
        value: "YES",
      },
      {
        key: 2,
        label: "No",
        value: "NO",
      },
    ],
  },
  {
    key: "8x",
    name: "sanctionDate",
    label: "Sanctioned Date ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "7",
    name: "sanctionAmount",
    label: "Sanctioned Amount ",
    initialValue: "",
    validationSchema: Yup.number()
      .optional()
      .integer("Value must be an integer")
      .min(0, "Value must be non-negative"),
    type: "number",
  },

  {
    key: "5",
    type: "file",
    name: "document",
    initialValue: "",
    label: "Upload File",
    validationSchema: Yup.string().optional(),
  },
];

const initialValues = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {}
);
const validationSchema = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  },
  {}
);
const AddProjectDetailsDialog = ({ mutate }: { mutate?: () => void }) => {
  const { mutate: addVehicle } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await addVehicle({
          path: `project-details`,
          method: "POST",
          body: autoAddFormdata({
            ...values,
          }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        setValue("");
        formik?.resetForm();
        mutate?.();
        notify.success("Created Successfully");
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add New Project
          </h3>
          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
            {timetableSchema?.map((items, i) =>
              items?.type === "file" ? (
                <div className="col-span-12 gap-4 relative" key={i}>
                  <h3 className="font-medium tracking-wide text-base">
                    Upload File
                  </h3>
                  {formik.values?.document ? (
                    <>
                      <div className="absolute top-0 right-0 z-[9999]">
                        <IconButton
                          onClick={() =>
                            formik?.setFieldValue("document", undefined)
                          }
                        >
                          <Close className="text-themeSecondary" />
                        </IconButton>
                      </div>
                      <div className="w-full bg-theme p-5 text-center flex items-center justify-center flex-col rounded  ">
                        <Avatar
                          src={FileIcon.src}
                          className="!h-16 !p-2 !w-16"
                        />
                        <h3 className="text-white  text-xl">
                          {formik.values?.document?.name}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <>
                      <UploadFile
                        url={
                          formik.values.document &&
                          (typeof formik.values.document === "string"
                            ? formik.values.document
                            : URL.createObjectURL(formik?.values?.document))
                        }
                        onChange={(e: any) =>
                          formik?.setFieldValue("document", e.target.files[0])
                        }
                      />
                      {formik?.touched?.document &&
                        formik?.errors?.document && (
                          <FormHelperText error={true}>
                            {formik?.errors?.document as any}
                          </FormHelperText>
                        )}
                    </>
                  )}
                </div>
              ) : (
                <TextInput
                  title={items?.label}
                  key={items?.key}
                  name={items?.name}
                  type={
                    items?.type as
                      | "number"
                      | "text"
                      | "date"
                      | "select"
                      | "file"
                      | "email"
                      | "month"
                  }
                  value={formik?.values[items?.name]}
                  onChange={formik.handleChange}
                  // inputProps={{
                  //   min: items?.name === "date" && dayjs().format("YYYY-MM-DD"),
                  // }}
                  onBlur={formik.handleBlur}
                  options={items?.options}
                  size="small"
                  fullWidth
                  error={Boolean(
                    formik?.touched[items?.name] && formik?.errors[items?.name]
                  )}
                  helperText={
                    formik?.touched[items?.name] &&
                    (formik?.errors[items?.name] as any)
                  }
                  styleArea={`${"col-span-12 md:col-span-6 !w-full"}`}
                  styleField="w-full col-span-12 overflow-hidden"
                />
              )
            )}
          </form>
          <div className="w-full flex pt-10 gap-2 px-4 justify-end">
            <Button
              loading={formik.isSubmitting}
              className="shadow-none"
              type="submit"
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
            >
              Save
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
      </CustomDialog>

      <Button startIcon={<Add />} onClick={() => setOpenDialog(true)}>
        Add Project
      </Button>
    </div>
  );
};

export default AddProjectDetailsDialog;
