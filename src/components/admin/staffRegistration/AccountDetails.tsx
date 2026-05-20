import { Done, RotateLeft } from "@mui/icons-material";
import { Button, TextInput, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { handleValidFormData, notify } from "utils";
import * as Yup from "yup";
const AccountDetails = ({ handleNext, handleBack }: any) => {
  const { push } = useRouter();
  const { mutate: registration } = useFetch();
  const { query } = useRouter();
  const [value, setValue] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const basicDetailsSchema = [
    {
      key: "3.55",
      name: "accountHolderName",
      label: "Account Holder Name",
      initialValues: "",
      type: "text",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "3.55",
      name: "bankName",
      label: "Bank Name",
      initialValues: "",
      type: "text",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "2.5",
      name: "accountNumber",
      label: "Account Number",
      initialValues: "",
      type: "number",
      validationSchema: Yup.number()
        .optional()
        .min(10, "Account No must be at least 10 characters"),
    },
    {
      key: "2.5",
      name: "ifscCode",
      label: "IFSC Code ",
      initialValues: "",
      type: "text",
      validationSchema: Yup.string()
        .optional()
        .min(11, "IFSC Code must be of length 11")
        .matches(
          /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
          "First 4 characters must be alphabets and last 7 characters must be numbers"
        ),
    },
  ];
  const initialValues = basicDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValues;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = basicDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        Swal.fire({
          title: "Are you sure?",
          text: "You added the data correctly!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Register!",
        }).then(async (result) => {
          if (result.isConfirmed)
            new Promise(async (resolve, reject) => {
              const formdata = new FormData();
              formdata.append("accountHolderName", values?.accountHolderName);
              formdata.append("bankName", values?.bankName);
              formdata.append("accountNumber", values?.accountNumber);
              formdata.append("ifscCode", values?.ifscCode);
              formdata.append("passbook", values?.target?.files[0]);
              const response = await registration({
                path: `user/bank/${query?.userIdAgain}`,
                method: "POST",
                body: handleValidFormData(formdata),
                isFormData: true,
              });

              if (response?.data?.error) {
                notify.error(response?.data?.error);
                reject(response?.data?.error);
                setLoading(false);
                return;
              }
              // console.log("response-->account", response);

              notify.success(response?.data?.message);
              resolve(response?.data?.message);
              setLoading(false);
              setValue("");
              formik.resetForm();
              push(
                {
                  pathname: "/panel/admin/staff/register",
                },
                undefined,
                {
                  shallow: true,
                }
              );
              formik.setSubmitting(false);
            });
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      {" "}
      <div
        className="!w-full"
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: "6vh",
        }}
      ></div>
      <div className="m-auto w-96 mt-2 justify-center ">
        <UploadFile
          uploadText="Upload Bank Passbook Front Page"
          //   required={true}
          url={value && URL.createObjectURL(value?.target?.files[0])}
          onChange={setValue}
        />
      </div>{" "}
      <form className="grid grid-cols-12 w-full max-w-2xl  mx-auto gap-4 pt-10">
        {basicDetailsSchema?.map((items) => (
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
            styleArea={`${"col-span-12  !w-full"}`}
            styleField="w-full col-span-12 overflow-hidden"
          />
        ))}
      </form>
      <div className="flex w-full gap-2 mt-8 justify-end px-4">
        <div className="text-end">
          <Button
            className="!bg-themeSecondary"
            type="reset"
            onClick={() => {
              formik.resetForm();
            }}
            startIcon={<RotateLeft sx={{ color: "snow" }} />}
          >
            Reset
          </Button>
        </div>
        <div className="text-end">
          <Button
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting || !formik.isValid}
            loading={formik.isSubmitting || loading}
            startIcon={<Done />}
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
