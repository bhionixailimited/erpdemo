import { Button, CustomAutocomplete, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import ICompany from "types/company";
import { PlacementNoticeType } from "types/placementnotice";
import SessionType from "types/session";
import { notify } from "utils";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
type dataType = {
  data: SessionType[];
};
type placementDataType = {
  data: PlacementNoticeType;
};

type CompanyDataType = {
  data: ICompany[];
};

const PlacementCreateForm = () => {
  const { push, query } = useRouter();
  const { noticeId } = query;
  const {
    data: notice,
    isValidating,
    mutate,
  } = useSWRFetch<placementDataType>(`placement/notice/${noticeId}`);

  const { data, mutate: reloadSession } = useSWRFetch<dataType>("session");
  const [searchTitle, setSearchTitle] = useState("");
  const { data: company } = useSWRFetch<CompanyDataType>(
    `placement/company?perPage=20&pageNo=1` +
      (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );
  const { mutate: transport } = useFetch();

  const placementSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "title",
        label: "Job Title *",
        initialValue: "",
        validationSchema: Yup.string().required("Job title is required*"),
        type: "text",
      },
      {
        key: "5",
        name: "qualification",
        label: "Qualification",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "text",
      },
      // {
      //   key: "1A",
      //   name: "companyRepresentative",
      //   label: "Company Representative",
      //   initialValue: "",
      //   validationSchema: Yup.string().optional(),
      //   type: "text",
      // },
      {
        key: "9",
        name: "companyId",
        label: "Choose Company",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "autocomplete",
        options: company?.data?.map((item) => {
          return {
            label: `${item?.name} ` + (item?.branch || ""),
            value: `${item?._id}`,
            key: `${item?._id}`,
          };
        }),
      },
      {
        key: "10",
        name: "session",
        label: "Choose Session *",
        initialValue: "",
        validationSchema: Yup.string().required("Session is required*"),
        type: "select",
        options: data?.data?.map((data) => ({
          label: `${data?.title}`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: "3",
        name: "companyName",
        label: "Company Name",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "text",
      },
      {
        key: "3s",
        name: "position",
        label: "Designation",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "text",
      },
      {
        key: "ds3",
        name: "lastDateToApply",
        label: "Last Date To Apply *",
        initialValue: "",
        validationSchema: Yup.string().required(
          "Last date to apply is required*"
        ),
        type: "date",
      },
      {
        key: "4",
        name: "companyDetails",
        label: "Company Details",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "text",
        multiline: true,
        rows: 3,
      },
      {
        key: "2",
        name: "jobDescription",
        label: "Job Description",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "textarea",
      },
      {
        key: "6",
        name: "jobBenefits",
        label: "Benefits",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "text",
        multiline: true,
        rows: 3,
      },
      {
        key: "7",
        name: "howToApply",
        label: "How To Apply",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "text",
        multiline: true,
        rows: 3,
      },
    ];
  }, [data?.data, company?.data?.length]);

  const initialValues = placementSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = placementSchema?.reduce(
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
      ...notice?.data,
      session: notice?.data?.session?._id,
      lastDateToApply: notice?.data?.lastDateToApply?.split("T")[0]
        ? notice?.data?.lastDateToApply?.split("T")[0]
        : "",
      companyId: notice?.data?.companyId?._id
        ? notice?.data?.companyId?._id
        : "",
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // console.log("values-->", values);
      // return;
      const requestBody = {
        ...values,
        lastDateToApply:
          values?.lastDateToApply &&
          new Date(
            new Date(values?.lastDateToApply).setHours(23, 59)
          ).toISOString(),
        // companyId: values?.companyId,
      };
      if (!requestBody?.companyId) {
        delete requestBody?.companyId;
      }
      if (!requestBody?.companyName) {
        delete requestBody?.companyName;
      }
      try {
        const response = await transport({
          path: noticeId
            ? `placement/notice/update/${noticeId}`
            : `placement/notice/create`,
          method: noticeId ? "PUT" : "POST",
          body: JSON.stringify({ ...requestBody }),
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        formik?.resetForm();
        mutate();
        noticeId
          ? push(`/panel/admin/placement/${noticeId}`)
          : push(`/panel/admin/placement`);
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });
  // console.log(formik);
  return (
    <div className="w-full bg-white shadow-xl rounded-xl">
      <h3 className="font-medium tracking-wide text-2xl text-theme text-center p-4 border-b">
        {noticeId ? "Update" : "Create"} Placement Notice
      </h3>
      <form
        onSubmit={formik?.handleSubmit}
        className="grid grid-cols-2 gap-4 p-4"
      >
        {placementSchema?.map((item) => {
          if (item?.type === "autocomplete") {
            return (
              <div
                className=" col-span-2 md:mb-8 mb-14 w-full flex flex-col gap-4"
                key={item?.key}
              >
                <CustomAutocomplete
                  label={item?.label}
                  value={
                    company?.data
                      ?.filter((i) => i?._id === formik?.values?.companyId)
                      ?.map((item) => {
                        return {
                          key: item?._id,
                          label: `${item?.name} ` + (item?.branch || ""),
                          value: item?._id,
                        };
                      })?.[0] || {
                      key: " ",
                      label: " ",
                      value: " ",
                    } ||
                    undefined
                  }
                  isOptionEqualToValue={(option, v) =>
                    option?.value === v?.value
                  }
                  options={item?.options}
                  onChange={(e, v) => {
                    formik.setFieldValue("companyId", v?.value);
                    formik.setFieldValue("companyName", v?.label);
                    formik.setFieldValue(
                      "companyDetails",
                      company?.data?.find((item) => item?._id === v?.value)
                        ?.description
                    );
                  }}
                  noOptionText="No company found"
                  error={Boolean(
                    formik?.touched?.company && formik?.errors?.company
                  )}
                  helperText={
                    formik?.touched?.company && (formik?.errors?.company as any)
                  }
                  onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
                />
              </div>
            );
          } else if (item?.type === "textarea") {
            return (
              <div
                className=" col-span-2 md:mb-8 mb-14 w-full flex flex-col gap-4"
                key={item?.key}
              >
                <h3 className="font-medium tracking-wide text-base">
                  Job Description
                </h3>
                <ReactQuill
                  theme="snow"
                  value={formik?.values[item?.name]}
                  onChange={(value) => {
                    formik?.setFieldValue(item?.name, value);
                  }}
                  placeholder={"Enter your job description..."}
                />
              </div>
            );
          } else if (item?.multiline) {
            return (
              <div className="w-full col-span-2" key={item?.key}>
                <InputField
                  key={item?.key}
                  type={item?.type as any}
                  label={item?.label}
                  name={item?.name}
                  multiline={item?.multiline}
                  value={formik?.values[item?.name] || undefined}
                  rows={item?.rows}
                  disabled={
                    ["companyName", "companyDetails"]?.includes(item?.name) &&
                    formik?.values?.companyId
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
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
          } else {
            return (
              <div className="col-span-2 lg:col-span-1  " key={item?.key}>
                <InputField
                  key={item?.key}
                  type={item?.type as any}
                  label={item?.label}
                  value={formik?.values[item?.name] || undefined}
                  name={item?.name}
                  multiline={item?.multiline}
                  rows={item?.rows}
                  onChange={formik?.handleChange}
                  disabled={
                    ["companyName", "companyDetails"]?.includes(item?.name) &&
                    formik?.values?.companyId
                  }
                  onBlur={formik?.handleBlur}
                  error={Boolean(
                    formik?.touched[item?.name] && formik?.errors[item?.name]
                  )}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                  helperText={
                    formik?.touched[item?.name] &&
                    (formik?.errors[item?.name] as any)
                  }
                  options={item?.options}
                />
              </div>
            );
          }
        })}
        <div className="w-full col-span-2 flex justify-center">
          <Button type="submit" loading={formik?.isSubmitting}>
            Placement {noticeId ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlacementCreateForm;
