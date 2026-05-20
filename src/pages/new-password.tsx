import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { LOGO } from "assets";
import { ChangePasswordBg } from "assets/backgrounds";
import { Field, Form, Formik } from "formik";
import { useFetch } from "hooks";
import { PrivateLayout } from "layouts";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const password_validate_arr = [
  {
    id: 1,
    title: "8+",
    des: "Characters",
  },
  {
    id: 2,
    title: "AA",
    des: "Uppercase",
  },
  {
    id: 3,
    title: "aa",
    des: "Lowercase",
  },
  {
    id: 4,
    title: "123",
    des: "Number",
  },
  {
    id: 5,
    title: "@$#",
    des: "Symbol",
  },
];
const resetPasswordSchema = [
  //   {
  //     key: "1",
  //     name: "oldPassword",
  //     label: "Old Password",
  //     initialValue: "",
  //     validationSchema: Yup.string()
  //       .matches(/^[0-9]+$/, "Must be only digits")
  //       .min(6, "Must be exactly 6 digits")
  //       .max(6, "Must be exactly 6 digits"),
  //   },
  {
    key: "2",
    name: "newPassword",
    label: "New Password",
    initialValue: "",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  },
  {
    key: "3",
    name: "confirmPassword",
    label: "Confirm Password",
    initialValue: "",
    validationSchema: Yup.string()
      .min(6, "Confirm password must be at least 6 characters")
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  },
];
const NewPassword = () => {
  const router = useRouter();

  const { loading, mutate } = useFetch();
  const [passwordType, setPasswordType] = useState<any>({
    password: "password",
    confirmPassword: "password",
  });
  const handleSubmit = async (values: any, props: any) => {
    try {
      const response = await mutate({
        path: "auth/forgot-password/verify-token",
        method: "POST",
        body: JSON.stringify({
          token: `${router?.query?.token}`,
          newPassword: values?.newPassword,
          confirmPassword: values?.confirmPassword,
        }),
      });

      if (response?.data?.error) {
        notify.error(response?.data?.error);
        return;
      }
      props.resetForm();
      notify.success(response?.data?.message);
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const initialValues = resetPasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = resetPasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );
  return (
    <div className="bg-white main-container py-10 min-h-screen w-full">
      <Head>
        <title>New Password</title>
      </Head>
      <div className="flex w-full mt-12  items-center justify-center gap-5 rounded-xl ">
        <div className="!shadow-xl p-5 rounded">
          <div className="flex place-content-center pb-3">
            <img
              src={process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL}
              alt=""
              className="w-1/3"
            />
          </div>
          <p className="text-theme font-semibold text-sm text-wider text-center ">
            Write your new password here
          </p>

          {/* <p className="tracking-wider text-sm">
                Password should be and most contain:
              </p> */}
          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="flex items-center justify-center w-full flex-col">
                    {resetPasswordSchema?.map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any };
                          field: JSX.IntrinsicAttributes & TextFieldProps;
                        }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            label={inputItem.label}
                            type={passwordType[inputItem?.name] as any}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Password />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setPasswordType((prev: any) => {
                                        return {
                                          ...prev,
                                          [inputItem.name]:
                                            passwordType[inputItem?.name] ===
                                            "password"
                                              ? "text"
                                              : "password",
                                        };
                                      })
                                    }
                                  >
                                    {passwordType[inputItem?.name] ===
                                    "password" ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            {...props.field}
                          />
                        )}
                      </Field>
                    ))}

                    <div className="flex items-start justify-start w-full pt-4">
                      <Button
                        type="submit"
                        className="!bg-theme w-full !text-white"
                      >
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
