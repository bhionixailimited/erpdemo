import { Add } from "@mui/icons-material";
import { Button, InputField } from "components/core";
import { FormikProps, useFormik } from "formik";
import { useMemo } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const EntranceExam = ({
  formik: mainFormik,
}: {
  formik?: FormikProps<any>;
}) => {
  const handleRemove = (id: string) => {
    try {
      mainFormik?.setFieldValue(
        "entranceDetails",
        mainFormik?.values?.entranceDetails?.filter(
          (inner: any) => inner?._id !== id
        )
      );
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
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
                    Exam
                  </th>
                  <th
                    scope="col"
                    className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Exam Roll Number*
                  </th>
                  <th
                    scope="col"
                    className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Year Of Appearing*
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
                    Score / Percentile
                  </th>
                  <th
                    scope="col"
                    className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    All India Rank
                  </th>
                  <th
                    scope="col"
                    className=" p-2 lg:px-3 lg:py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mainFormik?.values?.entranceDetails &&
                  mainFormik?.values?.entranceDetails?.map(
                    (item: any, i: number) => (
                      <tr
                        className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700"
                        key={item?._id}
                      >
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          <InputField
                            size="small"
                            type="text"
                            value={item?.examName}
                            name="examName"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          <InputField
                            size="small"
                            type="text"
                            value={item?.examRollNumber}
                            name="examRollNumber"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          <InputField
                            size="small"
                            type="number"
                            value={item?.yearOfAppearing}
                            name="yearOfAppearing"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                          <InputField
                            size="small"
                            type="text"
                            value={item?.resultStatus}
                            name="resultStatus"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                          <InputField
                            size="small"
                            type="text"
                            value={item?.score}
                            name="score"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                          <InputField
                            size="small"
                            type="number"
                            value={item?.allIndiaRank}
                            name="allIndiaRank"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={() => handleRemove(item?._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                <ExamDetails data={null} mainFormik={mainFormik} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamDetails = ({
  data,
  mainFormik,
}: {
  data?: any;
  mainFormik?: any;
}) => {
  const initialValues = useMemo(() => {
    return {
      examName: data?.examName || "",
      examRollNumber: data?.examRollNumber || "",
      yearOfAppearing: data?.yearOfAppearing || "",
      resultStatus: data?.resultStatus || "",
      score: data?.score || "",
      allIndiaRank: data?.allIndiaRank || "",
    };
  }, [data]);

  const validationSchema = Yup.object({
    examName: Yup.string().required("Exam name is required"),
    examRollNumber: Yup.string().required("Exam roll number is required"),
    yearOfAppearing: Yup.string().required("Exam appearing year is required"),
    resultStatus: Yup.string().required("Exam status is required"),
    score: Yup.string().required("Exam score is required"),
    allIndiaRank: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        let array = mainFormik?.values?.entranceDetails || [];
        mainFormik.setFieldValue(
          "entranceDetails",
          array?.length
            ? [
                ...array,
                {
                  _id: Date.now()?.toString(),
                  ...values,
                },
              ]
            : [
                {
                  _id: Date.now()?.toString(),
                  ...values,
                },
              ]
        );
        formik.resetForm();
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    },
  });

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
          <InputField
            size="small"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.examName}
            name="examName"
            error={formik.touched?.examName && Boolean(formik.errors?.examName)}
            helperText={
              ((formik.touched.examName && formik.errors.examName) ||
                "") as string
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
          <InputField
            size="small"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.examRollNumber}
            name="examRollNumber"
            error={
              formik.touched?.examRollNumber &&
              Boolean(formik.errors?.examRollNumber)
            }
            helperText={
              ((formik.touched.examRollNumber &&
                formik.errors.examRollNumber) ||
                "") as string
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
          <InputField
            size="small"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yearOfAppearing}
            name="yearOfAppearing"
            error={
              formik.touched?.yearOfAppearing &&
              Boolean(formik.errors?.yearOfAppearing)
            }
            helperText={
              ((formik.touched.yearOfAppearing &&
                formik.errors.yearOfAppearing) ||
                "") as string
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
          <InputField
            size="small"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resultStatus}
            name="resultStatus"
            error={
              formik.touched?.resultStatus &&
              Boolean(formik.errors?.resultStatus)
            }
            helperText={
              ((formik.touched.resultStatus && formik.errors.resultStatus) ||
                "") as string
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
          <InputField
            size="small"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.score}
            name="score"
            error={formik.touched?.score && Boolean(formik.errors?.score)}
            helperText={
              ((formik.touched.score && formik.errors.score) || "") as string
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
          <InputField
            size="small"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.allIndiaRank}
            name="allIndiaRank"
            error={
              formik.touched?.allIndiaRank &&
              Boolean(formik.errors?.allIndiaRank)
            }
            helperText={
              ((formik.touched.allIndiaRank && formik.errors.allIndiaRank) ||
                "") as string
            }
          />
        </td>
      </tr>
      {!data && (
        <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
          <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
            <Button startIcon={<Add />} onClick={() => formik.handleSubmit()}>
              Add More
            </Button>
          </td>
        </tr>
      )}
    </>
  );
};

export default EntranceExam;
