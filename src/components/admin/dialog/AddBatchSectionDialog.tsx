import {
  Add,
  ArrowBack,
  ArrowDownward,
  ArrowUpward,
  Class,
  Done,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import BranchType from "types/branch";
import SessionType from "types/session";
import { handleValidFormData, notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: SessionType[];
};
type branchType = {
  data: BranchType[];
};
const AddBatchSectionDialog = ({
  mutate,
  _id,
  quantity,
  orderStatus,
  studentIds,
  type,
}: {
  mutate: KeyedMutator<any>;
  _id?: string;
  quantity?: number;
  orderStatus?: string;
  studentIds?: string[];
  type?: "promote" | "demote";
}) => {
  const { mutate: department } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const { batchId } = useRouter().query;
  const { data: sessionData } = useSWRFetch<dataType>("session");
  const { data: singleBatch } = useSWRFetch<any>(batchId && `batch/${batchId}`);
  const { data: branch } = useSWRFetch<branchType>(
    singleBatch?.data?.course?._id &&
      `branch?courseId=${singleBatch?.data?.course?._id}`
  );
  // console.log(singleBatch?.data?.batchSection);
  // console.log(branch);
  // console.log(studentIds);
  const timetableSchema = [
    {
      key: "1",
      name: "sectionId",
      label: "Choose Section",
      initialValue: "",
      validationSchema: Yup.string().required("Session is required."),
      type: "autocomplete",
      options: singleBatch?.data?.batchSection?.map((data: string[]) => ({
        label: `${data}`,
        value: `${data}`,
        key: `${data}`,
      })),
    },
  ];

  const initialValues = timetableSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = timetableSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover it again!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Change!",
        }).then(async (result) => {
          if (result.isConfirmed)
            new Promise(async (resolve, reject) => {
              const response = await department({
                path: `batch/section/${batchId}`,
                method: "POST",
                body: JSON.stringify({
                  studentIds: studentIds,
                  section: values?.sectionId,
                }),
              });
              if (response?.data?.error) {
                notify.error(response?.data?.error);
                reject(response?.data?.error);
              }
              mutate && mutate();
              setOpenDialog(false);
              notify.success(response?.data?.message);

              resolve(response?.data?.message);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setValue("");
        }}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col  ">
          {/* <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-sm text-center md:text-2xl">
              Create Department
            </h3> */}
          {/* <div
              className="m-auto w-60 mt-2 justify-center "
              // style={{
              //   textAlign: "center",
              //   justifyContent: "center",
              //   display: "flex",
              //   marginTop: "2vh",
              //   marginBottom: "1vh",
              // }}
            >
              <UploadFile
                uploadText="Upload Logo"
                //   required={true}
                url={
                  value &&
                  (typeof value === "string" ? value : URL.createObjectURL(value))
                }
                onChange={(e: any) => setValue(e.target.files[0])}
              />
            </div> */}
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) =>
              item?.type === "autocomplete" ? (
                <CustomAutocomplete
                  key={item?.key}
                  label={item?.label}
                  options={item?.options}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value
                  }
                  error={Boolean(
                    formik?.touched[item?.name] && formik?.errors[item?.name]
                  )}
                  helperText={
                    formik?.touched[item?.name] &&
                    (formik?.errors[item?.name] as any)
                  }
                  onChange={(e, value) => {
                    formik?.setFieldValue(item?.name, value?.value);
                  }}
                />
              ) : (
                <InputField
                  key={item?.key}
                  name={item?.name}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  type={item?.type as any}
                  value={formik?.values[item?.name]}
                  label={item?.label}
                  error={Boolean(
                    formik?.touched[item?.name] && formik?.errors[item?.name]
                  )}
                  helperText={
                    formik?.touched[item?.name] &&
                    (formik?.errors[item?.name] as any)
                  }
                />
              )
            )}
            <div className="flex items-center justify-center">
              <Button className="hover:ring-theme">Move</Button>
            </div>
          </form>
        </div>
      </CustomDialog>
      {
        <Button
          startIcon={<Class />}
          className="hover:!bg-theme !bg-theme-500"
          onClick={() => setOpenDialog(true)}
        >
          Section
        </Button>
      }
    </div>
  );
};

export default AddBatchSectionDialog;
