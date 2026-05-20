import { Done, Edit, RotateLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Button, CustomDrawer, TextInput, UploadFile } from "components/core";

import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "0",
    name: "image",
    label: "",
    initialValue: "",
    type: "file",
  },
  {
    key: "1",
    name: "vehicleName",
    label: "Vehicle Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Vehicle name is required."),
    type: "text",
  },
  {
    key: "2",
    name: "vehicleNumber",
    label: "Vehicle Number *",
    initialValue: "",
    validationSchema: Yup.string().required("Vehicle number is required."),
    type: "text",
  },
  //
  {
    key: "3",
    name: "fitnessNumber",
    label: "Vehicle Fitness Number",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "4",
    name: "fitnessNumberExpiryDate",
    label: "Fitness Expired Date",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "Date",
  },
  {
    key: "5",
    name: "permitNumber",
    label: "Permit Number",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "6",
    name: "permitNumberExpiryDate",
    label: "Permit Expired date",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  //
  {
    key: "7",
    name: "rcNumber",
    label: "RC Number *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "8",
    name: "rcExpiryDate",
    label: "RC Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "9",
    name: "insuranceNumber",
    label: "Insurance Number *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "10",
    name: "insuranceExpiryDate",
    label: "Insurance Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "11",
    name: "pucNumber",
    label: "PUC Number *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "12",
    name: "pucExpiryDate",
    label: "PUC Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "13",
    name: "status",
    label: "Vehicle Status *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "select",
    options: [
      {
        key: 1,
        label: "Active",
        value: "ACTIVE",
      },
      {
        key: 2,
        label: "In-Active",
        value: "INACTIVE",
      },
    ],
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
const EditVehicleDrawer = ({ open, onClose, mutate }: any) => {
  const { mutate: vehicle } = useFetch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const formik = useFormik({
    initialValues: open?._id
      ? {
          image: open?.imageFile,
          vehicleName: open?.vehicleName,
          vehicleNumber: open?.vehicleNumber,
          fitnessNumber: open?.fitnessNumber,
          fitnessNumberExpiryDate: open?.fitnessNumberExpiryDate?.split("T")[0],
          permitNumber: open?.permitNumber,
          permitNumberExpiryDate: open?.permitNumberExpiryDate?.split("T")[0],
          pucNumber: open?.pucNumber,
          pucExpiryDate: open?.pucExpiryDate?.split("T")[0],
          status: open?.status,
          insuranceNumber: open?.insuranceNumber,
          insuranceExpiryDate: new Date(open?.insuranceExpiryDate)
            .toISOString()
            .split("T")[0],
          rcNumber: open?.rcNumber,
          rcExpiryDate: new Date(open?.rcExpiryDate)
            .toISOString()
            .split("T")[0],
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("image", values?.image);
      formdata.append("vehicleName", values?.vehicleName);
      formdata.append("vehicleNumber", values?.vehicleNumber);
      formdata.append("fitnessNumber", values?.fitnessNumber);
      formdata.append(
        "fitnessNumberExpiryDate",
        values?.fitnessNumberExpiryDate
      );
      formdata.append("permitNumber", values?.permitNumber);
      formdata.append("permitNumberExpiryDate", values?.permitNumberExpiryDate);
      formdata.append("rcExpiryDate", values?.rcExpiryDate);
      formdata.append("rcNumber", values?.rcNumber);
      formdata.append("pucExpiryDate", values?.pucExpiryDate);
      formdata.append("pucNumber", values?.pucNumber);
      formdata.append("insuranceExpiryDate", values?.insuranceExpiryDate);
      formdata.append("insuranceNumber", values?.insuranceNumber);
      formdata.append("status", values?.status);
      try {
        const response = await vehicle({
          path: `vehicle/update/${open?._id}`,
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
          <div className="flex items-center justify-between p-4 border-b  mt-14 md:mt-0">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Edit className="h-8 w-8" />
              <h3 className="tracking-wide text-center">
                Edit Vehicle Details
              </h3>
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
                    height={300}
                    className="!object-contain"
                    // url={value && URL?.createObjectURL(value)}
                    url={
                      formik.values.image &&
                      (typeof formik.values.image === "string"
                        ? formik.values.image
                        : URL.createObjectURL(formik?.values?.image))
                    }
                    onChange={(e: any) =>
                      formik?.setFieldValue("image", e.target.files[0])
                    }
                  />
                </div>
              ) : (
                <TextInput
                  title={items?.label}
                  key={items?.key}
                  name={items?.name}
                  options={items?.options}
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
      </CustomDrawer>
      <span
        onClick={() => setOpenDrawer(true)}
        className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
      >
        <Tooltip title="Edit Vehicle Details">
          <Edit />
        </Tooltip>
      </span>
    </>
  );
};

export default EditVehicleDrawer;
