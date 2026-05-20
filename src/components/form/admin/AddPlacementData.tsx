import { FolderCopy } from "@mui/icons-material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useDeferredValue, useMemo, useState } from "react";
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
  {
    key: "-1",
    name: "startRowNumber",
    label: "Start row number *",
    initialValue: "",
    validationSchema: Yup.string().required("Start row number is required."),
    type: "number",
  },
  {
    key: "-1xa",
    name: "endRowNumber",
    label: "End row number *",
    initialValue: "",
    validationSchema: Yup.string().required("End row number is required."),
    type: "number",
  },
  {
    key: "-1sdxa",
    name: "yearColName",
    label: "Year column name *",
    initialValue: "",
    validationSchema: Yup.string().required("Year column name is required."),
    type: "text",
    placeholder: "Ex: A",
  },
  {
    key: "-1azssdxa",
    name: "studentIdColumnName",
    label: "StudentId column name *",
    initialValue: "",
    validationSchema: Yup.string().required(
      "StudentId column name is required."
    ),
    type: "text",
    placeholder: "Ex: B",
  },
  {
    key: "-1azssdsdxa",
    name: "studentRegNoColumnName",
    label: "Student registration column name",
    initialValue: "",
    validationSchema: Yup.string(),
    type: "text",
    placeholder: "Ex: C",
  },
  {
    key: "zssdxa",
    name: "companyColName",
    label: "Company column name *",
    initialValue: "",
    validationSchema: Yup.string().required("Company column name is required."),
    type: "text",
    placeholder: "Ex: D",
  },
  {
    key: "zssdxa",
    name: "positionColName",
    label: "Position column name *",
    initialValue: "",
    validationSchema: Yup.string().required(
      "Position column name is required."
    ),
    type: "text",
    placeholder: "Ex: E",
  },
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
const AddPlacementData = ({ open, closeFn, mutate }: any) => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const { data, isValidating } = useSWRFetch<dataType>(
    "user?role=STUDENT&perPage=15&pageNo=1" +
      (searchText ? `&searchTitle=${searchTitle}` : "")
  );

  const uploadStudentDataSchema = useMemo(() => {
    return [
      {
        key: "0",
        name: "placementYear",
        label: "Choose Year",
        initialValue: "",
        validationSchema: Yup.string().required("Year is required."),
        type: "autocomplete",
        options: Years,
      },
      {
        key: "1",
        name: "student",
        label: "Enter Student Name",
        type: "autocomplete",
        initialValue: "",
        validationSchema: Yup.string().required("Student Name is required."),
        options: data?.data?.map((data) => ({
          label: `${data?.displayName} ( ${data?.email} )`,
          value: `${data?._id}`,
          key: `${data?.email}`,
        })),
      },
      {
        key: "2",
        name: "companyName",
        label: "Company Name",
        initialValue: "",
        validationSchema: Yup.string().required("Company name is required."),
        type: "text",
      },
      {
        key: "3",
        name: "position",
        label: "Hiring Position",
        initialValue: "",
        validationSchema: Yup.string().required("Hiring position is required."),
        type: "text",
      },
    ];
  }, [data?.data]);
  const studentInitialValues = uploadStudentDataSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const studentValidationSchema = uploadStudentDataSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const [uploadExcel, setUploadExcel] = useState(false);
  const { mutate: add } = useFetch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await add({
          path: `placement-report/excel/upload`,
          method: "POST",
          body: autoAddFormdata(values),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        mutate();
        closeFn();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const studentFormik = useFormik({
    initialValues: studentInitialValues,
    validationSchema: Yup.object(studentValidationSchema),
    onSubmit: async (values) => {
      try {
        const response = await add({
          path: `placement-report/create`,
          method: "POST",
          body: autoAddFormdata({
            ...values,
            placementYear: new Date(
              new Date().setFullYear(values?.placementYear)
            ).toISOString(),
          }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        mutate();
        closeFn();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <CustomDialog open={open} onClose={closeFn} maxWidth="md">
      <div className="w-full flex flex-col md:flex-row items-center p-4 justify-between gap-2 mt-4 md:mt-0 border-b">
        <h3 className="font-semibold tracking-wide text-xl md:text-2xl  text-theme text-center ">
          Upload Placement Data
        </h3>
        {uploadExcel ? (
          <Button onClick={() => setUploadExcel(false)}>Enter Manually</Button>
        ) : (
          <Button onClick={() => setUploadExcel(true)}>Upload Excel</Button>
        )}
      </div>
      {uploadExcel ? (
        <div className="w-full">
          <form
            className="w-full flex flex-col gap-2 p-4"
            onSubmit={formik?.handleSubmit}
          >
            {excelPlacementSchema?.map((item) => {
              if (item?.type === "file") {
                return (
                  <div
                    className="w-full flex flex-col gap-4 items-center justify-center "
                    key={item?.key}
                  >
                    <h3 className="font-medium tracking-wide text-base">
                      Upload Excel Sheet
                    </h3>
                    {formik.values?.excel ? (
                      <div className="w-full bg-theme p-10 text-center rounded mb-1 ">
                        <FolderCopy className="text-white text-5xl" />
                        <h3 className="text-white  text-xl">Excel Uploaded</h3>
                      </div>
                    ) : (
                      <>
                        <UploadFile
                          onChange={(e: any) =>
                            formik?.setFieldValue(
                              item?.name,
                              e?.target?.files[0]
                            )
                          }
                          url={
                            formik?.values[item?.name] &&
                            (typeof formik?.values[item?.name] === "string"
                              ? formik?.values[item?.name]
                              : URL.createObjectURL(formik?.values[item?.name]))
                          }
                        />
                        (Enter data according to your excel sheet)
                      </>
                    )}
                  </div>
                );
              } else {
                return (
                  <InputField
                    key={item?.key}
                    type={item?.type as any}
                    name={item?.name}
                    label={item?.label}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    error={Boolean(
                      formik?.touched[item?.name] && formik?.errors[item?.name]
                    )}
                    placeholder={item?.placeholder}
                    // options={item?.options}
                    helperText={
                      formik?.touched[item?.name] &&
                      (formik?.errors[item?.name] as any)
                    }
                  />
                );
              }
            })}

            <div className="w-full flex items-center justify-center">
              <Button type="submit" loading={formik?.isSubmitting}>
                Upload Results
              </Button>
              <Button
                type="button"
                onClick={() => formik.resetForm()}
                className="bg-themeSecondary hover:ring-red-300"
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full">
          <form
            className="flex flex-col gap-4 p-4 "
            onSubmit={studentFormik?.handleSubmit}
          >
            {uploadStudentDataSchema?.map((item) =>
              item?.type === "autocomplete" ? (
                <CustomAutocomplete
                  key={item?.key}
                  label={item?.label}
                  onSearchTextChange={(e) => setSearchTitle(e.target.value)}
                  onChange={(e, value) => {
                    studentFormik?.setFieldValue(item?.name, value?.value);
                  }}
                  error={Boolean(
                    studentFormik?.touched[item?.name] &&
                      studentFormik?.errors[item?.name]
                  )}
                  helperText={
                    studentFormik?.touched[item?.name] &&
                    (studentFormik?.errors[item?.name] as any)
                  }
                  options={item?.options}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value?.value
                  }
                  noOptionText="No students found"
                />
              ) : (
                <InputField
                  type={item?.type as any}
                  name={item?.name}
                  label={item?.label}
                  onChange={studentFormik?.handleChange}
                  onBlur={studentFormik?.handleBlur}
                  key={item?.key}
                  error={Boolean(
                    studentFormik?.touched[item?.name] &&
                      studentFormik?.errors[item?.name]
                  )}
                  options={item?.options}
                  helperText={
                    studentFormik?.touched[item?.name] &&
                    (studentFormik?.errors[item?.name] as any)
                  }
                />
              )
            )}
            <div className="w-full flex items-center justify-center">
              <Button type="submit" loading={studentFormik?.isSubmitting}>
                Upload Results
              </Button>
            </div>
          </form>
        </div>
      )}
    </CustomDialog>
  );
};

export default AddPlacementData;
