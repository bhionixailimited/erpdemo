import { Add, ArrowRightAlt, ExitToApp, Preview } from "@mui/icons-material";
import { Checkbox, FormHelperText } from "@mui/material";
import { Button, InputField } from "components/core";
import { useFormik } from "formik";
import { useApplyAuth, useFetch } from "hooks";
import { useMemo } from "react";
import { INDIAN_BOARDS, notify } from "utils";
import * as Yup from "yup";
import EntranceExam from "./EntranceExam";
import WorkExperience from "./Workexperience";
import { useRouter } from "next/router";

export const INDIAN_GRADE_SYSTEM = [
  {
    key: "1",
    label: "CGPA (Cumulative Grade Point Average)",
    value: "CGPA (Cumulative Grade Point Average)",
  },
  {
    key: "2",
    label: "SGPA (Semester Grade Point Average)",
    value: "SGPA (Semester Grade Point Average)",
  },
  {
    key: "3",
    label: "GPA (Grade Point Average)",
    value: "GPA (Grade Point Average)",
  },
  {
    key: "4",
    label: "Percentage (%)",
    value: "Percentage (%)",
  },
  {
    key: "5",
    label: "Letter grades (A, B, C, etc.)",
    value: "Letter grades (A, B, C, etc.)",
  },
  {
    key: "6",
    label: "Other",
    value: "Other",
  },
];

const EducationalDetails = ({
  setActiveStep,
}: {
  setActiveStep?: (arg: any) => void;
}) => {
  const { mutate } = useFetch();
  const { user, revalidation } = useApplyAuth();
  const router = useRouter();

  const initialValues = useMemo(() => {
    return {
      xSchoolName: user?.schoolName || "",
      xRegistrationNumber: user?.schoolRegistrationNumber || "",
      xBoard: user?.schoolBoard || "",
      xYearOfPassing: user?.schoolPassingYear || "",
      xMarkingScheme: user?.schoolMarkingScheme || "",
      xPercentage: user?.obtainScore || "",
      higherStudies:
        user?.xiithSchoolName && user?.diplomaInstituteName
          ? "both"
          : user?.xiithSchoolName && !user?.diplomaInstituteName
          ? "xii"
          : !user?.xiithSchoolName && user?.diplomaInstituteName
          ? "diploma"
          : "",
      xiiSchoolName: user?.xiithSchoolName || "",
      xiiUniversityName: user?.xiithBoard || "",
      xiiRegistrationNumber: user?.xiithRegistrationNumber,
      xiiStream: user?.xiiStream || "",
      xiiYearOfPassing: user?.xiiYearOfPassing || "",
      xiiResultStatus: user?.xiiResultStatus || "",
      xiiMarkingScheme: user?.xiiMarkingScheme || "",
      xiiPercentage: user?.xiiObtainScore || "",
      diplomaSchoolName: user?.diplomaInstituteName || "",
      diplomaUniversityName: user?.diplomaUniversityName || "",
      diplomaStream: user?.diplomaStream || "",
      diplomaResultStatus: user?.diplomaResultStatus || "",
      diplomaYearOfPassing: user?.diplomaYearOfPassing || "",
      diplomaMarkingScheme: user?.diplomaMarkingScheme || "",
      diplomaPercentage: user?.diplomaObtainScore || "",
      isEntranceAppeared: user?.entranceExams?.length ? true : "",
      entranceDetails: user?.entranceExams || "",
      isWorkExperience: user?.workExperience?.length ? true : "",
      experienceDetails: user?.workExperience || "",
      saveAndExit: "false",
    };
  }, [user?._id]);

  const validationSchema = Yup.object({
    xSchoolName: Yup.string().required("School name is required"),
    xRegistrationNumber: Yup.string().required(
      "Registration number is required"
    ),
    xBoard: Yup.string().required("Board is required"),
    xYearOfPassing: Yup.string().required("Year of passing is required"),
    xMarkingScheme: Yup.string().required("Marking scheme is required"),
    xPercentage: Yup.string().required("Percentage is required"),
    higherStudies: Yup.string().required("This field is required"),
    xiiSchoolName: Yup.string().when("higherStudies", {
      is: (higherStudies: string) => ["both", "xii"]?.includes(higherStudies),
      then: Yup.string().required("School name is required"),
    }),
    xiiUniversityName: Yup.string().when("higherStudies", {
      is: (higherStudies: string) => ["both", "xii"]?.includes(higherStudies),
      then: Yup.string().required("Board/University name is required"),
    }),
    xiiRegistrationNumber: Yup.string().when("higherStudies", {
      is: (higherStudies: string) => ["both", "xii"]?.includes(higherStudies),
      then: Yup.string().required("Registration number is required"),
    }),
    xiiStream: Yup.string().when("higherStudies", {
      is: (higherStudies: string) => ["both", "xii"]?.includes(higherStudies),
      then: Yup.string().required("Stream is required"),
    }),
    xiiYearOfPassing: Yup.string().when("higherStudies", {
      is: (higherStudies: string) => ["both", "xii"]?.includes(higherStudies),
      then: Yup.string().required("Year of passing is required"),
    }),
    xiiResultStatus: Yup.string().when("higherStudies", {
      is: (higherStudies: string) => ["both", "xii"]?.includes(higherStudies),
      then: Yup.string().required("Result status is required"),
    }),
    xiiMarkingScheme: Yup.string().when("xiiResultStatus", {
      is: "PUBLISHED",
      then: Yup.string().required("Marking scheme is required"),
    }),
    xiiPercentage: Yup.string().when("xiiResultStatus", {
      is: "PUBLISHED",
      then: Yup.string().required("Percentage is required"),
    }),
    diplomaSchoolName: Yup.string().when("higherStudies", {
      is: (higherStudies: string) =>
        ["both", "diploma"]?.includes(higherStudies),
      then: Yup.string().required("Institute name is required"),
    }),
    diplomaUniversityName: Yup.string().when("higherStudies", {
      is: (higherStudies: string) =>
        ["both", "diploma"]?.includes(higherStudies),
      then: Yup.string().required("University name is required"),
    }),
    diplomaStream: Yup.string().when("higherStudies", {
      is: (higherStudies: string) =>
        ["both", "diploma"]?.includes(higherStudies),
      then: Yup.string().required("Stream is required"),
    }),
    diplomaYearOfPassing: Yup.string().when("higherStudies", {
      is: (higherStudies: string) =>
        ["both", "diploma"]?.includes(higherStudies),
      then: Yup.string().required("Year of passing is required"),
    }),
    diplomaResultStatus: Yup.string().when("higherStudies", {
      is: (higherStudies: string) =>
        ["both", "diploma"]?.includes(higherStudies),
      then: Yup.string().required("Result status is required"),
    }),
    diplomaMarkingScheme: Yup.string().when("diplomaResultStatus", {
      is: "PUBLISHED",
      then: Yup.string().required("Marking scheme is required"),
    }),
    diplomaPercentage: Yup.string().when("diplomaResultStatus", {
      is: "PUBLISHED",
      then: Yup.string().required("Percentage is required"),
    }),
    isEntranceAppeared: Yup.boolean().required("This field is required"),
    entranceDetails: Yup.mixed().optional(),
    isWorkExperience: Yup.boolean().required("This field is required"),
    experienceDetails: Yup.mixed().optional(),
    saveAndExit: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const body = {
          schoolName: values?.xSchoolName,
          schoolRegistrationNumber: values?.xRegistrationNumber,
          schoolBoard: values?.xBoard,
          schoolPassingYear: values?.xYearOfPassing,
          schoolMarkingScheme: values?.xMarkingScheme,
          obtainScore: values?.xPercentage,
          xiithSchoolName: values?.xiiSchoolName,
          xiithBoard: values?.xiiUniversityName,
          xiithRegistrationNumber: values?.xiiRegistrationNumber,
          xiiStream: values?.xiiStream,
          xiiYearOfPassing: values?.xiiYearOfPassing,
          xiiResultStatus: values?.xiiResultStatus,
          xiiMarkingScheme: values?.xiiMarkingScheme,
          xiiObtainScore: values?.xiiPercentage,
          diplomaInstituteName: values?.diplomaSchoolName,
          diplomaUniversityName: values?.diplomaUniversityName,
          diplomaStream: values?.diplomaStream,
          diplomaResultStatus: values?.diplomaResultStatus,
          diplomaYearOfPassing: values?.diplomaYearOfPassing,
          diplomaMarkingScheme: values?.diplomaMarkingScheme,
          diplomaObtainScore: values?.diplomaPercentage,
          isEducationalDetailsSubmitted: true,
          entranceDetails: values?.entranceDetails,
          experienceDetails: values?.experienceDetails,
        };

        const response = await mutate({
          path: `registration/${user?._id}`,
          method: "PUT",
          body: JSON.stringify(body),
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        revalidation();
        if (values?.saveAndExit === "true") {
          return router.push("/apply");
        } else {
          setActiveStep?.((prev: number) => prev + 1);
        }
        // setActiveStep?.((prev: number) => prev + 1);
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    },
  });
  // console.log("Education formik", formik);
  return (
    <section className="w-full bg-white">
      <div className="w-full main-container">
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            ACADEMIC DETAILS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4 flex flex-col  gap-4  ">
            <h3 className="font-medium w-full  tracking-wide text-lg">
              Xth Details
            </h3>

            <div className="flex flex-col border w-full">
              <div className="-m-1.5 overflow-x-auto w-full  ">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            School Name
                          </th>
                          <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Registration Number*
                          </th>
                          <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Board*
                          </th>
                          <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Year Of Passing*
                          </th>
                          <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Marking Scheme*
                          </th>
                          <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Obtain CGPA / Percentage*
                          </th>
                          {/* <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-end text-xs font-medium text-gray-500 uppercase"
                          >
                            Action
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
                          <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            <InputField
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.xSchoolName}
                              name="xSchoolName"
                              error={
                                formik.touched?.xSchoolName &&
                                Boolean(formik.errors?.xSchoolName)
                              }
                              helperText={
                                (formik.touched.xSchoolName &&
                                  formik.errors.xSchoolName) ||
                                ""
                              }
                              size="small"
                              type="text"
                              mainClass="min-w-[100px]"
                            />
                          </td>
                          <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <InputField
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.xRegistrationNumber}
                              name="xRegistrationNumber"
                              error={
                                formik.touched?.xRegistrationNumber &&
                                Boolean(formik.errors?.xRegistrationNumber)
                              }
                              helperText={
                                (formik.touched.xRegistrationNumber &&
                                  formik.errors.xRegistrationNumber) ||
                                ""
                              }
                              size="small"
                              type="text"
                              mainClass="min-w-[100px]"
                            />
                          </td>
                          <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <InputField
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.xBoard}
                              name="xBoard"
                              error={
                                formik.touched?.xBoard &&
                                Boolean(formik.errors?.xBoard)
                              }
                              helperText={
                                (formik.touched.xBoard &&
                                  formik.errors.xBoard) ||
                                ""
                              }
                              size="small"
                              type="select"
                              options={INDIAN_BOARDS}
                              mainClass="min-w-[100px]"
                            />
                          </td>
                          <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                            <InputField
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.xYearOfPassing}
                              name="xYearOfPassing"
                              error={
                                formik.touched?.xYearOfPassing &&
                                Boolean(formik.errors?.xYearOfPassing)
                              }
                              helperText={
                                (formik.touched.xYearOfPassing &&
                                  formik.errors.xYearOfPassing) ||
                                ""
                              }
                              size="small"
                              type="number"
                              mainClass="min-w-[100px]"
                            />
                          </td>
                          <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                            <InputField
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.xMarkingScheme}
                              name="xMarkingScheme"
                              error={
                                formik.touched?.xMarkingScheme &&
                                Boolean(formik.errors?.xMarkingScheme)
                              }
                              helperText={
                                (formik.touched.xMarkingScheme &&
                                  formik.errors.xMarkingScheme) ||
                                ""
                              }
                              size="small"
                              type="select"
                              options={INDIAN_GRADE_SYSTEM}
                              mainClass="min-w-[100px]"
                            />
                          </td>
                          <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                            <InputField
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.xPercentage}
                              name="xPercentage"
                              error={
                                formik.touched?.xPercentage &&
                                Boolean(formik.errors?.xPercentage)
                              }
                              helperText={
                                (formik.touched.xPercentage &&
                                  formik.errors.xPercentage) ||
                                ""
                              }
                              size="small"
                              type="number"
                              mainClass="min-w-[100px]"
                            />
                          </td>
                          {/* <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            >
                              Clear
                            </button>
                          </td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-span-3 flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                After Xth Qualification*
              </h3>
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <Checkbox
                    checked={formik?.values?.higherStudies === "xii"}
                    onClick={() => formik.setFieldValue("higherStudies", "xii")}
                  />
                  <small>XII</small>
                </span>
                <span className="flex items-center">
                  <Checkbox
                    checked={formik?.values?.higherStudies === "diploma"}
                    onClick={() =>
                      formik.setFieldValue("higherStudies", "diploma")
                    }
                  />
                  <small>Diploma</small>
                </span>
                <span className="flex items-center">
                  <Checkbox
                    checked={formik?.values?.higherStudies === "both"}
                    onClick={() =>
                      formik.setFieldValue("higherStudies", "both")
                    }
                  />
                  <small>Both</small>
                </span>
              </div>
              {formik?.touched?.higherStudies &&
                formik?.errors?.higherStudies && (
                  <FormHelperText error={true}>
                    {formik?.errors?.higherStudies}
                  </FormHelperText>
                )}
            </div>

            {["both", "xii"]?.includes(
              String(formik?.values?.higherStudies)
            ) && (
              <>
                <h3 className="font-medium w-full  tracking-wide text-lg">
                  XIIth Details
                </h3>
                <div className="flex flex-col border w-full">
                  <div className="-m-1.5 overflow-x-auto w-full  ">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                School Name
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Board / University*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Registration Number*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Stream*
                              </th>

                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Year Of Passing*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Result Status*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Marking Scheme*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Obtain CGPA / Percentage*
                              </th>
                              {/* <th
                           scope="col"
                           className=" p-2 lg:px-3 lg:py-3 text-end text-xs font-medium text-gray-500 uppercase"
                         >
                           Action
                         </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiSchoolName}
                                  name="xiiSchoolName"
                                  error={
                                    formik.touched?.xiiSchoolName &&
                                    Boolean(formik.errors?.xiiSchoolName)
                                  }
                                  helperText={
                                    (formik.touched.xiiSchoolName &&
                                      formik.errors.xiiSchoolName) ||
                                    ""
                                  }
                                  size="small"
                                  type="text"
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiUniversityName}
                                  name="xiiUniversityName"
                                  error={
                                    formik.touched?.xiiUniversityName &&
                                    Boolean(formik.errors?.xiiUniversityName)
                                  }
                                  helperText={
                                    (formik.touched.xiiUniversityName &&
                                      formik.errors.xiiUniversityName) ||
                                    ""
                                  }
                                  size="small"
                                  type="select"
                                  options={INDIAN_BOARDS}
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiRegistrationNumber}
                                  name="xiiRegistrationNumber"
                                  error={
                                    formik.touched?.xiiRegistrationNumber &&
                                    Boolean(
                                      formik.errors?.xiiRegistrationNumber
                                    )
                                  }
                                  helperText={
                                    (formik.touched.xiiRegistrationNumber &&
                                      formik.errors.xiiRegistrationNumber) ||
                                    ""
                                  }
                                  size="small"
                                  type="text"
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiStream}
                                  name="xiiStream"
                                  error={
                                    formik.touched?.xiiStream &&
                                    Boolean(formik.errors?.xiiStream)
                                  }
                                  helperText={
                                    (formik.touched.xiiStream &&
                                      formik.errors.xiiStream) ||
                                    ""
                                  }
                                  size="small"
                                  type="text"
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiYearOfPassing}
                                  name="xiiYearOfPassing"
                                  error={
                                    formik.touched?.xiiYearOfPassing &&
                                    Boolean(formik.errors?.xiiYearOfPassing)
                                  }
                                  helperText={
                                    (formik.touched.xiiYearOfPassing &&
                                      formik.errors.xiiYearOfPassing) ||
                                    ""
                                  }
                                  size="small"
                                  type="number"
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiResultStatus}
                                  name="xiiResultStatus"
                                  error={
                                    formik.touched?.xiiResultStatus &&
                                    Boolean(formik.errors?.xiiResultStatus)
                                  }
                                  helperText={
                                    (formik.touched.xiiResultStatus &&
                                      formik.errors.xiiResultStatus) ||
                                    ""
                                  }
                                  size="small"
                                  type="select"
                                  options={[
                                    {
                                      key: "1",
                                      label: "PUBLISHED",
                                      value: "PUBLISHED",
                                    },
                                    {
                                      key: "2",
                                      label: "NOT PUBLISHED",
                                      value: "NOT PUBLISHED",
                                    },
                                  ]}
                                />
                              </td>

                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  disabled={
                                    formik?.values?.xiiResultStatus !==
                                    "PUBLISHED"
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiMarkingScheme}
                                  name="xiiMarkingScheme"
                                  error={
                                    formik.touched?.xiiMarkingScheme &&
                                    Boolean(formik.errors?.xiiMarkingScheme)
                                  }
                                  helperText={
                                    (formik.touched.xiiMarkingScheme &&
                                      formik.errors.xiiMarkingScheme) ||
                                    ""
                                  }
                                  size="small"
                                  type="select"
                                  options={INDIAN_GRADE_SYSTEM}
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  disabled={
                                    formik?.values?.xiiResultStatus !==
                                    "PUBLISHED"
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.xiiPercentage}
                                  name="xiiPercentage"
                                  error={
                                    formik.touched?.xiiPercentage &&
                                    Boolean(formik.errors?.xiiPercentage)
                                  }
                                  helperText={
                                    (formik.touched.xiiPercentage &&
                                      formik.errors.xiiPercentage) ||
                                    ""
                                  }
                                  size="small"
                                  type="number"
                                />
                              </td>
                              {/* <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                           <button
                             type="button"
                             className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                           >
                             Clear
                           </button>
                         </td> */}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {["diploma", "both"]?.includes(
              String(formik?.values?.higherStudies)
            ) && (
              <>
                <h3 className="font-medium w-full  tracking-wide text-lg">
                  Diploma Details
                </h3>

                <div className="flex flex-col border w-full">
                  <div className="-m-1.5 overflow-x-auto w-full  ">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Institute Name
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                University*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Stream*
                              </th>

                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Year Of Passing*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Result Status*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Marking Scheme*
                              </th>
                              <th
                                scope="col"
                                className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Obtain CGPA / Percentage*
                              </th>
                              {/* <th
                            scope="col"
                            className=" p-2 lg:px-3 lg:py-3 text-end text-xs font-medium text-gray-500 uppercase"
                          >
                            Action
                          </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.diplomaSchoolName}
                                  name="diplomaSchoolName"
                                  error={
                                    formik.touched?.diplomaSchoolName &&
                                    Boolean(formik.errors?.diplomaSchoolName)
                                  }
                                  helperText={
                                    (formik.touched.diplomaSchoolName &&
                                      formik.errors.diplomaSchoolName) ||
                                    ""
                                  }
                                  size="small"
                                  type="text"
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.diplomaUniversityName}
                                  name="diplomaUniversityName"
                                  error={
                                    formik.touched?.diplomaUniversityName &&
                                    Boolean(
                                      formik.errors?.diplomaUniversityName
                                    )
                                  }
                                  helperText={
                                    (formik.touched.diplomaUniversityName &&
                                      formik.errors.diplomaUniversityName) ||
                                    ""
                                  }
                                  size="small"
                                  type="text"
                                  // options={[
                                  //   {
                                  //     key: "1",
                                  //     label: "State University",
                                  //     value: "State University",
                                  //   },
                                  // ]}
                                />
                              </td>
                              <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.diplomaStream}
                                  name="diplomaStream"
                                  error={
                                    formik.touched?.diplomaStream &&
                                    Boolean(formik.errors?.diplomaStream)
                                  }
                                  helperText={
                                    (formik.touched.diplomaStream &&
                                      formik.errors.diplomaStream) ||
                                    ""
                                  }
                                  size="small"
                                  type="text"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.diplomaYearOfPassing}
                                  name="diplomaYearOfPassing"
                                  error={
                                    formik.touched?.diplomaYearOfPassing &&
                                    Boolean(formik.errors?.diplomaYearOfPassing)
                                  }
                                  helperText={
                                    (formik.touched.diplomaYearOfPassing &&
                                      formik.errors.diplomaYearOfPassing) ||
                                    ""
                                  }
                                  size="small"
                                  type="number"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.diplomaResultStatus}
                                  name="diplomaResultStatus"
                                  error={
                                    formik.touched?.diplomaResultStatus &&
                                    Boolean(formik.errors?.diplomaResultStatus)
                                  }
                                  helperText={
                                    (formik.touched.diplomaResultStatus &&
                                      formik.errors.diplomaResultStatus) ||
                                    ""
                                  }
                                  size="small"
                                  type="select"
                                  options={[
                                    {
                                      key: "1",
                                      label: "PUBLISHED",
                                      value: "PUBLISHED",
                                    },
                                    {
                                      key: "2",
                                      label: "NOT PUBLISHED",
                                      value: "NOT PUBLISHED",
                                    },
                                  ]}
                                />
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  disabled={
                                    formik?.values?.diplomaResultStatus !==
                                    "PUBLISHED"
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.diplomaMarkingScheme}
                                  name="diplomaMarkingScheme"
                                  error={
                                    formik.touched?.diplomaMarkingScheme &&
                                    Boolean(formik.errors?.diplomaMarkingScheme)
                                  }
                                  helperText={
                                    (formik.touched.diplomaMarkingScheme &&
                                      formik.errors.diplomaMarkingScheme) ||
                                    ""
                                  }
                                  size="small"
                                  type="select"
                                  options={INDIAN_GRADE_SYSTEM}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <InputField
                                  disabled={
                                    formik?.values?.diplomaResultStatus !==
                                    "PUBLISHED"
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.diplomaPercentage}
                                  name="diplomaPercentage"
                                  error={
                                    formik.touched?.diplomaPercentage &&
                                    Boolean(formik.errors?.diplomaPercentage)
                                  }
                                  helperText={
                                    (formik.touched.diplomaPercentage &&
                                      formik.errors.diplomaPercentage) ||
                                    ""
                                  }
                                  size="small"
                                  type="number"
                                />
                              </td>

                              {/* <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            >
                              Clear
                            </button>
                          </td> */}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            NATIONAL/STATE LEVEL QUALIFYING EXAM DETAILS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4 flex flex-col  gap-4  ">
            <div className=" col-span-3 flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Have you appeared in any entrance examination ?*
              </h3>
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <Checkbox
                    checked={
                      String(formik?.values?.isEntranceAppeared) === "true"
                    }
                    onClick={() =>
                      formik?.setFieldValue("isEntranceAppeared", true)
                    }
                  />
                  <small>Yes</small>
                </span>
                <span className="flex items-center">
                  <Checkbox
                    checked={
                      String(formik?.values?.isEntranceAppeared) === "false"
                    }
                    onClick={() =>
                      formik?.setFieldValue("isEntranceAppeared", false)
                    }
                  />
                  <small>No</small>
                </span>
              </div>
              {formik?.touched?.isEntranceAppeared &&
                formik?.errors?.isEntranceAppeared && (
                  <FormHelperText error>
                    {formik?.errors?.isEntranceAppeared}
                  </FormHelperText>
                )}
            </div>
            {formik?.values?.isEntranceAppeared && (
              <EntranceExam formik={formik} />
            )}

            <div className=" col-span-3 flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Do you have any work experience?*
              </h3>
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <Checkbox
                    checked={
                      String(formik?.values?.isWorkExperience) === "true"
                    }
                    onClick={() =>
                      formik?.setFieldValue("isWorkExperience", true)
                    }
                  />
                  <small>Yes</small>
                </span>
                <span className="flex items-center">
                  <Checkbox
                    checked={
                      String(formik?.values?.isWorkExperience) === "false"
                    }
                    onClick={() =>
                      formik?.setFieldValue("isWorkExperience", false)
                    }
                  />
                  <small>No</small>
                </span>
              </div>
              {formik?.touched?.isWorkExperience &&
                formik?.errors?.isWorkExperience && (
                  <FormHelperText error>
                    {formik?.errors?.isWorkExperience}
                  </FormHelperText>
                )}
            </div>

            {formik?.values?.isWorkExperience && (
              <WorkExperience formik={formik} />
            )}
          </div>
        </div>

        <div className="w-full bg-theme/5 rounded-md shadow-md shadow-gray-400 mt-10  p-4 flex items-center gap-4 justify-between">
          <Button
            type="submit"
            onClick={() => {
              formik.setFieldValue("saveAndExit", "true");
              formik?.handleSubmit();
            }}
            startIcon={<ExitToApp />}
          >
            Save and Exit
          </Button>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            endIcon={<ArrowRightAlt />}
            onClick={() => {
              formik?.setFieldValue("saveAndExit", "false");
              formik?.handleSubmit();
            }}
          >
            {formik.isSubmitting ? "Loading..." : "Next"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationalDetails;
