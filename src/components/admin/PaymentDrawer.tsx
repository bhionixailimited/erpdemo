import { Done, MonetizationOn, Money, RotateLeft } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  CustomDrawer,
  TextInput,
} from "components/core";

import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  // {
  //   key: "1",
  //   name: "employeeName",
  //   label: "Employee Name *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("Vehicle name is required."),
  //   type: "autocomplete",
  //   options: [
  //     {
  //       key: "1",
  //       label: "Alexa Smith",
  //       value: "alexaSmith",
  //       optionName: "4358794578",
  //     },
  //     {
  //       key: "2",
  //       label: "Alexa Smith",
  //       value: "alexaSmith",
  //       optionName: "4358794578",
  //     },
  //   ],
  // },
  // {
  //   key: "2",
  //   name: "employeeId",
  //   label: "Employee Id *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("Vehicle number is required."),
  //   type: "autocomplete",
  //   options: [
  //     {
  //       key: "1",
  //       label: "XYZ44554456",
  //       value: "XYZ44554456",
  //     },
  //     {
  //       key: "2",
  //       label: "XYZ44554456",
  //       value: "XYZ44554456",
  //     },
  //   ],
  // },
  {
    key: "5dcsf",
    name: "paymentType",
    label: "Payment Type *",
    initialValue: "",
    validationSchema: Yup.string().required("Payment type is required."),
    type: "select",
    options: [
      {
        key: 1,
        label: "Salary",
        value: "SALARY",
      },
      {
        key: 2,
        label: "Bonus",
        value: "BONUS",
      },
      {
        key: 3,
        label: "Other",
        value: "OTHER",
      },
    ],
  },
  {
    key: "5df",
    name: "paymentMethod",
    label: "Payment Method *",
    initialValue: "",
    validationSchema: Yup.string().required("Payment method is required."),
    type: "select",
    options: [
      {
        key: 1,
        label: "ONLINE",
        value: "ONLINE",
      },
      {
        key: 2,
        label: "CASH",
        value: "CASH",
      },
    ],
  },
  {
    key: "3435",
    name: "amount",
    label: "Payment Amount *",
    initialValue: "",
    validationSchema: Yup.string().required("Payment amount is required."),
    type: "number",
  },
  {
    key: "5",
    name: "paymentMonth",
    label: "Payment Date *",
    initialValue: "",
    validationSchema: Yup.string().required("Payment date is required."),
    type: "date",
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
const PaymentDrawer = ({ open, onClose, mutate, _id }: any) => {
  const feeRemove = process.env.NEXT_PUBLIC_FEE_REMOVE;
  const { mutate: payFee } = useFetch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      if (values?.paymentMethod === "CASH") {
        try {
          const response = await payFee({
            path: `staff/payment/create/${_id}`,
            method: "POST",
            body: JSON.stringify({
              ...values,
              paymentStatus: "SUCCESSFUL",
              paymentMonth: new Date(values?.paymentMonth).toISOString(),
            }),
          });

          if (response?.data?.error) {
            notify.error(response?.data?.error);
            return;
          }

          notify.success(response?.data?.message);
          formik?.resetForm();
          mutate();
          setOpenDrawer(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const response = await payFee({
            path: `staff/payment/create/${_id}`,
            method: "POST",
            body: JSON.stringify({
              paymentStatus: "SUCCESSFUL",
              paymentMethod: "ONLINE",
              paymentType: values?.paymentType,
              paymentMonth: new Date(values?.paymentMonth).toISOString(),
              amount: values?.amount,
              status: feeRemove && "true",
            }),
          });
          if (response?.data?.error) throw new Error(response?.data?.error);

          notify.success(response?.data?.message);
          formik?.resetForm();
          mutate();
          setOpenDrawer(false);
        } catch (err) {
          if (err instanceof Error) {
            return notify.error(err.message);
          }
          notify.error("Oops! Something went wrong.");
        }
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
              <Money className="h-8 w-8" />
              <h3 className="tracking-wide text-center">Add Payment</h3>
            </div>
          </div>
          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-6">
            {timetableSchema?.map((items) =>
              items?.type === "autocomplete" ? (
                <div
                  className="col-span-12 md:col-span-12 w-full"
                  key={items?.key}
                >
                  <AdminAutocomplete
                    size="medium"
                    label={items?.label}
                    isOptionEqualToValue={(option, value) =>
                      option?.value === value?.value
                    }
                    onChange={(e, value) =>
                      formik?.setFieldValue(items?.name, value?.value)
                    }
                    options={items?.options}
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
                  options={items?.options}
                  size="medium"
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
      <Tooltip title="Add Payment">
        <Avatar
          variant="rounded"
          onClick={() => setOpenDrawer(true)}
          className=" !mr-1 !cursor-pointer !bg-teal-700 text-white"
        >
          <MonetizationOn className="!p-0" />
        </Avatar>
      </Tooltip>
    </>
  );
};

export default PaymentDrawer;
