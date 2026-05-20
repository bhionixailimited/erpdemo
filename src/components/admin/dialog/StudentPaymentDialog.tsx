import { CurrencyRupee } from "@mui/icons-material";
import { Button, CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import { useAuth, useFeePayment, useFetch, useSWRFetch } from "hooks";
import { useMemo, useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

type dataType = {
  data: {
    amount: number;
    batch: string;
    createdAt: string;
    day: number;
    endDate: string;
    feeType: string;
    fees: {
      title: string;
    };
    isPaid: false;
    month: number;
    startDate: string;
    startDay: 21;
    startMonth: 4;
    updatedAt: string;
    user: string;
    year: number;
    _id: string;
  }[];
};
const StudentPaymentDialog = ({
  studentID,
  studentFeesId,
  amount,
  reload,
}: {
  studentID?: string;
  studentFeesId?: string;
  amount?: number;
  reload?: () => void;
}) => {
  const feeRemove = process.env.NEXT_PUBLIC_FEE_REMOVE;
  const { user } = useAuth();
  const { data: fees } = useSWRFetch<dataType>(
    studentID && `student/student-fee/${studentID}`
  );
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: payFee } = useFetch();
  const timetableSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "paymentMode",
        label: "Mode Of Payment *",
        initialValue: "",
        validationSchema: Yup.string().required("Mode of payment is required."),
        type: "select",
        options:
          user?.role === "STUDENT"
            ? [
                {
                  label: "Online",
                  value: "ONLINE",
                  key: "4.1",
                },
              ]
            : user?.role === "PARENT"
            ? [
                {
                  label: "Online",
                  value: "ONLINE",
                  key: "4.1",
                },
              ]
            : [
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
        name: "studentFeesId",
        label: "Choose Name Of Fee *",
        initialValue: "",
        validationSchema: Yup.string().required(" Name Of Fee is required."),
        type: "select",
        options: fees?.data?.length
          ? fees?.data?.map((data) => ({
              label: `${data?.fees?.title}`,
              value: `${data?._id}`,
              key: `${data?._id}`,
            }))
          : [
              {
                label: `No Fees Pending`,
                value: ``,
                key: ``,
              },
            ],
        disabled: studentFeesId ? true : false,
      },
      {
        key: "2",
        name: "amount",
        label: "Enter Amount *",
        initialValue: "",
        validationSchema: Yup.string().required("Amount is required."),
        type: "number",
        disabled: amount ? true : false,
      },
    ];
  }, [amount, fees?.data, studentFeesId, user?.role]);

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

  const { handleOnlinePayment } = useFeePayment();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      studentFeesId: studentFeesId,
      amount: amount,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      if (values?.paymentMode === "CASH") {
        if (user?.role === "STUDENT") {
          notify.error("Only online payment is allowed");
          return;
        }
        try {
          const response = await payFee({
            path: `student/pay/${studentID}`,
            method: "POST",
            body: JSON.stringify({
              paymentMode: values?.paymentMode,
              studentFeesId: values?.studentFeesId,
              amount: values?.amount,
              status: feeRemove && true,
            }),
          });

          if (response?.data?.error) {
            notify.error(response?.data?.error);
            return;
          }

          notify.success(response?.data?.message);
          formik?.resetForm();
          setOpenDialog(false);
          reload && reload();
        } catch (err) {
          if (err instanceof Error) notify.error(err.message);
          return;
        }
      } else {
        if (feeRemove) {
          const checkoutData = {
            paymentMode: "ONLINE",
            studentFeesId: values?.studentFeesId,
            amount: values?.amount,
            status: true,
          };
          const res = await payFee({
            path: `student/pay/${studentID}`,
            method: "POST",
            body: JSON.stringify(checkoutData),
          });

          if (res?.data?.error) throw new Error(res?.data?.error);
          notify.success("Payment Update Successful");
        } else {
          await handleOnlinePayment({
            totalPayableAmount: values?.amount,
            payId: values?.studentFeesId,
            paymentTitle:
              fees?.data?.find((data) => data?._id === values?.studentFeesId)
                ?.fees?.title ?? "",
            studentId: studentID?.toString() as any,
            notes: {
              timestamp: Date.now(),
            },
            receipt: studentID?.toString() as any,
          });
        }
        reload && reload();
        setOpenDialog(false);
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
                onChange={(e) => {
                  if (item?.name === "studentFeesId") {
                    formik?.handleChange(e);
                    formik?.setFieldValue(
                      "amount",
                      fees?.data?.find((data) => data?._id === e.target.value)
                        ?.amount
                    );
                  } else {
                    formik?.handleChange(e);
                  }
                }}
                disabled={item?.disabled}
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
                // loading={formik?.isSubmitting}
                className="hover:ring-theme text-xl"
                startIcon={<CurrencyRupee className="text-xl" />}
              >
                {feeRemove ? "Update" : "Pay"}
              </Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      {feeRemove && user?.role === "ADMIN" ? (
        <button
          className="btn-secondary !bg-theme hover:text-white text-white w-36"
          onClick={() => setOpenDialog(true)}
        >
          Update
        </button>
      ) : (
        <button
          className="btn-secondary !bg-theme hover:text-white text-white w-36"
          onClick={() => setOpenDialog(true)}
        >
          Pay
        </button>
      )}
    </div>
  );
};

export default StudentPaymentDialog;
