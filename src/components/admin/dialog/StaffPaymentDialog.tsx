import { CurrencyRupee } from "@mui/icons-material";
import { Button, CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useState, useMemo } from "react";
import FeeType from "types/fee";
import { Month, notify } from "utils";
import * as Yup from "yup";

type dataType = {
  data: FeeType[];
};
const StaffPaymentDialog = ({
  staffId,
  mutate,
  overviewMutate,
}: {
  staffId?: string;
  mutate?: () => void;
  overviewMutate?: () => void;
}) => {
  const { data: fees } = useSWRFetch<dataType>("fees");
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: payFee } = useFetch();
  const timetableSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "paymentMethod",
        label: "Mode Of Payment *",
        initialValue: "",
        validationSchema: Yup.string().required("Mode of payment is required."),
        type: "select",
        options: [
          {
            label: "Online",
            value: "ONLINE",
            key: "4.1",
          },
          {
            label: "Cash",
            value: "CASH",
            key: "4.2",
          },
        ],
      },
      //

      {
        key: "1x",
        name: "paymentType",
        label: "Choose Type Of Payment *",
        initialValue: "",
        validationSchema: Yup.string().required("Payment type is required."),
        type: "select",
        options: [
          {
            label: `SALARY`,
            value: `SALARY`,
            key: 1,
          },
          {
            label: `BONUS`,
            value: `BONUS`,
            key: 2,
          },
          {
            label: `OTHER`,
            value: `OTHER`,
            key: 2,
          },
        ],
      },
      {
        key: "1x",
        name: "paymentMonth",
        label: "Choose Month *",
        initialValue: "",
        validationSchema: Yup.string().required("Month is required."),
        type: "select",
        options: Month,
      },

      {
        key: "2",
        name: "amount",
        label: "Enter Amount *",
        initialValue: "",
        validationSchema: Yup.string().required("Amount is required."),
        type: "number",
      },
    ];
  }, []);

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
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      if (values?.paymentMethod === "CASH") {
        try {
          const response = await payFee({
            path: `staff/payment/create/${staffId}`,
            method: "POST",
            body: JSON.stringify({
              paymentStatus: "SUCCESSFUL",
              paymentMethod: values?.paymentMethod,
              paymentType: values?.paymentType,
              paymentMonth: new Date(
                new Date().setMonth(values?.paymentMonth)
              ).toISOString(),
              amount: values?.amount,
            }),
          });

          if (response?.data?.error) {
            notify.error(response?.data?.error);
            return;
          }

          notify.success(response?.data?.message);
          mutate && mutate();
          overviewMutate && overviewMutate();
          formik?.resetForm();
          setOpenDialog(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const response = await payFee({
            path: `staff/payment/create/${staffId}`,
            method: "POST",
            body: JSON.stringify({
              paymentStatus: "SUCCESSFUL",
              paymentMethod: "ONLINE",
              paymentType: values?.paymentType,
              paymentMonth: new Date(
                new Date().setMonth(values?.paymentMonth)
              ).toISOString(),
              amount: values?.amount,
            }),
          });

          if (response?.data?.error) throw new Error(response?.data?.error);
          mutate && mutate();
          overviewMutate && overviewMutate();
          notify.success(response?.data?.message);
          formik?.resetForm();
          setOpenDialog(false);
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
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col  ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add Payment
          </h3>

          <form
            className="flex flex-col gap-4 p-4 "
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) => (
              <InputField
                size={"small"}
                key={item?.key}
                name={item?.name}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                type={item?.type as any}
                value={formik?.values[item?.name]}
                label={item?.label}
                options={item?.options}
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
              <Button
                loading={formik?.isSubmitting}
                className="hover:ring-theme text-xl"
                startIcon={<CurrencyRupee className="text-xl" />}
              >
                Pay
              </Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      <Button
        className="btn-secondary !bg-theme hover:text-white text-white w-36"
        onClick={() => setOpenDialog(true)}
      >
        Pay
      </Button>
    </div>
  );
};

export default StaffPaymentDialog;
