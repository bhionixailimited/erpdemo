import { Done, RotateLeft } from "@mui/icons-material";
import { TextField } from "@mui/material";
import {
  Button,
  CountrySelector,
  TextInput,
  UploadFile,
} from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import DepartmentType from "types/department";
import DesignationType from "types/designation";
import { handleValidFormData, notify } from "utils";
import * as Yup from "yup";
type departmentType = {
  data: DepartmentType[];
};
type designationType = {
  data: DesignationType[];
};
const OtherDetails = ({ handleNext }: any) => {
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();
  const { data: department } = useSWRFetch<departmentType>("department");
  const { data: designation } = useSWRFetch<designationType>("designation");
  const basicDetailsSchema = useMemo(() => {
    return [
      {
        key: "3.5sxad",
        name: "photo",
        label: "Upload Aadhar Image ",
        initialValue: "",
        type: "file",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "3.5sxad1",
        name: "pan",
        label: "Upload Pan Card Image ",
        initialValue: "",
        type: "file",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "3.5sad",
        name: "aadharNumber",
        label: "Aadhaar Number",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .matches(/^[0-9]{12}$/, "Aadhaar number must be exactly 12 digits"),
      },
      {
        key: "3.5sad",
        name: "panNumber",
        label: "Pan Number",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "3ds",
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "3dxss",
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .min(10, "Field should be minimum 10 digits")
          .max(18, "Field Should be less than 18 digits"),
      },
      {
        key: "3ddsas",
        name: "employmentCode",
        label: "Employment Code",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "6fbg1q",
        name: "department",
        label: "Choose Department",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: department?.data?.map((data) => ({
          label: `${data?.title}`,
          value: `${data?._id}`,
          key: `${data?.title}`,
        })),
      },
      {
        key: "3dszxcs",
        name: "designation",
        label: "Designation",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: designation?.data?.map((data) => ({
          label: `${data?.title}`,
          value: `${data?._id}`,
          key: `${data?.title}`,
        })),
      },
      {
        key: "3ds",
        name: "experience",
        label: "Years Of Experience",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "3.5",
        name: "dateOfJoining",
        label: "Date Of Joining",
        initialValue: "",
        type: "date",
        validationSchema: Yup.string().optional(),
      },

      // {
      //   key: "6fbg2e",
      //   name: "state",
      //   label: "Choose State *",
      //   initialValue: "",
      //   type: "select",
      //   validationSchema: Yup.string().required("State is required."),
      //   options: STATES,
      // },
      {
        key: "6fbgvv",
        name: "city",
        label: "City",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "6xzxc",
        name: "pinCode",
        label: "Pin Code",
        initialValue: "",
        type: "number",

        validationSchema: Yup.string().optional().min(4, "Minimum  4 numbers."),
      },
      {
        key: "5",
        name: "address",
        label: "Address",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        multiline: true,
        rows: 4,
      },
    ];
  }, [department?.data, designation?.data]);
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
      // return;
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
              formdata.append("department", values?.department);
              formdata.append("designation", values?.designation);
              values?.experience &&
                formdata.append(
                  "experience",
                  new Date(
                    new Date().setFullYear(
                      new Date().getFullYear() - values?.experience
                    )
                  ).toISOString()
                );
              formdata.append("employmentCode", values?.employmentCode);

              values?.dateOfJoining &&
                formdata.append(
                  "dateOfJoining",
                  new Date(values?.dateOfJoining).toISOString()
                );

              const addressdata = new FormData();
              // addressdata.append("state", values?.state);
              addressdata.append("city", values?.city);
              addressdata.append("pinCode", values?.pinCode);
              addressdata.append("address", values?.address);
              addressdata.append("aadharNumber", values?.aadharNumber);
              addressdata.append("photo", values?.photo);
              addressdata.append("pan", values?.pan);

              addressdata.append("panNumber", values?.panNumber);
              addressdata.append(
                "emergencyContactNumber",

                values?.emergencyContactNumber
              );
              addressdata.append(
                "emergencyContactName",
                values?.emergencyContactName
              );
              const response = await registration({
                path: `staff/employee/${query?.userId}`,
                method: "POST",
                body: handleValidFormData(formdata),
                isFormData: true,
              });
              const response2 = await registration({
                path: `staff/address/${query?.userId}`,
                method: "POST",
                body: handleValidFormData(addressdata),
                isFormData: true,
              });
              if (response?.data?.error) {
                notify.error(response?.data?.error);
                reject(response?.data?.error);
                setLoading(false);
                return;
              }
              // console.log("response-->", response);
              if (response2?.data?.error) {
                notify.error(response2?.data?.error);
                reject(response2?.data?.error);
                setLoading(false);
                return;
              }
              // console.log("response2-->", response2);
              formik.resetForm();
              setLoading(false);
              push(
                {
                  pathname: "/panel/admin/staff/register",
                  query: { userIdAgain: `${query?.userId}` },
                },
                undefined,
                {
                  shallow: true,
                }
              );
              notify.success("Details Added Successfully");
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
      <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
        {basicDetailsSchema?.map((items) => {
          if (items?.type === "file") {
            return (
              <div
                className="w-full col-span-12 md:col-span-6 flex flex-col items-center"
                key={items?.key}
              >
                <h3 className="w-full font-medium tracking-wide text-base pb-2 text-theme">
                  {items?.label}
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
                      {(formik?.touched[items?.name] as any) &&
                      (typeof formik?.errors[items?.name] as any) === "string"
                        ? (formik?.errors[items?.name] as any)
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
              options={items?.options}
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
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
