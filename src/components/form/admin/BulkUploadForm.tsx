import {
  Close,
  Download,
  FolderCopy,
  Restore,
  Upload,
} from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { ErrorMessage, useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useDeferredValue, useRef, useState } from "react";
import UserType from "types/user";
import { Years, autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

const excelPlacementSchema = [
  {
    key: "0",
    name: "excel",
    label: "Upload Excel file *",
    initialValue: "",
    validationSchema: Yup.string().required("Excel file is required."),
    type: "file",
  },
  // {
  //   key: "-1",
  //   name: "startRowNumber",
  //   label: "Start row number *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("Start row number is required."),
  //   type: "number",
  // },
  // {
  //   key: "-1xa",
  //   name: "endRowNumber",
  //   label: "End row number *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("End row number is required."),
  //   type: "number",
  // },
  // {
  //   key: "-1sdasxa",
  //   name: "studentNameColumnName",
  //   label: "Student name column name *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required(
  //     "Student name column name is required."
  //   ),
  //   type: "text",
  //   placeholder: "Ex: A",
  // },
  // {
  //   key: "-1azssdxa",
  //   name: "studentEmailColumnName",
  //   label: "Student email column name *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required(
  //     "Student email column name is required."
  //   ),
  //   type: "text",
  //   placeholder: "Ex: B",
  // },
  // {
  //   key: "-1azssdsdxa",
  //   name: "studentPhoneColumnName",
  //   label: "Student phone no column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: C",
  // },
  // {
  //   key: "zsssdxa",
  //   name: "studentGenderColumnName",
  //   label: "Gender column name *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("Gender column name is required."),
  //   type: "text",
  //   placeholder: "Ex: D",
  // },
  // {
  //   key: "zssdxal",
  //   name: "studentCasteColumnName",
  //   label: "Caste Column Name *",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("Caste column name is required."),
  //   type: "text",
  //   placeholder: "Ex: E",
  // },
  // {
  //   key: "-1azssdsdcsxa",
  //   name: "studentCountryCodeColumnName",
  //   label: "Country column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: F",
  // },
  // {
  //   key: "-1azssdsdsfsdxa",
  //   name: "studentApplicationColumnName",
  //   label: "Application no column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: G",
  // },
  // {
  //   key: "-1azszsszdsdxa",
  //   name: "studentEnrollmentColumnName",
  //   label: "Enrollment Code column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: H",
  // },
  // {
  //   key: "-1azszsszd1sdxa",
  //   name: "studentRegNoColumnName",
  //   label: "Student reg no column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: I",
  // },
  // {
  //   key: "-1szdsdxa",
  //   name: "studentRollNoColumnName",
  //   label: "Roll no column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: J",
  // },
  // {
  //   key: "-1asdsfsdxa",
  //   name: "sessionColumnName",
  //   label: "Session column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: K",
  // },
  // {
  //   key: "zszsszdsdxa",
  //   name: "courseColumnName",
  //   label: "Course column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: L",
  // },
  // {
  //   key: "-1azszd1sdxa",
  //   name: "branchColumnName",
  //   label: "Branch column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: M",
  // },
  // {
  //   key: "-1aszsdsdxa",
  //   name: "batchIdColumnName",
  //   label: "Batch id column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: N",
  // },
  // {
  //   key: "-1azszdsa",
  //   name: "studentLibraryCardColumnName",
  //   label: "Library Card column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: O",
  // },
  // {
  //   key: "-1al",
  //   name: "studentHostlerColumnName",
  //   label: "Stay in hostel column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: P",
  // },
  // {
  //   key: "-1azszdsdxa",
  //   name: "studentTransportColumnName",
  //   label: "Transport column name",
  //   initialValue: "",
  //   validationSchema: Yup.string(),
  //   type: "text",
  //   placeholder: "Ex: Q",
  // },
];

const initialValues = excelPlacementSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as any
);

const validationSchema = excelPlacementSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as any
);
type dataType = {
  data: UserType[];
};
const AddPlacementData = ({ open, closeFn, mutate, title }: any) => {
  const [uploadExcel, setUploadExcel] = useState(false);
  const notUploadedRef = useRef<HTMLHeadingElement>(null);
  const alreadyUploadRef = useRef<HTMLHeadingElement>(null);
  const [openCustomDialog, setIsCustomDialog] = useState(false);
  const [isUploaded, setIsUploaded] = useState("");
  const [isNotUploaded, setIsNotUploaded] = useState("");
  const [isAlreadyUploaded, setIsAlreadyUploaded] = useState("");
  const [isNotUploadedData, setIsNotUploadedData] = useState([]);
  const [isAlreadyRegisteredData, setIsAlreadyRegisteredData] = useState([]);
  const { mutate: add } = useFetch();
  // console.log("isNotUploadedData-->", isNotUploadedData);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await add({
          path:
            title.toLowerCase() === "subjects"
              ? "subject/bulk"
              : title.toLowerCase() === "transport"
              ? "transport/bulk"
              : title.toLowerCase() === "finance"
              ? "finance/bulk"
              : title.toLowerCase() === "inventory"
              ? "inventory/bulk"
              : title.toLowerCase() === "books"
              ? "book/bulk"
              : title.toLowerCase() === "staffs"
              ? `staff/bulk`
              : `student-register/upload-excel`, //by default taking student upload excel
          method: "POST",
          body: autoAddFormdata({
            // ...values,
            excel: values?.excel,
            webUrl: `${window?.location?.origin}`,
          }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }

        notify.success(response?.data?.message);
        formik?.resetForm();
        // console.log("response-->", response);
        setIsUploaded(response?.data?.data?.data?.uploaded);
        setIsNotUploadedData(response?.data?.data?.data?.notUploaded);
        setIsAlreadyRegisteredData(response?.data?.data?.data?.alreadyUploaded);
        setIsCustomDialog(true);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const router = useRouter();

  const handleClickNotUpload = () => {
    notUploadedRef.current && (notUploadedRef.current.style.color = "#5b50a1");

    setTimeout(() => {
      notUploadedRef.current && (notUploadedRef.current.style.color = "black");
    }, 2000);
  };

  const handleClickAlreadyUpload = () => {
    alreadyUploadRef.current &&
      (alreadyUploadRef.current.style.color = "#5b50a1");

    setTimeout(() => {
      alreadyUploadRef.current &&
        (alreadyUploadRef.current.style.color = "black");
    }, 2000);
  };

  return (
    <>
      <div className="w-full md:max-w-7xl mx-auto flex flex-col rounded-xl md:shadow-xl ">
        <div className=" md:border-b flex flex-col md:flex-row justify-center items-center md:gap-5 px-2 w-full ">
          <div className="">
            <h3 className="font-semibold tracking-wide text-2xl p-4 text-theme text-center">
              Upload {title} Data
            </h3>
          </div>
          <div className="flex justify-end items-end md:p-2">
            <Button
              startIcon={<Download />}
              onClick={() =>
                title.toLowerCase() === "subjects"
                  ? router.push("/UploadSubjectSample.xlsx")
                  : title.toLowerCase() === "transport"
                  ? router.push("/UploadTransportSample.xlsx")
                  : title.toLowerCase() === "finance"
                  ? router.push("/UploadFinanceSample.xlsx")
                  : title.toLowerCase() === "inventory"
                  ? router.push("/UploadInventorySample.xlsx")
                  : title.toLowerCase() === "books"
                  ? router.push("/UploadLibrarySample.xlsx")
                  : title.toLowerCase() === "staffs"
                  ? router.push("/StaffBulkUpload.xlsx")
                  : router.push("/UploadStudentSample.xlsx")
              }
            >
              Download Sample
            </Button>
          </div>
        </div>

        <form
          className="grid  grid-cols-2 gap-4 md:p-4"
          onSubmit={formik?.handleSubmit}
        >
          {excelPlacementSchema?.map((item) => {
            if (item?.type === "file") {
              return (
                <div
                  className="w-full md:w-3/5 col-span-2 flex flex-col items-center mx-auto"
                  key={item?.key}
                >
                  <h3 className="font-medium tracking-wide text-base p-2">
                    Upload Excel Sheet *
                  </h3>

                  {formik.values?.excel ? (
                    <div className="w-full bg-theme p-10 py-16 text-center rounded mb-1 ">
                      <FolderCopy className="text-white text-5xl" />
                      <h3 className="text-white  text-xl">Excel Uploaded</h3>
                    </div>
                  ) : (
                    <>
                      <UploadFile
                        width={300}
                        height={250}
                        onChange={(e: any) =>
                          formik?.setFieldValue(item?.name, e?.target?.files[0])
                        }
                        url={
                          formik?.values[item?.name] &&
                          (typeof formik?.values[item?.name] === "string"
                            ? formik?.values[item?.name]
                            : URL.createObjectURL(formik?.values[item?.name]))
                        }
                      />
                      <p className="mt-1 text-red-600">
                        {formik.touched.excel &&
                        typeof formik.errors.excel === "string"
                          ? formik.errors.excel
                          : ""}
                      </p>
                      {/* <p className="mt-1">
                        (Enter data according to your excel sheet)
                      </p> */}
                    </>
                  )}
                </div>
              );
            } else {
              // return (
              //   <div
              //     className="w-full col-span-2 lg:col-span-1"
              //     key={item?.key}
              //   >
              //     <InputField
              //       key={item?.key}
              //       type={item?.type as any}
              //       name={item?.name}
              //       label={item?.label}
              //       onChange={formik?.handleChange}
              //       onBlur={formik?.handleBlur}
              //       value={formik?.values[item?.name]}
              //       error={Boolean(
              //         formik?.touched[item?.name] && formik?.errors[item?.name]
              //       )}
              //       placeholder={item?.placeholder}
              //       helperText={
              //         formik?.touched[item?.name] &&
              //         (formik?.errors[item?.name] as any)
              //       }
              //     />
              //   </div>
              // );
            }
          })}

          <div className="flex items-center justify-center col-span-2  gap-4">
            <Button
              startIcon={<Upload />}
              className="w-full  md:w-3/12"
              type="submit"
              loading={formik?.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Upload Data
            </Button>
            <Button
              startIcon={<Restore />}
              type="button"
              onClick={() => formik.resetForm()}
              className="bg-themeSecondary hover:ring-red-300 w-1/2 md:w-2/12"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>

      <div className="relative">
        <CustomDialog
          open={openCustomDialog}
          onClose={() => setIsCustomDialog(false)}
          maxWidth="md"
        >
          <div className="flex justify-between items-center py-2 px-3 border-b-2">
            <p></p>
            <h3 className="font-medium tracking-wide text-center text-2xl  text-theme">
              Details
            </h3>
            <IconButton size="small" onClick={() => setIsCustomDialog(false)}>
              <Close fontSize="small" className="!text-youtube" />
            </IconButton>
          </div>

          <aside className="px-4 py-8 flex flex-col gap-7">
            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              <div className=" border-t-4 border-theme rounded-md flex flex-col gap-2 justify-center items-center  shadow-md shadow-theme py-3 bg-gray-300">
                <h1 className="text-xl font-semibold ">Uploaded</h1>
                <p className="text-2xl font-bold text-green-600">
                  {isUploaded}
                </p>
              </div>

              <div
                className="cursor-pointer border-t-4 border-theme rounded-md flex flex-col gap-2 justify-center items-center shadow-md shadow-theme py-3 bg-cyan-400"
                onClick={handleClickNotUpload}
              >
                <h1 className="text-xl font-semibold ">Not Uploaded</h1>
                <p className="text-2xl font-bold text-red-600">
                  {isNotUploadedData?.length}
                </p>
              </div>

              <div
                className="cursor-pointer border-t-4 border-theme rounded-md flex flex-col gap-2 justify-center items-center shadow-md shadow-theme py-3 bg-orange-200"
                onClick={handleClickAlreadyUpload}
              >
                <h1 className="text-xl font-semibold ">Already Registered</h1>
                <p className="text-2xl font-bold  text-theme">
                  {isAlreadyRegisteredData?.length}
                </p>
              </div>
            </section>

            {isNotUploadedData && isNotUploadedData?.length > 0 ? (
              <section>
                <div>
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    ref={notUploadedRef}
                  >
                    Not Uploaded Cause :-
                  </h1>
                </div>

                {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1"> */}
                <div className=" w-full flex flex-col gap-3">
                  {isNotUploadedData?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className=" hover:scale-100 ease-in-out duration-700 transition-all hover:translate-x-1 border-t-2 border-theme/50 rounded-md flex flex-col gap-1 justify-items-start shadow-md shadow-theme px-2 py-1"
                    >
                      <span className="flex flex-col">
                        <p className="font-semibold  text-red-600">
                          Row No: {item?.__rowNum__ + 1}
                        </p>
                        <p className="font-semibold w-20 border-2 border-red-600 rounded-md"></p>
                      </span>
                      {item?.cause?.map((data: any, i: number) => (
                        <div className=" flex flex-col" key={i}>
                          <span className="w-full flex flex-row gap-2 ">
                            {/* <small className="font-semibold text-theme">
                              Field Name:
                            </small> */}
                            <small className="font-semibold  text-theme ">
                              {data?.path}
                            </small>
                            <small className="font-semibold  text-red-600 ">
                              {data?.message}
                            </small>
                          </span>
                        </div>
                      ))}

                      {/* <span className="w-full flex flex-row gap-2">
                        <p className="w-4">👨‍🎓</p>
                        <p
                          className={`font-semibold text-sm tracking-wide break-all ${
                            item?.data?.displayName ? "" : "text-red-600"
                          }`}
                        >
                          {item?.data?.displayName || "Please provide a name."}
                        </p>
                      </span>
                      <span className="w-full flex flex-row gap-2">
                        <p className="w-4">☎️</p>
                        <p
                          className={`font-semibold text-sm tracking-wide break-all ${
                            item?.data?.phoneNumber ? "" : "text-red-600"
                          }`}
                        >
                          {item?.data?.phoneNumber ||
                            "Please provide a phone number."}
                        </p>
                      </span>

                      <span className="w-full flex flex-row gap-2">
                        <p className="w-4">📩</p>
                        <p
                          className={`w-full font-semibold text-sm tracking-wide break-all ${
                            item?.data?.email ? "" : "text-red-600"
                          }`}
                        >
                          {item?.data?.email || "Please provide an email."}
                        </p>
                      </span>

                      <span className="w-full flex flex-row gap-2">
                        <p>❗</p>
                        <small className="text-red-600 font-semibold tracking-wide break-all">
                          {item?.cause}
                        </small>
                      </span> */}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {isAlreadyRegisteredData && isAlreadyRegisteredData?.length > 0 ? (
              <section>
                <div>
                  <h1
                    className="text-lg md:text-xl font-semibold"
                    ref={alreadyUploadRef}
                  >
                    Already Registered :-
                  </h1>
                </div>

                <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-1">
                  {isAlreadyRegisteredData?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="hover:scale-105  ease-in-out duration-700 transition-all hover:translate-x-1 border-t-2 border-theme/50 rounded-md flex flex-col gap-2 justify-center items-center  shadow-md shadow-theme p-4"
                    >
                      <span className="flex flex-col">
                        <p className="font-semibold  text-red-600">
                          Row No: {item?.__rowNum__ + 1}
                        </p>
                        <p className="font-semibold w-20 border-2 border-red-600 rounded-md"></p>
                      </span>
                      {/* <span className="w-full flex flex-row gap-2">
                        <p>👨‍🎓</p>
                        <small className="font-semibold text-sm tracking-wide break-all">
                          {item?.displayName}
                        </small>
                      </span>
                      <span className="w-full flex flex-row gap-2">
                        <p>☎️</p>
                        <small className="font-semibold text-sm tracking-wide break-all">
                          {item?.phoneNumber}
                        </small>
                      </span>
                      <span className="w-full flex flex-row gap-2">
                        <p>📩</p>
                        <small className="font-semibold text-sm tracking-wide break-all">
                          {item?.email}
                        </small>
                      </span> */}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        </CustomDialog>
      </div>
    </>
  );
};

export default AddPlacementData;
