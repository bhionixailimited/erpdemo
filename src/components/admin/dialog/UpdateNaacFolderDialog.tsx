import { Add, Done, RotateLeft } from "@mui/icons-material";

import { Button, CustomDialog, TextInput } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";

import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
interface Props {
  open: boolean;
  data?: any;
  handleClose: () => void;
  mutate?: () => void;
}
const timetableSchema = [
  {
    key: "1",
    name: "title",
    label: "Folder Title *",
    initialValue: "",
    validationSchema: Yup.string().required("Folder title is required."),
    type: "text",
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
const UpdateNaacFolderDialog = ({ open, handleClose, data, mutate }: Props) => {
  const { mutate: addVehicle } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      title: `${data?.title ? data?.title : ""}`,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await addVehicle({
          path: `naac-folder/${data?._id}`,
          method: "PUT",
          body: autoAddFormdata({
            ...values,
          }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        handleClose();
        setValue("");
        formik?.resetForm();
        mutate?.();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="w-fit">
      <CustomDialog open={open} onClose={handleClose} maxWidth="md">
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Update Folder
          </h3>
          <form className=" w-full px-4 gap-4 pt-10">
            {timetableSchema?.map((items, i) => (
              <TextInput
                title={items?.label}
                key={items?.key}
                name={items?.name}
                type={items?.type as "text"}
                value={formik?.values[items?.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                fullWidth
                error={Boolean(
                  formik?.touched[items?.name] && formik?.errors[items?.name]
                )}
                helperText={
                  formik?.touched[items?.name] &&
                  (formik?.errors[items?.name] as any)
                }
                styleArea={`${"col-span-12 md:col-span-6 !w-full"}`}
                styleField="w-full col-span-12 overflow-hidden"
              />
            ))}
          </form>
          <div className="w-full flex pt-10 gap-2 px-4 justify-end">
            <Button
              loading={formik.isSubmitting}
              className="shadow-none"
              type="submit"
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
            >
              Update
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
    </div>
  );
};

export default UpdateNaacFolderDialog;
