import { Add, DesignServices, Done, RotateLeft } from "@mui/icons-material";
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
import { useFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import DesignationType from "types/designation";
import SubjectType from "types/subject";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "3",
    name: "title",
    label: "Subject Name*",
    initialValue: "",
    validationSchema: Yup.string().required("Subject name is required."),
    type: "text",
  },
  {
    key: "3nnkj",
    name: "subjectCode",
    label: "Subject Code*",
    initialValue: "",
    validationSchema: Yup.string().required("Subject code is required."),
    type: "text",
  },
  // {
  //   key: "3nnkj",
  //   name: "isTheory",
  //   label: "Theory / Lab*",
  //   initialValue: "",
  //   validationSchema: Yup.string().required("Theory or Lab is required."),
  //   type: "select",
  //   options: [
  //     { key: "01", label: "Theory", value: "true" },
  //     {
  //       key: "02",
  //       label: "Lab",
  //       value: "false",
  //     },
  //   ],
  // },
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
type Props = {
  feeName: string;
  designation?: SubjectType;
  Dmutate: KeyedMutator<any>;
};
const AddSubjectDialog = ({ feeName, designation, Dmutate }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate } = useFetch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: designation?._id
      ? {
          title: designation?.title,
          subjectCode: designation?.subjectCode,
          // isTheory: designation?.isTheory?.toString(),
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: `${
            designation
              ? `subject/update/${designation?._id}`
              : `subject/create`
          }`,
          method: designation ? "PUT" : "POST",
          body: JSON.stringify({
            title: values?.title,
            subjectCode: values?.subjectCode,
            // isTheory: values?.isTheory,
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        Dmutate();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
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
          <div className="w-full p-4 ">
            <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
              {feeName || "Add"} Subject
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {timetableSchema?.map((items) => (
                <TextInput
                  title={items?.label}
                  key={items?.key}
                  name={items?.name}
                  type={items?.type as any}
                  value={formik?.values[items?.name]}
                  // options={items?.options}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  //   rows={items?.rows}
                  size="medium"
                  fullWidth
                  //   multiline={items?.multiline}
                  error={Boolean(
                    formik?.touched[items?.name] && formik?.errors[items?.name]
                  )}
                  helperText={
                    formik?.touched[items?.name] &&
                    (formik?.errors[items?.name] as any)
                  }
                  styleArea={`${"col-span-12 md:col-span-12 !w-full"}`}
                  styleField="w-full col-span-12 overflow-hidden"
                />
              ))}
            </form>
            <div className="w-full flex pt-10 gap-2 px-4 justify-end">
              <Button
                className="shadow-none"
                type="submit"
                onClick={() => formik.handleSubmit()}
                startIcon={<Done />}
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
            className="!shadow-none"
            onClick={() => setOpenDialog(true)}
          >
            Set Subject
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

export default AddSubjectDialog;
