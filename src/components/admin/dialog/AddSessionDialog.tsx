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
import SessionType from "types/session";
import { notify, Years } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "from",
    label: "From Year *",
    initialValue: "",
    validationSchema: Yup.string().required("From year is required."),
    type: "select",
    options: Years,
  },
  {
    key: "2",
    name: "to",
    label: "To Year *",
    initialValue: "",
    validationSchema: Yup.string().required("To year is required."),
    type: "select",
    options: Years,
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
  session?: SessionType;
  Dmutate: KeyedMutator<any>;
};
const AddSessionDialog = ({ feeName, session, Dmutate }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const { mutate } = useFetch();

  const formik = useFormik({
    initialValues: session?._id
      ? {
          from: dayjs(session?.startYear).format("YYYY"),
          to: dayjs(session?.endYear).format("YYYY"),
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: `${
            session ? `session/update/${session?._id}` : `session/create`
          }`,
          method: session ? "PUT" : "POST",
          body: JSON.stringify({
            startYear: new Date(`${values?.from}`).toISOString(),
            endYear: new Date(`${values?.to}`).toISOString(),
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
              {feeName || "Add"} Session
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
                  options={items?.options}
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
            Set Session
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

export default AddSessionDialog;
