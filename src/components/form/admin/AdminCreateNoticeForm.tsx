import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  InputField,
  TextInput,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import BatchType from "types/batch";
import { FinancialYear, notify } from "utils";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const createNoticeSchema = [
  {
    key: "1",
    label: "Title*",
    name: "title",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string()
      .required("Notice title is required*")
      .min(3, "title name must be at least 3 characters")
      .max(50, "title name must be at most 50 characters"),
    className: "w-full col-span-2  rounded-md",
  },
  {
    key: "2",
    label: "Description *",
    name: "description",
    type: "text",
    multiline: true,
    rows: 5,
    initialValue: "",
    validationSchema: Yup.string()
      .required("Description is required*")
      .min(3, "Description must be at least 10 characters"),
    className: "w-full col-span-2 rounded-md ",
  },

  // {
  //   key: "6",
  //   label: "Start Time *",
  //   initialValue: "",
  //   className: "w-full col-span-2 lg:col-span-1 rounded-md ",
  //   validationSchema: Yup.string().required("Start time required"),
  //   type: "datetime-local",
  //   name: "startTime",
  // },
  // {
  //   key: "7",
  //   label: "End Time *",
  //   initialValue: "",
  //   className: "w-full rounded-md ",
  //   validationSchema: Yup.string().required("End time required"),
  //   type: "datetime-local",
  //   name: "endTime",
  // },
  {
    key: "7",
    label: "Notice For Whom ? *",
    initialValue: "ALL",
    className: "w-full rounded-md col-span-2",
    validationSchema: Yup.string(),
    type: "radio",
    name: "role",
  },
];
const initialValues = createNoticeSchema.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = createNoticeSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);
type dataType = {
  data: BatchType[];
};
const AdminCreateNoticeForm = () => {
  const { mutate: notice } = useFetch();
  const { data: batch } = useSWRFetch<dataType>(
    "batch?course=true&branch=true&session=true"
  );
  const [selectAllStudents, setSelectAllStudents] = useState(true);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        let roleToSend = values.role;
        let batchToSend: string | null = values.batch;

        if (values.role === "STUDENT" && selectAllStudents && !values.batch) {
          roleToSend = "STUDENT";
          batchToSend = null; // No batch selected
        } else if (values.role === "STAFF") {
          if (values.teacherRole === "TEACHER") {
            roleToSend = "TEACHER";
          } else if (values.teacherRole === "STAFF") {
            roleToSend = "STAFF";
          }
          batchToSend = null; // No batch selected
        }

        // Define a separate type for the request object
        interface RequestBody {
          title: string;
          description: string;
          role: string;
          batch?: string | null; // Make batch property optional
        }

        // Create the request object
        const requestBody: RequestBody = {
          title: values.title,
          description: values.description,
          role: roleToSend,
        };

        // Only include 'batch' in the request if a batch has been selected
        if (batchToSend !== null) {
          requestBody.batch = batchToSend;
        }
        if (
          values?.role === "STAFF" &&
          values?.teacherRole !== "STAFF" &&
          values?.teacherRole !== "TEACHER"
        ) {
          const response = await notice({
            path: `notice/create`,
            method: "POST",
            body: JSON.stringify({
              title: values.title,
              description: values.description,
              role: "STAFF",
            }),
          });
          const response2 = await notice({
            path: `notice/create`,
            method: "POST",
            body: JSON.stringify({
              title: values.title,
              description: values.description,
              role: "TEACHER",
            }),
          });
          if (response?.data?.error) {
            notify.error(response?.data?.error);
            return;
          }
          if (response2?.data?.error) {
            notify.error(response?.data?.error);
            return;
          }
          notify.success("Notice sent successfully.");
          return;
        }
        const response = await notice({
          path: `notice/create`,
          method: "POST",
          body: JSON.stringify(requestBody),
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }

        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const router = useRouter();
  return (
    <section className="w-full min-h-[90vh] bg-gray-50 ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-8 items-center w-full max-w-5xl mx-auto py-2 md:py-8  md:px-4 "
      >
        <div className="flex flex-col gap-4 bg-white p-4 md:shadow-xl w-full rounded-lg  ">
          <h3 className="font-semibold tracking-wide text-2xl text-theme border-b pb-2 ">
            Create Notice
          </h3>

          <div className="   grid grid-cols-2 gap-4 md:gap-8 h-fit mb-8 ">
            {createNoticeSchema?.map((item, index) => (
              <div key={index} className={item?.className}>
                {item?.name === "description" ? (
                  <div className="flex flex-col gap-4">
                    <span className="flex flex-col gap-2">
                      <h3 className="font-medium tracking-wide text-gray-900 text-base  ">
                        Description *
                      </h3>
                    </span>
                    <FormControl>
                      <ReactQuill
                        theme="snow"
                        value={formik?.values?.description}
                        onChange={(value) => {
                          formik?.setFieldValue("description", value);
                        }}
                        onBlur={() => {
                          formik.setFieldTouched("description", true);
                        }}
                      />
                      <FormHelperText className="!text-red-600">
                        {formik?.touched?.description &&
                          (formik?.errors?.description as any)}
                      </FormHelperText>
                    </FormControl>
                  </div>
                ) : item?.name === "role" ? (
                  <div className="!w-full col-span-2">
                    <FormControl>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        className="!text-black text-wider font-medium pb-2"
                      >
                        Notice For Whom ? *
                      </FormLabel>
                      <RadioGroup
                        name="row-radio-buttons-group"
                        defaultValue="ALL"
                        value={formik?.values?.role}
                        row
                        onChange={(e) =>
                          formik.setFieldValue("role", e.target.value)
                        }
                      >
                        <FormControlLabel
                          className="text-black text-wider font-medium"
                          value="STUDENT"
                          control={<Radio />}
                          label="Students"
                        />
                        <FormControlLabel
                          className="text-black text-wider font-medium"
                          value="STAFF"
                          control={<Radio />}
                          label="Staffs"
                        />
                        <FormControlLabel
                          className="text-black text-wider font-medium"
                          value="ALL"
                          control={<Radio />}
                          label="All"
                        />
                      </RadioGroup>
                    </FormControl>
                    {formik?.values?.role === "STAFF" && (
                      <div className="w-full  gap-4">
                        <>
                          <FormControl>
                            <RadioGroup
                              className="px-5"
                              name="row-radio-buttons-group"
                              defaultValue="ALL"
                              value={formik?.values?.halfType}
                              row
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "teacherRole",
                                  e.target.value
                                )
                              }
                            >
                              <FormControlLabel
                                className="text-theme text-wider font-medium"
                                value="TEACHER"
                                control={<Radio />}
                                label="Teaching Staffs"
                              />
                              <FormControlLabel
                                className="text-theme text-wider font-medium"
                                value="STAFF"
                                control={<Radio />}
                                label="Non-Teaching Staffs"
                              />
                              <FormControlLabel
                                className="text-theme text-wider font-medium"
                                value="ALL"
                                control={<Radio />}
                                label="All Staffs"
                              />
                            </RadioGroup>
                          </FormControl>
                        </>
                      </div>
                    )}
                    {formik?.values?.role === "STUDENT" && (
                      <div className="grid grid-cols-2  w-full  gap-4">
                        <div className="w-full flex gap-3">
                          <div className="flex items-center justify-end">
                            <Checkbox
                              checked={
                                formik?.values?.batch
                                  ? false
                                  : selectAllStudents
                              }
                              onChange={() =>
                                setSelectAllStudents(!selectAllStudents)
                              }
                              inputProps={{
                                "aria-label": "Select All Students",
                              }}
                            />
                            <label htmlFor="selectAllStudents">All</label>
                          </div>
                          <div className="w-full">
                            {" "}
                            <AdminAutocomplete
                              size={"small"}
                              label={`Choose Batch`}
                              isOptionEqualToValue={(option, value) =>
                                option?.value === value?.value
                              }
                              onChange={(e, value) =>
                                formik?.setFieldValue("batch", value?.value)
                              }
                              noOptionText={
                                <div className="w-full flex flex-col gap-2">
                                  <small className="tracking-wide">
                                    No options found
                                  </small>
                                  <div
                                    className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                                    onClick={() =>
                                      router.push("/panel/admin/batch/create")
                                    }
                                  >
                                    Add New
                                  </div>
                                </div>
                              }
                              options={batch?.data?.map((data: any) => ({
                                label: `${data?.course?.title} ${data?.branch?.title} (${data?.session?.title})`,
                                value: `${data?._id}`,
                                key: `${data?._id}`,
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <InputField
                    type={item?.type as any}
                    variant="outlined"
                    className="rounded-md bg-gray-50 "
                    label={item?.label}
                    name={item?.name}
                    multiline={item?.multiline}
                    rows={item?.rows}
                    inputProps={
                      item?.name === "startTime"
                        ? {
                            min: dayjs().format("YYYY-MM-DDThh:mm"),
                          }
                        : item?.name === "endTime"
                        ? {
                            min: formik?.values?.startTime
                              ? dayjs(formik?.values?.startTime).format(
                                  "YYYY-MM-DDThh:mm"
                                )
                              : dayjs().format("YYYY-MM-DDThh:mm"),
                          }
                        : {}
                    }
                    // options={item?.options}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values[item?.name]}
                    error={Boolean(
                      formik?.touched[item?.name] && formik?.errors[item?.name]
                    )}
                    helperText={
                      formik?.touched[item?.name] &&
                      (formik?.errors[item?.name] as any)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            type={"submit"}
            className="hover:ring-theme"
            loading={formik?.isSubmitting}
          >
            Save & Create
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AdminCreateNoticeForm;
