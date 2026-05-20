import { Add } from "@mui/icons-material";
import { Button, CustomDialog } from "components/core";
import { SetStudentFeesForm } from "components/form/admin";
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

const AddFeesDialog = ({ mutate, creditMutate }: any) => {
  const { mutate: leave } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
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
        maxWidth="md"
      >
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add Fee
          </h3>
          <SetStudentFeesForm setOpenDialog={setOpenDialog} mutate={mutate} />
        </div>
      </CustomDialog>

      <Button
        startIcon={<Add />}
        className="!shadow-none"
        onClick={() => setOpenDialog(true)}
      >
        Set Student Fees
      </Button>
    </div>
  );
};

export default AddFeesDialog;
