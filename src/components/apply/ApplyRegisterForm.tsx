import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { COUNTRIES, notify } from "utils";
import { Button } from "components/core";
import { Checkbox } from "@mui/material";
import STATES from "configs/state";
import { useFetch, useSWRFetch } from "hooks";
import { IProgramme } from "types/programme";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(" Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required(" Email is required"),
  phoneNumber: Yup.string().required(" Phone Number is required"),
  countryCode: Yup.string().required(" Country is required"),
  state: Yup.string().required(" State is required"),
  city: Yup.string().required(" City is required"),
  programme: Yup.string().required("Programme is required"),
  isAgree: Yup.boolean().oneOf([true], "Please accept terms and conditions"),
});

const ApplyRegisterForm = ({
  setIsRegistering,
}: {
  setIsRegistering?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate } = useFetch();

  const { data } = useSWRFetch<{ data: IProgramme[] }>("programme");

  const handleSubmit = async (values: any, props: any) => {
    try {
      if (!values?.isResend) {
        const response = await mutate({
          path: "registration",
          method: "POST",
          body: JSON.stringify({
            name: values?.name,
            email: values?.email,
            countryCode: values?.countryCode,
            phoneNumber: values?.phoneNumber,
            state: values?.state,
            city: values?.city,
            programme: values?.programme,
            isAgree: values?.isAgree,
          }),
        });

        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        return;
      }

      const response = await mutate({
        path: "registration/resend-link",
        method: "POST",
        body: JSON.stringify({
          email: values?.email,
          phoneNumber: values?.phoneNumber,
        }),
      });

      if (response?.data?.error) throw new Error(response?.data?.error);
      notify.success(response?.data?.message);
    } catch (error) {
      notify.error(
        error instanceof Error ? error?.message : "Something went wrong!"
      );
    } finally {
      // props.resetForm();
    }
  };

  return (
    <section className="w-full lg:px-8 px-2 ">
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          state: "",
          city: "",
          programme: "",
          isAgree: false,
          countryCode: "91",
          isResend: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          touched,
          errors,
          isSubmitting,
          values,
          setFieldValue,
          handleSubmit: handleFormSubmit,
        }) => (
          <Form className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">
                Name <span className="text-red-500">*</span>
              </label>

              <Field
                type="text"
                name="name"
                placeholder="Enter your name"
                className={`w-full font-normal outline-none ring-1 rounded-md ${
                  touched.name && errors.name ? "ring-red-500" : "ring-gray-300"
                } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                style={{
                  borderColor:
                    touched.name && errors.name ? "#EF4444" : "#D1D5DB",
                }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="email"
                placeholder="Enter your  email"
                className={`w-full font-normal outline-none ring-1 rounded-md ${
                  touched.email && errors.email
                    ? "ring-red-500"
                    : "ring-gray-300"
                } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                style={{
                  borderColor:
                    touched.email && errors.email ? "#EF4444" : "#D1D5DB",
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Field
                  as="select"
                  name="countryCode"
                  className={`w-[40%] font-normal outline-none ring-1 rounded-md ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "ring-red-500"
                      : "ring-gray-300"
                  } hover:ring-gray-800 focus:ring-blue-400 py-2 px-1`}
                  style={{
                    borderColor:
                      touched.phoneNumber && errors.phoneNumber
                        ? "#EF4444"
                        : "#D1D5DB",
                  }}
                  value={values?.countryCode}
                >
                  <option value="">Select</option>
                  {COUNTRIES.map((item, index) => (
                    <option
                      key={index}
                      className="w-full"
                      value={`${item.phone}`}
                    >
                      {item.phone}-{item.label}
                    </option>
                  ))}
                </Field>
                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your  phone number"
                  className={`w-full font-normal outline-none ring-1 rounded-md ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "ring-red-500"
                      : "ring-gray-300"
                  } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                  style={{
                    borderColor:
                      touched.phoneNumber && errors.phoneNumber
                        ? "#EF4444"
                        : "#D1D5DB",
                  }}
                />
              </div>
              <ErrorMessage
                name="countryCode"
                component="div"
                className="text-red-500 text-sm"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex items-start justify-between  gap-4 flex-col md:flex-row  ">
              <div className="flex w-full flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">
                  Choose State <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="state"
                  placeholder="Choose state"
                  className={`w-full font-normal outline-none ring-1 rounded-md ${
                    touched.state && errors.state
                      ? "ring-red-500"
                      : "ring-gray-300"
                  } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                  style={{
                    borderColor:
                      touched.state && errors.state ? "#EF4444" : "#D1D5DB",
                  }}
                  onClick={() => {
                    setFieldValue("city", "");
                  }}
                >
                  <option value="">Select</option>
                  {STATES?.map((item, index) => (
                    <option
                      key={index}
                      className="w-full capitalize"
                      value={`${item?.state}`}
                    >
                      {item?.state}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex w-full flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">
                  Choose City <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="city"
                  placeholder="Enter confirm password"
                  className={`w-full font-normal outline-none ring-1 rounded-md ${
                    touched.city && errors.city
                      ? "ring-red-500"
                      : "ring-gray-300"
                  } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                  style={{
                    borderColor:
                      touched.city && errors.city ? "#EF4444" : "#D1D5DB",
                  }}
                  disabled={!values?.state}
                >
                  <option value="">Select</option>
                  {STATES?.find(
                    (INNER) => INNER?.state === values?.state
                  )?.districts?.map((item, index) => (
                    <option
                      key={index}
                      className="w-full capitalize"
                      value={`${item}`}
                    >
                      {item}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex items-start justify-between  gap-4  ">
              <div className="flex w-full flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">
                  Select Programmes <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="programme"
                  placeholder="Choose programme"
                  className={`w-full font-normal outline-none ring-1 rounded-md ${
                    touched.programme && errors.programme
                      ? "ring-red-500"
                      : "ring-gray-300"
                  } hover:ring-gray-800 focus:ring-blue-400 py-2 px-5`}
                  style={{
                    borderColor:
                      touched.programme && errors.programme
                        ? "#EF4444"
                        : "#D1D5DB",
                  }}
                >
                  <option value="">Select</option>
                  {data?.data?.map((item, index) => (
                    <option
                      key={index}
                      className="w-full capitalize"
                      value={`${item?._id}`}
                    >
                      {item?.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="programme"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-start">
                <Checkbox
                  checked={values?.isAgree || false}
                  onClick={() => setFieldValue("isAgree", !values?.isAgree)}
                />
                <small>
                  I agree to receive information by signing up on Poddar Group
                  of Institutions. *
                </small>
              </div>
              <ErrorMessage
                name="isAgree"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <span className="flex items-center justify-center flex-col md:flex-row gap-2">
              Already have an account ?{" "}
              <button
                className="text-sm font-semibold text-primary"
                onClick={() => setIsRegistering?.((prev) => !prev)}
              >
                Login now
              </button>
            </span>
            <div className="flex  w-full justify-center">
              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Sign Up
              </Button>
            </div>
            <span className="flex items-center justify-center flex-col md:flex-row gap-2">
              Resend Verification Code
              <button
                className="text-sm font-semibold text-primary"
                type="button"
                onClick={() => {
                  setFieldValue("isResend", true);
                  handleFormSubmit();
                }}
              >
                Resend
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ApplyRegisterForm;
