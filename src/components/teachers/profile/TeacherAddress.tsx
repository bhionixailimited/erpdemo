import { Edit, Save } from "@mui/icons-material";
import {
  FormControl,
  SelectProps,
  Skeleton,
  TextFieldProps,
} from "@mui/material";
import { Button, InputField, UploadFile } from "components/core";
import { Field, Form, Formik } from "formik";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import UserType from "types/user";
import { COUNTRIES, autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

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
    label: "Full Name",
    name: "displayName",
    placeholder: "Enter Your First Name",
    type: "text",
    validationSchema: Yup.string()
      .required("required")
      .min(2, "Name must be at least 2 characters"),
    initialValue: "Alexa",
    required: true,
    lg: "col-span-12 lg:col-span-6",
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
    key: "6fbgth",
    name: "countryCode",
    label: "Choose Country *",
    initialValue: "",
    type: "select",
    validationSchema: Yup.string().required("Country is required."),
    option: COUNTRIES,
    required: true,
    lg: "col-span-12 lg:col-span-4",
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
    lg: "col-span-12 lg:col-span-8",
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
const TeacherAddress = () => {
  type dataType = {
    data: UserType;
  };
  const { user } = useAuth();
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    user?._id && `user/details/${user?._id}`
  );

  const { mutate: material } = useFetch();
  const handleUpdateAddress = async (values: any, submitProps: any) => {
    try {
      const response = await material({
        path: `user/account/update`,
        method: "PUT",
        body: autoAddFormdata({
          ...values,
          dateOfBirth: new Date(values.dateOfBirth).toISOString(),
        }),
        isFormData: true,
      });
      if (response?.data?.error) throw new Error(response?.data?.error);
      mutate();
      submitProps?.resetForm();
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
        Account Settings
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
                        ...data?.data,
                        photo: data?.data?.photoUrl,
                        dateOfBirth: data?.data?.dateOfBirth?.split("T")[0],
                      }
                    : initialValues
                }
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleUpdateAddress}
              >
                {(formik) => (
                  <Form className="grid grid-cols-12 gap-3">
                    {ProfileInfoSchema.map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
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
                            <div className={`w-full ${inputItem?.lg}`}>
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
                            </div>
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
                        <Button
                          type="button"
                          className="!bg-red-500 hover:ring-red-500 "
                          onClick={() => formik?.resetForm()}
                        >
                          Reset
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

export default TeacherAddress;
