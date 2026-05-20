import { Add, Done, Edit, RotateLeft } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  CustomDrawer,
  TextInput,
  UploadFile,
} from "components/core";
import STATES from "configs/state";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import BatchType from "types/batch";
import BranchType from "types/branch";
import CourseType from "types/course";
import SessionType from "types/session";
import {
  COUNTRIES,
  autoAddFormdata,
  handleMyBatch,
  handleMyObject,
  notify,
} from "utils";
import * as Yup from "yup";
type dataType = {
  data: SessionType[];
};
type courseType = {
  data: CourseType[];
};
type branchType = {
  data: BranchType[];
};
type batchType = {
  data: BatchType[];
};
const EditStudentDrawer = ({ open, onClose, mutate }: any) => {
  const { mutate: UPDATE } = useFetch();
  const { data: singleUser, isValidating } = useSWRFetch<any>(
    open &&
      `user/details/${open}?bank=true&academics=true&employee=true&address=true`
  );
  // console.log("singleUser-->", singleUser?.data?.academicDetails?.section);

  const { data } = useSWRFetch<dataType>("session");
  const { data: course } = useSWRFetch<courseType>("course");
  const [courseId, setCourseId] = useState("");
  const { data: branch } = useSWRFetch<branchType>(
    courseId && `branch?courseId=${courseId}`
  );
  const [sessionId, setSessionId] = useState("");
  const [batchId, setBatchId] = useState("");
  // console.log("batchId-->", batchId);
  const { data: batch } = useSWRFetch<batchType>(
    // sessionId && courseId && `get-batch/${sessionId}/${courseId}`
    `batch?course=true&branch=true&session=true`
  );
  const { data: section } = useSWRFetch<any>(`batch/${batchId}`);

  useEffect(() => {
    // Check if batch and batchSection data is available
    if (singleUser?.data?.academicDetails?.batch?._id) {
      setBatchId(singleUser?.data?.academicDetails?.batch?._id);
    }
  }, [singleUser]);

  const upload_picture = useRef<any>();
  const onButtonPress = () => {
    upload_picture?.current && upload_picture?.current?.click();
  };

  const editUserSchema = useMemo(() => {
    return [
      {
        key: 0,
        name: "photo",
        type: "file",
        initialValues: "",
      },
      {
        key: 1,
        name: "displayName",
        label: "Student Name *",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().required("Student Name is required"),
      },
      {
        key: 2,
        name: "email",
        label: "Email *",
        initialValues: "",
        disabled: true,
        type: "text",
        validationSchema: Yup.string().email().required("Email is required"),
      },
      {
        key: 3,
        name: "phoneNumber",
        label: "Phone Number *",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string()
          .required("Phone Number is required")
          .min(10, "Minimum 10 digits required"),
      },
      {
        key: 4,
        name: "dob",
        label: "Date Of Birth *",
        initialValues: "",
        type: "date",
        validationSchema: Yup.date().required("Date Of Birth is required"),
      },

      {
        key: 5,
        name: "gender",
        label: "Gender *",
        initialValues: "",
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
        ],
      },
      {
        key: 6,
        name: "caste",
        label: "Caste *",
        initialValues: "",
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
        key: 7,
        name: "country",
        label: "Choose Country ",
        initialValues: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: COUNTRIES,
      },
      {
        key: 6,
        name: "applicationNumber",
        label: "Application No",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: 7,
        name: "enrollmentCode",
        label: "Enrollment Code ",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 8,
        name: "registrationNumber",
        label: "Registration No",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: 9,
        name: "rollNumber",
        label: "Roll Number ",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: 10,
        name: "batch",
        label: "Batch ",
        initialValues: "",
        type: "autocomplete",
        options: batch?.data?.map((data: any) => ({
          label: `${data?.course?.title} ${data?.branch?.title} (${data?.session?.title})`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: 5,
        name: "section",
        label: "Section",
        initialValues: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: section?.data?.batchSection?.map((data: any, i: number) => ({
          label: `${data} `,
          value: `${data}`,
          key: i,
        })),
      },
      {
        key: 11,
        name: "libraryCardNumber",
        label: "Library Card Number ",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 12,
        name: "receiptNumber",
        label: "Receipt Number ",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 13,
        name: "aadharNumber",
        label: "Aadhaar Number ",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string()
          .optional()
          .matches(/^[0-9]{12}$/, "Aadhaar number must be exactly 12 digits"),
        // validationSchema: Yup.string()
        //   .required("Aadhar Number  is required")
        //   .min(12, "Aadhar number Must be 12 number")
        //   .max(12, "Aadhar number Must be 12 number"),
      },
      {
        key: 14,
        name: "aadhar",
        label: "Aadhar Image ",
        initialValues: "",
        type: "file",
        // validationSchema: Yup.string().required("Aadhar Image is required"),
      },
      {
        key: 15,
        name: "fatherName",
        label: "Father's Name",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 16,
        name: "fatherNumber",
        label: "Father's Phone Number",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 17,
        name: "motherName",
        label: "Mother's Name",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 18,
        name: "motherNumber",
        label: "Mother's Phone Number",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 19,
        name: "parentEmail",
        label: "Parent's Email",
        initialValues: "",
        type: "email",
        validationSchema: Yup.string()
          .email("Should be a valid email address")
          .optional(),
      },
      {
        key: 20,
        name: "alternateStudentNumber",
        label: "Alternate Student Phone Number",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },

      {
        key: 21,
        name: "localGuardianName",
        label: "Local Guardian's Name",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 22,
        name: "localGuardianPhoneNumber",
        label: "Local Guardian's Phone Number",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 23,
        name: "localGuardianRelation",
        label: "Local Guardian Relation",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      // {
      //   key: 24,
      //   name: "emergencyContactName",
      //   label: "Emergency Contact Name *",
      //   initialValues: "",
      //   type: "text",
      //   validationSchema: Yup.string().optional(),
      // },
      // {
      //   key: 25,
      //   name: "emergencyContactNumber",
      //   label: "Emergency Phone Number",
      //   initialValues: "",
      //   type: "number",
      //   validationSchema: Yup.string().optional(),
      // },
      {
        key: 26,
        name: "studyMedium",
        label: "Study Medium",
        initialValues: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: [
          { label: "English", value: "English", key: "en" },
          { label: "Hindi", value: "Hindi", key: "hi" },
        ],
      },
      {
        key: 27,
        name: "academicYear",
        label: "Academic Year",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },

      //10th
      {
        key: "53",
        name: "hscBoard",
        label: "HSC Board",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "54",
        name: "hscInstitute",
        label: "HSC Institute",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 28,
        name: "hscFullMarks",
        label: "HSC/10th Full Marks",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 29,
        name: "hscMarkSecured",
        label: "HSC/10th Marks Secured",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },

      {
        key: 30,
        name: "hscMarkPercentage",
        label: "HSC Marks Percentage",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 31,
        name: "hscPassingYear",
        label: "HSC Passing Year",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },

      {
        key: "55",
        name: "twelfthBoard",
        label: "Twelfth Board",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "56",
        name: "twelfthInstitute",
        label: "Twelfth Institute",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 32,
        name: "twelfthFullMark",
        label: "12th Full Marks",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 33,
        name: "twelfthMarkSecured",
        label: "12th Marks Secured",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },

      {
        key: 34,
        name: "twelfthMarkPercentage",
        label: "12th Marks Percentage",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 35,
        name: "twelfthPassingYear",
        label: "12th Passing Year",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },

      {
        key: "57",
        name: "diplomaBoard",
        label: "Diploma Board",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "58",
        name: "diplomaInstitute",
        label: "Diploma Institute",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 36,
        name: "diplomaFullMark",
        label: "Diploma Full Marks",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 37,
        name: "diplomaMarkSecured",
        label: "Diploma Marks Secured",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },

      {
        key: 38,
        name: "diplomaMarkPercentage",
        label: "Diploma Marks Percentage",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 39,
        name: "diplomaPassingYear",
        label: "Diploma Passing Year",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },

      //
      {
        key: 40,
        name: "graduationFullMark",
        label: "Graduation Full Marks",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 41,
        name: "graduationMarkSecured",
        label: "Graduation Marks Secured",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },

      {
        key: 42,
        name: "graduationMarkPercentage",
        label: "Graduation Marks Percentage",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 43,
        name: "graduationPassingYear",
        label: "Graduation Passing Year",
        initialValues: "",
        type: "number",
        validationSchema: Yup.number().optional().nullable(),
      },
      {
        key: 48,
        name: "address",
        label: "Permanent Address",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional().nullable(),
        multiline: true,
        rows: 4,
      },
      {
        key: 44,
        name: "state",
        label: "State (Permanent)",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 45,
        name: "district",
        label: "District (Permanent)",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 46,
        name: "city",
        label: "City (Permanent)",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: 47,
        name: "pinCode",
        label: "Pin Code (Permanent)",
        initialValues: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },

      {
        key: 49,
        name: "currentAddress",
        label: "Current Address",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        multiline: true,
        rows: 4,
      },
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
        validationSchema: Yup.string().optional().min(4, "Minimum  4 numbers."),
      },
      {
        key: 50,
        name: "localGuardianAddress",
        label: "Local Guardian Address",
        initialValues: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        multiline: true,
        rows: 4,
      },
      {
        key: 51,
        name: "isHostler",
        label: "Do you want to stay in hostel",
        validationSchema: Yup.string().optional(),
        initialValues: false,
        type: "text",
      },
      {
        key: 52,
        name: "isUsingTransport",
        label: "Do you want to stay in hostel",
        validationSchema: Yup.string().optional(),
        initialValues: false,
        type: "text",
      },
    ];
  }, [batch?.data, branch?.data, course?.data, data?.data, section?.data]);

  const initialValues = editUserSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValues;
    return accumulator;
  }, {} as any);

  const validationSchema = editUserSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      ...singleUser?.data,
      dob: singleUser?.data?.dateOfBirth?.split("T")[0],
      gender: singleUser?.data?.gender,
      caste: singleUser?.data?.caste,
      country: singleUser?.data?.countryCode,
      applicationNumber: singleUser?.data?.academicDetails?.applicationNumber,
      enrollmentCode: singleUser?.data?.academicDetails?.enrollmentCode,
      rollNumber: singleUser?.data?.academicDetails?.rollNumber,
      registrationNumber: singleUser?.data?.academicDetails?.registrationNumber,
      isUsingTransport: singleUser?.data?.academicDetails?.isUsingTransport,
      isHostler: singleUser?.data?.academicDetails?.isHostler,
      // session: singleUser?.data?.academicDetails?.batch?.session?._id,
      // courseName: singleUser?.data?.academicDetails?.batch?.course?._id,
      // branchName: singleUser?.data?.academicDetails?.batch?.branch?._id,
      batch: singleUser?.data?.academicDetails?.batch?._id,
      section: singleUser?.data?.academicDetails?.section,
      aadharNumber: singleUser?.data?.addressDetails?.aadharNumber,
      fatherName: singleUser?.data?.addressDetails?.fatherName,
      fatherNumber: singleUser?.data?.addressDetails?.fatherNumber,
      motherName: singleUser?.data?.addressDetails?.motherName,
      motherNumber: singleUser?.data?.addressDetails?.motherNumber,
      alternateStudentNumber:
        singleUser?.data?.addressDetails?.alternateStudentNumber,
      localGuardianName: singleUser?.data?.addressDetails?.localGuardianName,
      localGuardianPhoneNumber:
        singleUser?.data?.addressDetails?.localGuardianPhoneNumber,
      localGuardianRelation:
        singleUser?.data?.addressDetails?.localGuardianRelation,
      // emergencyContactName:
      //   singleUser?.data?.addressDetails?.emergencyContactName,
      // emergencyContactNumber:
      //   singleUser?.data?.addressDetails?.emergencyContactNumber,

      studyMedium: singleUser?.data?.academicDetails?.studyMedium,
      academicYear: singleUser?.data?.academicDetails?.academicYear,

      hscBoard: singleUser?.data?.academicDetails?.hscBoard,
      hscInstitute: singleUser?.data?.academicDetails?.hscInstitute,
      hscFullMarks: singleUser?.data?.academicDetails?.hscFullMarks,
      hscMarkSecured: singleUser?.data?.academicDetails?.hscMarkSecured,
      hscMarkPercentage: singleUser?.data?.academicDetails?.hscMarkPercentage,
      hscPassingYear: singleUser?.data?.academicDetails?.hscPassingYear,

      twelfthBoard: singleUser?.data?.academicDetails?.twelfthBoard,
      twelfthInstitute: singleUser?.data?.academicDetails?.twelfthInstitute,
      twelfthFullMark: singleUser?.data?.academicDetails?.twelfthFullMark,
      twelfthMarkSecured: singleUser?.data?.academicDetails?.twelfthMarkSecured,
      twelfthMarkPercentage:
        singleUser?.data?.academicDetails?.twelfthMarkPercentage,
      twelfthPassingYear: singleUser?.data?.academicDetails?.twelfthPassingYear,

      diplomaBoard: singleUser?.data?.academicDetails?.diplomaBoard,
      diplomaInstitute: singleUser?.data?.academicDetails?.diplomaInstitute,
      diplomaFullMark: singleUser?.data?.academicDetails?.diplomaFullMark,
      diplomaMarkSecured: singleUser?.data?.academicDetails?.diplomaMarkSecured,
      diplomaMarkPercentage:
        singleUser?.data?.academicDetails?.diplomaMarkPercentage,
      diplomaPassingYear: singleUser?.data?.academicDetails?.diplomaPassingYear,

      graduationFullMark: singleUser?.data?.academicDetails?.graduationFullMark,
      graduationMarkSecured:
        singleUser?.data?.academicDetails?.graduationMarkSecured,
      graduationMarkPercentage:
        singleUser?.data?.academicDetails?.graduationMarkPercentage,
      graduationPassingYear:
        singleUser?.data?.academicDetails?.graduationPassingYear,

      state: singleUser?.data?.addressDetails?.state,
      district: singleUser?.data?.addressDetails?.district,
      aadhar: singleUser?.data?.addressDetails?.aadharImageUrl,
      city: singleUser?.data?.addressDetails?.city,
      pinCode: singleUser?.data?.addressDetails?.pinCode,
      address: singleUser?.data?.addressDetails?.address,

      currentAddress: singleUser?.data?.addressDetails?.currentAddress,
      currentState: singleUser?.data?.addressDetails?.currentState,
      currentDistrict: singleUser?.data?.addressDetails?.currentDistrict,
      currentCity: singleUser?.data?.addressDetails?.currentCity,
      currentPinCode: singleUser?.data?.addressDetails?.currentPinCode,

      localGuardianAddress:
        singleUser?.data?.addressDetails?.localGuardianAddress,

      parentEmail: singleUser?.data?.addressDetails?.parentEmail,
      photo: singleUser?.data?.photoUrl,
      libraryCardNumber: singleUser?.data?.academicDetails?.libraryCardNumber,
      receiptNumber: singleUser?.data?.academicDetails?.receiptNumber,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // console.log("values-->", values);
      // return;
      try {
        const response = await UPDATE({
          path: `user/update/${open}`,
          method: "PUT",
          body: autoAddFormdata({
            ...values,
            name: values?.displayName,
            countryCode: values?.country,
            phoneNumber: Number(values?.phoneNumber),
            section: values?.section,
            dateOfBirth: new Date(values?.dob).toISOString(),
          }),
          isFormData: true,
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        mutate();
        onClose();
        formik?.resetForm();
      } catch (err) {
        if (err instanceof Error) {
          notify.error(err?.message);
        } else {
          notify.error("Oops! Something went wrong");
        }
      }
    },
  });

  useEffect(() => {
    setCourseId(formik?.values?.courseName);
    setSessionId(formik?.values?.session);
  }, [formik?.values?.courseName, formik?.values?.session]);
  const resetFields = () => {
    formik.resetForm();
  };

  return (
    <div>
      <CustomDrawer
        open={open}
        onClose={() => {
          onClose();
        }}
        anchor="right"
        maxWidth="md"
        width="40vw"
      >
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b ">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Edit className="h-8 w-8" />
              <h3 className="tracking-wide text-center">
                Edit Student Details
              </h3>
            </div>
          </div>
          {open && isValidating ? (
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
                      <Skeleton
                        variant="rounded"
                        height={50}
                        animation="wave"
                      />
                    </span>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col py-10 overflow-auto">
              <div className="flex w-full p-5 items-center justify-center">
                <div className="w-full flex gap-3 flex-col">
                  <form
                    className="grid grid-cols-12  w-full px-4 gap-4 "
                    onSubmit={formik.handleSubmit}
                  >
                    {editUserSchema?.map((items) =>
                      items?.name === "aadhar" ? (
                        <div
                          className="w-full  col-span-12 flex flex-col  mx-auto"
                          key={items?.key}
                        >
                          <h3 className="font-medium tracking-wide text-base mb-2 text-theme">
                            Upload Aadhaar Image *
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
                                  (typeof formik?.values[items?.name] ===
                                  "string"
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
                      ) : items?.type === "autocomplete" ? (
                        <div className="col-span-12  w-full" key={items?.key}>
                          <AdminAutocomplete
                            size={"small"}
                            label={items?.label}
                            isOptionEqualToValue={(option, value) =>
                              option?.value === value?.value
                            }
                            onChange={(e, value) => {
                              formik?.setFieldValue(items?.name, value?.value);
                              setBatchId(value?.key);
                            }}
                            value={
                              (items?.name === "session" &&
                                data?.data
                                  ?.filter(
                                    (i) =>
                                      i?._id === formik?.values[items?.name]
                                  )
                                  ?.map((item) => {
                                    return {
                                      key: item?._id,
                                      label: item?.title,
                                      value: item?._id,
                                    };
                                  })?.[0]) ||
                              (items?.name === "courseName" &&
                                course?.data
                                  ?.filter(
                                    (i) =>
                                      i?._id === formik?.values[items?.name]
                                  )
                                  ?.map((item) => {
                                    return {
                                      key: item?._id,
                                      label: item?.title,
                                      value: item?._id,
                                    };
                                  })?.[0]) ||
                              (items?.name === "branchName" &&
                                branch?.data
                                  ?.filter(
                                    (i) =>
                                      i?._id === formik?.values[items?.name]
                                  )
                                  ?.map((item) => {
                                    return {
                                      key: item?._id,
                                      label: item?.title,
                                      value: item?._id,
                                    };
                                  })?.[0]) ||
                              (items?.name === "batch" &&
                                batch?.data
                                  ?.filter(
                                    (i) =>
                                      i?._id === formik?.values[items?.name]
                                  )
                                  ?.map((item) => {
                                    return {
                                      key: item?._id,
                                      label: `${item?.course?.title} ${item?.branch?.title} (${item?.session?.title})`,
                                      value: item?._id,
                                    };
                                  })?.[0]) || {
                                key: " ",
                                label: " ",
                                value: " ",
                              }
                              // (items?.name === "session" &&
                              //   handleMyObject(
                              //     data?.data?.find(
                              //       (value: any) =>
                              //         value?._id === formik.values?.session
                              //     ),
                              //     "key",
                              //     "label",
                              //     "value"
                              //   )) ||
                              // (items?.name === "courseName" &&
                              //   handleMyObject(
                              //     course?.data?.find(
                              //       (value: any) =>
                              //         value?._id === formik.values?.courseName
                              //     ),
                              //     "key",
                              //     "label",
                              //     "value"
                              //   )) ||
                              // (items?.name === "branchName" &&
                              //   handleMyObject(
                              //     branch?.data?.find(
                              //       (value: any) =>
                              //         value?._id === formik.values?.branchName
                              //     ),
                              //     "key",
                              //     "label",
                              //     "value"
                              //   )) ||
                              // (items?.name === "batch" &&
                              //   handleMyBatch(
                              //     batch?.data?.find(
                              //       (value: any) =>
                              //         value?._id === formik.values?.batch
                              //     ),
                              //     "key",
                              //     "label",
                              //     "value"
                              //   )) ||
                              // undefined || {
                              //   key: " ",
                              //   label: " ",
                              //   value: " ",
                              // }
                            }
                            noOptionText={
                              <div className="w-full flex flex-col gap-2">
                                <small className="tracking-wide">
                                  No options found
                                </small>
                                {/* <div
                                className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                                onClick={() =>
                                  router.push("/panel/admin/batch/create")
                                }
                              >
                                Add New {items?.label.slice(0, -1)}
                              </div> */}
                              </div>
                            }
                            options={items?.options}
                          />
                        </div>
                      ) : items?.name === "photo" ? (
                        <>
                          <div className={"w-full col-span-12"}>
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
                                    // singleUser?.data?.photoUrl === isImage
                                    //   ? singleUser?.data?.photoUrl
                                    //   : isImage !== singleUser?.data?.photoUrl
                                    //   ? URL?.createObjectURL(isImage)
                                    //   : "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png"
                                  }
                                  alt="logo"
                                />
                                <div
                                  className="absolute bottom-4 right-4 cursor-pointer h-8 flex items-center justify-center rounded-full w-8 text-white bg-gray-500"
                                  onClick={onButtonPress}
                                >
                                  <Add />
                                </div>
                              </div>
                            </div>
                            <input
                              ref={upload_picture}
                              type="file"
                              className="opacity-0"
                              onChange={(e: any) => {
                                formik.setFieldValue(
                                  "photo",
                                  e.target.files[0]
                                );
                              }}
                            />
                            <div className="flex w-full items-center justify-center gap-1">
                              <span className="w-1/3 bg-theme h-0.5"></span>
                              <span className="w-fit text-xl text-slate-500 font-semibold">
                                {formik?.values?.displayName || ""}
                              </span>
                              <span className="w-1/3 bg-theme h-0.5"></span>
                            </div>
                          </div>
                        </>
                      ) : items?.name === "isHostler" ? (
                        <div className="!w-full col-span-12" key={items?.key}>
                          <FormControl>
                            <FormLabel
                              id="demo-row-radio-buttons-group-label"
                              className="text-theme text-wider font-medium pb-2"
                            >
                              Do you want to stay in college hostel ?
                            </FormLabel>
                            <RadioGroup
                              name="row-radio-buttons-group"
                              row
                              value={formik.values?.isHostler}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "isHostler",
                                  e.target.value === "true"
                                )
                              }
                            >
                              <FormControlLabel
                                value={true}
                                checked={formik.values?.isHostler === true}
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                checked={formik.values?.isHostler === false}
                                value={false}
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      ) : items?.name === "isUsingTransport" ? (
                        <div className="!w-full col-span-12">
                          <FormControl>
                            <FormLabel
                              className="text-theme text-wider font-medium pb-2"
                              id="demo-row-radio-buttons-group-label"
                            >
                              Do you want to use college transport ?
                            </FormLabel>
                            <RadioGroup
                              name="row-radio-buttons-group"
                              row
                              value={formik.values?.isUsingTransport}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "isUsingTransport",
                                  e.target.value === "true"
                                )
                              }
                            >
                              <FormControlLabel
                                value={true}
                                control={
                                  <Radio
                                    checked={
                                      formik.values?.isUsingTransport === true
                                    }
                                  />
                                }
                                label="Yes"
                              />
                              <FormControlLabel
                                value={false}
                                control={
                                  <Radio
                                    checked={
                                      formik.values?.isUsingTransport === false
                                    }
                                  />
                                }
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      ) : (
                        <TextInput
                          title={items?.label}
                          key={items?.key}
                          name={items?.name}
                          type={items?.type as any}
                          value={formik?.values[items?.name] || undefined}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          options={items?.options}
                          rows={items?.rows}
                          size="small"
                          disabled={items?.disabled}
                          fullWidth
                          multiline={items?.multiline}
                          error={Boolean(
                            formik?.touched[items?.name] &&
                              formik?.errors[items?.name]
                          )}
                          helperText={
                            formik?.touched[items?.name] &&
                            (formik?.errors[items?.name] as any)
                          }
                          styleArea={`${
                            // items?.multiline
                            //   ? "col-span-12 md:col-span-12 !w-full"
                            //   :
                            "col-span-12 !w-full"
                          }`}
                          styleField="w-full col-span-12 overflow-hidden"
                        />
                      )
                    )}
                  </form>
                  <div className="w-full flex pt-10 gap-2 px-4">
                    <Button
                      type="submit"
                      onClick={() => formik.handleSubmit()}
                      startIcon={<Done />}
                      loading={formik.isSubmitting}
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
      </CustomDrawer>
    </div>
  );
};

export default EditStudentDrawer;
