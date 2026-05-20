import { Add, Done, RotateLeft } from "@mui/icons-material";
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
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "title",
    label: "Finance Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Finance name is required."),
    type: "text",
  },
  {
    key: "1sxs",
    name: "financeType",
    label: "Finance Type *",
    initialValue: "",
    validationSchema: Yup.string().required("Finance type is required."),
    type: "select",
    options: [
      {
        label: "Credit",
        value: "CREDIT",
        key: "1",
      },
      {
        label: "Debit",
        value: "DEBIT",
        key: "2",
      },
    ],
  },
  {
    key: "hjhj",
    name: "amount",
    label: "Amount *",
    initialValue: "",
    validationSchema: Yup.string().required("Amount is required."),
    type: "number",
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

const AddFinanceDialog = ({ mutate, creditMutate }: any) => {
  const { mutate: leave } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await leave({
          path: `finance/create`,
          method: "POST",
          body: JSON.stringify({
            ...values,
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }

        setOpenDialog(false);
        notify.success(response?.data?.message);
        mutate && mutate();
        creditMutate && creditMutate();
        formik?.resetForm();
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
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add Finance
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
              loading={formik.isSubmitting}
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

      <Button
        startIcon={<Add />}
        className="!shadow-none"
        onClick={() => setOpenDialog(true)}
      >
        Add Finance
      </Button>
    </div>
  );
};

export default AddFinanceDialog;
