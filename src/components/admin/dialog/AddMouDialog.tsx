import {
  Add,
  Close,
  DesignServices,
  Done,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import DepartmentType from "types/department";
import DesignationType from "types/designation";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

type Props = {
  feeName?: string;
  designation?: DesignationType;
  Dmutate?: KeyedMutator<any>;
};
type dataType = {
  data: DepartmentType[];
};
const AddMouDialog = ({ feeName, designation, Dmutate }: Props) => {
  const { data } = useSWRFetch<dataType>(`department`);
  const [openDialog, setOpenDialog] = useState(false);
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
      name: "includeDepartment",
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
  const { mutate } = useFetch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: designation?._id
      ? {
          title: designation?.title,
          description: designation?.description,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        console.log(values);

        const response = await mutate({
          path: `${
            designation ? `author/update/${designation?._id}` : `mou/create`
          }`,
          method: designation ? "PUT" : "POST",
          body: autoAddFormdata({ ...values }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        // Dmutate && Dmutate();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formik.values.doucmentUpload];
    updatedFiles.splice(index, 1);
    formik.setFieldValue("doucmentUpload", updatedFiles);
  };
  return (
    <>
      <div className="w-fit">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
        >
          <div className="w-full p-4 ">
            <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
              {feeName || "Add"} MOU
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {mouDetailsSchema?.map((items) => (
                <>
                  {items?.type === "autoComplete" ? (
                    <div className="col-span-12 text-theme  ">
                      <CustomAutocomplete
                        label={"Choose Department*"}
                        onChange={(e, value) => {
                          formik?.setFieldValue(
                            "includedDepartment",
                            value?.value
                          );
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
                        formik?.touched[items?.name] &&
                          formik?.errors[items?.name]
                      )}
                      helperText={
                        formik?.touched[items?.name] &&
                        (formik?.errors[items?.name] as any)
                      }
                      styleArea={`${
                        // items?.multiline
                        //   ? "col-span-12 md:col-span-12 !w-full"
                        //   :
                        `col-span-12 ${
                          items?.name === "description"
                            ? `md:col-span-12`
                            : `md:col-span-6`
                        } !w-full`
                      }`}
                      styleField="w-full col-span-12 overflow-hidden"
                      inputProps={{
                        max: new Date().toISOString().split("T")[0],
                      }}
                      multiline={items?.multiline}
                      rows={items?.rows}
                    />
                  )}
                </>
              ))}
            </form>
            <div className="w-full flex pt-10 gap-2 px-4 justify-end">
              <Button
                className="shadow-none"
                type="submit"
                onClick={() => formik.handleSubmit()}
                startIcon={<Done />}
                loading={formik.isSubmitting}
              >
                Save
              </Button>
              <Button
                type="reset"
                // onClick={() => formik.resetForm()}
                onClick={() => formik.resetForm()}
                className={"bg-red-400 shadow-none"}
                startIcon={<RotateLeft />}
              >
                Reset
              </Button>
            </div>
          </div>
        </CustomDialog>

        {feeName === "Add" && (
          <Button
            startIcon={<Add />}
            className="!shadow-none mt-4"
            onClick={() => setOpenDialog(true)}
          >
            Add MOU
          </Button>
        )}
      </div>
      {feeName === "Edit" && (
        <span
          className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 "
          onClick={() => setOpenDialog(true)}
        >
          <DesignServices className="text-green-500 " />
        </span>
      )}
    </>
  );
};

export default AddMouDialog;
