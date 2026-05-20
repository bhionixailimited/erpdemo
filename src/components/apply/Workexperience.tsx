import { Add } from "@mui/icons-material";
import { Button, InputField } from "components/core";
import { FormikProps, useFormik } from "formik";
import { useMemo } from "react";
import { notify } from "utils";
import * as Yup from "yup";

const WorkExperience = ({
  formik: mainFormik,
}: {
  formik?: FormikProps<any>;
}) => {
  const handleRemove = (id: string) => {
    try {
      mainFormik?.setFieldValue(
        "experienceDetails",
        mainFormik?.values?.experienceDetails?.filter(
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
                    Position*
                  </th>
                  <th
                    scope="col"
                    className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Employer*
                  </th>
                  <th
                    scope="col"
                    className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Location*
                  </th>
                  <th
                    scope="col"
                    className=" p-2 lg:px-3 lg:py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Number of years experience*
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
                {mainFormik?.values?.experienceDetails &&
                  mainFormik?.values?.experienceDetails?.map(
                    (item: any, i: number) => (
                      <tr
                        className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700"
                        key={item?._id}
                      >
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          <InputField
                            size="small"
                            type="text"
                            value={item?.position}
                            name="position"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          <InputField
                            size="small"
                            type="text"
                            value={item?.employer}
                            name="employer"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          <InputField
                            size="small"
                            type="text"
                            value={item?.location}
                            name="location"
                          />
                        </td>
                        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
                          <InputField
                            size="small"
                            type="number"
                            value={item?.yearsOfExperience}
                            name="yearsOfExperience"
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
                <WorkDetails mainFormik={mainFormik} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkDetails = ({ mainFormik }: { mainFormik?: any }) => {
  const initialValues = useMemo(() => {
    return {
      position: "",
      employer: "",
      location: "",
      yearsOfExperience: "",
    };
  }, []);

  const validationSchema = Yup.object({
    position: Yup.string().required("Work position is required"),
    employer: Yup.string().required("Work employer  is required"),
    location: Yup.string().required("Work location is required"),
    yearsOfExperience: Yup.string().required("Work experience is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        let array = mainFormik?.values?.experienceDetails || [];
        mainFormik.setFieldValue(
          "experienceDetails",
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
            name="position"
            onChange={formik?.handleChange}
            onBlur={formik.handleBlur}
            value={formik?.values?.position}
            helperText={
              formik?.touched?.position &&
              (formik?.errors?.position as string as any)
            }
            error={
              formik?.touched?.position && Boolean(formik?.errors?.position)
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
          <InputField
            size="small"
            type="text"
            name="employer"
            onChange={formik?.handleChange}
            onBlur={formik.handleBlur}
            value={formik?.values?.employer}
            helperText={
              formik?.touched?.employer &&
              (formik?.errors?.employer as string as any)
            }
            error={
              formik?.touched?.employer && Boolean(formik?.errors?.employer)
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
          <InputField
            size="small"
            type="text"
            name="location"
            onChange={formik?.handleChange}
            onBlur={formik.handleBlur}
            value={formik?.values?.location}
            helperText={
              formik?.touched?.location &&
              (formik?.errors?.location as string as any)
            }
            error={
              formik?.touched?.location && Boolean(formik?.errors?.location)
            }
          />
        </td>
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-end text-sm font-medium">
          <InputField
            size="small"
            type="text"
            name="yearsOfExperience"
            onChange={formik?.handleChange}
            onBlur={formik.handleBlur}
            value={formik?.values?.yearsOfExperience}
            helperText={
              formik?.touched?.yearsOfExperience &&
              (formik?.errors?.yearsOfExperience as string as any)
            }
            error={
              formik?.touched?.yearsOfExperience &&
              Boolean(formik?.errors?.yearsOfExperience)
            }
          />
        </td>
      </tr>
      <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
        <td className="p-2 lg:px-3 lg:py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
          <Button startIcon={<Add />} onClick={() => formik.handleSubmit()}>
            Add More
          </Button>
        </td>
      </tr>
    </>
  );
};

export default WorkExperience;
