import {
  Add,
  CloudUpload,
  DesignServices,
  Done,
  FileUpload,
  PictureAsPdf,
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
  CustomDialog,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { KeyedMutator } from "swr";
import DesignationType from "types/designation";
import { EventType, GuestType } from "types/event";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

const materialFormSchema = [
  {
    key: "1",
    name: "name",
    type: "text",
    initialValue: "",
    label: "Guest Name",
    validationSchema: Yup.string().required("Title is required*"),
  },
  {
    key: "1sas",
    name: "phoneNumber",
    type: "number",
    initialValue: "",
    label: "PhoneNumber",
    validationSchema: Yup.string().optional(),
  },
  {
    key: "1x",
    name: "position",
    type: "text",
    initialValue: "",
    label: "Position",
    validationSchema: Yup.string().optional(),
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
type Props = {
  feeName?: string;
  mouId: string;
  designation?: DesignationType;
  Dmutate: KeyedMutator<any>;
  cardMutate: KeyedMutator<any>;
};
type mouType = {
  data: EventType;
};
const AddEventDocumentDialog = ({
  feeName,
  designation,
  Dmutate,
  mouId,
  cardMutate,
}: Props) => {
  const {
    data: mou,
    mutate: mouMutate,
    isValidating,
  } = useSWRFetch<mouType>(mouId && `event/${mouId}`);
  // console.log(mou);
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: material, loading } = useFetch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      //   console.log([mou?.data?.guests, values].flat());
      //   return;
      let formData = new FormData();
      formData.append(
        `guests`,
        JSON.stringify([mou?.data?.guests, values].flat())
      );

      try {
        const response = await material({
          path: `event/${mouId}`,
          method: "PUT",
          body: formData,
          isFormData: true,
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        formik?.resetForm();
        Dmutate();
        cardMutate();
        setOpenDialog(false);
        notify.success(response?.data?.message);
      } catch (err) {
        if (err instanceof Error) {
          notify.error(err?.message);
        } else {
          notify.error("Oops! Something went wrong ");
        }
      }
    },
  });

  return (
    <>
      <div className="w-fit">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
        >
          <form onSubmit={formik?.handleSubmit} className="w-full  ">
            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 ">
              <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
                {feeName || "Add"} Guest
              </h3>
              {materialFormSchema?.map((item) => {
                return (
                  <Fragment key={item?.key}>
                    {item?.type !== "file" ? (
                      <InputField
                        className={
                          item?.name === "link" &&
                          formik?.values?.type !== "LINK"
                            ? "hidden"
                            : "flex"
                        }
                        labelClass={
                          item?.name === "link" &&
                          formik?.values?.type !== "LINK"
                            ? "hidden"
                            : "flex"
                        }
                        label={item?.label}
                        // options={item?.options}
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
                    ) : (
                      <div className="flex flex-col gap-4">
                        <h3 className="font-medium tracking-wide text-base">
                          Upload File
                        </h3>

                        {formik.values?.file ? (
                          <div className="w-full bg-theme p-14 text-center rounded  ">
                            <FileUpload className="text-white text-5xl" />
                            <h3 className="text-white  text-xl">
                              File Uploaded
                            </h3>
                          </div>
                        ) : (
                          <>
                            {" "}
                            <UploadFile
                              //   uploadText={
                              //     formik.values.type && formik.values.type === "PDF"
                              //       ? "PDF Uploaded"
                              //       : "Click to upload"
                              //   }
                              url={
                                formik.values.file &&
                                (typeof formik.values.file === "string"
                                  ? formik.values.file
                                  : URL.createObjectURL(formik?.values?.file))
                              }
                              onChange={(e: any) =>
                                formik?.setFieldValue("file", e.target.files[0])
                              }
                            />
                            <p className="mt-1 text-xs text-red-600">
                              {formik.touched.file &&
                              typeof formik.errors.file === "string"
                                ? formik.errors.file
                                : ""}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </Fragment>
                );
              })}

              <div className="flex items-center justify-end my-4 gap-3 ">
                <Button
                  loading={formik.isSubmitting}
                  startIcon={<Add />}
                  className="hover:ring-theme"
                >
                  Add
                </Button>
                <Button
                  type="reset"
                  // onClick={() => formik.resetForm()}
                  onClick={() => {
                    formik.resetForm();
                  }}
                  className={"bg-red-400 shadow-none"}
                  startIcon={<RotateLeft />}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </CustomDialog>
        <Button onClick={() => setOpenDialog(true)} startIcon={<Add />}>
          Add
          {/* <Add className="text-7xl text-theme " /> */}
        </Button>
      </div>
    </>
  );
};

export default AddEventDocumentDialog;
