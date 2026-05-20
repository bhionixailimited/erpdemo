import { Done, Edit } from "@mui/icons-material";
import { Button, CustomDrawer, TextInput } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import CouponType from "types/coupon";
import { notify } from "utils";
import * as Yup from "yup";
const editUserSchema = [
  {
    key: "1",
    name: "name",
    label: "Coupon Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Coupon name is required."),
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
        value: "Yes",
      },
      {
        key: 2,
        label: "No",
        value: "No",
      },
    ],
  },
];
type Data = {
  data: CouponType;
};
const EditCoupons = ({ open, onClose, mutate, editCouponDrawer }: any) => {
  const [value, setValue] = useState<any>("");
  const { mutate: coupon } = useFetch();
  const { data, isValidating } = useSWRFetch<Data>(
    `/coupon/${editCouponDrawer}`
  );

  console.log(data);

  const initialValues = editUserSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = editUserSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: open
      ? {
          name: data?.data?.name,
          discountPercentage: data?.data?.discountPercentage,
          maxDiscount: data?.data?.maxDiscount,
          minAmountToApply: data?.data?.minAmountToApply,
          expiryDate: new Date(
            data?.data?.expiryDate || new Date().toISOString()
          )
            .toISOString()
            .slice(0, 10),

          applicableDate: new Date(
            data?.data?.applicableDate || new Date().toISOString()
          )
            .toISOString()
            .slice(0, 10),
          isActive: data?.data?.isActive ? "Yes" : "No",
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      let activeValue = values?.isActive === "Yes";
      var formdata = new FormData();
      formdata.append("name", values?.name);
      formdata.append("discountPercentage", values?.discountPercentage);
      formdata.append("maxDiscount", values?.maxDiscount);
      formdata.append("minAmountToApply", values?.minAmountToApply);
      formdata.append("expiryDate", new Date(values?.expiryDate).toISOString());
      formdata.append(
        "applicableDate",
        new Date(values?.applicableDate).toISOString()
      );
      formdata.append("isActive", String(activeValue));
      try {
        const response = await coupon({
          path: `/coupon/${editCouponDrawer}`,
          method: "PUT",
          body: formdata,
          isFormData: true,
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        onClose();
        formik?.resetForm();
        mutate();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const resetFields = () => {
    formik.resetForm();
    setValue("");
  };
  return (
    <div>
      <CustomDrawer
        open={open}
        onClose={onClose}
        anchor="right"
        maxWidth="md"
        width="40vw"
      >
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b ">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Edit className="h-8 w-8" />
              <h3 className="tracking-wide text-center">Edit Coupon</h3>
            </div>
          </div>
          <div className="flex flex-col py-10 overflow-auto">
            <div className="flex w-full p-5 items-center justify-center">
              <div className="w-full flex gap-3 flex-col">
                <form
                  className="grid grid-cols-12 w-full px-4 gap-4 "
                  onSubmit={formik.handleSubmit}
                >
                  {editUserSchema?.map((items) => (
                    <TextInput
                      title={items?.label}
                      key={items?.key}
                      options={items?.options}
                      name={items?.name}
                      type={items?.type as any}
                      value={formik?.values[items?.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      size="small"
                      fullWidth
                      error={Boolean(
                        formik?.touched[items?.name] &&
                          formik?.errors[items?.name]
                      )}
                      helperText={
                        formik?.touched[items?.name] &&
                        (formik?.errors[items?.name] as any)
                      }
                      styleArea={`col-span-12  !w-full`}
                      styleField="w-full col-span-12 overflow-hidden"
                    />
                  ))}
                </form>
                <div className="w-full flex pt-10 gap-2 px-4">
                  <Button
                    type="submit"
                    onClick={() => formik.handleSubmit()}
                    startIcon={<Done />}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default EditCoupons;
