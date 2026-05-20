import { LoadingButton } from "@mui/lab";
import {
  MenuItem,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { CONTACTLOTTIE } from "assets/animations";
import { ContactUsBg } from "assets/backgrounds";
import { Field, Form, Formik } from "formik";
import { normalMailBody } from "helper/MailTemplate";
import Lottie from "components/core/ClientLottie";
import Swal from "sweetalert2";
import * as Yup from "yup";

const RepairAddressSchema = [
  {
    key: "1",
    label: <span className="text-white">First Name:</span>,
    name: "firstName",
    placeholder: "Enter Your Name",
    type: "text",
    validationSchema: Yup.string()
      .matches(/^[a-zA-Z ]*$/, "Must be character")
      .required("required")
      .min(2, "Name must be at least 2 characters"),
    initialValue: "",
    required: true,
    lg: "lg:col-span-6 col-span-12",
  },
  {
    key: "2",
    label: <span className="text-white">Last Name:</span>,
    name: "lastName",
    placeholder: "Enter Your Name",
    type: "text",
    validationSchema: Yup.string()
      .strict(true)
      .required("required")
      .matches(/^[a-zA-Z ]*$/, "Must be character")
      .min(2, "Name must be at least 2 characters"),
    initialValue: "",
    required: true,
    lg: "col-span-12 lg:col-span-6",
  },

  {
    key: "3",
    label: <span className="text-white">Email Address:</span>,
    name: "email",
    placeholder: "Enter Email Address",
    type: "email",
    validationSchema: Yup.string()
      .required("required")
      .email("Invalid Email Address"),
    initialValue: "",
    required: true,
    lg: "col-span-12",
  },
  {
    key: "4",
    label: <span className="text-white">Institution:</span>,
    name: "institution",
    placeholder: "Enter House Number",
    type: "text",
    validationSchema: Yup.string().required("required"),
    initialValue: "",
    required: true,
    lg: "col-span-12",
  },
  {
    key: "5",
    label: <span className="text-white">Phone Number:</span>,
    name: "phone",
    placeholder: "Enter Street Name",
    type: "number",
    validationSchema: Yup.string().required("required"),
    initialValue: "",
    required: true,
    lg: "col-span-12 lg:col-span-12",
  },
  {
    key: "6",
    label: <span className="text-white">How Did You Hear About Us?</span>,
    name: "aboutUs",
    type: "select",
    validationSchema: Yup.string().required("required"),
    initialValue: "",
    required: true,
    lg: "col-span-12 lg:col-span-12",
    options: [
      {
        key: "1",
        label: "Google",
        value: "google",
      },
      {
        key: "2",
        label: "Facebook",
        value: "facebook",
      },
      {
        key: "3",
        label: "Instagram",
        value: "instagram",
      },
      {
        key: "4",
        label: "Website",
        value: "website",
      },
      {
        key: "5",
        label: "From Person",
        value: "person",
      },
      {
        key: "6",
        label: "Others",
        value: "others",
      },
    ],
  },
  // {
  //   key: "7",
  //   label: <div>Solution Area of Interest:</div>,
  //   name: "solution",
  //   type: "select",
  //   validationSchema: Yup.string().required("required"),
  //   initialValue: "",
  //   // options: STATES.map((state) => ({
  //   //   key: state,
  //   //   value: state,
  //   // })),
  //   required: true,
  //   lg: "col-span-12",
  // },
];
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: CONTACTLOTTIE,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const initialValues = RepairAddressSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);
const validationSchema = RepairAddressSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: Yup.StringSchema }
);
const ContactUs = () => {
  const handleUpdateAddress = async (
    values: any,
    props: { resetForm: () => void }
  ) => {
    try {
      const contactValue = {
        firstName: `${values?.firstName}`,
        lastName: `${values?.lastName}`,
        email: `${values?.email}`,
        institution: `${values?.institution}`,
        phone: `${values?.phone}`,
        aboutUs: `${values?.aboutUs}`,
        updatedAt: new Date().toString(),
      };

      // database.ref("/contact").push();
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: values.email,
          subject: "Thanks For Contacting Us",
          html: normalMailBody(
            "Thanks for contacting us. Our team will get back to you soon.",
            values.firstName
          ),
          contactData: contactValue,
        }),
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your request has been submitted successfully",
      });
    } catch (error) {
      console.log({ error });
    } finally {
      props.resetForm();
    }
  };
  return (
    <section
      className="w-full"
      style={{
        backgroundImage: `url(${ContactUsBg.src})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      id="contactUs"
    >
      <div className="main-container w-full flex flex-col md:flex-row pt-16 pb-6 justify-between md:gap-10 gap-5 md:py-16">
        <div className="md:w-1/2 w-full flex flex-col gap-2">
          <p className="md:text-3xl text-xl font-semibold text-white">
            Demo/info Request Form
          </p>
          <p className="md:text-base text-sm text-white leading-5 md:leading-6">
            {`Take the next step toward your organization's success with YardErp. A YardErp expert will reach out to schedule a
            customized demo.`}
          </p>
          <div className="md:flex hidden">
            <Lottie options={defaultOptions} height={500} width={500} />
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleUpdateAddress}
          >
            {(formik) => (
              <Form className="grid grid-cols-12 gap-3">
                {RepairAddressSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes &
                        TextFieldProps &
                        SelectProps;
                    }) => {
                      if (inputItem.type === "select") {
                        return (
                          <div
                            className={`w-full create-your-event ${inputItem?.lg}`}
                          >
                            <p className=" tracking-wider font-semibold pb-2 !text-white">
                              {inputItem.label}
                            </p>
                            <TextField
                              fullWidth
                              select
                              id="outlined-select-currency"
                              className="rounded-lg"
                              required={inputItem?.required}
                              value={formik.values[inputItem.name]}
                              error={Boolean(
                                props.meta.touched && props.meta.error
                              )}
                              InputProps={
                                {
                                  classes: {
                                    root: " ",
                                    notchedOutline: "contactus-textfield",
                                    input: "contactus-textfield-input",
                                  },
                                } as any
                              }
                              {...props.field}
                            >
                              {inputItem?.options?.map((option) => (
                                <MenuItem key={option.key} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        );
                      }
                      return (
                        <div className={`w-full ${inputItem?.lg}`}>
                          <p className="tracking-wider font-semibold pb-2">
                            {inputItem.label}
                          </p>
                          <TextField
                            fullWidth
                            required={inputItem?.required}
                            type={inputItem.type}
                            className={`w-full ${
                              inputItem.type === "textArea" && "mui-multi-row"
                            }`}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            InputProps={
                              {
                                classes: {
                                  notchedOutline: "contactus-textfield",
                                  input: "contactus-textfield-input",
                                },
                              } as any
                            }
                            {...props.field}
                          />
                        </div>
                      );
                    }}
                  </Field>
                ))}
                <div className="flex md:flex-row flex-col justify-center mt-4 col-span-12 gap-5 2xl:gap-3">
                  {/* <div className="md:!w-1/2 w-full">
                    <ReCAPTCHA
                      // className="opacity-[100] !w-[10rem]"
                      sitekey="6Ldf_KgjAAAAANQKfgJ5um6YX5870GaTwRtwCQUU"
                      onChange={handleNotARobot}
                      size="normal"
                    />
                  </div> */}
                  <div className="md:w-1/2 w-full h-24 md:h-auto">
                    <LoadingButton
                      className="w-full !flex !items-center !justify-center !capitalize !text-center !bg-white !text-theme !text-lg h-full"
                      type="submit"
                      loading={formik.isSubmitting}
                      disabled={formik.isSubmitting || !formik.isValid}
                      loadingPosition="center"
                    >
                      Send Request
                    </LoadingButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
