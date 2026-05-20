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
const ForgotPassword = () => {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);
  const [userEmail, setUserEmail] = useState("");
  const { loading, mutate } = useFetch();
  const router = useRouter();

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
          path: "auth/forgot-password",
          method: "POST",
          body: JSON.stringify({
            email: values?.email?.trim(),
            webUrl: `${window?.location?.origin}/new-password`,
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        formik.resetForm();
        notify.success(response?.data?.message);
        // router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <Head>
        <title>Forgot Password</title>
      </Head>

      <form
        onSubmit={formik.handleSubmit}
        className="z-10  w-full rounded-md bg-white p-9 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-3/5 lg:w-[37%]"
      >
        <div className="flex place-content-center pb-3">
          {isValidating ? (
            <Skeleton
              variant="circular"
              width={130}
              height={130}
              animation="wave"
            />
          ) : data?.data?.logoUrl ? (
            <img src={data?.data?.logoUrl} alt="" className="w-1/3" />
          ) : (
            <img src=/newlogo.png alt="" className="w-1/3" />
          )}
        </div>
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
      </form>
    </div>
  );
};

export default ForgotPassword;
