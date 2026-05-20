import { Done, RotateLeft, SkipNext } from "@mui/icons-material";
import { TextInput, AdminAutocomplete, Button } from "components/core";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { handleValidFormData, notify } from "utils";
import * as Yup from "yup";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { useFetch, useSWRFetch } from "hooks";
import SessionType from "types/session";
import CourseType from "types/course";
import BranchType from "types/branch";
import { useRouter } from "next/router";
import BatchType from "types/batch";
import Swal from "sweetalert2";
import { AddAdmissionDocumentDialog } from "../dialog";
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
type singleBatchType = {
  data: BatchType;
};
export interface Document {
  [key: string]: File;
}
const ClassDetails = ({ handleNext, handleBack }: any) => {
  const { query, push } = useRouter();
  const { mutate: registration } = useFetch();
  const [batchData, setBatchData] = useState<any>({
    key: "",
    label: "",
    value: "",
  });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchBatch, setSearchBatch] = useState("");
  const { data } = useSWRFetch<dataType>("session");
  const { data: course } = useSWRFetch<courseType>("course");
  const [courseId, setCourseId] = useState("");
  const { data: branch } = useSWRFetch<branchType>(
    courseId && `branch?courseId=${courseId}`
  );
  const [branchId, setBranchId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const { data: batch } = useSWRFetch<batchType>(
    `batch?course=true&branch=true&session=true&perPage=20&pageNo=1` +
      (searchBatch ? `&searchTitle=${searchBatch}` : "") +
      (courseId ? `&courseId=${courseId}` : "") +
      (sessionId ? `&sessionId=${sessionId}` : "") +
      (branchId ? `&branchId=${branchId}` : "")
  );

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const basicDetailsSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "applicationNumber",
        label: "Application No",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: "2",
        name: "enrollmentCode",
        label: "Enrollment Code ",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        // validationSchema: Yup.string().required("Enrollment Code is required"),
      },
      {
        key: "3",
        name: "registrationNumber",
        label: "Registration No",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: "4",
        name: "rollNumber",
        label: "Roll Number ",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "5",
        name: "session",
        label: "Session",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: data?.data?.map((data) => ({
          label: `${data?.title}`,
          value: `${data?._id}`,
          key: `${data?.title}`,
        })),
      },

      {
        key: "6",
        name: "courseName",
        label: "Choose Course",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: course?.data?.map((data) => ({
          label: `${data?.title}`,
          value: `${data?._id}`,
          key: `${data?.title}`,
        })),
      },
      {
        key: "7",
        name: "branchName",
        label: "Choose Branch ",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: branch?.data?.map((data) => ({
          label: `${data?.title}`,
          value: `${data?._id}`,
          key: `${data?.title}`,
        })),
      },

      {
        key: "8",
        name: "batch",
        label: "Batch ",
        initialValue: "",
        type: "autocomplete",
        validationSchema: Yup.string().optional(),
        options: batch?.data?.map((data) => ({
          label: `${data?.course?.title} ${data?.branch?.title} (${data?.session?.title})`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: "9",
        name: "academicYear",
        label: "Academic Year ",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "10",
        name: "studyMedium",
        label: "Study Medium ",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: [
          { key: 1, label: "English", value: "English" },
          { key: 2, label: "Hindi", value: "Hindi" },
        ],
      },

      {
        key: "11",
        name: "libraryCardNumber",
        label: "Library Card Number ",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "32",
        name: "hscBoard",
        label: "HSC Board",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "31",
        name: "hscInstitute",
        label: "HSC Institute",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: "12",
        name: "hscFullMarks",
        label: "HSC Full Marks ",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "13",
        name: "hscMarkSecured",
        label: "HSC Marks Secured",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "14",
        name: "hscMarkPercentage",
        label: "HSC Mark Percentage ",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "15",
        name: "hscPassingYear",
        label: "HSC Passing Year",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "34",
        name: "twelfthBoard",
        label: "Twelfth Board",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "33",
        name: "twelfthInstitute",
        label: "Twelfth Institute",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: "16",
        name: "twelfthFullMark",
        label: "Twelfth Full Mark",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "17",
        name: "twelfthMarkSecured",
        label: "Twelfth Mark Secured",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "18",
        name: "twelfthMarkPercentage",
        label: "Twelfth Mark Percentage",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "19",
        name: "twelfthPassingYear",
        label: "Twelfth Passing Year",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },

      //diplomatic
      {
        key: "36",
        name: "diplomaBoard",
        label: "Diploma Board",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "35",
        name: "diplomaInstitute",
        label: "Diploma Institute",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },

      {
        key: "20",
        name: "diplomaFullMark",
        label: "Diploma Full Mark",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "21",
        name: "diplomaMarkSecured",
        label: "Diploma Mark Secured",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "22",
        name: "diplomaMarkPercentage",
        label: "Diploma Mark Percentage",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "23",
        name: "diplomaPassingYear",
        label: "Diploma Passing Year",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      //graduation
      {
        key: "24",
        name: "graduationFullMark",
        label: "Graduation Full Mark",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "25",
        name: "graduationMarkSecured",
        label: "Graduation Mark Secured",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "26",
        name: "graduationMarkPercentage",
        label: "Graduation Mark Percentage",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "27",
        name: "graduationPassingYear",
        label: "Graduation Passing Year",
        initialValue: "",
        type: "number",
        validationSchema: Yup.string().optional(),
      },

      {
        key: "28",
        name: "receiptNumber",
        label: "Receipt Number",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "29",
        name: "stayHostel",
        label: "Do you want to stay in hostel",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
      {
        key: "30",
        name: "transport",
        label: "Do you want to stay in hostel",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
      },
    ];
  }, [
    branch?.data,
    course?.data,
    data?.data,
    sessionId,
    branchId,
    courseId,
    batch?.data,
  ]);

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
          confirmButtonText: "Yes, Add!",
        }).then(async (result) => {
          if (result.isConfirmed)
            new Promise(async (resolve, reject) => {
              const formdata = new FormData();
              formdata.append("applicationNumber", values.applicationNumber);
              formdata.append("enrollmentCode", values?.enrollmentCode);
              formdata.append("registrationNumber", values?.registrationNumber);
              formdata.append("rollNumber", values?.rollNumber);

              formdata.append("batch", batchData?.value);
              formdata.append("academicYear", values?.academicYear);
              formdata.append("studyMedium", values?.studyMedium);
              formdata.append("libraryCardNumber", values?.libraryCardNumber);
              //hsc
              formdata.append("hscInstitute", values?.hscInstitute);
              formdata.append("hscBoard", values?.hscBoard);
              formdata.append("hscFullMarks", values?.hscFullMarks);
              formdata.append("hscMarkSecured", values?.hscMarkSecured);
              formdata.append("hscMarkPercentage", values?.hscMarkPercentage);
              formdata.append("hscPassingYear", values?.hscPassingYear);
              //12th
              formdata.append("twelfthInstitute", values?.twelfthInstitute);
              formdata.append("twelfthBoard", values?.twelfthBoard);
              formdata.append("twelfthFullMark", values?.twelfthFullMark);
              formdata.append("twelfthMarkSecured", values?.twelfthMarkSecured);
              formdata.append(
                "twelfthMarkPercentage",
                values?.twelfthMarkPercentage
              );
              formdata.append("twelfthPassingYear", values?.twelfthPassingYear);
              //diploma
              formdata.append("diplomaInstitute", values?.diplomaInstitute);
              formdata.append("diplomaBoard", values?.diplomaBoard);
              formdata.append("diplomaFullMark", values?.diplomaFullMark);
              formdata.append("diplomaMarkSecured", values?.diplomaMarkSecured);
              formdata.append(
                "diplomaMarkPercentage",
                values?.diplomaMarkPercentage
              );
              formdata.append("diplomaPassingYear", values?.diplomaPassingYear);
              //graduation
              formdata.append("graduationFullMark", values?.graduationFullMark);
              formdata.append(
                "graduationMarkSecured",
                values?.graduationMarkSecured
              );
              formdata.append(
                "graduationMarkPercentage",
                values?.graduationMarkPercentage
              );
              formdata.append(
                "graduationPassingYear",
                values?.graduationPassingYear
              );
              //receipt no.
              formdata.append("receiptNumber", values?.receiptNumber);

              formdata.append("isHostler", values?.stayHostel || false);
              formdata.append("isUsingTransport", values?.transport || false);

              // documents?.forEach((doc: any) =>
              //   formdata.append(
              //     Object.keys(doc)[0],
              //     Object.values(doc)[0] as any
              //   )
              // );
              const response = await registration({
                path: `student/academic/${query?.userIdAgain}`,
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

              notify.success("Admission Details Added Successfully");
              resolve(response?.data?.message);
              setLoading(false);
              // console.log("-->", response?.data);
              formik.resetForm();
              push(
                {
                  pathname: "/panel/admin/admission/request",
                  query: { userDocs: `${query?.userIdAgain}` },
                },
                undefined,
                {
                  shallow: true,
                }
              );
              formik.resetForm();
              handleNext();
              resolve(response?.data?.message);
              formik.setSubmitting(false);
            });
          setLoading(false);
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
        {basicDetailsSchema?.map((items) =>
          items?.type === "autocomplete" ? (
            <div className="col-span-12 md:col-span-6 w-full" key={items?.key}>
              <AdminAutocomplete
                onSearchTextChange={(e) => setSearchBatch(e?.target?.value)}
                size={"small"}
                label={items?.label}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.value
                }
                value={batchData}
                noOptionText={
                  <div className="w-full flex flex-col gap-2">
                    <small className="tracking-wide">No options found</small>
                    <div
                      className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                      onClick={() => router.push("/panel/admin/batch/create")}
                    >
                      Add New {items?.label.slice(0, -1)}
                    </div>
                  </div>
                }
                options={items?.options}
                onChange={(e, v) => {
                  formik?.setFieldValue("batch", v?.value);
                  setBatchData(v);
                }}
              />
            </div>
          ) : items?.name === "documents" ? (
            <div
              className="w-4/6 col-span-6 flex flex-col mt-8"
              key={items?.key}
            >
              <AddAdmissionDocumentDialog
                documents={documents}
                setDocuments={setDocuments}
              />
            </div>
          ) : items?.name === "stayHostel" ? (
            <div className="!w-full col-span-12" key={items?.key}>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="text-theme text-wider font-medium pb-2"
                >
                  Do you want to stay in college hostel ?
                </FormLabel>
                <RadioGroup
                  onChange={(e) =>
                    formik.setFieldValue("stayHostel", e.target.value)
                  }
                  name="row-radio-buttons-group"
                  defaultValue={false}
                  row
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ) : items?.name === "transport" ? (
            <div className="!w-full col-span-12">
              <FormControl>
                <FormLabel
                  className="text-theme text-wider font-medium pb-2"
                  id="demo-row-radio-buttons-group-label"
                >
                  Do you want to use college transport ?
                </FormLabel>
                <RadioGroup
                  onChange={(e) =>
                    formik.setFieldValue("transport", e.target.value)
                  }
                  name="row-radio-buttons-group"
                  defaultValue={false}
                  row
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
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
              value={formik?.values[items?.name]}
              onChange={(e) => {
                formik.handleChange(e);
                if (items?.name === "courseName") {
                  setCourseId(e.target.value);
                  setBatchData(null);
                } else if (items?.name === "branchName") {
                  setBranchId(e.target.value);
                } else if (items?.name === "session") {
                  setBatchData(null);
                  setSessionId(e.target.value);
                }
              }}
              onBlur={formik.handleBlur}
              options={items?.options}
              //   rows={items?.rows}
              size="small"
              fullWidth
              //   multiline={items?.multiline}
              error={Boolean(
                formik?.touched[items?.name] && formik?.errors[items?.name]
              )}
              helperText={
                formik?.touched[items?.name] &&
                (formik?.errors[items?.name] as any)
              }
              styleArea={`col-span-12 md:col-span-6 !w-full`}
              styleField="w-full col-span-12 overflow-hidden"
            />
          )
        )}
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
                  query: { userDocs: `${query?.userIdAgain}` },
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
              setDocuments([]);
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

export default ClassDetails;
