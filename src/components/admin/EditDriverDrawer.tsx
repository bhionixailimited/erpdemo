import {
  Add,
  Done,
  Edit,
  ManageAccounts,
  Money,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Button,
  CustomDrawer,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";

import STATES from "configs/state";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "0",
    name: "photo",
    label: "",
    initialValue: "",
    type: "file",
  },
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
      .required("Phone Number is required.")
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
const EditDriverDrawer = ({ open, onClose, mutate }: any) => {
  const { mutate: driver } = useFetch();
  const [value, setValue] = useState<any>("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const formik = useFormik({
    initialValues: open?._id
      ? {
          photo: open?.photoUrl,
          name: open?.name,
          phoneNumber: open?.phoneNumber,
          drivingLicenseNumber: open?.drivingLicenseNumber,
          licenseExpiryDate: new Date(open?.licenseExpiryDate)
            .toISOString()
            .split("T")[0],
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("name", values?.name);
      formdata.append("phoneNumber", values?.phoneNumber);
      formdata.append("licenseExpiryDate", values?.licenseExpiryDate);
      formdata.append("drivingLicenseNumber", values?.drivingLicenseNumber);
      formdata.append("photo", values?.photo);
      try {
        const response = await driver({
          path: `driver/update/${open?._id}`,
          method: "PUT",
          body: formdata,
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDrawer(false);
        formik?.resetForm();
        mutate();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        maxWidth="md"
        width="40vw"
      >
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b mt-14 md:mt-0">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Edit className="h-8 w-8" />
              <h3 className="tracking-wide text-center">Edit Driver Details</h3>
            </div>
          </div>

          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-6">
            {timetableSchema?.map((items) =>
              items?.type === "file" ? (
                <div
                  className="flex items-center w-full col-span-12 m-auto justify-center"
                  key={items?.key}
                >
                  <UploadFile
                    className="!object-contain"
                    // url={value && URL?.createObjectURL(value)}
                    url={
                      formik.values.photo &&
                      (typeof formik.values.photo === "string"
                        ? formik.values.photo
                        : URL.createObjectURL(formik?.values?.photo))
                    }
                    onChange={(e: any) =>
                      formik?.setFieldValue("photo", e.target.files[0])
                    }
                  />
                </div>
              ) : (
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
                  styleArea={`${"col-span-12 md:col-span-12 !w-full"}`}
                  styleField="w-full col-span-12 overflow-hidden"
                />
              )
            )}
          </form>
          <div className="w-full flex pt-10 gap-2 px-4 py-5 justify-end">
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
      </CustomDrawer>
      <span
        onClick={() => setOpenDrawer(true)}
        className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
      >
        <Tooltip title="Edit Driver Details">
          <Edit />
        </Tooltip>
      </span>
    </>
  );
};

export default EditDriverDrawer;
