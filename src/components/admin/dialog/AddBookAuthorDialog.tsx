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
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "3",
    name: "name",
    label: "Author Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Author Name is required."),
    type: "text",
  },
  {
    key: "3dd",
    name: "bio",
    label: "Bio",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
    rows: 4,
    multiline: true,
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
type Props = {
  feeName: string;
  designation?: DesignationType;
  Dmutate: KeyedMutator<any>;
};
const AddBookAuthorDialog = ({ feeName, designation, Dmutate }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
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
        const response = await mutate({
          path: `${
            designation ? `author/update/${designation?._id}` : `author/create`
          }`,
          method: designation ? "PUT" : "POST",
          body: JSON.stringify({
            ...values,
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
              {feeName || "Add"} Book Author
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {timetableSchema?.map((items) => (
                <TextInput
                  title={items?.label}
                  key={items?.key}
                  name={items?.name}
                  type={items?.type as any}
                  value={formik?.values[items?.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={items?.rows}
                  size="medium"
                  fullWidth
                  multiline={items?.multiline}
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
            className="!shadow-none"
            onClick={() => setOpenDialog(true)}
          >
            Add Book Author
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

export default AddBookAuthorDialog;
