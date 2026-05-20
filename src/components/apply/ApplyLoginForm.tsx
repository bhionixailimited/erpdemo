import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "components/core";
import { Email, Key, RemoveRedEye } from "@mui/icons-material";
import { notify } from "utils";
import { useApplyAuth, useFetch } from "hooks";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const ApplyLoginForm = ({
  setIsRegistering,
  setIsForgotPassword,
}: {
  setIsRegistering?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsForgotPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();
  const { mutate } = useFetch();
  const { getUser } = useApplyAuth();
  const handleLoginSubmit = async (values: any) => {
    try {
      const response = await mutate({
        path: "registration/login",
        method: "POST",
        body: JSON.stringify({
          email: values?.email,
          password: values?.password,
        }),
      });
      if (response?.data?.error) throw new Error(response?.data?.error);
      notify.success(response?.data?.message);
      getUser();
      push("/apply/profile");
    } catch (error) {
      notify.error(
        error instanceof Error ? error?.message : "Something went wrong"
      );
    }
  };

  return (
    <section className="w-full">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4 justify-center w-full lg:px-8 px-2">
            <div className="relative z-0 w-full flex flex-col gap-3 border-b-2 rounded-sm ">
              <p className="text-gray-600">User Email</p>
              <span
                className={`flex items-center gap-3 ${
                  errors.email && touched.email ? "error-border" : ""
                }`}
              >
                <Email className="text-3xl text-primary " />
                <Field
                  type="text"
                  name="email"
                  className={`outline-none w-full px-3  border-gray-600 text-gray-600 ${
                    errors.email && touched.email ? "border-red-600" : ""
                  }`}
                  placeholder="Enter your email"
                />
              </span>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-600"
              />
            </div>

            <div className="relative z-0 w-full flex flex-col gap-3 border-b-2 rounded-sm ">
              <p className="text-gray-600">Password</p>
              <span
                className={`flex items-center gap-3 justify-between ${
                  errors.password && touched.password ? "error-border" : ""
                }`}
              >
                <Key className="text-3xl text-primary" />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`outline-none w-full px-3  border-gray-600 text-gray-600 ${
                    errors.password && touched.password ? "border-red-600" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <RemoveRedEye className="text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                  ) : (
                    <RemoveRedEye className="text-2xl text-gray-400 cursor-pointer hover:text-gray-700" />
                  )}
                </span>
              </span>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-600"
              />
            </div>

            <span className="flex justify-end">
              <button
                className="text-sm font-semibold text-primary"
                onClick={() => setIsForgotPassword?.(true)}
              >
                Forgot Password?
              </button>
            </span>

            <span className="flex items-center justify-center flex-col md:flex-row gap-2">
              {"Don't"} have an account ?{" "}
              <button
                className="text-sm font-semibold text-primary"
                onClick={() => setIsRegistering?.((prev) => !prev)}
              >
                Register now
              </button>
            </span>

            <span className="flex justify-center items-center">
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </span>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ApplyLoginForm;
