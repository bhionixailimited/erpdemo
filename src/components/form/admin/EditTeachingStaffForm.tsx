import { Add, Done, RotateLeft } from "@mui/icons-material";
import { Skeleton, Tooltip } from "@mui/material";
import { Button, InputField, UploadFile } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useMemo, useRef, useState } from "react";
import DepartmentType from "types/department";
import DesignationType from "types/designation";
import { COUNTRIES, autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
type departmentType = {
  data: DepartmentType[];
};
type designationType = {
  data: DesignationType[];
};

const EditTeachingStaffForm = ({
  staffId,
  onClose,
  mutate,
}: {
  staffId?: any;
  onClose?: any;
  mutate?: any;
}) => {
  const { mutate: UPDATE } = useFetch();
  const { data: department } = useSWRFetch<departmentType>("department");
  const { data: designation } = useSWRFetch<designationType>("designation");
  const { data: singleUser, isValidating } = useSWRFetch<any>(
    `${
      staffId &&
      `user/details/${staffId?._id}?bank=true&employee=true&address=true`
    }`
  );
  // console.log("singleUser-->", singleUser?.data?.bankDetails);
  const basicDetailsSchema = useMemo(() => {
    return [
      {
        key: "0",
        name: "photo",
        type: "file",
        initialValue: "",
      },
      {
        key: "1",
        name: "displayName",
        label: "Staff Name *",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().required("Staff Name is required"),
      },
      {
        key: "2",
        name: "email",
        label: "Email *",
        initialValue: "",
        type: "email",
        validationSchema: Yup.string().email().required("Email is required"),
        disabled: true,
      },
      {
        key: "3",
        name: "phoneNumber",
        label: "Phone Number *",
        initialValue: "",
        type: "number",
        validationSchema: Yup.number()
          .optional()
          .min(10, "Minimum 10 digits required")
          .nullable(),
      },
      {
        key: "4",
        name: "dob",
        label: "Date Of Birth ",
        validationSchema: Yup.date()
          .optional()
          .test(
            "DOB",
            "Please choose a valid date of birth(must be above 18 years)",
            (value) => {
              return Boolean(
                value && dayjs().diff(dayjs(value), "years") >= 18
              );
            }
          )
          .nullable(),
        type: "date",
        initialValue: new Date(new Date().getFullYear() - 18, 1, -29)
          .toISOString()
          .split("T")[0],
      },

      {
        key: "2x",
        name: "gender",
        label: "Gender ",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional().nullable(),
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
        ],
      },
      {
        key: "2",
        name: "caste",
        label: "Caste ",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().required("Caste is required"),
        options: [
          {
            label: "GENERAL",
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
        name: "countryCode",
        label: "Choose Country *",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional().nullable(),
        options: COUNTRIES.sort((a, b) => a.label.localeCompare(b.label)),
      },
      {
        key: "3.5sad",
        name: "aadharNumber",
        label: "Aadhaar Number ",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .matches(/^[0-9]{12}$/, "Aadhaar number must be exactly 12 digits"),
      },
      {
        key: "3.5sxad",
        name: "aadhar",
        label: "Upload Aadhar Image ",
        initialValue: "",
        type: "file",
        validationSchema: Yup.string().optional().nullable(),
      },

      {
        key: "3.5sxad",
        name: "pan",
        label: "Upload Pan Image ",
        initialValue: "",
        type: "file",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "3.5sad",
        name: "panNumber",
        label: "Pan Number",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "3ds",
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "3dxss",
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        initialValue: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: "3ddsas",
        name: "employmentCode",
        label: "Employment Code",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "6fbg1q",
        name: "department",
        label: "Choose Department",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional().nullable(),
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
        validationSchema: Yup.string().optional().nullable(),
        options: designation?.data
          ?.map((data) => ({
            label: `${data?.title}`,
            value: `${data?._id}`,
            key: `${data?.title}`,
          }))
          .sort((a, b) => a.label.localeCompare(b.label)),
      },
      {
        key: "3ds",
        name: "yearOfExperience",
        label: "Years Of Experience",
        initialValue: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: "3.5",
        name: "dateOfJoining",
        label: "Date Of Joining",
        initialValue: "",
        type: "date",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "3.5",
        name: "dateOfResignation",
        label: "Date Of Resignation",
        initialValue: "",
        type: "date",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "6fbgvv",
        name: "city",
        label: "City",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "6xzxc",
        name: "pinCode",
        label: "Pin Code",
        initialValue: "",
        type: "number",
        validationSchema: Yup.number()
          .optional()
          .min(4, "Minimum  4 numbers.")
          .nullable(),
      },
      {
        key: "5",
        name: "address",
        label: "Address",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
        multiline: true,
        rows: 4,
      },
      {
        key: "",
        name: "accountHolderName",
        label: "Account Holder Name",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "",
        name: "bankName",
        label: "Bank Name",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "2.5",
        name: "accountNumber",
        label: "Account Number",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: "2.5",
        name: "ifscCode",
        label: "IFSC Code ",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
      },
      {
        key: "3.5sxa55",
        name: "passbook",
        label: "Upload Passbook Image ",
        initialValue: "",
        type: "file",
        validationSchema: Yup.string().optional().nullable(),
      },
    ];
  }, [department?.data, designation?.data]);

  const initialValues = basicDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = basicDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const [isImage, setIsImage] = useState(null);
  const upload_picture = useRef<any>();
  const onButtonPress = () => {
    upload_picture?.current && upload_picture?.current?.click();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      ...singleUser?.data,
      ...singleUser?.data?.bankDetails,
      ...singleUser?.data?.addressDetails,
      ...singleUser?.data?.employeeDetails,
      aadhar: singleUser?.data?.addressDetails?.aadharImageUrl,
      passbook: singleUser?.data?.bankDetails?.passbookImageUrl,
      pan: singleUser?.data?.addressDetails?.panImageUrl,
      department: singleUser?.data?.employeeDetails?.department?._id,
      designation: singleUser?.data?.employeeDetails?.designation?._id,
      photo: singleUser?.data?.photoUrl,
      dob: singleUser?.data?.dateOfBirth?.split("T")[0],
      dateOfJoining:
        singleUser?.data?.employeeDetails?.dateOfJoining?.split("T")[0],
      dateOfResignation:
        singleUser?.data?.employeeDetails?.dateOfResignation?.split("T")[0],
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // return;
      try {
        const response = await UPDATE({
          path: `user/update/${staffId?._id}`,
          method: "PUT",
          body: autoAddFormdata({
            ...values,
            name: values?.displayName,
            phoneNumber: Number(values?.phoneNumber),
            accountHolderName: values?.accountHolderName
              ? values?.accountHolderName
              : "",
            bankName: values?.bankName ? values?.bankName : "",
            accountNumber: values?.accountNumber ? values?.accountNumber : "",
            ifscCode: values?.ifscCode ? values?.ifscCode : "",
            dateOfBirth: new Date(values?.dob).toISOString(),
            dateOfJoining:
              values?.dateOfJoining &&
              new Date(values?.dateOfJoining).toISOString(),
            dateOfResignation:
              values?.dateOfResignation &&
              new Date(values?.dateOfResignation).toISOString(),
            experience: new Date(
              new Date().setFullYear(
                new Date().getFullYear() - values?.yearOfExperience
              )
            ).toISOString(),
          }),
          isFormData: true,
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        notify.success(response?.data?.message);
        mutate();
        onClose();
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const resetFields = () => {
    formik.resetForm();
    setIsImage(null);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {staffId && isValidating ? (
          <div className="flex flex-col gap-4 max-w-5xl mx-auto py-8 px-4 bg-white shadow-xl items-center">
            <Skeleton
              variant="circular"
              height={100}
              width={100}
              animation="wave"
            />
            <div className="grid  gap-2 md:gap-8 h-fit w-full  ">
              {Array(20)
                .fill(0)
                ?.map((item, index) => (
                  <span className="flex flex-col gap-4" key={index}>
                    <Skeleton variant="text" width={80} animation="wave" />
                    <Skeleton variant="rounded" height={50} animation="wave" />
                  </span>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col py-10 overflow-auto">
            <div className="flex w-full p-5 items-center justify-center">
              <div className="w-full flex gap-3 flex-col">
                <form
                  className="grid grid-cols-1 w-full px-4 gap-4 "
                  onSubmit={formik.handleSubmit}
                >
                  {basicDetailsSchema?.map((items, index) =>
                    items?.name === "aadhar" ? (
                      <div
                        className="w-full  flex flex-col  mx-auto"
                        key={items?.key}
                      >
                        <h3 className="font-medium tracking-wide text-base mb-2">
                          {items?.label}
                        </h3>

                        {
                          <>
                            <UploadFile
                              width={250}
                              height={200}
                              onChange={(e: any) =>
                                formik?.setFieldValue(
                                  items?.name,
                                  e?.target?.files[0]
                                )
                              }
                              url={
                                formik?.values[items?.name] &&
                                (typeof formik?.values[items?.name] === "string"
                                  ? formik?.values[items?.name]
                                  : URL.createObjectURL(
                                      formik?.values[items?.name]
                                    ))
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
                    ) : items?.name === "photo" ? (
                      <>
                        <div className="flex items-center justify-center">
                          <div className="flex relative w-32 h-32">
                            <img
                              className="w-28 bg-white h-28 rounded-full object-contain shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                              src={
                                (formik.values.photo &&
                                  (typeof formik.values.photo === "string"
                                    ? formik.values.photo
                                    : URL.createObjectURL(
                                        formik?.values?.photo
                                      ))) ||
                                "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png"
                              }
                              alt="logo"
                            />
                            <div
                              className="absolute bottom-4 right-4 cursor-pointer h-8 flex items-center justify-center rounded-full w-8 text-white bg-gray-500 "
                              onClick={onButtonPress}
                            >
                              <Tooltip title="Upload Staff Image">
                                <Add />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <input
                          ref={upload_picture}
                          type="file"
                          className="opacity-0 "
                          onChange={(e: any) => {
                            formik.setFieldValue("photo", e.target.files[0]);
                          }}
                        />
                        <div className="flex w-full items-center justify-center gap-1">
                          <span className="w-1/3 bg-theme h-0.5"></span>
                          <span className="w-fit text-xl text-slate-500 font-semibold whitespace-nowrap">
                            {formik?.values?.displayName || ""}
                          </span>
                          <span className="w-1/3 bg-theme h-0.5"></span>
                        </div>
                      </>
                    ) : items?.name === "pan" ? (
                      <div
                        className="w-full  flex flex-col  mx-auto"
                        key={items?.key}
                      >
                        <h3 className="font-medium tracking-wide text-base mb-2">
                          {items?.label}
                        </h3>

                        {
                          <>
                            <UploadFile
                              width={250}
                              height={200}
                              onChange={(e: any) =>
                                formik?.setFieldValue(
                                  items?.name,
                                  e?.target?.files[0]
                                )
                              }
                              url={
                                formik?.values[items?.name] &&
                                (typeof formik?.values[items?.name] === "string"
                                  ? formik?.values[items?.name]
                                  : URL.createObjectURL(
                                      formik?.values[items?.name]
                                    ))
                              }
                            />
                            <p className="mt-1 text-red-600">
                              {formik.touched.pan &&
                              typeof formik.errors.pan === "string"
                                ? formik.errors.pan
                                : ""}
                            </p>
                            {/* <p className="mt-1">
                          (Enter data according to your excel sheet)
                        </p> */}
                          </>
                        }
                      </div>
                    ) : items?.name === "passbook" ? (
                      <div
                        className="w-full  flex flex-col  mx-auto"
                        key={items?.key}
                      >
                        <h3 className="font-medium tracking-wide text-base mb-2">
                          {items?.label}
                        </h3>

                        {
                          <>
                            <UploadFile
                              // imageOnly={true}
                              width={250}
                              height={200}
                              onChange={(e: any) =>
                                formik?.setFieldValue(
                                  items?.name,
                                  e?.target?.files[0]
                                )
                              }
                              url={
                                formik?.values[items?.name] &&
                                (typeof formik?.values[items?.name] === "string"
                                  ? formik?.values[items?.name]
                                  : URL.createObjectURL(
                                      formik?.values[items?.name]
                                    ))
                              }
                            />
                            <p className="mt-1 text-red-600">
                              {formik.touched.passbook &&
                              typeof formik.errors.passbook === "string"
                                ? formik.errors.passbook
                                : ""}
                            </p>
                            {/* <p className="mt-1">
                          (Enter data according to your excel sheet)
                        </p> */}
                          </>
                        }
                      </div>
                    ) : (
                      <InputField
                        label={items?.label}
                        key={items?.key + index}
                        name={items?.name}
                        type={items?.type as any}
                        value={formik?.values[items?.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        options={items?.options as any}
                        disabled={items?.disabled}
                        //   rows={items?.rows}
                        size="small"
                        fullWidth
                        //   multiline={items?.multiline}
                        error={Boolean(
                          formik?.touched[items?.name] &&
                            formik?.errors[items?.name]
                        )}
                        helperText={
                          formik?.touched[items?.name] &&
                          (formik?.errors[items?.name] as any)
                        }
                      />
                    )
                  )}
                </form>
                <div className="w-full flex pt-10 gap-2 px-4">
                  <Button
                    loading={formik?.isSubmitting}
                    type="submit"
                    onClick={() => formik.handleSubmit()}
                    startIcon={<Done />}
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    // onClick={() => formik.resetForm()}
                    onClick={resetFields}
                    className={"bg-red-400"}
                    startIcon={<RotateLeft />}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTeachingStaffForm;
