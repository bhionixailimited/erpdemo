import { Done, Edit } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import { Button, CustomDrawer, TextInput } from "components/core";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import ManageProgramType from "types/manageprograms";
import { notify } from "utils";
import * as Yup from "yup";
const editUserSchema = [
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
type Data = {
  data: ManageProgramType;
};
const EditProgram = ({ open, onClose, mutate, editProgramData }: any) => {
  const [value, setValue] = useState<any>("");
  const { mutate: programme } = useFetch();
  const initialValues = editUserSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = editUserSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: open
      ? {
          title: editProgramData?.title,
          variant: editProgramData?.variant,
          programmeFee: editProgramData?.programmeFee,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await programme({
          path: `programme/${editProgramData?._id}`,
          method: "PUT",
          body: JSON.stringify(values),
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        onClose();
        formik?.resetForm();
        mutate();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const resetFields = () => {
    formik.resetForm();
    setValue("");
  };

  return (
    <div>
      <CustomDrawer
        open={open}
        onClose={onClose}
        anchor="right"
        maxWidth="md"
        width="40vw"
      >
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b ">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Edit className="h-8 w-8" />
              <h3 className="tracking-wide text-center">Edit Programme</h3>
            </div>
          </div>
          <div className="flex flex-col py-10 overflow-auto">
            <div className="flex w-full p-5 items-center justify-center">
              <div className="w-full flex gap-3 flex-col">
                <form
                  className="grid grid-cols-1 w-full px-4 gap-4 "
                  onSubmit={formik.handleSubmit}
                >
                  {editUserSchema?.map((items, i) => (
                    <div className="w-full" key={i}>
                      {items?.type === "multiSelect" ? (
                        <div className="w-full">
                          <h3>{items?.label}</h3>
                          <Autocomplete
                            multiple
                            fullWidth
                            size="small"
                            value={formik?.values?.variant}
                            options={[]}
                            defaultValue={formik?.values?.variant}
                            freeSolo
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(_e, value) => {
                              formik.setFieldValue("variant", value);
                            }}
                          />
                        </div>
                      ) : (
                        <TextInput
                          title={items?.label}
                          key={items?.key}
                          name={items?.name}
                          type={items?.type as any}
                          value={formik?.values[items?.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          size="small"
                          fullWidth
                          error={Boolean(
                            formik?.touched[items?.name] &&
                              formik?.errors[items?.name]
                          )}
                          helperText={
                            formik?.touched[items?.name] &&
                            (formik?.errors[items?.name] as any)
                          }
                          styleArea={`col-span-12  !w-full`}
                          styleField="w-full col-span-12 overflow-hidden"
                        />
                      )}
                    </div>
                  ))}
                </form>
                <div className="w-full flex pt-10 gap-2 px-4">
                  <Button
                    type="submit"
                    onClick={() => formik.handleSubmit()}
                    startIcon={<Done />}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default EditProgram;
