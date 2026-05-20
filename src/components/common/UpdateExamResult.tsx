import { Button, CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useMemo } from "react";
import { notify } from "utils";
import * as Yup from "yup";

type UpdateExamMarkProps = {
  open?: boolean;
  closeFn?: () => void;
  examSubjectId?: any;
  studentData?: any;
  reload?: () => void;
};

const UpdateExamMark = ({
  open,
  closeFn,
  examSubjectId,
  studentData,
  reload,
}: UpdateExamMarkProps) => {
  const updateExamSchema = useMemo(() => {
    return [
      {
        key: "1",
        label: "Student Attendance*",
        name: "attendance",
        type: "select",
        initialValue:
          String(studentData?.result?.isAttended) === "undefined"
            ? ""
            : String(studentData?.result?.isAttended),
        validationSchema: Yup.string().required("Attendance is required*"),
      },
      {
        key: "3",
        label: "Mark update*",
        name: "examMark",
        type: "number",
        initialValue: studentData?.result?.obtainMark,
        validationSchema: Yup.number().when("attendance", {
          is: "true",
          then: Yup.number().required("Please enter obtain mark*"),
        }),
      },
      {
        key: "2",
        label: "Remark*",
        name: "remark",
        type: "text",
        multiline: true,
        rows: 4,
        initialValue: studentData?.result?.remark,
        validationSchema: Yup.string(),
      },
    ];
  }, [studentData]);

  const initialValues = useMemo(() => {
    return updateExamSchema.reduce((accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    }, {} as { [key: string]: string });
  }, [updateExamSchema]);

  const validationSchema = useMemo(() => {
    return updateExamSchema?.reduce((accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    }, {} as { [key: string]: string });
  }, [updateExamSchema]);

  const { data, isValidating } = useSWRFetch<any>(
    examSubjectId && `exam/subject/details/${examSubjectId}`
  );

  const { mutate } = useFetch();

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("student", studentData?.student?._id);
        formData.append("subjectExam", studentData?.examSubject);
        values?.examMark && formData.append("obtainMark", values?.examMark);
        values?.remark && formData.append("remark", values?.remark);
        formData.append("isAttended", values?.attendance);

        const response = await mutate({
          path: `exam/result/${studentData?.exam}`,
          method: "POST",
          isFormData: true,
          body: formData,
        });

        if (response?.data?.error) throw new Error(response?.data?.error);

        notify.success("Student exam result updated successfully");
        closeFn?.();
        reload?.();
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error.message);
        } else {
          notify.error("Oops! Something went wrong.");
        }
      }
    },
  });

  return (
    <CustomDialog maxWidth="sm" open={open} onClose={closeFn}>
      <form onSubmit={formik?.handleSubmit} className="w-full">
        <h3 className="font-semibold tracking-wide p-4 border-b text-xl text-center text-theme">
          Update Result
        </h3>
        <div className="flex flex-col gap-4 p-4 ">
          <div className="flex flex-col gap-4 w-full">
            <h3 className="font-medium tracking-wide">Student Attended</h3>
            <InputField
              type="select"
              value={formik?.values?.attendance}
              name="attendance"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              options={[
                {
                  key: "1",
                  label: "Attended",
                  value: "true",
                },
                {
                  key: "2",
                  label: "Not Attended",
                  value: "false",
                },
              ]}
              error={Boolean(
                formik?.touched?.attendance && formik?.errors?.attendance
              )}
              helperText={
                formik?.touched?.attendance &&
                (formik?.errors?.attendance as any)
              }
            />
          </div>
          {formik?.values?.attendance === "true" && (
            <>
              <div className="flex flex-col gap-4">
                <h3 className="font-medium tracking-wide">
                  {data?.data?.subject?.title}
                </h3>
                <span className="flex items-center gap-2">
                  <InputField
                    type="number"
                    value={formik?.values?.examMark}
                    name="examMark"
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder="Enter mark "
                    error={Boolean(
                      formik?.touched?.examMark && formik?.errors?.examMark
                    )}
                    helperText={
                      formik?.touched?.examMark &&
                      (formik?.errors?.examMark as any)
                    }
                  />
                </span>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="font-medium tracking-wide">Remark</h3>
                <InputField
                  type="text"
                  value={formik?.values?.remark}
                  name="remark"
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  fullWidth
                  rows={4}
                  multiline={true}
                  placeholder="Remark (Optional)"
                  error={Boolean(
                    formik?.touched?.remark && formik?.errors?.remark
                  )}
                  helperText={
                    formik?.touched?.remark && (formik?.errors?.remark as any)
                  }
                />
              </div>
            </>
          )}

          <div className="flex justify-center pt-2">
            <Button type="submit" loading={formik.isSubmitting}>
              Update
            </Button>
          </div>
        </div>
      </form>
    </CustomDialog>
  );
};

export default UpdateExamMark;
