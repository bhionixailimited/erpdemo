import { Done, RotateLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CountrySelector,
  PhotoUpload,
  TextInput,
} from "components/core";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { COUNTRIES, notify } from "utils";
import { useFetch, useSWRFetch } from "hooks";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { AdminType } from "types/institute";
const basicDetailsSchema = [
  {
    key: "0",
    name: "photo",
    type: "file",
    initialValue: "",
  },
  {
    key: "3.5z5",
    name: "displayName",
    label: "Name *",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Name is required"),
    // .matches(/^[A-Za-z\s]*$/, "Only letters are allowed"),
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
  // {
  //   key: "3.5",
  //   name: "dob",
  //   label: "Date Of Birth *",
  //   validationSchema: Yup.date()
  //     .required("DOB is required ")
  //     .test("DOB", "Please choose a valid date of birth", (value) => {
  //       return dayjs().diff(dayjs(value), "years") >= 18;
  //     }),
  //   type: "date",
  //   initialValue: new Date(new Date().getFullYear() - 18, 1, -29)
  //     .toISOString()
  //     .split("T")[0],
  // },

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
        key: "4edwewdf.5",
      },
      {
        label: "SEBC",
        value: "SEBC",
        key: "4ewfrwefr.5",
      },
      {
        label: "EWS",
        value: "EWS",
        key: "weferfw4.5",
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
  //   {
  //     key: "6fbgths",
  //     name: "role",
  //     label: "Choose Role *",
  //     initialValue: "",
  //     type: "select",
  //     validationSchema: Yup.string().required("Role is required."),
  //     options: [
  //       {
  //         key: 1,
  //         label: "Teaching Staffs",
  //         value: "TEACHER",
  //       },
  //       { key: 2, label: "Non Teaching Staffs", value: "STAFF" },
  //     ],
  //   },
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
type dataType = {
  data: AdminType;
};
const AddAdminForm = ({ role }: any) => {
  const { edit, editId } = useRouter().query;
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `user/details/${editId}`
  );

  useEffect(() => {
    data?.data && data?.data?.photoUrl;
  }, [data?.data, data?.data?.photoUrl, editId]);

  const [countryDetails, setCountryDetails] = useState({
    code: "IN",
    label: "India",
    phone: "91",
  });
  const [value, setValue] = useState<any>(
    data?.data?.photoUrl ||
      "https://cdn-icons-png.flaticon.com/128/2534/2534879.png"
  );
  const { mutate: registration } = useFetch();
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      ...data?.data,
      country: data?.data?.countryCode,
      dob: data?.data?.dateOfBirth,
      photo: data?.data?.photoUrl,
    },
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
          confirmButtonText: edit ? "Yes, Update!" : "Yes, Register!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            var data: any = await toast.promise(
              new Promise(async (resolve, reject) => {
                const formdata = new FormData();
                edit
                  ? formdata.append("name", values?.displayName)
                  : formdata.append("displayName", values?.displayName);
                formdata.append("email", values?.email);
                formdata.append("phoneNumber", values?.phoneNumber);
                formdata.append("gender", values?.gender);
                formdata.append("photo", values?.photo);
                formdata.append("caste", values?.caste);
                formdata.append("countryCode", values?.country);
                formdata.append("role", role?.toUpperCase());
                // formdata.append("country", values?.country);
                formdata.append("webUrl", `${window?.location?.origin}`);
                const response = await registration({
                  path: edit
                    ? `user/update/${editId}`
                    : `auth/management/register`,
                  method: edit ? "PUT" : "POST",
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

                // notify.success(response?.data?.message);
                // handleNext();
                notify.success(`${role?.toUpperCase()} created successfully`);
                resolve(response?.data?.message);
              }),
              {
                pending: edit
                  ? "Update is on progress"
                  : "Registration is on progress",
                // success: "Promise resolved 👌",
                error: "Something went wrong ",
              }
            );
          }
          mutate();
          setLoading(false);

          setValue(
            data?.data?.photoUrl ||
              "https://cdn-icons-png.flaticon.com/128/2534/2534879.png"
          );
          formik.resetForm();
          formik.setFieldValue("name", "");
          formik.setFieldValue("email", "");
          formik.setSubmitting(false);
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="pb-5 md:px-4 w-full">
      <form className="grid grid-cols-12 w-full md:px-4 gap-4 pt-3 px-2">
        {basicDetailsSchema?.map((items) => {
          return items?.name === "photo" ? (
            <div className="col-span-12">
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

                <span className="text-xs text-blue-600 ">{"Add Image"}</span>
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
                  value={
                    (formik.values.photo &&
                      (typeof formik.values.photo === "string"
                        ? formik.values.photo
                        : URL.createObjectURL(formik?.values?.photo))) ||
                    "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png"
                    // singleUser?.data?.photoUrl === isImage
                    //   ? singleUser?.data?.photoUrl
                    //   : isImage !== singleUser?.data?.photoUrl
                    //   ? URL?.createObjectURL(isImage)
                    //   : "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png"
                  }
                  onChange={(e: any) =>
                    formik?.setFieldValue(items?.name, e?.target?.files[0])
                  }
                />
              </div>
            </div>
          ) : (
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
              size="medium"
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
                !edit &&
                  setValue(
                    data?.data?.photoUrl ||
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
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAdminForm;
