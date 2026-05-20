import { Add, Done, RotateLeft, SkipNext } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CountrySelector,
  PhotoUpload,
  TextInput,
  UploadFile,
} from "components/core";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { COUNTRIES, handleValidFormData, notify } from "utils";
import { useFetch, useSWRFetch } from "hooks";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import DepartmentType from "types/department";
import DesignationType from "types/designation";
import STATES from "configs/state";
import { AddAdmissionDocumentDialog } from "../dialog";
type departmentType = {
  data: {
    data: DepartmentType[];
  };
};
type designationType = {
  data: DesignationType[];
};
const OtherDetails = ({ handleNext }: any) => {
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();

  const basicDetailsSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "aadhar",
        label: "Aadhar Image ",
        initialValue: "",
        type: "file",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "2",
        name: "aadharNumber",
        label: "Aadhaar Number ",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .matches(
            /^\d{12}$/,
            "Aadhaar Number must be exactly 12 digits & not be non-negative"
          )
          .optional(),
      },
      {
        key: "3",
        name: "fatherName",
        label: "Father Name",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string()
          .optional()
          .matches(/^[A-Za-z\s]*$/, "Only letters are allowed"),
      },
      {
        key: "4",
        name: "motherName",
        label: "Mother Name",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string()
          .optional()
          .matches(/^[A-Za-z\s]*$/, "Only letters are allowed"),
      },
      {
        key: "5",
        name: "fatherNumber",
        label: "Father Number",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .matches(
            /^\d+$/,
            "Phone number must contain only digits and non negative"
          )
          .min(10, "Phone number must have at least 10 digits"),
      },
      {
        key: "6",
        name: "motherNumber",
        label: "Mother Number",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .matches(
            /^\d+$/,
            "Phone number must contain only digits and non negative"
          )
          .min(10, "Phone number must have at least 10 digits")
          .max(18, "Phone number must have at least 18 digits"),
      },
      // {
      //   key: "7",
      //   name: "emergencyContactName",
      //   label: "Emergency Contact Name",
      //   initialValue: "",
      //   type: "text",
      //   validationSchema: Yup.string()
      //     .optional()
      //     .matches(/^[A-Za-z\s]*$/, "Only letters are allowed"),
      // },
      // {
      //   key: "8",
      //   name: "emergencyContactNumber",
      //   label: "Emergency Contact Number",
      //   initialValue: "",
      //   type: "number",
      //   validationSchema: Yup.string()
      //     .optional()
      //     .min(10, "Minimum 10 digits")
      //     .max(18, "Not more than 18 digits"),
      // },
      {
        key: "9",
        name: "parentEmail",
        label: "Parent Email ",
        initialValue: "",
        type: "email",
        validationSchema: Yup.string()
          .email("Should be a valid email address")
          .optional(),
      },
      {
        key: "16",
        name: "localGuardianName",
        label: "Local Guardian Name",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string()
          .optional()
          .matches(/^[A-Za-z\s]*$/, "Only letters are allowed"),
      },
      {
        key: "17",
        name: "localGuardianPhoneNumber",
        label: "Local Guardian Contact Number",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .matches(
            /^\d+$/,
            "Phone number must contain only digits and non negative"
          )
          .min(10, "Phone number must have at least 10 digits")
          .max(18, "Phone number must have at least 18 digits"),
      },
      {
        key: "18",
        name: "localGuardianRelation",
        label: "Local Guardian Relation",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string()
          .optional()
          .matches(/^[A-Za-z\s]*$/, "Only letters are allowed"),
      },
      {
        key: "19",
        name: "alternateStudentNumber",
        label: "Alternate Student Number",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .matches(
            /^\d+$/,
            "Phone number must contain only digits and non negative"
          )
          .min(10, "Phone number must have at least 10 digits")
          .max(18, "Phone number must have at least 18 digits"),
      },
      {
        key: "14",
        name: "address",
        label: "Permanent Address",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        multiline: true,
        rows: 4,
      },
      {
        key: "10",
        name: "state",
        label: "State (Permanent)",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        // options: STATES,
      },
      {
        key: "11",
        name: "district",
        label: "District (Permanent)",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "12",
        name: "city",
        label: "City (Permanent)",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "13",
        name: "pinCode",
        label: "Pin Code (Permanent)",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .matches(
            /^\d{6}$/,
            "PIN code must be exactly 6 digits and non negative"
          )
          .optional(),
      },

      {
        key: "15",
        name: "currentAddress",
        label: "Current Address",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        multiline: true,
        rows: 4,
      },
      //------
      {
        key: "10",
        name: "currentState",
        label: "State (Current)",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "11",
        name: "currentDistrict",
        label: "District (Current)",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "12",
        name: "currentCity",
        label: "City (Current)",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "13",
        name: "currentPinCode",
        label: "Pin Code (Current)",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .matches(
            /^\d{6}$/,
            "PIN code must be exactly 6 digits and non negative"
          )
          .optional(),
      },
      //-----------
      {
        key: "16",
        name: "localGuardianAddress",
        label: "Local Guardian Address",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        multiline: true,
        rows: 4,
      },
    ];
  }, []);
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
          text: "You added the data correctly!!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Add!",
        }).then(async (result) => {
          if (result.isConfirmed)
            new Promise(async (resolve, reject) => {
              const formdata = new FormData();
              formdata.append("city", values?.city);
              formdata.append("aadhar", values?.aadhar);
              formdata.append("aadharNumber", values?.aadharNumber);
              formdata.append("fatherName", values?.fatherName);
              formdata.append("motherName", values?.motherName);
              formdata.append("fatherNumber", values?.fatherNumber);
              formdata.append("motherNumber", values?.motherNumber);
              // formdata.append(
              //   "emergencyContactName",
              //   values?.emergencyContactName
              // );
              // formdata.append(
              //   "emergencyContactNumber",
              //   values?.emergencyContactNumber
              // );
              formdata.append("parentEmail", values?.parentEmail);
              formdata.append("localGuardianName", values?.localGuardianName);
              formdata.append(
                "localGuardianPhoneNumber",
                values?.localGuardianPhoneNumber
              );
              formdata.append(
                "localGuardianRelation",
                values?.localGuardianRelation
              );
              formdata.append(
                "alternateStudentNumber",
                values?.alternateStudentNumber
              );

              formdata.append("state", values?.state);
              formdata.append("district", values?.district);
              formdata.append("pinCode", values?.pinCode);
              formdata.append("address", values?.address);
              formdata.append("currentAddress", values?.currentAddress);

              formdata.append("currentCity", values?.currentCity);
              formdata.append("currentDistrict", values?.currentDistrict);
              formdata.append("currentState", values?.currentState);
              formdata.append("currentPinCode", values?.currentPinCode);

              formdata.append(
                "localGuardianAddress",
                values?.localGuardianAddress
              );

              const response = await registration({
                path: `student/address/${query?.userId}`,
                method: "POST",
                body: handleValidFormData(formdata),
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
                  pathname: "/panel/admin/admission/request",
                  query: { userIdAgain: `${query?.userId}` },
                },
                undefined,
                {
                  shallow: true,
                }
              );
              notify.success("Details Added Successfully");
              // console.log("-->", response?.data);
              formik.resetForm();
              handleNext();
              resolve(response?.data?.message);
            });
          setLoading(false);
          setValue("");

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
      <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
        {basicDetailsSchema?.map((items) => {
          if (items?.type === "file") {
            return (
              <div
                className="w-full md:w-3/6 col-span-12 flex flex-col items-center mx-auto"
                key={items?.key}
              >
                <h3 className="font-medium tracking-wide text-base p-2">
                  Upload Aadhaar Image *
                </h3>

                {
                  <>
                    <UploadFile
                      width={250}
                      height={200}
                      onChange={(e: any) =>
                        formik?.setFieldValue(items?.name, e?.target?.files[0])
                      }
                      url={
                        formik?.values[items?.name] &&
                        (typeof formik?.values[items?.name] === "string"
                          ? formik?.values[items?.name]
                          : URL.createObjectURL(formik?.values[items?.name]))
                      }
                    />
                    <p className="mt-1 text-red-600">
                      {formik.touched.aadhar &&
                      typeof formik.errors.aadhar === "string"
                        ? formik.errors.aadhar
                        : ""}
                    </p>
                    {/* <p className="mt-1">
                      (Enter data according to your excel sheet)
                    </p> */}
                  </>
                }
              </div>
            );
          } else if (items.name === "phoneNumber") {
            return (
              <div className={`w-full col-span-6`} key={items?.key}>
                <p className="text-theme text-wider font-medium pb-2">
                  {items.label}
                </p>
                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                  {items?.name === "phoneNumber" && (
                    <div className="w-full md:w-2/5">
                      <CountrySelector
                        size={"small"}
                        countryDetails={countryDetails}
                        setCountryDetails={setCountryDetails}
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <TextField
                      size="small"
                      fullWidth
                      name={items.name}
                      variant="outlined"
                      className="rounded-lg"
                      value={formik.values[items.name]}
                      onChange={(e) => {
                        formik.setFieldValue(
                          items?.name,
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                      helperText={
                        formik.touched.phoneNumber &&
                        (formik.errors.phoneNumber as string)
                      }
                      InputProps={
                        {
                          classes: {
                            root: " ",
                            notchedOutline: "notchedOutline",
                            input: "input-field",
                          },
                        } as any
                      }
                      inputProps={{
                        maxLength: "15",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          }
          return (
            <TextInput
              title={items?.label}
              key={items?.key}
              name={items?.name}
              type={items?.type as any}
              value={formik?.values[items?.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // options={items?.options}
              rows={items?.rows}
              size="small"
              fullWidth
              multiline={items?.multiline}
              error={Boolean(
                formik?.touched[items?.name] && formik?.errors[items?.name]
              )}
              helperText={
                formik?.touched[items?.name] &&
                (formik?.errors[items?.name] as any)
              }
              styleArea={`${
                items?.multiline
                  ? "col-span-12 md:col-span-12 !w-full"
                  : "col-span-12 md:col-span-6 !w-full"
              }`}
              styleField="w-full col-span-12 overflow-hidden"
            />
          );
        })}
      </form>
      <div className="flex w-full gap-2 mt-8 justify-end px-4">
        <div className="text-end">
          <Button
            className="!bg-sky-600 hover:!ring-sky-600"
            type="reset"
            onClick={() => {
              push(
                {
                  pathname: "/panel/admin/admission/request",
                  query: { userIdAgain: `${query?.userId}` },
                },
                undefined,
                {
                  shallow: true,
                }
              );
              handleNext();
            }}
            startIcon={<SkipNext sx={{ color: "snow" }} />}
          >
            Skip
          </Button>
        </div>
        <div className="text-end">
          <Button
            className="!bg-themeSecondary"
            type="reset"
            onClick={() => {
              formik.resetForm();
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
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
