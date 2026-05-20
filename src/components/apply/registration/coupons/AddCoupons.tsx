import { Add } from "@mui/icons-material";
import { Button, CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "name",
    label: "Coupon Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Coupon name is required."),
    type: "text",
  },
  {
    key: "2",
    name: "code",
    label: "Coupon Code *",
    initialValue: "",
    validationSchema: Yup.string().required("Coupon Code is required."),
    type: "text",
  },
  {
    key: "3",
    name: "discountPercentage",
    label: "Discount Percentage *",
    initialValue: "",
    validationSchema: Yup.string().required("Discount Percentage is required."),
    type: "number",
  },
  {
    key: "4",
    name: "maxDiscount",
    label: "Max Discount *",
    initialValue: "",
    validationSchema: Yup.string().required("Max Discount is required."),
    type: "number",
  },
  {
    key: "5",
    name: "minAmountToApply",
    label: "Min Amount To Apply *",
    initialValue: "",
    validationSchema: Yup.string().required("Min Amount To Apply is required."),
    type: "number",
  },
  {
    key: "6",
    name: "expiryDate",
    label: "Expiry Date *",
    initialValue: "",
    validationSchema: Yup.string().required("Expiry Date is required."),
    type: "date",
  },
  {
    key: "7",
    name: "applicableDate",
    label: "Applicable Date *",
    initialValue: "",
    validationSchema: Yup.string().required("Applicable Date is required."),
    type: "date",
  },
  {
    key: "8",
    name: "isActive",
    label: "Is Active *",
    initialValue: "",
    validationSchema: Yup.string().required("This field is required."),
    type: "select",
    options: [
      {
        key: 1,
        label: "Yes",
        value: true,
      },
      {
        key: 2,
        label: "No",
        value: false,
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

const AddCoupons = ({ mutate }: { mutate: KeyedMutator<any> }) => {
  const { mutate: course } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(""); // set value for upload file or to make iconUrl
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      console.log(values);

      var formdata = new FormData();
      formdata.append("code", values?.code);
      formdata.append("name", values?.name);
      formdata.append("discountPercentage", values?.discountPercentage);
      formdata.append("maxDiscount", values?.maxDiscount);
      formdata.append("minAmountToApply", values?.minAmountToApply);
      formdata.append("expiryDate", values?.expiryDate);
      formdata.append("applicableDate", values?.applicableDate);
      formdata.append("isActive", values?.isActive);
      try {
        const response = await course({
          path: "/coupon",
          method: "POST",
          body: formdata,
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
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col  ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add Coupon
          </h3>
          <form
            className="flex flex-col gap-4 p-4 "
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) => (
              <InputField
                size={"small"}
                key={item?.key}
                options={item?.options}
                name={item?.name}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                type={item?.type as any}
                value={formik?.values[item?.name]}
                label={item?.label}
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
              <Button className="hover:ring-theme">Add Coupon</Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      <Button
        className="mt-2 bg-transparent shadow-none hover:"
        onClick={() => setOpenDialog(true)}
        startIcon={<Add className="text-white text-xl " />}
      >
        Add Coupon
      </Button>
    </div>
  );
};

export default AddCoupons;
