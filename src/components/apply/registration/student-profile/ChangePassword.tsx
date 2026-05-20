import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangePasswordBg } from "assets/backgrounds";
import { Button } from "components/core";
import { Field, Form, Formik } from "formik";
import { useApplyAuth, useFetch } from "hooks";
import withProtectedRoute from "hooks/withProtectedRoute";
import { PrivateLayout } from "layouts";
import { useEffect, useState } from "react";
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
  {
    key: "1",
    name: "password",
    label: "New Password",
    initialValue: "",
    validationSchema: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number"
      )
      .required("Password is required"),
  },
  {
    key: "2",
    name: "confirmPassword",
    label: "Confirm Password",
    initialValue: "",
    validationSchema: Yup.string()
      .min(8, "Confirm password must be at least 8 characters")
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  },
];
const ChangePassword = () => {
  const { user, getUser } = useApplyAuth();
  console.log(user, "USERDATA");
  const { mutate, loading } = useFetch();
  const [passwordType, setPasswordType] = useState<any>({
    password: "password",
    confirmPassword: "password",
  });
  const handleSubmit = async (values: any, props: any) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        notify.error("You are Not Authorize");
        return;
      }
      const response = await mutate({
        path: `registration/forgot-password/verify`,
        method: "POST",
        body: JSON.stringify({
          password: values?.password,
          token: token,
        }),
      });
      if (response?.data?.error) throw new Error(response?.data?.error);

      props.resetForm();
      notify.success(response?.data?.message);
    } catch (err) {
      if (err instanceof Error) {
        notify.error(err.message);
        return;
      }
      notify.error("Oops! Something went wrong");
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
    <section>
      <div className="bg-white main-container py-16 md:py-10">
        <div className="flex w-full  md:shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-5 rounded-xl">
          <div className="w-full lg:w-1/2 flex flex-col gap-7  md:py-8 md:px-8">
            <div className="flex flex-col gap-1">
              <p className="text-theme font-semibold text-lg">
                Reset Your Password
              </p>
              <p className="text-sm font-semibold tracking-wider block lg:hidden">
                Type a secure password by using character, numbers and symbols
              </p>
              <p className="text-sm font-semibold tracking-wider hidden lg:block">
                Type a secure password by using following character, numbers and
                symbols -
              </p>
              {/* <p className="tracking-wider text-sm">
                Password should be and most contain:
              </p> */}
            </div>
            <div className="md:flex gap-2 w-full justify-evenly hidden">
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
                              autoComplete="new-password"
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
                          loading={loading}
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

          <div className="w-1/2 bg-theme rounded-r-xl hidden md:flex items-center justify-center">
            <img
              src={ChangePasswordBg.src}
              alt="logo"
              className="w-2/3 lg:block hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
