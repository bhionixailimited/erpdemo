import {
  Add,
  DesignServices,
  Done,
  Email,
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
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { KeyedMutator } from "swr";
import DesignationType from "types/designation";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "3",
    name: "subject",
    label: "Subject*",
    initialValue: "",
    validationSchema: Yup.string().required("Subject is required."),
    type: "text",
  },
  {
    key: "3dd",
    name: "message",
    label: "Message*",
    initialValue: "",
    validationSchema: Yup.string().required("Message is required."),
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
const SendMailDialog = () => {
  const { studentId, studentID } = useRouter().query;
  const { staffId } = useRouter().query;
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate } = useFetch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: `user/send-email`,
          method: "POST",
          body: JSON.stringify({
            ...values,
            userId: `${studentID ? studentID : staffId ? staffId : studentId}`,
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        // Dmutate();
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
            <div className="w-full flex pt-10 gap-2 md:px-4 justify-end ">
              <Button
                className="shadow-none text-xs md:text-base whitespace-nowrap"
                type="submit"
                onClick={() => formik.handleSubmit()}
                startIcon={<Email />}
                loading={formik.isSubmitting}
              >
                Send Email
              </Button>
              <Button
                type="reset"
                // onClick={() => formik.resetForm()}
                onClick={() => formik.resetForm()}
                className={"bg-red-400 shadow-none text-xs md:text-base"}
                startIcon={<RotateLeft />}
              >
                Reset
              </Button>
            </div>
          </div>
        </CustomDialog>
        <Button
          className="!bg-blue-500 !text-white !font-medium !capitalize text-xs md:text-lg !tracking-wide !rounded-md md:!py-3 md:!px-6 whitespace-nowrap  xl:!w-60"
          startIcon={<Email />}
          onClick={() => setOpenDialog(true)}
        >
          Send Email
        </Button>
      </div>
    </>
  );
};

export default SendMailDialog;
