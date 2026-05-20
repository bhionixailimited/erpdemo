import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
} from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import BranchType from "types/branch";
import SessionType from "types/session";
import { notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: SessionType[];
};
type branchType = {
  data: BranchType[];
};
const AddBatchPromoteDialog = ({
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
  // console.log(singleBatch);
  // console.log(branch);
  const timetableSchema = [
    {
      key: "1",
      name: "sessionId",
      label: "Choose Session",
      initialValue: "",
      validationSchema: Yup.string().required("Session is required."),
      type: "autocomplete",
      options: sessionData?.data?.map((data) => ({
        label: `${data?.title}`,
        value: `${data?._id}`,
        key: `${data?._id}`,
      })),
    },
    {
      key: "1dcacas",
      name: "branchId",
      label: "Choose Branch",
      initialValue: "",
      validationSchema: Yup.string().required("branch is required."),
      type: "autocomplete",
      options: branch?.data?.map((data) => ({
        label: `${data?.title}`,
        value: `${data?._id}`,
        key: `${data?._id}`,
      })),
    },
    {
      key: "3",
      name: "removeFromBatch",
      label: "Remove from this batch",
      initialValue: "false", // Set as a string
      type: "checkbox",

      options: [],
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
              if (studentIds?.length && type === "promote") {
                const response = await department({
                  path: `batch/class-promote/${batchId}`,
                  method: "POST",
                  body: JSON.stringify({
                    ...values,
                    courseId: singleBatch?.data?.course?._id,
                    status: "PROMOTED",
                    studentIds: studentIds,
                    removeStudent:
                      values?.removeFromBatch?.toString() === "true"
                        ? true
                        : undefined,
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
              } else if (studentIds?.length && type === "demote") {
                const response = await department({
                  path: `batch/class-promote/${batchId}`,
                  method: "POST",
                  body: JSON.stringify({
                    ...values,
                    courseId: singleBatch?.data?.course?._id,
                    status: "DEMOTED",
                    studentIds: studentIds,
                    removeStudent:
                      values?.removeFromBatch?.toString() === "true"
                        ? true
                        : undefined,
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
              } else {
                const response = await department({
                  path: `batch/class-promote/${batchId}`,
                  method: "POST",
                  body: JSON.stringify({
                    ...values,
                    courseId: singleBatch?.data?.course?._id,
                    status: "PROMOTED",
                    removeStudent:
                      values?.removeFromBatch?.toString() === "true"
                        ? true
                        : undefined,
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
              }
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
              ) : item.type === "checkbox" ? (
                <FormControlLabel
                  key={item.key}
                  control={
                    <Checkbox
                      name={item.name}
                      checked={String(formik?.values[item.name]) === "true"}
                      onChange={(e) =>
                        formik?.setFieldValue(item?.name, e?.target?.checked)
                      }
                    />
                  }
                  label={item.label}
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
              <Button
                className={
                  type === "demote" ? `!bg-red-500` : `hover:ring-theme`
                }
              >
                {type === "promote"
                  ? "Promote"
                  : type === "demote"
                  ? "Demote"
                  : "Promote"}
              </Button>
            </div>
          </form>
        </div>
      </CustomDialog>
      {type === "promote" ? (
        <Button
          startIcon={<ArrowUpward />}
          className="hover:!bg-sky-500 !bg-sky-500"
          onClick={() => setOpenDialog(true)}
        >
          Promote
        </Button>
      ) : type === "demote" ? (
        <Button
          startIcon={<ArrowDownward />}
          className="hover:!bg-red-500 !bg-red-500"
          onClick={() => setOpenDialog(true)}
        >
          Demote
        </Button>
      ) : (
        <Button
          startIcon={<ArrowUpward />}
          className="hover:!bg-sky-500 !bg-sky-500"
          onClick={() => setOpenDialog(true)}
        >
          Promote All
        </Button>
      )}
    </div>
  );
};

export default AddBatchPromoteDialog;
