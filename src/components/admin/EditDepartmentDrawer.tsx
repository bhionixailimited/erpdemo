import {
  Add,
  Done,
  Edit,
  ManageAccounts,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import {
  Button,
  CustomDrawer,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import { useCurrency, useFetch, useSWRFetch } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import STATES from "configs/state";
import { FinancialYear, handleValidFormData, notify } from "utils";
import DepartmentType from "types/department";
const editUserSchema = [
  {
    key: "0",
    name: "icon",
    label: "",
    initialValue: "",
    type: "file",
  },
  {
    key: "1",
    name: "departmentName",
    label: "Department Name",
    initialValue: "",
    validationSchema: Yup.string().required("Department name is required."),
    type: "text",
  },
  {
    key: "2",
    name: "description",
    label: "Description",
    initialValue: "",
    validationSchema: Yup.string().optional(),
    type: "text",
    multiline: true,
    rows: 5,
  },
];
type Data = {
  data: DepartmentType;
};
const EditDepartmentDrawer = ({ open, onClose, mutate }: any) => {
  const { mutate: department } = useFetch();
  const { data, isValidating } = useSWRFetch<Data>(
    open && `department/${open}`
  );

  const upload_picture = useRef<any>();
  const onButtonPress = () => {
    upload_picture?.current && upload_picture?.current?.click();
  };

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
          icon: data?.data?.iconUrl,
          departmentName: data?.data?.title,
          description: data?.data?.description,
        }
      : initialValues,

    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("title", values?.departmentName);
      formdata.append(
        "description",
        values?.description?.length ? values?.description : " "
      );
      formdata.append("icon", values?.icon);
      try {
        const response = await department({
          path: `department/update/${open}`,
          method: "PUT",
          body: handleValidFormData(formdata),
          isFormData: true,
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
              <h3 className="tracking-wide text-center">Edit Department</h3>
            </div>
          </div>
          <div className="flex flex-col py-5 overflow-auto">
            <div className="flex w-full p-5  items-center justify-center">
              <div className="w-full flex gap-3 flex-col">
                <form
                  className="grid grid-cols-12 w-full px-4 gap-4 "
                  onSubmit={formik.handleSubmit}
                >
                  {editUserSchema?.map((items) =>
                    items?.type === "file" ? (
                      <div
                        className="flex items-center w-full col-span-12 m-auto justify-center"
                        key={items?.key}
                      >
                        <UploadFile
                          // url={value && URL?.createObjectURL(value)}
                          url={
                            formik.values.icon &&
                            (typeof formik.values.icon === "string"
                              ? formik.values.icon
                              : URL.createObjectURL(formik?.values?.icon))
                          }
                          onChange={(e: any) =>
                            formik?.setFieldValue("icon", e.target.files[0])
                          }
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
                        rows={items?.rows}
                        size="small"
                        fullWidth
                        multiline={items?.multiline}
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
                    )
                  )}
                </form>
                <div className="w-full flex pt-10 gap-2 px-4">
                  <Button
                    type="submit"
                    onClick={() => formik.handleSubmit()}
                    startIcon={<Done />}
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    // onClick={() => formik.resetForm()}
                    onClick={resetFields}
                    className={"bg-red-400"}
                    startIcon={<RotateLeft />}
                  >
                    Reset
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

export default EditDepartmentDrawer;
