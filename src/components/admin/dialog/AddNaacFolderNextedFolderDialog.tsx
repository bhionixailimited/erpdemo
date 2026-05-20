import { Add, Done, RotateLeft } from "@mui/icons-material";

import { Button, CustomDialog, TextInput } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";

import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

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
const AddNaacFolderNextedFolderDialog = ({
  mutate,
}: {
  mutate?: () => void;
}) => {
  const { mutate: addVehicle } = useFetch();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await addVehicle({
          path: `naac-folder`,
          method: "POST",
          body: autoAddFormdata({
            ...values,
            naacFolderId: router.query.naacFolder,
          }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
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
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add New Folder
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

      <Button startIcon={<Add />} onClick={() => setOpenDialog(true)}>
        Add Folder
      </Button>
    </div>
  );
};

export default AddNaacFolderNextedFolderDialog;
