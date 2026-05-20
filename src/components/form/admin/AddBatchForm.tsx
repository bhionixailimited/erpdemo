import { Autocomplete, TextField } from "@mui/material";
import { Button, InputField, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import BranchType from "types/branch";
import CourseType from "types/course";
import SessionType from "types/session";
import UserType from "types/user";
import { notify } from "utils";
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
type staffType = {
  data: UserType[];
};
const AddBatchForm = () => {
  const { push, query } = useRouter();
  const { batchId } = query;
  const { data: singleBatch } = useSWRFetch<any>(batchId && `batch/${batchId}`);
  const { data } = useSWRFetch<dataType>("session");
  const { data: course } = useSWRFetch<courseType>("course");
  const [courseId, setCourseId] = useState("");
  const { data: branch } = useSWRFetch<branchType>(
    courseId && `branch?courseId=${courseId}`
  );
  const { data: staff } = useSWRFetch<staffType>(`user?role=TEACHER`);
  const { mutate: batch } = useFetch();
  const [tags, setTags] = useState<any>();
  useEffect(() => {
    if (singleBatch?.data?.batchSection?.length) {
      setTags(singleBatch?.data?.batchSection);
    }

    return () => {};
  }, [singleBatch?.data?.batchSection]);

  const formSchema = useMemo(() => {
    return [
      {
        key: "0",
        label: "Image",
        name: "image",
        initialValue: "",
        validationSchema: Yup.string(),
        type: "file",
        disabled: batchId ? true : false,
      },
      {
        key: "2",
        name: "session",
        label: "Session *",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().required("Session is required"),
        options: data?.data?.length
          ? data?.data?.map((data) => ({
              label: `${data?.title}`,
              value: `${data?._id}`,
              key: `${data?.title}`,
            }))
          : [
              {
                key: "1",
                label: "No session found",
                value: "",
              },
            ],
        disabled: batchId ? true : false,
      },

      {
        key: "2kjk",
        name: "courseName",
        label: "Choose Course *",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().required("Course is required"),
        options: course?.data?.length
          ? course?.data?.map((data) => ({
              label: `${data?.title}`,
              value: `${data?._id}`,
              key: `${data?.title}`,
            }))
          : [
              {
                key: "1",
                label: "No course found",
                value: "",
              },
            ],
        disabled: batchId ? true : false,
      },
      {
        key: "2fd",
        name: "branchName",
        validationSchema: Yup.string().required("Branch is required"),
        label: "Choose Branch *",
        initialValue: "",
        type: "select",

        options: branch?.data?.length
          ? branch?.data?.map((data) => ({
              label: `${data?.title}`,
              value: `${data?._id}`,
              key: `${data?.title}`,
            }))
          : [
              {
                key: "1",
                label: "No branch found",
                value: "",
              },
            ],
        disabled: batchId ? true : false,
      },
      {
        key: "7",
        label: "Maximum Students",
        name: "noOfStudents",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "number",
      },
      {
        key: "7.5",
        label: "Name Of H.O.D",
        name: "hod",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "select",
        options: staff?.data?.length
          ? staff?.data?.map((data) => ({
              label: `${data?.displayName} (${data?.email})`,
              value: `${data?._id}`,
              key: `${data?._id}`,
            }))
          : [
              {
                key: "1",
                label: "No staffs found",
                value: "",
              },
            ],
      },

      {
        key: "7.556",
        label: "Batch Sections",
        name: "batchSection",
        initialValue: [],
        // validationSchema: Yup.string().optional(),
        type: "",
        // options: staff?.data?.length
        //   ? staff?.data?.map((data) => ({
        //       label: `${data?.displayName} (${data?.email})`,
        //       value: `${data?._id}`,
        //       key: `${data?._id}`,
        //     }))
        //   : [
        //       {
        //         key: "1",
        //         label: "No staffs found",
        //         value: "",
        //       },
        //     ],
      },
      {
        key: "2tuydujjvh",
        label: "Batch Summary",
        name: "description",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "textarea",
        multiline: true,
        row: 5,
      },
    ];
  }, [batchId, branch?.data, course?.data, data?.data, staff?.data]);

  const initialValues = formSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = formSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      session: singleBatch?.data?.session?._id,
      courseName: singleBatch?.data?.course?._id,
      branchName: singleBatch?.data?.branch?._id,
      noOfStudents: singleBatch?.data?.maximumStudent,
      hod: singleBatch?.data?.headOfDepartment?._id,
      image: singleBatch?.data?.iconUrl,
      description: singleBatch?.data?.description,
      batchSection: singleBatch?.data?.batchSection || [],
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("session", values?.session);
      formdata.append("course", values?.courseName);
      values?.branchName && formdata.append("branch", values?.branchName);
      values?.description &&
        formdata.append("description", values?.description);
      values?.noOfStudents &&
        formdata.append("maximumStudent", values?.noOfStudents);
      values?.hod && formdata.append("headOfDepartment", values?.hod);
      values?.image && formdata.append("icon", values?.image);

      // values?.batchSection?.length &&
      //   values?.batchSection &&
      //   formdata.append("batchSection", values?.batchSection);
      values?.batchSection?.length &&
        values?.batchSection?.map((item: any) =>
          formdata.append("batchSection", item)
        );

      try {
        const response = await batch({
          path: batchId ? `batch/update/${batchId}` : "batch/create",
          method: batchId ? "PUT" : "POST",
          body: formdata,
          isFormData: true,
        });
        // console.log(response);
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        batchId
          ? push(`/panel/admin/batch/${batchId}`)
          : push(`/panel/admin/batch`);
        formik?.resetForm(initialValues);
        notify.success(response?.data?.message);
      } catch (err: any) {
        notify.error(err?.message);
      }
    },
  });

  useEffect(() => {
    setCourseId(formik?.values?.courseName);
  }, [formik?.values?.courseName]);
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col bg-white rounded-xl shadow-xl">
      <h3 className="font-semibold tracking-wide border-b text-2xl p-4 text-theme text-center">
        {batchId ? "Edit Batch" : "Add New Batch"}
      </h3>
      <form
        className="grid grid-cols-2 gap-4 p-4"
        onSubmit={formik?.handleSubmit}
      >
        {formSchema?.map((item, i) => {
          if (item?.name === "batchSection") {
            return (
              <div className="w-full flex flex-col gap-4 " key={i}>
                <h3 className={""}>{"Batch Sections"}</h3>
                <Autocomplete
                  multiple
                  options={[]}
                  defaultValue={
                    formik.values?.batchSection?.filter(
                      (item: string) => item !== null
                    ) || []
                  }
                  value={
                    formik.values?.batchSection?.filter(
                      (item: string) => item !== null
                    ) || []
                  }
                  freeSolo
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(_e: any, value: string[]) => {
                    formik.setFieldValue("batchSection", value);
                  }}
                />
              </div>
            );
          }
          if (item?.type === "file") {
            return (
              <div
                className="w-full col-span-2 flex flex-col items-center"
                key={item?.key}
              >
                <h3 className="font-medium tracking-wide mb-4 text-base">
                  Upload Batch Image
                </h3>
                <UploadFile
                  disabled={item?.disabled}
                  outerClassName="max-w-sm w-full"
                  url={
                    formik.values.image &&
                    (typeof formik.values.image === "string"
                      ? formik.values.image
                      : URL.createObjectURL(formik?.values?.image))
                  }
                  onChange={(e: any) =>
                    formik?.setFieldValue("image", e.target.files[0])
                  }
                />
              </div>
            );
          } else if (item?.type === "textarea") {
            return (
              <div className="w-full col-span-2" key={item?.key}>
                <InputField
                  label={item?.label}
                  name={item?.name}
                  type={"text"}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  error={Boolean(
                    formik?.touched[item?.name] && formik?.errors[item?.name]
                  )}
                  helperText={
                    formik?.touched[item?.name] &&
                    (formik?.errors[item?.name] as any)
                  }
                  disabled={item?.disabled}
                  value={formik?.values[item?.name]}
                  multiline={item?.multiline}
                  rows={item?.row}
                />
              </div>
            );
          } else {
            return (
              <div className="w-full col-span-2 lg:col-span-1" key={item?.key}>
                <InputField
                  disabled={item?.disabled}
                  label={item?.label}
                  name={item?.name}
                  type={item?.type as any}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  value={formik?.values[item?.name]}
                  options={item?.options}
                  error={Boolean(
                    formik?.touched[item?.name] && formik?.errors[item?.name]
                  )}
                  helperText={
                    formik?.touched[item?.name] &&
                    (formik?.errors[item?.name] as any)
                  }
                />
              </div>
            );
          }
        })}

        <div className="flex items-center justify-center col-span-2 ">
          <Button type="submit" loading={formik?.isSubmitting}>
            {batchId ? "Edit Batch" : "Add Batch"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBatchForm;
