import { Edit, Save } from "@mui/icons-material";
import {
  FormControl,
  SelectProps,
  Skeleton,
  TextFieldProps,
} from "@mui/material";
import { Button, InputField, UploadFile } from "components/core";
import STATES from "configs/state";
import { Field, Form, Formik } from "formik";
import { useApplyAuth, useAuth, useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import UserType from "types/user";
import { COUNTRIES, autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

const MyProfile = () => {
  const ProfileInfoSchema = [
    {
      key: "0",
      name: "photo",
      label: "",
      initialValue: "",
      type: "file",
    },
    {
      key: "1",
      label: "First Name",
      name: "firstName",
      placeholder: "Enter Your First Name",
      type: "text",
      validationSchema: Yup.string()
        .required("required")
        .min(2, "Name must be at least 2 characters"),
      initialValue: "Alexa",
      required: true,
      lg: "col-span-12 lg:col-span-4",
    },
    {
      key: "2dvfg",
      label: "Middle Name",
      name: "middleName",
      placeholder: "Enter Your Middle Name",
      type: "text",
      validationSchema: Yup.string()
        .required("required")
        .min(2, "Name must be at least 2 characters"),
      initialValue: "Alexa",
      required: true,
      lg: "col-span-12 lg:col-span-4",
    },
    {
      key: "3dfgdfvd",
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter Your Last Name",
      type: "text",
      validationSchema: Yup.string()
        .required("required")
        .min(2, "Name must be at least 2 characters"),
      initialValue: "Alexa",
      required: true,
      lg: "col-span-12 lg:col-span-4",
    },
    {
      key: "4",
      label: "Email",
      disabled: true,
      name: "email",
      placeholder: "Enter Email Address",
      type: "email",
      validationSchema: Yup.string()
        .required("required")
        .email("Invalid Email Address"),
      initialValue: "alexacarter@gmail.com",
      required: true,
      lg: "col-span-12 lg:col-span-6",
    },
    {
      key: "3",
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Enter Phone Number",
      type: "number",
      validationSchema: Yup.number()
        .required("required")
        .min(10, "Minimum 10 digits required"),
      initialValue: "23049237532",
      required: true,
      lg: "col-span-12 lg:col-span-6",
    },
    {
      key: "6fh",
      name: "countryName",
      label: "Choose Country *",
      initialValue: "",
      type: "country",
      validationSchema: Yup.string().required("Country is required."),
      required: true,
      lg: "col-span-12 lg:col-span-4",
    },
    {
      key: "6fhw",
      name: "stateName",
      label: "Choose State *",
      initialValue: "",
      type: "state",
      validationSchema: Yup.mixed().required("State is required."),
      // option: STATES,
      required: true,
      lg: "col-span-12 lg:col-span-4",
    },
    {
      key: "6fh6y",
      name: "cityName",
      label: "Choose City *",
      initialValue: "",
      type: "city",
      validationSchema: Yup.mixed().required("City is required."),
      // option: STATES,
      required: true,
      lg: "col-span-12 lg:col-span-4",
    },

    {
      key: "1sasad",
      label: "Date Of Birth",
      name: "dateOfBirth",
      placeholder: "Enter Your Date Of Birth",
      type: "date",
      validationSchema: Yup.string().optional(),
      required: true,
      lg: "col-span-12 lg:col-span-6",
    },
    {
      key: "5",
      label: "Gender",
      name: "gender",
      placeholder: "Enter State Name",
      type: "select",
      validationSchema: Yup.string().required("required"),
      initialValue: "Demo state",
      required: true,
      lg: "col-span-12 lg:col-span-6",
      option: [
        {
          key: "1",
          label: "MALE",
          value: "MALE",
        },
        {
          key: "1ds",
          label: "FEMALE",
          value: "FEMALE",
        },
        { key: "sdd", label: "OTHER", value: "OTHER" },
      ],
    },
  ];

  type dataType = {
    data: UserType;
  };
  const { user, getUser, isUserLoading } = useApplyAuth();
  console.log(user, "User Data");

  const { data, mutate, isValidating } = useSWRFetch<dataType>();

  const { mutate: material } = useFetch();
  const handleUpdateAddress = async (values: any, submitProps: any) => {
    try {
      var formdata = new FormData();
      formdata.append("passportPhoto", values?.photo);
      formdata.append("studentFirstName", values?.firstName);
      formdata.append("studentMiddleName", values?.middleName);
      formdata.append("studentLastName", values?.lastName);
      formdata.append("studentPhoneNumber", values?.phoneNumber);
      formdata.append("studentCurrentCountry", values?.countryName);
      formdata.append("studentCurrentState", values?.stateName);
      formdata.append("studentCurrentDistrict", values?.cityName);
      formdata.append("studentGender", values?.gender);
      formdata.append(
        "studentDateOfBirth",
        new Date(values?.dateOfBirth).toISOString()
      );
      const response = await material({
        path: `registration/${user?._id}`,
        method: "PUT",
        body: formdata,
        isFormData: true,
      });
      if (response?.data?.error) throw new Error(response?.data?.error);
      mutate();
      getUser();

      // submitProps?.resetForm();
      // notify.success(response?.data?.message);
      notify.success("Account updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        notify.error(err?.message);
      } else {
        notify.error("Oops! Something went wrong ");
      }
    }
  };
  const initialValues = ProfileInfoSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = ProfileInfoSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  return (
    <div className="w-full bg-white rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <p className="font-semibold text-themeDarkBlue text-2xl pt-5 px-5 border-b">
        My Profile
      </p>
      <div className="px-5 pb-6">
        {isValidating ? (
          <div className="flex flex-col gap-4 max-w-5xl mx-auto py-8 px-4 bg-white ">
            <Skeleton variant="rounded" height={200} animation="wave" />
            <div className="   grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
              {Array(5)
                .fill(0)
                ?.map((item, index) => (
                  <span className="flex flex-col md:flex-row gap-4" key={index}>
                    <Skeleton variant="text" width={80} animation="wave" />
                    <Skeleton variant="rounded" height={50} animation="wave" />
                  </span>
                ))}
            </div>
          </div>
        ) : (
          <FormControl sx={{ width: "100%" }}>
            <div className="flex flex-col w-full pt-8 gap-3">
              <Formik
                enableReinitialize
                initialValues={
                  user
                    ? {
                        photo: user?.passportSizePhotoUrl,
                        email: user?.email,
                        phoneNumber: user?.studentPhoneNumber,
                        firstName: user?.studentFirstName,
                        middleName: user?.studentMiddleName,
                        lastName: user?.studentLastName,
                        countryName: user?.studentCurrentCountry,
                        stateName: user?.studentCurrentState,
                        cityName: user?.studentCurrentDistrict,
                        gender: user?.studentGender,
                        dateOfBirth: user?.studentDateOfBirth
                          ? new Date(user?.studentDateOfBirth)
                              .toISOString()
                              ?.split("T")[0]
                          : "",
                      }
                    : initialValues
                }
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleUpdateAddress}
              >
                {(formik) => (
                  <Form className="grid grid-cols-12 gap-3">
                    {ProfileInfoSchema.map((inputItem, i) => (
                      <Field name={inputItem.name} key={i}>
                        {(props: {
                          meta: { touched: any; error: any };
                          field: JSX.IntrinsicAttributes &
                            TextFieldProps &
                            SelectProps;
                        }) => {
                          if (inputItem?.type === "file") {
                            return (
                              <div
                                className="flex items-center w-full col-span-12 m-auto justify-center "
                                key={inputItem?.key}
                              >
                                <UploadFile
                                  variant="circular"
                                  outerClassName="rounded-full"
                                  className="!w-[15rem] !h-[15rem] !rounded-full !object-contain"
                                  url={
                                    formik.values.photo &&
                                    (typeof formik.values.photo === "string"
                                      ? formik.values.photo
                                      : URL.createObjectURL(
                                          formik?.values?.photo
                                        ))
                                  }
                                  onChange={(e: any) =>
                                    formik?.setFieldValue(
                                      "photo",
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </div>
                            );
                          }
                          return (
                            <>
                              <div className={`w-full ${inputItem?.lg}`}>
                                {inputItem?.type === "country" ? (
                                  <>
                                    <p className="tracking-wider font-semibold pb-2">
                                      {inputItem?.label}
                                    </p>
                                    <InputField
                                      className="bg-white"
                                      type="select"
                                      fullWidth
                                      name="countryName"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.countryName}
                                      error={
                                        formik.touched?.countryName &&
                                        Boolean(formik.errors?.countryName)
                                      }
                                      helperText={
                                        (formik.touched?.countryName &&
                                          formik.errors?.countryName) as string
                                      }
                                      options={COUNTRIES?.map((item) => {
                                        return {
                                          key: item?.code,
                                          label: item?.label,
                                          value: item?.label,
                                        };
                                      })}
                                    />
                                  </>
                                ) : inputItem?.type === "state" ? (
                                  <>
                                    <p className="tracking-wider font-semibold pb-2">
                                      {inputItem?.label}
                                    </p>
                                    <InputField
                                      className="bg-white"
                                      type="select"
                                      fullWidth
                                      name="stateName"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.stateName}
                                      error={
                                        formik.touched?.stateName &&
                                        Boolean(formik.errors?.stateName)
                                      }
                                      helperText={
                                        (formik.touched?.stateName &&
                                          formik.errors?.stateName) as string
                                      }
                                      options={STATES.map((inputItem) => {
                                        return {
                                          key: inputItem?.state,
                                          label: inputItem.state,
                                          value: inputItem.state,
                                        };
                                      })}
                                    />
                                  </>
                                ) : inputItem?.type === "city" ? (
                                  <>
                                    <p className="tracking-wider font-semibold pb-2">
                                      {inputItem?.label}
                                    </p>
                                    <InputField
                                      className="bg-white"
                                      type="select"
                                      fullWidth
                                      name="cityName"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cityName}
                                      error={
                                        formik.touched?.cityName &&
                                        Boolean(formik.errors?.cityName)
                                      }
                                      helperText={
                                        (formik.touched?.cityName &&
                                          formik.errors?.cityName) as string
                                      }
                                      options={STATES?.find((inputItem) => {
                                        return (
                                          inputItem?.state ===
                                          formik.values.stateName
                                        );
                                      })?.districts?.map((inputItem) => {
                                        return {
                                          key: inputItem,
                                          label: inputItem,
                                          value: inputItem,
                                        };
                                      })}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <p className="tracking-wider font-semibold pb-2">
                                      {inputItem.label}
                                    </p>
                                    <InputField
                                      fullWidth
                                      required={inputItem?.required}
                                      placeholder={inputItem.placeholder}
                                      type={inputItem.type as any}
                                      className={`w-full ${
                                        inputItem.type === "textArea" &&
                                        "mui-multi-row"
                                      }`}
                                      error={Boolean(
                                        props.meta.touched && props.meta.error
                                      )}
                                      helperText={
                                        props.meta.touched && props.meta.error
                                      }
                                      disabled={inputItem?.disabled}
                                      options={inputItem?.option}
                                      InputProps={
                                        {
                                          classes: {
                                            notchedOutline: "notchedOutline",
                                            input: "input-field",
                                          },
                                          // readOnly: !edit,
                                        } as any
                                      }
                                      {...(props.field as any)}
                                    />
                                  </>
                                )}
                              </div>
                            </>
                          );
                        }}
                      </Field>
                    ))}
                    <div className="flex mt-4 col-span-12 items-center justify-center  gap-4 ">
                      <>
                        <Button
                          className="!bg-green-500 hover:ring-green-500 "
                          loading={formik?.isSubmitting}
                          startIcon={<Save />}
                        >
                          Save
                        </Button>
                      </>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </FormControl>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
