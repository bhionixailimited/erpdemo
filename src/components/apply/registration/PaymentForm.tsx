import { CheckCircleOutlineOutlined, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { notify } from "utils";
import { useFetch } from "hooks";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  data: any;
  //   mutate: () => void;
};

const PaymentForm = ({ open, onClose, data }: Props) => {
  // console.log("payment:-->", data);

  const [selectedMethod, setSelectedMethod] = useState("Yes");
  const { mutate } = useFetch();
  const handleMethodChange = (method: any) => {
    setSelectedMethod(method);
  };
  const initialValues = useMemo(() => {
    return {
      isPaymentDone: data?.isPaymentDone || "",
      paymentMethod: data?.paymentMethod || "",
    };
  }, [data]);
  const validationSchema = Yup.object({
    isPaymentDone: Yup.string().required("PaymentMode is required"),
    // paymentMethod: Yup.string().required("PaymentMethod is required"),
    paymentMethod: Yup.string().when("isPaymentDone", {
      is: (val: string) => val === "Yes",
      then: Yup.string().required("Payment Method is required"),
    }),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // console.log(values);
      // return;
      try {
        const requestBody: any = {
          isPaymentDone: String(values?.isPaymentDone)?.toUpperCase() === "YES",
        };

        // Only include paymentMethod in the requestBody if isPaymentDone is "Yes"
        if (values?.isPaymentDone.toUpperCase() === "YES") {
          requestBody.paymentMethod = values?.paymentMethod;
        }

        const response = await mutate({
          path: `/registration/admin/${data?._id}`,
          method: "PUT",
          body: JSON.stringify(requestBody),
          isFormData: false,
        });

        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    },
  });
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   enableReinitialize: true,
  //   onSubmit: async (values) => {
  //     console.log(values);
  //     // return;
  //     try {
  //       const response = await mutate({
  //         path: `/registration/admin/${data?._id}`,
  //         method: "PUT",
  //         body: JSON.stringify({
  //           isPaymentDone:
  //             String(values?.isPaymentDone)?.toUpperCase() === "YES",
  //           paymentMethod:
  //             values?.isPaymentDone === "NO" || values?.isPaymentDone === "No"
  //               ? ""
  //               : values?.paymentMethod,
  //         }),
  //         isFormData: false,
  //       });
  //       if (response?.data?.error) throw new Error(response?.data?.error);
  //       notify.success(response?.data?.message);
  //     } catch (error) {
  //       notify.error(
  //         error instanceof Error ? error.message : "Something went wrong"
  //       );
  //     }
  //   },
  // });
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "30vw",
          marginTop: "3vh",
        }}
      >
        <div className="w-full flex items-center">
          <div
            className="basis-[20%] cursor-pointer"
            onClick={() => onClose && onClose()}
          >
            <Close className="text-3xl" />
          </div>
          <div className="basis-[80%] text-center mr-20">
            <h1 className="text-3xl font-bold text-primary">
              Change Payment Status
            </h1>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <section className="mt-16">
            <FormControl className="mb-4" fullWidth>
              <label className="text-xl font-semibold text-primary">
                Payment Done
              </label>
              <Select
                onChange={(e) =>
                  formik.setFieldValue("isPaymentDone", e.target.value)
                }
                value={formik?.values?.isPaymentDone}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            <p>
              {" "}
              {formik?.touched?.isPaymentDone &&
                formik?.errors?.isPaymentDone && (
                  <FormHelperText error={true}>
                    {formik?.errors?.isPaymentDone as string}
                  </FormHelperText>
                )}
            </p>
            {formik.values.isPaymentDone === "Yes" && (
              <>
                <FormControl className="mb-4" fullWidth>
                  <label className="text-xl font-semibold text-primary">
                    Payment Mode
                  </label>
                  <Select
                    onChange={(e) =>
                      formik.setFieldValue("paymentMethod", e.target.value)
                    }
                    value={formik?.values?.paymentMethod}
                  >
                    <MenuItem value="ONLINE">Online</MenuItem>
                    <MenuItem value="CASH">Cash</MenuItem>
                  </Select>
                </FormControl>
                <p>
                  {" "}
                  {formik?.touched?.paymentMethod &&
                    formik?.errors?.paymentMethod && (
                      <FormHelperText error={true}>
                        {formik?.errors?.paymentMethod as string}
                      </FormHelperText>
                    )}
                </p>
              </>
            )}
            <div className="mt-6">
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "green" }}
                type="submit"
              >
                {formik.isSubmitting ? "LOADING..." : "SAVE"}
              </Button>
            </div>
          </section>
        </form>
      </Container>
    </Drawer>
  );
};

export default PaymentForm;
