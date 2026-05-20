import {
  Email,
  LockClockRounded,
  Security,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Skeleton,
} from "@mui/material";
import { LOGO } from "assets";

import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: {
    logoUrl: string;
  };
};
const ApplyForgotPassword = ({
  setIsRegistering,
}: {
  setIsRegistering?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { mutate } = useFetch();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, props) => {
      try {
        const response = await mutate({
          path: "registration/forgot-password",
          method: "POST",
          body: JSON.stringify({
            email: values?.email?.trim(),
          }),
        });

        if (response?.data?.error) throw new Error(response?.data?.error);
        formik.resetForm();
        notify.success(response?.data?.message);
        setIsRegistering?.(false);
      } catch (err) {
        notify.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    },
  });
  return (
    <div className="flex flex-col justify-center items-center  w-full">
      <Head>
        <title>Forgot Password</title>
      </Head>

      <form
        onSubmit={formik.handleSubmit}
        className="z-10  w-full rounded-md bg-white p-9 "
      >
        <div className="py-4">
          <p className="text-sm font-medium tracking-wider">
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </p>
          <h1 className="my-3 font-semibold ">Email</h1>

          <TextField
            fullWidth
            type="email"
            placeholder="Email Address"
            name="email"
            id="outlined-basic"
            variant="outlined"
            className=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            //   InputProps={{
            //     classes: {
            //       root: " ",
            //       notchedOutline: "login-notched-outline",
            //       input: "mui-textfield-input",
            //     },
            //   }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        <button className="discount-card relative  w-full overflow-hidden rounded-[30px] bg-theme py-3 text-sm text-white">
          Reset Password
        </button>

        <span className="flex items-center justify-center mt-4 flex-col md:flex-row gap-2">
          Know your password ?{" "}
          <button
            className="text-sm font-semibold text-primary"
            onClick={() => setIsRegistering?.(false)}
            type="button"
          >
            Login
          </button>
        </span>
      </form>
    </div>
  );
};

export default ApplyForgotPassword;
