import { Add, DesignServices, Done, RotateLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Button, CustomDialog, TextInput } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import FeeType from "types/fee";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "title",
    label: "Fee Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Fee name is required."),
    type: "text",
  },
  {
    key: "1",
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
type Props = {
  feeName: string;
  fee?: FeeType;
  Dmutate: KeyedMutator<any>;
};
const AddFeeDialog = ({ feeName, fee, Dmutate }: Props) => {
  const { mutate } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");

  const formik = useFormik({
    initialValues: fee?._id
      ? {
          title: fee?.title,
          amount: fee?.amount,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: `${fee ? `fee/update/${fee?._id}` : `fee/create`}`,
          method: fee ? "PUT" : "POST",
          body: JSON.stringify({
            title: values?.title,
            amount: values?.amount,
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
              {feeName || "Add"} Fee
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
                onClick={() => formik.resetForm()}
                className={"bg-red-400 shadow-none"}
                startIcon={<RotateLeft />}
              >
                Reset
              </Button>
            </div>
          </div>
        </CustomDialog>

        {/* Here is added for  new-fees */}
        {feeName === "Add" && (
          <Button
            startIcon={
              <Tooltip title="Add New Fee">
                <Add />
              </Tooltip>
            }
            className="!shadow-none"
            onClick={() => setOpenDialog(true)}
          >
            Set Fee
          </Button>
        )}
      </div>

      {/* Here is edit for  existing-fees */}
      {feeName === "Edit" && (
        <span
          className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 "
          onClick={() => setOpenDialog(true)}
        >
          <Tooltip title="Edit Fee">
            <DesignServices className="text-green-500 " />
          </Tooltip>
        </span>
      )}
    </>
  );
};

export default AddFeeDialog;
