import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangePasswordBg } from "assets/backgrounds";
import { Field, Form, Formik } from "formik";
import { PrivateLayout } from "layouts";
import { useState } from "react";
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
  {
    key: "1",
    name: "otp",
    label: "Enter OTP",
    initialValue: "",
    validationSchema: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  },
  {
    key: "2",
    name: "password",
    label: "Enter Password",
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
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  },
];
const ResetPassword = () => {
  const [passwordType, setPasswordType] = useState<any>({
    password: "password",
    confirmPassword: "password",
  });
  const handleSubmit = (values: any) => {};
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
    <PrivateLayout title="Change Password ">
      <div className="bg-white main-container py-10">
        <div className="flex w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-5 rounded-xl">
          <div className="w-1/2 flex flex-col gap-7 py-8 px-8">
            <div className="flex flex-col gap-1">
              <p className="text-theme font-semibold text-lg">Reset Password</p>
              <p className="text-sm tracking-wider">
                Just type it twice and try not to forgot it.
              </p>
              <p className="tracking-wider text-sm">
                Password should be and most contain:
              </p>
            </div>
            <div className="flex gap-2 w-full justify-evenly">
              {password_validate_arr.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <p className="text-lg font-semibold text-theme">
                    {item.title}
                  </p>
                  <p className="text-sm ">{item.des}</p>
                </div>
              ))}
            </div>
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
                              helperText={
                                props.meta.touched && props.meta.error
                              }
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

          <div className="w-1/2 bg-theme rounded-r-xl flex items-center justify-center">
            <img src={ChangePasswordBg.src} alt="logo" className="w-2/3" />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default ResetPassword;
