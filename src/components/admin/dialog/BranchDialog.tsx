import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, CustomDialog, InputField, UploadFile } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  // {
  //   key: "1",
  //   name: "courseName",
  //   label: "Course Name",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("Course name is required."),
  //   type: "text",
  // },
  {
    key: "4",
    name: "branchName",
    label: "Branch Name",
    initialValue: "",
    validationSchema: Yup.string().required("Branch Name is required."),
    type: "text",
  },

  {
    key: "2",
    name: "description",
    label: "Description",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
    multiline: true,
    rows: 4,
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

const BranchDialog = ({ mutate }: { mutate: KeyedMutator<any> }) => {
  const { mutate: course } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const { query } = useRouter();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("title", values?.branchName);
      formdata.append("description", values?.description);
      formdata.append("courseId", `${query?.branchID}`);
      formdata.append("icon", value);
      try {
        const response = await course({
          path: "branch/create",
          method: "POST",
          body: formdata,
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setValue("");
        setOpenDialog(false);
        formik?.resetForm();
        mutate();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col  ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add Branch
          </h3>
          <div
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
              url={value && URL.createObjectURL(value as any)}
              onChange={(e: any) => setValue(e.target.files[0])}
            />
          </div>
          <form
            className="flex flex-col gap-4 p-4 "
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) => (
              <InputField
                size={"small"}
                key={item?.key}
                name={item?.name}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                type={item?.type as any}
                value={formik?.values[item?.name]}
                label={item?.label}
                multiline={item?.multiline}
                rows={item?.rows}
                error={Boolean(
                  formik?.touched[item?.name] && formik?.errors[item?.name]
                )}
                helperText={
                  formik?.touched[item?.name] &&
                  (formik?.errors[item?.name] as any)
                }
              />
            ))}
            <div className="flex items-center justify-center">
              <Button className="hover:ring-theme">Add Course</Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      <Button
        className="mt-2 bg-transparent shadow-none hover:"
        onClick={() => setOpenDialog(true)}
        startIcon={<Add className="text-white text-xl " />}
      >
        Add Branch
      </Button>
    </div>
  );
};

export default BranchDialog;
