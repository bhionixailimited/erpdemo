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
import { AcademicDetailsType } from "types/academic";
import BranchType from "types/branch";
import SessionType from "types/session";
import UserType from "types/user";
import { notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: SessionType[];
};
type branchType = {
  data: BranchType[];
};
interface DataType extends UserType {
  academicDetails: AcademicDetailsType;
}
type studentDataType = {
  data: DataType;
};
const DemoteStudentDialog = ({
  mutate,
  _id,
  quantity,
  orderStatus,
  type,
}: {
  mutate: any;
  _id?: string;
  quantity?: number;
  orderStatus?: string;
  type?: "STUDENT" | "BATCH";
}) => {
  const { mutate: fetchData } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const { batchId, studentID } = useRouter().query;
  const { data: sessionData } = useSWRFetch<dataType>("session");
  const { data } = useSWRFetch<studentDataType>(
    studentID &&
      `user/details/${studentID}?bank=true&academics=true&employee=true&address=true`
  );
  const { data: singleBatch } = useSWRFetch<any>(
    data?.data?.academicDetails?.batch?._id
      ? `batch/${data?.data?.academicDetails?.batch?._id}`
      : batchId && `batch/${batchId}`
  );
  const { data: branch } = useSWRFetch<branchType>(
    singleBatch?.data?.course?._id &&
      `branch?courseId=${singleBatch?.data?.course?._id}`
  );

  // console.log(data);
  // console.log("batchId", data?.data?.academicDetails?.batch?._id);
  // console.log(studentID);
  // console.log(singleBatch);
  // console.log(branch);
  const timetableSchema = [
    {
      key: "1",
      name: "sessionId",
      label: "Choose Session",
      initialValue: "",
      validationSchema: Yup.string().required("Session is required"),
      type: "autocomplete",
      options: sessionData?.data?.map((data) => ({
        label: `${data?.title}`,
        value: `${data?._id}`,
        key: `${data?._id}`,
      })),
    },
    {
      key: "1",
      name: "branchId",
      label: "Choose Branch",
      initialValue: "",
      validationSchema: Yup.string().required("Branch is required"),
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
          if (result.isConfirmed) {
            return new Promise(async (resolve, reject) => {
              try {
                const response = await fetchData({
                  path: studentID
                    ? `batch/academic/${studentID}`
                    : `batch/academic/${_id}`,
                  method: "POST",
                  body: JSON.stringify({
                    sessionId: values?.sessionId && values?.sessionId,
                    branchId: values?.branchId && values?.branchId,
                    courseId: singleBatch?.data?.course?._id,
                    status: "DEMOTED",
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
              } catch (error) {
                reject(error);
              }
            });
          }
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
              <Button className="hover:ring-theme">DEMOTE</Button>
            </div>
          </form>
        </div>
      </CustomDialog>
      {type !== "BATCH" ? (
        <Button
          onClick={() => {
            setOpenDialog(true);
            // handleClick("DEMOTED");
            // setOpenDialog(true);
            // setSelectedStudent(studentID as string);
          }}
          className="shadow-none text-xs md:text-base whitespace-nowrap !py-4 !bg-red-500 !min-w-fit !px-8 "
        >
          Demote Student
        </Button>
      ) : (
        <Button className=" bg-red-500" onClick={() => setOpenDialog(true)}>
          Demote
        </Button>
      )}
    </div>
  );
};

export default DemoteStudentDialog;
