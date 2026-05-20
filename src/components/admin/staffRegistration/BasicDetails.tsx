import { Done, RotateLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CountrySelector,
  PhotoUpload,
  TextInput,
} from "components/core";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { COUNTRIES, notify } from "utils";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const basicDetailsSchema = [
  {
    key: "3.5z5",
    name: "displayName",
    label: "Staff Name *",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Staff Name is required")
      .matches(/^[A-Za-z\s]*$/, "Only letters are allowed"),
  },
  {
    key: "3.5Z5",
    name: "email",
    label: "Email *",
    initialValue: "",
    type: "email",
    validationSchema: Yup.string().email().required("Email is required"),
  },
  {
    key: "2.5",
    name: "phoneNumber",
    label: "Phone Number *",
    initialValue: "",
    type: "number",
    validationSchema: Yup.string()
      .required("Phone Number is required")
      .min(10, "Minimum 10 digits required"),
  },
  {
    key: "3.5",
    name: "dob",
    label: "Date Of Birth *",
    validationSchema: Yup.date()
      .required("DOB is required ")
      .test("DOB", "Please choose a valid date of birth", (value) => {
        return dayjs().diff(dayjs(value), "years") >= 18;
      }),
    type: "date",
    initialValue: new Date(new Date().getFullYear() - 18, 1, -29)
      .toISOString()
      .split("T")[0],
  },

  {
    key: "2x",
    name: "gender",
    label: "Gender *",
    initialValue: "",
    type: "select",
    validationSchema: Yup.string().required("Gender is required"),
    options: [
      {
        label: "Male",
        value: "MALE",
        key: "4.1",
      },
      {
        label: "Female",
        value: "FEMALE",
        key: "4.2",
      },
      {
        label: "Other",
        value: "OTHER",
        key: "4.2",
      },
    ],
  },
  {
    key: "2",
    name: "caste",
    label: "Caste *",
    initialValue: "",
    type: "select",
    validationSchema: Yup.string().required("Caste is required"),
    options: [
      {
        label: "General",
        value: "GENERAL",
        key: "4.1",
      },
      {
        label: "OBC",
        value: "OBC",
        key: "4.2",
      },
      {
        label: "SC",
        value: "SC",
        key: "4.3",
      },
      {
        label: "ST",
        value: "ST",
        key: "4.5",
      },
      {
        label: "MINORITY",
        value: "MINORITY",
        key: "4.5",
      },
      {
        label: "EWS",
        value: "EWS",
        key: "4.5",
      },
      {
        label: "SEBC",
        value: "SEBC",
        key: "4.5",
      },
    ],
  },
  {
    key: "6fbgth",
    name: "country",
    label: "Choose Country *",
    initialValue: "",
    type: "select",
    validationSchema: Yup.string().required("Country is required."),
    options: COUNTRIES,
  },
  {
    key: "6fbgths",
    name: "role",
    label: "Choose Role *",
    initialValue: "",
    type: "select",
    validationSchema: Yup.string().required("Role is required."),
    options: [
      {
        key: 1,
        label: "Teaching Staffs",
        value: "TEACHER",
      },
      { key: 2, label: "Non Teaching Staffs", value: "STAFF" },
    ],
  },
];
const initialValues = basicDetailsSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  },
  {} as any
);

const validationSchema = basicDetailsSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);
const BasicDetails = ({ handleNext }: any) => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const [countryDetails, setCountryDetails] = useState({
    code: "IN",
    label: "India",
    phone: "91",
  });
  const [value, setValue] = useState<any>(
    "https://cdn-icons-png.flaticon.com/128/2534/2534879.png"
  );
  const { mutate: registration } = useFetch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        Swal.fire({
          title: "Are you sure?",
          text: "You added the data correctly!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Register!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            var data: any = await toast.promise(
              new Promise(async (resolve, reject) => {
                const formdata = new FormData();
                formdata.append("displayName", values?.displayName);
                formdata.append("email", values?.email);
                formdata.append("phoneNumber", values?.phoneNumber);
                formdata.append("gender", values?.gender);
                formdata.append("photo", value?.target?.files[0]);
                formdata.append("caste", values?.caste);
                formdata.append("dateOfBirth", values?.dob);
                formdata.append("countryCode", values?.country);
                formdata.append("role", values?.role);
                // formdata.append("country", values?.country);
                formdata.append("webUrl", `${window?.location?.origin}`);
                const response = await registration({
                  path: `staff/register`,
                  method: "POST",
                  body: formdata,
                  isFormData: true,
                });

                if (response?.data?.error) {
                  notify.error(response?.data?.error);
                  reject(response?.data?.error);
                  setLoading(false);
                  return;
                }
                setLoading(false);

                push(
                  {
                    pathname: "/panel/admin/staff/register",
                    query: { userId: `${response?.data?.data?._id}` },
                  },
                  undefined,
                  {
                    shallow: true,
                  }
                );

                notify.success(response?.data?.message);
                handleNext();
                resolve(response?.data?.message);
              }),
              {
                pending: "Registration is on progress",
                // success: "Promise resolved 👌",
                error: "Something went wrong ",
              }
            );
          }
          setLoading(false);
          setValue("");
          formik.resetForm();
          formik.setSubmitting(false);
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      {" "}
      <div
        className="!w-full"
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: "6vh",
        }}
      >
        {/* {!value ? (
      <span className="text-xs text-red-600 pl-4">
        {'Beneficiary Image Required'}
      </span>
    ) : (
      ''
    )} */}

        <span className="text-xs text-blue-600 pl-4">{"Add Staff Image"}</span>
      </div>
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: "2vh",
          marginBottom: "1vh",
        }}
      >
        <PhotoUpload
          variant={"circular"}
          className={"bg-slate-400"}
          //   required={true}
          value={value}
          onChange={setValue}
        />
      </div>
      <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
        {basicDetailsSchema?.map((items) => {
          // if (items.name === "phoneNumber") {
          //   return (
          //     <div className={`w-full col-span-6`} key={items?.key}>
          //       <p className="text-theme text-wider font-medium pb-2">
          //         {items.label}
          //       </p>
          //       <div className="w-full flex flex-col md:flex-row items-center gap-3">
          //         {items?.name === "phoneNumber" && (
          //           <div className="w-full md:w-2/5">
          //             <CountrySelector
          //               size={"small"}
          //               countryDetails={countryDetails}
          //               setCountryDetails={setCountryDetails}
          //             />
          //           </div>
          //         )}
          //         <div className="w-full">
          //           <TextField
          //             size="small"
          //             fullWidth
          //             name={items.name}
          //             variant="outlined"
          //             className="rounded-lg"
          //             value={formik.values[items.name]}
          //             onChange={(e) => {
          //               formik.setFieldValue(
          //                 items?.name,
          //                 e.target.value.replace(/[^0-9]/g, "")
          //               );
          //             }}
          //             onBlur={formik.handleBlur}
          //             error={
          //               formik.touched.phoneNumber &&
          //               Boolean(formik.errors.phoneNumber)
          //             }
          //             helperText={
          //               formik.touched.phoneNumber &&
          //               (formik.errors.phoneNumber as string)
          //             }
          //             InputProps={
          //               {
          //                 classes: {
          //                   root: " ",
          //                   notchedOutline: "notchedOutline",
          //                   input: "input-field",
          //                 },
          //               } as any
          //             }
          //             inputProps={{
          //               maxLength: "15",
          //             }}
          //           />
          //         </div>
          //       </div>
          //     </div>
          //   );
          // }
          return (
            <TextInput
              title={items?.label}
              key={items?.key}
              name={items?.name}
              type={items?.type as any}
              value={formik?.values[items?.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={items?.options}
              // rows={items?.rows}
              size="small"
              fullWidth
              // multiline={items?.multiline}
              error={Boolean(
                formik?.touched[items?.name] && formik?.errors[items?.name]
              )}
              helperText={
                formik?.touched[items?.name] &&
                (formik?.errors[items?.name] as any)
              }
              styleArea={`${
                // items?.multiline
                //   ? "col-span-12 md:col-span-12 !w-full"
                //   :
                "col-span-12 md:col-span-6 !w-full"
              }`}
              styleField="w-full col-span-12 overflow-hidden"
            />
          );
        })}
      </form>
      <div className="flex w-full gap-2 mt-8 justify-end px-4">
        <div className="text-end">
          <Button
            className="!bg-themeSecondary"
            type="reset"
            onClick={() => {
              formik.resetForm(),
                setValue(
                  "https://cdn-icons-png.flaticon.com/128/2534/2534879.png"
                );
            }}
            startIcon={<RotateLeft sx={{ color: "snow" }} />}
          >
            Reset
          </Button>
        </div>
        <div className="text-end">
          <Button
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting || !formik.isValid}
            loading={formik.isSubmitting || loading}
            startIcon={<Done />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
