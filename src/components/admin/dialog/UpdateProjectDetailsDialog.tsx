import { Close, Done, RotateLeft } from "@mui/icons-material";
import { Avatar, FormHelperText, IconButton } from "@mui/material";
import { FileIcon } from "assets/static-icon";

import { Button, CustomDialog, TextInput, UploadFile } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { Data } from "types/projectDetails";

import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

interface Props {
  open: boolean;
  projectId?: string;
  handleClose: () => void;
  mainMutate?: () => void;
}

const UpdateProjectDetailsDialog = ({
  open,
  handleClose,
  projectId,
  mainMutate,
}: Props) => {
  const { mutate: addProject } = useFetch();
  const { data, isValidating, mutate } = useSWRFetch<Data>(
    `project-details/${projectId}`
  );
  const timetableSchema = [
    {
      key: "1",
      name: "title",
      label: "Project Title *",
      initialValue: `${data?.data?.title ? data?.data?.title : ""}`,
      validationSchema: Yup.string().required("Project title is required."),
      type: "text",
    },
    {
      key: "2",
      name: "submittedTo",
      label: "Submitted To ",
      initialValue: `${data?.data?.submittedTo ? data?.data?.submittedTo : ""}`,
      validationSchema: Yup.string().optional(),
      type: "text",
    },
    {
      key: "10",
      name: "submittedUnder",
      label: "Submitted Under",
      initialValue: `${
        data?.data?.submittedUnder ? data?.data?.submittedUnder : ""
      }`,
      validationSchema: Yup.string().optional(),
      type: "text",
    },
    {
      key: "11",
      name: "submittedBy",
      label: "Submitted By",
      initialValue: `${data?.data?.submittedBy ? data?.data?.submittedBy : ""}`,
      validationSchema: Yup.string().optional(),
      type: "string",
    },

    {
      key: "11",
      name: "date",
      label: "Date ",
      initialValue: `${
        data?.data?.date
          ? new Date(data?.data?.date).toISOString().split("T")[0]
          : ""
      }`,
      validationSchema: Yup.string().optional(),
      type: "date",
    },
    {
      key: "3",
      name: "totalCostOfProject",
      label: "Total Cost",
      initialValue: `${
        data?.data?.totalCostOfProject ? data?.data?.totalCostOfProject : ""
      }`,
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
      initialValue: `${data?.data?.description ? data?.data?.description : ""}`,
      validationSchema: Yup.string().optional(),
      type: "text",
    },

    {
      key: "9",
      name: "status",
      label: "Sanctioned Status",
      initialValue: `${data?.data?.status ? data?.data?.status : "YES"}`,
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
      initialValue: `${
        data?.data?.sanctionDate
          ? new Date(data?.data?.sanctionDate).toISOString().split("T")[0]
          : ""
      }`,
      validationSchema: Yup.string().optional(),
      type: "date",
    },
    {
      key: "7",
      name: "sanctionAmount",
      label: "Sanctioned Amount ",
      initialValue: `${
        data?.data?.sanctionAmount ? data?.data?.sanctionAmount : ""
      }`,
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
      initialValue: `${data?.data?.documentUrl ? data?.data?.documentUrl : ""}`,
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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),

    onSubmit: async (values) => {
      // console.log("values-->", values);
      try {
        var formdata = new FormData();
        values?.title !== undefined &&
          formdata.append("title", values?.title ? values?.title : "");
        values?.submittedTo !== undefined &&
          formdata.append(
            "submittedTo",
            values?.submittedTo ? values?.submittedTo : ""
          );
        values?.submittedUnder !== undefined &&
          formdata.append(
            "submittedUnder",
            values?.submittedUnder ? values?.submittedUnder : ""
          );
        values?.submittedBy !== undefined &&
          formdata.append(
            "submittedBy",
            values?.submittedBy ? values?.submittedBy : ""
          );
        values?.date !== undefined && formdata.append("date", values?.date);
        values?.totalCostOfProject !== undefined &&
          formdata.append(
            "totalCostOfProject",
            values?.totalCostOfProject ? values?.totalCostOfProject : 0
          );
        values?.description !== undefined &&
          formdata.append(
            "description",
            values?.description ? values?.description : ""
          );
        values?.status !== undefined &&
          formdata.append("status", values?.status ? values?.status : "");
        values?.sanctionDate !== undefined &&
          formdata.append(
            "sanctionDate",
            values?.sanctionDate ? values?.sanctionDate : ""
          );
        values?.sanctionAmount !== undefined &&
          formdata.append(
            "sanctionAmount",
            values?.sanctionAmount ? values?.sanctionAmount : 0
          );
        values?.document !== undefined &&
          formdata.append("document", values?.document ? values?.document : "");

        // console.log({ values });
        const response = await addProject({
          path: `project-details/${projectId}`,
          method: "PUT",
          body: formdata,
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        handleClose();
        formik?.resetForm();
        mainMutate?.();
        mutate?.();
        notify.success("Project Details Updated Successfully");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <CustomDialog open={open} onClose={handleClose} maxWidth="md">
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Update Project
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
                  // inputProps={{
                  //   min: items?.name === "date" && dayjs().format("YYYY-MM-DD"),
                  // }}
                  onChange={formik.handleChange}
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
    </>
  );
};

export default UpdateProjectDetailsDialog;
