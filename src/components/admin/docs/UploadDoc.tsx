import { Close, CloudUpload, Delete, PictureAsPdf } from "@mui/icons-material";
import {
  Dialog,
  Chip,
  Avatar,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { FileIcon } from "assets/static-icon";
import { Button, InputField, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useAuth, useFetch } from "hooks";
import { Fragment, useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";
export const selectType = [
  {
    key: "1",
    label: "HOD",
    value: "HOD",
  },
  {
    key: "2",
    label: "MOU",
    value: "MOU",
  },
  {
    key: "4",
    label: "HR",
    value: "HR",
  },
  {
    key: "3",
    label: "OTHER",
    value: "OTHER",
  },
];
const materialFormSchema = [
  {
    key: "1",
    name: "title",
    type: "text",
    initialValue: "",
    label: "Title",
    validationSchema: Yup.string().required("Title is required*"),
    placeholder: "Type title of the document",
  },
  {
    key: "2",
    name: "type",
    type: "select",
    initialValue: "",
    label: "Select Type",
    hidden: true,
    options: selectType,
    // options: [
    //   {
    //     key: "1",
    //     label: "HOD",
    //     value: "HOD",
    //   },
    //   {
    //     key: "2",
    //     label: "MOU",
    //     value: "MOU",
    //   },
    //   {
    //     key: "4",
    //     label: "HR",
    //     value: "HR",
    //   },
    //   {
    //     key: "3",
    //     label: "OTHER",
    //     value: "OTHER",
    //   },
    // ],
    validationSchema: Yup.string(),
  },
  {
    key: "2i",
    name: "category",
    type: "select",
    initialValue: "",
    label: "Select Type",
    hiddenAgain: true,
    options: [
      {
        key: "1",
        label: "ACCOMPLISHMENT",
        value: "ACCOMPLISHMENT",
      },
      {
        key: "2",
        label: "CERTIFICATION",
        value: "CERTIFICATION",
      },
      {
        key: "3",
        label: "OTHER",
        value: "OTHER",
      },
    ],
    validationSchema: Yup.string(),
  },
  {
    key: "4",
    type: "text",
    name: "keywords",
    initialValue: "",
    label: "Keywords",
    placeholder: "Type and press enter to add multiple keywords.",
  },
  {
    key: "5",
    type: "file",
    name: "document",
    initialValue: "",
    label: "Upload File",
    validationSchema: Yup.string().required("file is required"),
  },
];

const initialValues = materialFormSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = materialFormSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);
const UploadDoc = ({
  open,
  onClose,
  reload,
  personal,
}: {
  open: boolean;
  onClose: () => void;
  reload: () => void;
  personal?: boolean;
}) => {
  const { mutate } = useFetch();
  const { user, switchInstitute } = useAuth();
  const [typingValue, setTypingValue] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values, { resetForm }) => {
      // console.log("values-->", values);
      // return;
      try {
        const formData = new FormData();

        formData.append("document", values?.document);
        formData.append("category", values?.category);
        formData.append("title", values?.title);
        formData.append("keywords", values?.keywords);
        formData.append("type", values?.type);
        !["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role)) &&
          user?.instituteId &&
          formData.append(
            "instituteId",
            user?.instituteId?._id || user?.instituteId?.toString()
          );
        ["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role)) &&
          switchInstitute &&
          user?.instituteId &&
          formData.append(
            "instituteId",
            user?.instituteId?._id || user?.instituteId?.toString()
          );
        personal && formData.append("isSingleUser", "true");

        const response = await mutate({
          path: "document",
          method: "POST",
          body: formData,
          isFormData: true,
        });

        if (response?.status !== 200) throw new Error(response?.data?.error);

        notify.success("File uploaded to cloud!");
        resetForm();
        reload();
        onClose();
      } catch (error) {
        if (error instanceof Error) return notify.error(error.message);
        notify.error("Oops something went wrong!");
      }
    },
  });

  const handleDelete = (index: number) => {
    formik?.setFieldValue(
      "keywords",
      formik?.values?.keywords?.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div className="w-full">
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <div className="w-full">
          <div className="w-full flex justify-center gap-4 rounded-lg items-center border-b shadow-lg p-2 ">
            <span className="font-medium tracking-wide text-2xl  mb-4 text-theme p-4 ">
              Upload Document
            </span>
          </div>
          <div className="w-full  ">
            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 ">
              {materialFormSchema
                ?.filter((item) =>
                  personal ? !item?.hidden : !item?.hiddenAgain
                )
                ?.map((item) => {
                  return (
                    <Fragment key={item?.key}>
                      {item?.name === "keywords" ? (
                        <>
                          <div className="flex flex-wrap gap-4">
                            {formik?.values?.keywords?.length
                              ? formik?.values?.keywords?.map(
                                  (_: string, index: number) => (
                                    <Chip
                                      label={_}
                                      onDelete={() => handleDelete(index)}
                                      deleteIcon={<Delete />}
                                      variant="outlined"
                                      key={index}
                                    />
                                  )
                                )
                              : null}
                          </div>

                          <InputField
                            label={item?.label}
                            options={item?.options}
                            key={item?.key}
                            name={item?.name}
                            type={item?.type as any}
                            onChange={(e) => setTypingValue(e?.target?.value)}
                            placeholder={item?.placeholder}
                            onBlur={formik?.handleBlur}
                            error={Boolean(
                              formik?.touched[item?.name] &&
                                formik?.errors[item?.name]
                            )}
                            helperText={
                              formik?.touched[item?.name] &&
                              (formik?.errors[item?.name] as any)
                            }
                            value={typingValue}
                            onKeyDown={(e: any) => {
                              if (e.key === "Enter") {
                                formik.setFieldValue(
                                  "keywords",
                                  formik?.values?.keywords?.length
                                    ? [...formik?.values?.keywords, typingValue]
                                    : [typingValue]
                                );
                                setTypingValue("");
                              }
                            }}
                          />
                        </>
                      ) : item?.type === "file" ? (
                        <div className="flex flex-col gap-4 relative">
                          <h3 className="font-medium tracking-wide text-base">
                            Upload File
                          </h3>

                          {formik.values?.document ? (
                            <>
                              <div className="absolute top-0 right-0 z-[9999]">
                                <IconButton
                                  onClick={() =>
                                    formik?.setFieldValue("document", undefined)
                                  }
                                >
                                  <Close className="text-themeSecondary" />
                                </IconButton>
                              </div>
                              <div className="w-full bg-theme p-5 text-center flex items-center justify-center flex-col rounded  ">
                                <Avatar
                                  src={FileIcon.src}
                                  className="!h-16 !p-2 !w-16"
                                />
                                <h3 className="text-white  text-xl">
                                  {formik.values?.document?.name}
                                </h3>
                              </div>
                            </>
                          ) : (
                            <>
                              <UploadFile
                                url={
                                  formik.values.document &&
                                  (typeof formik.values.document === "string"
                                    ? formik.values.document
                                    : URL.createObjectURL(
                                        formik?.values?.document
                                      ))
                                }
                                onChange={(e: any) =>
                                  formik?.setFieldValue(
                                    "document",
                                    e.target.files[0]
                                  )
                                }
                              />
                              {formik?.touched?.document &&
                                formik?.errors?.document && (
                                  <FormHelperText error={true}>
                                    {formik?.errors?.document as any}
                                  </FormHelperText>
                                )}
                            </>
                          )}
                        </div>
                      ) : (
                        <InputField
                          label={item?.label}
                          options={item?.options}
                          key={item?.key}
                          name={item?.name}
                          type={item?.type as any}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          error={Boolean(
                            formik?.touched[item?.name] &&
                              formik?.errors[item?.name]
                          )}
                          helperText={
                            formik?.touched[item?.name] &&
                            (formik?.errors[item?.name] as any)
                          }
                          value={formik?.values[item?.name]}
                        />
                      )}
                    </Fragment>
                  );
                })}

              <div className="flex items-center justify-center my-4 ">
                <Button
                  startIcon={<CloudUpload />}
                  className="hover:ring-theme"
                  loading={formik?.isSubmitting}
                  onClick={() => formik?.handleSubmit()}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UploadDoc;
