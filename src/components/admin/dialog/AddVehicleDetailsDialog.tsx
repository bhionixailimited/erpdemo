import { Add, Done, RotateLeft } from "@mui/icons-material";

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

import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
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
  {
    key: "10",
    name: "fitnessNumber",
    label: "Vehicle Fitness Number",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "11",
    name: "fitnessNumberExpiryDate",
    label: "Vehicle Fitness Expiry Date ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "11",
    name: "permitNumber",
    label: "Permit Number ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "11",
    name: "permitNumberExpiryDate",
    label: "Permit Expiry Date ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "3",
    name: "rcNumber",
    label: "RC Number ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "4",
    name: "rcExpiryDate",
    label: "RC Expiry Date ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "5",
    name: "insuranceNumber",
    label: "Insurance Number ",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "6",
    name: "insuranceExpiryDate",
    label: "Insurance Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "7",
    name: "pucNumber",
    label: "PUC Number *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
  },
  {
    key: "8",
    name: "pucExpiryDate",
    label: "PUC Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "date",
  },
  {
    key: "9",
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
const AddTransportDialog = ({ mutate }: { mutate?: () => void }) => {
  const { mutate: addVehicle } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      value && formdata.append("image", value);
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
        const response = await addVehicle({
          path: `vehicle/create`,
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
        mutate?.();
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
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add New Vehicle
          </h3>
          <div className="m-auto md:w-96 mt-4 justify-center ">
            <UploadFile
              uploadText="Upload Vehicle Image"
              //   required={true}
              url={value && URL.createObjectURL(value as any)}
              onChange={(e: any) => setValue(e.target.files[0])}
            />
          </div>
          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
            {timetableSchema?.map((items) => (
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
            ))}
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
        Add Vehicle
      </Button>
    </div>
  );
};

export default AddTransportDialog;
