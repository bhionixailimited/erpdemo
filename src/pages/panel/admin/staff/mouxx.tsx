import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  CustomAutocomplete,
  PhotoUpload,
  TextInput,
  UploadFile,
} from "components/core";
import { Close, Done } from "@mui/icons-material";
import DepartmentType from "types/department";

type dataType = {
  data: DepartmentType[];
};
const MOU = () => {
  const { data, isValidating, error, mutate } =
    useSWRFetch<dataType>(`department`);
  //   console.log(
  //     "data-->",
  //     data?.data?.map((item) => {
  //       return item.title;
  //     })
  //   );
  const mouDetailsSchema = [
    {
      key: "1",
      name: "title",
      label: "Title*",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Title is required"),
    },
    {
      key: "2",
      name: "dateOfSigning",
      label: "Date Of Signing*",
      initialValue: "",
      type: "date",
      validationSchema: Yup.string().required("Date Of Signing is required"),
    },

    {
      key: "3",
      name: "signUnderWhom",
      label: "Sign Under Whom*",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Sign Under Whom is required"),
    },

    {
      key: "4",
      name: "signBy",
      label: "Sign By*",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Sign By is required"),
    },
    {
      key: "5",
      name: "includedDepartment",
      label: "Included Department*",
      initialValue: "",
      type: "autoComplete",
      validationSchema: Yup.string().required("Department is required"),
      options: data?.data?.map((data) => ({
        label: `${data?.title}`,
        value: `${data?._id}`,
        key: `${data?.title}`,
      })),
    },
    {
      key: "6",
      name: "description",
      label: "Description*",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string()
        .required("Description is required")
        .min(5, "Minimum 5 characters required"),
      multiline: true,
      rows: 2,
    },
    {
      key: "7",
      name: "doucmentUpload",
      label: "Document Upload",
      initialValue: "",
      //   validationSchema: Yup.mixed().required("Document is required!"),
      type: "file",
    },
  ];

  const initialValues = mouDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = mouDetailsSchema?.reduce(
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
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formik.values.doucmentUpload];
    updatedFiles.splice(index, 1);
    formik.setFieldValue("doucmentUpload", updatedFiles);
  };

  // console.log({ formik });

  return (
    <PrivateLayout title="MOU">
      {/* form - below */}
      <div>
        <div className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
          {mouDetailsSchema?.map((items) => (
            <>
              {items?.type === "autoComplete" ? (
                <div className="col-span-12 md:col-span-6 text-theme  -mt-1.5">
                  <CustomAutocomplete
                    label={"Choose Department*"}
                    onChange={(e, value) => {
                      formik?.setFieldValue("includedDepartment", value?.value);
                    }}
                    error={Boolean(
                      formik?.touched?.includedDepartment &&
                        formik?.errors?.includedDepartment
                    )}
                    helperText={
                      formik?.touched?.includedDepartment &&
                      (formik?.errors?.includedDepartment as any)
                    }
                    options={items?.options}
                    isOptionEqualToValue={(option, value) =>
                      option?.value === value?.value
                    }
                    noOptionText="No departnment found"
                  />
                </div>
              ) : items?.type === "file" ? (
                <div className="w-full col-span-12 relative">
                  <div className="">
                    <UploadFile
                      width={250}
                      height={200}
                      onChange={(e: any) =>
                        formik?.setFieldValue(
                          items?.name,
                          formik?.values?.doucmentUpload?.length > 0
                            ? [
                                ...formik?.values?.doucmentUpload,
                                e?.target?.files[0],
                              ]
                            : [e?.target?.files[0]]
                        )
                      }
                      outerClassName="col-span-12"
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    {formik?.values?.doucmentUpload?.length
                      ? formik?.values?.doucmentUpload?.map(
                          (item: any, index: number) => (
                            <div className=" w-44 " key={index}>
                              {item?.type?.includes("image") ? (
                                <div className="relative">
                                  <img
                                    src={URL.createObjectURL(item)}
                                    alt={item?.name}
                                    className=""
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                  >
                                    <Close />
                                  </button>
                                </div>
                              ) : (
                                <div className="relative">
                                  <img
                                    src="https://cdn-icons-png.flaticon.com/128/569/569800.png"
                                    alt=""
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                  >
                                    <Close />
                                  </button>
                                </div>
                              )}
                            </div>
                          )
                        )
                      : null}
                  </div>
                </div>
              ) : (
                <TextInput
                  title={items?.label}
                  key={items?.key}
                  name={items?.name}
                  type={items?.type as any}
                  value={formik?.values[items?.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={items?.options}
                  // rows={items?.rows}
                  //   size="small"
                  fullWidth
                  // multiline={items?.multiline}
                  error={Boolean(
                    formik?.touched[items?.name] && formik?.errors[items?.name]
                  )}
                  helperText={
                    formik?.touched[items?.name] &&
                    (formik?.errors[items?.name] as any)
                  }
                  styleArea={`${
                    // items?.multiline
                    //   ? "col-span-12 md:col-span-12 !w-full"
                    //   :
                    "col-span-12 md:col-span-6 !w-full"
                  }`}
                  styleField="w-full col-span-12 overflow-hidden"
                  inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  multiline={items?.multiline}
                  rows={items?.rows}
                />
              )}
            </>
          ))}
        </div>
        {/* <div className="pl-4">
          <div className="w-1/2 h-60  rounded-md border border-gray-200">
            Document Upload
          </div>
        </div> */}
        <div className="w-full  flex justify-start px-4 mt-2">
          <Button
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting || !formik.isValid}
            // loading={formik.isSubmitting || loading}
            // startIcon={<Done />}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(MOU);
