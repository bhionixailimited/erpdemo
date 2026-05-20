import {
  LockOpen,
  LoginOutlined,
  PermIdentity,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { LOGO } from "assets";
import useAppContext from "contexts/AppContextProvider";
import { Field, Form, Formik } from "formik";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import PublicLayout from "layouts/publicLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import Slider from "react-slick";
import {
  getDashboardPathByRole,
  isProductionEnvironment,
  notify,
  parseLoginApiResponse,
  saveToLocalStorage,
} from "utils";
import * as Yup from "yup";
var settings = {
  dots: true,
  arrows: false,
  autoplay: true,
  adaptiveHeight: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
  initialSlide: 0,
};

const sliderImages = [
  {
    id: 1,
    image: "/Features/login-1.png",
    title: "REDEFINE LEARNING",
    subtitle:
      "WITH MODERN TECHNOLOGY Empowering every kid in their quest for knowledge.",
  },
  {
    id: 2,
    image: "/Features/login-3.png",
    title: "REDEFINE LEARNING",
    subtitle:
      "WITH MODERN TECHNOLOGY Empowering every kid in their quest for knowledge.",
  },
  {
    id: 3,
    image: "/Features/login-1.png",
    title: "REDEFINE LEARNING",
    subtitle:
      "WITH MODERN TECHNOLOGY Empowering every kid in their quest for knowledge.",
  },
];

const LoginSchema = [
  {
    key: "1",
    label: "Enter your Email",
    name: "email",
    type: "email",
    validationSchema: Yup.string().email().required("Email is required"),

    initialValue: "",
    startIcon: <PermIdentity className="!text-[1.7rem] text-theme" />,
  },
  {
    key: "2",
    label: "Enter your password",
    name: "password",
    type: "password",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    initialValue: "",
    startIcon: <LockOpen className="!text-2xl text-theme" />,
  },
];

type dataType = {
  data: {
    logoUrl: string;
  };
};
const prodEnv = isProductionEnvironment();

const LoginCommon = () => {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);
  const [showPassword, setShowPassword] = useState(false);

  const { push } = useRouter();
  const { getUser } = useAuth();
  const { loading, mutate } = useFetch();
  const initialValues = LoginSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });
  const validationSchema = LoginSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });
  const handleLogin = async (values: any) => {
    try {
      const response = await mutate({
        path: "auth/login",
        method: "POST",
        body: JSON.stringify({
          email: values?.email?.trim(),
          password: values?.password.trim(),
        }),
      });

      const login = parseLoginApiResponse(response);

      if (!login.ok) {
        notify.error(login.error || "Login failed. Please check your credentials.");
        return;
      }

      saveToLocalStorage("ACCESS_TOKEN", login.accessToken!);

      const accountUser = await getUser();
      const role = accountUser?.role || login.user?.role || login.role;
      const dashboardPath = getDashboardPathByRole(role);

      if (!dashboardPath) {
        notify.error("Unable to determine dashboard for this account.");
        return;
      }

      push(dashboardPath);
    } catch (err) {
      if (err instanceof Error) {
        notify.error(err?.message);
        return;
      }
      notify.error("Something went wrong!");
    }
  };

  return (
    <PublicLayout title="PoddarErp | Login">
      <section
        className={`bg-white ${
          prodEnv
            ? "min-h-screen relative flex flex-col items-center justify-center"
            : ""
        } `}
      >
        <div
          className={`main-container md:py-16 py-6 h-full ${
            prodEnv ? "translate-y-[-7%]" : ""
          } `}
        >
          <div className="flex md:flex-row flex-col md:gap-2 gap-5 h-full bg-white rounded-lg">
            <div
              className={` hidden md:flex md:w-3/5 w-full md:px-3 h-full  flex-col gap-8 py-5`}
            >
              {/* <div>
                <img src="/newlogo.png" alt="logo" className="w-28" />
              </div> */}
              <div className="h-full w-full flex flex-col gap-5">
                <div className="flex flex-col text-center justify-center items-center gap-2 md:px-5">
                  <p className="text-xl font-bold">
                    Integrated E-Learning System
                  </p>
                  <p className="text-sm ">
                    Managed services to onboard content, integrated web
                    conferencing tool to conduct online classes, assessments and
                    automated evaluation, teacher and student/parent login,
                    online course content to track student progress.
                  </p>
                </div>
                <Slider {...settings}>
                  {sliderImages.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white h-full w-full flex items-center justify-center"
                    >
                      <div className="flex items-center justify-center">
                        <img
                          src={item.image}
                          alt=""
                          className="w-[30rem] object-contain overflow-hidden"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="md:w-2/5 w-full flex h-full items-center justify-center border rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] border-theme/40 py-5">
              <div className="md:p-5 h-full w-full flex flex-col gap-3 items-center justify-center">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                  {!isValidating && data?.data?.logoUrl ? (
                    <img
                      src={data?.data?.logoUrl}
                      alt=""
                      className="w-full h-full p-3 object-contain"
                    />
                  ) : (
                    <img
                      src="/newlogo.png"
                      alt="logo"
                      className="w-full h-full p-3 object-contain"
                    />
                  )}
                </div>
                <div className="w-full flex flex-col gap-6 md:px-6 ">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={handleLogin}
                  >
                    {(formik) => (
                      <Form>
                        <CardContent>
                          {LoginSchema.map((inputItem) => (
                            <Field name={inputItem.name} key={inputItem.key}>
                              {(props: {
                                meta: { touched: any; error: any };
                                field: JSX.IntrinsicAttributes & TextFieldProps;
                              }) => (
                                <div className="flex items-center w-full justify-center">
                                  <TextField
                                    size="medium"
                                    variant="outlined"
                                    className="w-full md:w-full !rounded-2xl"
                                    margin="normal"
                                    label={inputItem.label}
                                    type={
                                      showPassword ? "text" : inputItem.type
                                    }
                                    error={Boolean(
                                      props.meta.touched && props.meta.error
                                    )}
                                    helperText={
                                      props.meta.touched && props.meta.error
                                    }
                                    inputProps={{
                                      autoComplete: "current-password",
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {inputItem.startIcon}
                                        </InputAdornment>
                                      ),
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          {inputItem.type === "password" && (
                                            <IconButton
                                              onClick={() =>
                                                setShowPassword(!showPassword)
                                              }
                                            >
                                              {showPassword ? (
                                                <Visibility className="!text-theme !text-2xl" />
                                              ) : (
                                                <VisibilityOff className="!text-theme !text-2xl" />
                                              )}
                                            </IconButton>
                                          )}
                                        </InputAdornment>
                                      ),
                                    }}
                                    {...props.field}
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        inputItem?.name,
                                        e?.target?.value?.replace(
                                          /[^\u0000-\u007E]/g,
                                          ""
                                        )
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </Field>
                          ))}

                          <div className="flex items-center w-full pt-6 justify-center flex-col gap-4">
                            <LoadingButton
                              type="submit"
                              className="!bg-theme w-full !rounded-xl"
                              size="large"
                              loadingIndicator={
                                <CircularProgress
                                  className="!text-white"
                                  size={20}
                                />
                              }
                              loadingPosition="center"
                              startIcon={<LoginOutlined />}
                              variant="contained"
                              loading={loading || formik.isSubmitting}
                            >
                              Login
                            </LoadingButton>
                            <p
                              className="cursor-pointer text-theme font-semibold text-sm"
                              onClick={() => push("/forgot-password")}
                            >
                              Forgot Password ?
                            </p>
                          </div>
                        </CardContent>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        {prodEnv ? (
          <footer className=" text-black w-full absolute bottom-0 flex items-center bg-gray-100 ">
            <p className="w-full tracking-wise text-xs  md:pt-8 pt-3 pb-5 text-black text-center">
              Copyright © 2023 The YARDERP A Product Of{" "}
              <a
                href="https://www.searchingyard.com"
                rel="noreferrer"
                target="_blank"
                className=" font-bold mr-2 text-theme hover:underline"
              >
                SearchingYard Software Group.
              </a>
              All rights reserved.
            </p>
          </footer>
        ) : (
          <></>
        )}
      </section>
    </PublicLayout>
  );
};

export default LoginCommon;
