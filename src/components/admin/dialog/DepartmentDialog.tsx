import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, CustomDialog, InputField, UploadFile } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { handleValidFormData, notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "departmentName",
    label: "Department Name",
    initialValue: "",
    validationSchema: Yup.string().required("Department name is required."),
    type: "text",
  },
  {
    key: "2",
    name: "description",
    label: "Description",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
    multiline: true,
    rows: 5,
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

const DepartmentDialog = ({ mutate }: { mutate: KeyedMutator<any> }) => {
  const { mutate: department } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("title", values?.departmentName);
      formdata.append("description", values?.description);
      formdata.append("icon", value);
      try {
        const response = await department({
          path: "department/create",
          method: "POST",
          body: handleValidFormData(formdata),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        formik?.resetForm();
        mutate();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setValue("");
        }}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col  ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-sm text-center md:text-2xl">
            Create Department
          </h3>
          <div
            className="m-auto w-60 mt-2 justify-center "
            // style={{
            //   textAlign: "center",
            //   justifyContent: "center",
            //   display: "flex",
            //   marginTop: "2vh",
            //   marginBottom: "1vh",
            // }}
          >
            <UploadFile
              uploadText="Upload Logo"
              //   required={true}
              url={
                value &&
                (typeof value === "string" ? value : URL.createObjectURL(value))
              }
              onChange={(e: any) => setValue(e.target.files[0])}
            />
          </div>
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) => (
              <InputField
                key={item?.key}
                name={item?.name}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                type={item?.type as any}
                value={formik?.values[item?.name]}
                label={item?.label}
                multiline={item?.multiline}
                rows={item?.rows}
                error={Boolean(
                  formik?.touched[item?.name] && formik?.errors[item?.name]
                )}
                helperText={
                  formik?.touched[item?.name] &&
                  (formik?.errors[item?.name] as any)
                }
              />
            ))}
            <div className="flex items-center justify-center">
              <Button className="hover:ring-theme">Add Department</Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      <Button
        className="mt-2 bg-transparent shadow-none hover:"
        onClick={() => setOpenDialog(true)}
        startIcon={<Add className="text-white text-xl " />}
      >
        Add Department
      </Button>
    </div>
  );
};

export default DepartmentDialog;
