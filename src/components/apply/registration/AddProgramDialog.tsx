import { Add } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import { Button, CustomDialog, InputField } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "title",
    label: "Programme Name *",
    initialValue: "",
    validationSchema: Yup.string().required("Programme name is required."),
    type: "text",
  },

  {
    key: "2",
    name: "variant",
    label: "Years *",
    initialValue: "",
    // validationSchema: Yup.string().required("Years is required."),
    type: "multiSelect",
  },
  {
    key: "3",
    name: "programmeFee",
    label: "Programme Fee (In INR) *",
    initialValue: "",
    validationSchema: Yup.string().required("Programme Fee is required."),
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

const AddProgramDialog = ({ mutate }: { mutate: KeyedMutator<any> }) => {
  const { mutate: programme } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(""); // set value for upload file or to make iconUrl
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await programme({
          path: "programme/create",
          method: "POST",
          body: JSON.stringify(values),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
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
            Add Programme
          </h3>
          <form
            className="flex flex-col gap-4 p-4 "
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) => (
              <>
                {item?.type === "multiSelect" ? (
                  <>
                    <h3>{item?.label}</h3>
                    <Autocomplete
                      multiple
                      value={formik?.values?.tags}
                      options={[]}
                      defaultValue={formik?.values?.tags}
                      freeSolo
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_e, value) => {
                        formik.setFieldValue("variant", value);
                      }}
                    />
                  </>
                ) : (
                  <InputField
                    size={"small"}
                    key={item?.key}
                    name={item?.name}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    type={item?.type as any}
                    value={formik?.values[item?.name]}
                    label={item?.label}
                    error={Boolean(
                      formik?.touched[item?.name] && formik?.errors[item?.name]
                    )}
                    helperText={
                      formik?.touched[item?.name] &&
                      (formik?.errors[item?.name] as any)
                    }
                  />
                )}
              </>
            ))}
            <div className="flex items-center justify-center">
              <Button className="hover:ring-theme" type="submit">
                Add Programme
              </Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      <Button
        className="mt-2 bg-transparent shadow-none hover:"
        onClick={() => setOpenDialog(true)}
        startIcon={<Add className="text-white text-xl " />}
      >
        Add Programme
      </Button>
    </div>
  );
};

export default AddProgramDialog;
