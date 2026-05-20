import { Add, Done, RotateLeft } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  CustomDialog,
  InputField,
  PhotoUpload,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "name",
    label: "Driver Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Driver name is required."),
    type: "text",
  },
  {
    key: "1tfh",
    name: "phoneNumber",
    label: "Driver Number *",
    initialValue: "",
    validationSchema: Yup.string()
      .required("Driver Number is required.")
      .min(10, "Minimum 10 digits required"),
    type: "number",
  },

  {
    key: "5",
    name: "drivingLicenseNumber",
    label: "Driving License Number *",
    initialValue: "",
    validationSchema: Yup.string().required(
      "Driving License Number is required."
    ),
    type: "licenseNumber",
  },
  {
    key: "5",
    name: "licenseExpiryDate",
    label: "License Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().required("License Expiry Date is required."),
    type: "date",
  },

  //   {
  //     key: "1",
  //     name: "staff",
  //     label: "Choose Leave Code *",
  //     initialValue: "",
  //     validationSchema: Yup.string().required("Department name is required."),
  //     type: "select",
  //     options: [
  //       {
  //         label: "Sick Leave",
  //         Value: "sickLeave",
  //         key: "1",
  //       },
  //       {
  //         label: "Casual Leave",
  //         Value: "casualLeave",
  //         key: "2",
  //       },
  //     ],
  //   },
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

const AddDriverDialog = ({ mutate }: any) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const { mutate: driver } = useFetch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    // onSubmit: (values) => {
    //   formik?.resetForm();

    //   setOpenDialog(false);
    // },
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("name", values?.name);
      formdata.append("phoneNumber", values?.phoneNumber);
      formdata.append("licenseExpiryDate", values?.licenseExpiryDate);
      formdata.append("drivingLicenseNumber", values?.drivingLicenseNumber);
      value && formdata.append("photo", value);
      try {
        const response = await driver({
          path: "driver/create",
          method: "POST",
          body: formdata,
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        setValue("");
        formik?.resetForm();
        mutate();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const router = useRouter();
  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false), setValue("");
        }}
        maxWidth="md"
      >
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add New Driver
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
              variant="circular"
              className="!rounded-xl"
              uploadText="Upload Driver Image"
              //   required={true}
              url={value && URL.createObjectURL(value as any)}
              onChange={(e: any) => setValue(e.target.files[0])}
            />
          </div>
          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-8">
            {timetableSchema?.map((items) => (
              <TextInput
                title={items?.label}
                key={items?.key}
                name={items?.name}
                type={items?.type as any}
                value={formik?.values[items?.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            ))}
          </form>
          <div className="w-full flex pt-10 gap-2 px-4 justify-end">
            <Button
              className="shadow-none"
              type="submit"
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
              loading={formik.isSubmitting}
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
        Add New Driver
      </Button>
    </div>
  );
};

export default AddDriverDialog;
